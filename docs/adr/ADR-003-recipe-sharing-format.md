# ADR-003: Recipe Sharing Format - Encrypted JSON with Checksum Verification

**Date**: 2026-05-12  
**Status**: Accepted  
**Deciders**: Web Tools Team

## Context

WebToolsEasy users want to share their workflow recipes (saved configurations, presets, transformations) with:

- **Team members**: Private sharing of internal tools/processes
- **Public sharing**: Community recipes and best practices
- **Cross-device sync**: Access recipes on phone and laptop
- **Version control**: Track changes to recipes

### Requirements

1. **Format**: Human-readable, version-controllable (JSON)
2. **Integrity**: Detect corruption or tampering (checksum)
3. **Privacy**: Optional encryption for sensitive recipes
4. **Portability**: Can export/import from multiple sources
5. **Composability**: Recipes reference other recipes/presets
6. **Versioning**: Track recipe versions and updates
7. **Auditability**: Know who created/modified recipe

### Problem Statement

**Simple Text Sharing** (Insufficient):

- No integrity checks - corruption hard to detect
- No versioning - can't track changes
- No privacy - anyone with link can see content
- Hard to manage multiple versions

**Database Storage** (Limited Portability):

- Locked into platform
- Can't use git for version control
- Export/import needed for portability

**Binary Formats** (Not Human-Editable):

- Can't edit in text editor
- Can't diff in git
- Complex tooling needed

## Decision

Implement **Encrypted JSON Recipe Format** with:

- **File Format**: JSON with `.recipe.json` extension
- **Base Structure**: Metadata + configuration + optional encryption
- **Integrity**: SHA-256 checksum in metadata
- **Privacy**: Optional AES-256 encryption with user-held key
- **Versioning**: Git-friendly - one recipe per file
- **Composition**: Recipe can import other recipes via reference

### Specification

```json
{
  // Recipe Metadata
  "$schema": "https://webtoolseasy.com/schemas/recipe/v1.json",
  "id": "recipe-api-cleanup-2024",
  "name": "API Response Cleanup",
  "version": "1.2.0",
  "description": "Clean and validate API responses before logging",
  "author": "John Doe <john@example.com>",
  "license": "CC-BY-4.0",
  "created": "2026-05-01T10:00:00Z",
  "updated": "2026-05-12T15:30:00Z",

  // Recipe Content
  "type": "workflow_preset", // or: workflow_template, tool_preset
  "workflowPack": "wf-api-payload-cleanup", // Which workflow this recipe is for

  "steps": {
    // Configuration for each workflow step
    "step-1-import": {
      "options": {
        "format": "json",
        "validateOnImport": true
      }
    },
    "step-2-validate": {
      "options": {
        "schema": {
          "type": "object",
          "properties": {
            "status": { "type": "number" },
            "data": { "type": "object" }
          }
        },
        "strict": true
      }
    },
    "step-3-clean": {
      "options": {
        "fieldsToRemove": ["_internal", "debug"],
        "fieldsToRedact": ["password", "token"]
      }
    }
  },

  // Optional: Export Artifacts Configuration
  "artifacts": {
    "output-json": {
      "format": "application/json",
      "filename": "cleaned-response.json"
    }
  },

  // Imports/Dependencies
  "imports": [
    {
      "type": "recipe",
      "id": "recipe-json-schema-validator",
      "version": "^1.0.0",
      "optional": false
    }
  ],

  // Metadata Tags
  "tags": ["api", "validation", "cleanup", "json"],
  "category": "developer",

  // Integrity & Encryption
  "metadata": {
    "checksum": "sha256:abc123def456...", // Computed on creation
    "encrypted": false, // or: true
    "encryptionAlgorithm": "AES-256-GCM", // If encrypted
    "encryptionKeyId": "key-2024-001" // If encrypted
  }
}
```

### Recipe Types

| Type                | Purpose                                     | Example                            | Shareable |
| ------------------- | ------------------------------------------- | ---------------------------------- | --------- |
| `workflow_preset`   | Saved configuration for a specific workflow | API Cleanup settings               | Yes       |
| `workflow_template` | Pre-built workflow pack definition          | "Security Audit" complete workflow | Yes       |
| `tool_preset`       | Settings for a specific tool                | JSON Formatter "compact" style     | Yes       |
| `recipe_collection` | Multiple recipes grouped                    | "SaaS Developer Tools" bundle      | Yes       |

