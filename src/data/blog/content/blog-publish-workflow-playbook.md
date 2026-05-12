# Blog Publish Workflow Playbook

This playbook standardizes blog publishing so content quality and SEO metadata stay consistent.

## Workflow Steps

1. Normalize markdown structure.
2. Draft title and meta description.
3. Prepare social image variants.
4. Export schema helper and metadata outputs.

## Why This Workflow Repeats Well

- Reduces editorial drift across posts.
- Speeds up review by generating a single output package.
- Keeps drafting and transformations local-first.

## Suggested Preset

- Preset name: `Blog Publish Starter`
- Enforce heading and spacing normalization
- Export package includes `post.md`, `meta.json`, and `schema.json`

## Next Links

- Run the workflow: /workflows/blog-publish
- Clone starter template: /templates/blog-publish
