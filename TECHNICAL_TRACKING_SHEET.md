# Product Pivot: ArchCost (Visual Cloud Architecture & Cost Estimator)

The application has been radically pivoted from a basic text-tool factory to a high-value, AI-proof developer tool: **ArchCost**.

## Phase 1: Core Architecture MVP (Completed)
- [x] **ReactFlow Pipeline Migration:** Swapped left-to-right text pipelines for a free-form architectural canvas.
- [x] **InfraNode Component:** Built a highly specialized node for AWS infrastructure, featuring a custom header, dynamic icons, and gradient styling based on service type.
- [x] **Cost & Configuration Panel:** Added inline UI controls inside nodes (dropdowns, inputs, checkboxes) to configure instance types, storage, and traffic.
- [x] **Pricing Math Engine:** Built an initial `pricingEngine.ts` that calculates accurate monthly estimates for EC2, RDS, S3, and ALB based on user configuration.
- [x] **Zustand Store Pivot:** Rewrote the entire state manager (`useArchitectureStore.ts`) to calculate aggregate `totalCost` dynamically across all nodes without a backend.
- [x] **Drag & Drop Sidebar:** Updated sidebar to list AWS services and display the grand total estimated monthly budget.
- [x] **Landing Page Rewrite:** Completely replaced the landing page copy, heroes, and feature grids to target the cloud architecture demographic.

## Phase 2: Refinement & Advanced AWS Services
- [ ] **Network & Bandwidth Math:** Implement complex cross-node bandwidth pricing (e.g., data transfer out from EC2 to the internet, or EC2 to S3).
- [ ] **More Services:** Add nodes for ElastiCache, DynamoDB, API Gateway, and ECS/Fargate.
- [ ] **Export to CSV/Terraform:** Allow users to export their architecture visually and functionally.

## Phase 3: SEO Strategy Replacement
- [ ] **Calculator SEO Pages:** Replace the old `jwt-decoder` pages with highly searched calculator pages (e.g., `/calculators/aws-ec2-pricing`, `/calculators/aws-s3-pricing`) that drop the user straight into a pre-configured node on the canvas.