### Checksum Computation

```typescript
import crypto from "crypto";

function computeRecipeChecksum(recipe: Recipe): string {
  // 1. Create normalized copy (remove checksum)
  const normalized = { ...recipe };
  delete normalized.metadata?.checksum;

  // 2. Serialize with consistent formatting
  const json = JSON.stringify(normalized, null, 2);

  // 3. Compute SHA-256 hash
  const hash = crypto.createHash("sha256").update(json).digest("hex");

  // 4. Return with algorithm prefix
  return `sha256:${hash}`;
}

function verifyRecipeChecksum(recipe: Recipe): boolean {
  const storedChecksum = recipe.metadata?.checksum;
  const computedChecksum = computeRecipeChecksum(recipe);

  return storedChecksum === computedChecksum;
}
```

### Encryption Approach

For recipes containing sensitive data:

```typescript
import crypto from "crypto";

interface EncryptedRecipe {
  id: string;
  name: string;
  description: string;
  metadata: {
    encrypted: true;
    encryptionAlgorithm: "AES-256-GCM";
    encryptionKeyId: string;
  };
  encryptedContent: string; // Base64-encoded ciphertext
  iv: string; // Base64-encoded IV
  authTag: string; // Base64-encoded authentication tag
}

// User-held encryption key (never sent to server)
function deriveEncryptionKey(password: string, salt: string): Buffer {
  return crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256");
}

function encryptRecipe(recipe: Recipe, password: string): EncryptedRecipe {
  const salt = crypto.randomBytes(16);
  const key = deriveEncryptionKey(password, salt.toString("hex"));
  const iv = crypto.randomBytes(16);

  // Remove checksum before encrypting
  const toEncrypt = { ...recipe };
  delete toEncrypt.metadata?.checksum;

  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(toEncrypt), "utf8"),
    cipher.final(),
  ]);

  return {
    id: recipe.id,
    name: recipe.name,
    description: recipe.description,
    metadata: {
      encrypted: true,
      encryptionAlgorithm: "AES-256-GCM",
      encryptionKeyId: "key-" + salt.toString("hex").slice(0, 8),
    },
    encryptedContent: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    authTag: cipher.getAuthTag().toString("base64"),
  };
}

function decryptRecipe(
  encryptedRecipe: EncryptedRecipe,
  password: string,
): Recipe {
  // Derive key from password and salt extracted from keyId
  const salt = encryptedRecipe.metadata.encryptionKeyId.replace("key-", "");
  const key = deriveEncryptionKey(password, salt);

  const iv = Buffer.from(encryptedRecipe.iv, "base64");
  const authTag = Buffer.from(encryptedRecipe.authTag, "base64");
  const encrypted = Buffer.from(encryptedRecipe.encryptedContent, "base64");

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return JSON.parse(decrypted.toString("utf8")) as Recipe;
}
```

### Composition via References

Recipes can import other recipes:

```json
{
  "id": "recipe-seo-audit-complete",
  "name": "Complete SEO Audit",
  "imports": [
    {
      "type": "recipe",
      "id": "recipe-technical-seo-check",
      "version": "^1.0.0"
    },
    {
      "type": "recipe",
      "id": "recipe-content-quality-check",
      "version": "^2.0.0"
    },
    {
      "type": "recipe",
      "id": "recipe-backlink-analysis",
      "version": "^1.5.0"
    }
  ]
}
```

**Resolution Process**:

1. Load primary recipe
2. For each import, fetch and validate
3. Merge configurations (child overrides parent)
4. Verify versions match constraints
5. Check for circular dependencies
6. Build final merged recipe

### File Organization for Version Control

```
recipes/
├── api/
│   ├── payload-cleanup.recipe.json (v1.2.0)
│   ├── response-validation.recipe.json (v2.0.0)
│   └── rate-limit-handler.recipe.json (v1.0.0)
├── content/
│   ├── blog-publishing-workflow.recipe.json
│   └── seo-optimization.recipe.json
└── README.md  # Registry of recipes
```

### Sharing Mechanisms

#### 1. Direct File Sharing

```typescript
// Export recipe as downloadable file
function downloadRecipe(recipe: Recipe) {
  const json = JSON.stringify(recipe, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${recipe.id}.recipe.json`;
  a.click();
}

