# Adding an ArchCost AWS Service

ArchCost provides real-time cost estimation for cloud infrastructure. Adding a new AWS service node involves updating the pricing data fetcher, the pricing engine, and the visual canvas.

## 1. Add to Pricing Fetcher

ArchCost fetches fresh pricing data from the AWS Bulk API.

1. Open `scripts/fetch-aws-pricing.ts`.
2. Add your service's code to the `SERVICES` object map at the top of the file:
   ```typescript
   const SERVICES = {
     // ...
     "YourService": "AmazonYourService",
   };
   ```
3. Run `npm run maintenance:pricing` to pull the latest data. Verify your service appears in `src/data/awsPricing.generated.json`.

## 2. Update the Pricing Engine

The pricing engine calculates monthly costs based on node configurations.

1. Open `src/lib/archcost/pricingEngine.ts`.
2. Find the `calculateNodeCost` function. Add a new `case` in the `switch` statement for your service code (e.g., `"YourService"`).
3. Implement the calculation logic. Pull base rates from `awsPricing[region]?.[serviceCode]` and multiply by the usage metrics defined in the node's `config`.
   ```typescript
   case "YourService": {
     const rate = pricing?.["YourService"]?.[config.instanceType || "default"] || 0;
     const quantity = config.quantity || 1;
     return rate * quantity * HOURS_IN_MONTH;
   }
   ```

## 3. Register the Node

ArchCost needs to know the service exists so users can drag it onto the canvas.

1. Open `src/store/useArchitectureStore.ts` (or wherever available services are defined, often in the canvas sidebar component `src/components/canvas/CanvasSidebar.tsx`).
2. Add your service to the list of draggable tools/resources in the sidebar.
   ```tsx
   <div 
     className="draggable-resource" 
     onDragStart={(e) => handleDragStart(e, "YourService")}
     draggable
   >
     <h3>Your Service Name</h3>
     <p>Description of the service.</p>
   </div>
   ```

## 4. Build the Configuration Component

When a user selects your node on the canvas, they need to be able to configure it (e.g., set the instance type, storage size).

1. Open `src/components/canvas/InfraNode.tsx`.
2. Add configuration UI inputs for your specific service inside the node body.
   ```tsx
   {service === "YourService" && (
     <div className="nodrag mt-4 space-y-3">
       <label className="text-[10px] uppercase text-gray-500">Instance Type</label>
       <select
         value={config.instanceType || "default"}
         onChange={(e) => updateConfig({ instanceType: e.target.value })}
         className="w-full bg-black/50 border border-white/10 rounded p-1 text-xs"
       >
         <option value="type1">Type 1</option>
         <option value="type2">Type 2</option>
       </select>
     </div>
   )}
   ```

## 5. Testing

Write unit tests for your calculation logic in `src/__tests__/archcost/pricingEngine.test.ts`. Verify that changing the configuration in the browser updates the cost estimate immediately.