// Import recipe from uploaded file
async function importRecipeFile(file: File): Promise<Recipe> {
  const text = await file.text();
  const recipe = JSON.parse(text) as Recipe;

  if (!verifyRecipeChecksum(recipe)) {
    throw new Error("Recipe checksum invalid - file may be corrupted");
  }

  return recipe;
}
```

#### 2. Git Repository

```bash
# Users can clone/fork recipe collections
git clone https://github.com/team/recipes.git
cd recipes/api
# Edit payload-cleanup.recipe.json
git commit -m "Update API cleanup to handle nested arrays"
git push

# Or open PR for community recipes
```

#### 3. Shared Links

```typescript
// Recipe shared via encrypted link
// Data: base64(compressed(encrypted(recipe)))
function generateShareLink(recipe: Recipe, password?: string): string {
  const toShare = password ? encryptRecipe(recipe, password) : recipe;

  const json = JSON.stringify(toShare);
  const compressed = zlib.gzipSync(json);
  const encoded = base64url.encode(compressed);

  return `https://webtoolseasy.com/recipes/import?data=${encoded}`;
}

// Receive recipe from link
function importFromLink(encodedData: string): Recipe {
  const compressed = base64url.toBuffer(encodedData);
  const json = zlib.gunzipSync(compressed).toString();
  return JSON.parse(json) as Recipe;
}
```

#### 4. Community Registry

```typescript
// Optional centralized registry
interface RecipeRegistry {
  id: string;
  name: string;
  description: string;
  category: string;
  author: string;
  sourceUrl: string; // Link to recipe file or git repo
  downloads: number;
  rating: number; // 1-5 stars
  lastUpdated: string;
}

// Users can browse registry
async function searchRecipes(query: string): Promise<RecipeRegistry[]> {
  const response = await fetch("/api/recipes/search", {
    method: "POST",
    body: JSON.stringify({ query }),
  });
  return response.json();
}
```

## Validation & Safety

```typescript
// Recipe validation schema
const recipeSchema = {
  type: "object",
  required: ["id", "name", "version", "type", "steps"],
  properties: {
    id: { type: "string", pattern: "^recipe-[a-z0-9-]+$" },
    name: { type: "string", minLength: 1, maxLength: 255 },
    version: { type: "string", pattern: "^\\d+\\.\\d+\\.\\d+$" },
    type: { enum: ["workflow_preset", "workflow_template", "tool_preset"] },
    steps: { type: "object" },
    metadata: {
      type: "object",
      required: ["checksum"],
      properties: {
        checksum: { type: "string", pattern: "^sha256:[a-f0-9]{64}$" },
        encrypted: { type: "boolean" },
      },
    },
  },
};

function validateRecipe(recipe: unknown): ValidationResult {
  const validation = ajv.compile(recipeSchema);
  const valid = validation(recipe);

  if (!valid) {
    return {
      isValid: false,
      errors: validation.errors?.map((e) => e.message) || [],
    };
  }

  // Additional checks
  if (!verifyRecipeChecksum(recipe as Recipe)) {
    return {
      isValid: false,
      errors: ["Recipe checksum verification failed"],
    };
  }

  return { isValid: true };
}
```

## Alternatives Considered

### 1. Binary Format (Protocol Buffers)

- Pros: Compact, fast
- Cons: Not human-editable, hard to version control, need special tools
- Rejected: Defeats purpose of sharing via git

### 2. YAML Format

- Pros: More readable than JSON
- Cons: Whitespace issues, not as widely supported as JSON
- Rejected: JSON is more universally compatible

### 3. Database Export

- Pros: Complete state capture
- Cons: Locked into platform format, large file size
- Rejected: Not portable enough

### 4. Recipe-as-Code (Python/JavaScript)

- Pros: Turing-complete, flexible
- Cons: Security risk (code execution), harder to validate
- Rejected: Too complex, security concerns

## Implementation Roadmap

**Phase 1**: Recipe export/import (basic JSON)
**Phase 2**: Checksum verification and validation
**Phase 3**: Encryption support
**Phase 4**: Git repository support
**Phase 5**: Community recipe registry

## References

- [ADR-002: Local-First Storage](./ADR-002-local-first-storage.md)
- [JSON Schema Specification](https://json-schema.org/)
- [OWASP Encryption Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)
- [Semantic Versioning](https://semver.org/)
