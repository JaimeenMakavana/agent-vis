# Color Variable Migration for Memory, Observability, and Orchestration Routes

## Overview
Replace all static colors, dynamic colors, and light theme variables (`--light-*`) with dark theme CSS variables from `globals.css` (lines 4-16) across all routes in memory, observability, and orchestration sections. This follows the same pattern applied to `chain-of-thought`, `async-timeline`, and `tree-of-thoughts`.

## Files to Update

### Memory Section

#### 1. `src/app/memory/knowledge-graph/page.tsx`
- Replace all `--light-*` variables with dark theme equivalents
- Replace hardcoded colors (`bg-white`, `border-neutral-200`, `text-neutral-500`, etc.) with CSS variables
- Update ReactFlow Controls, MiniMap, and Panel colors
- Update node component colors

#### 2. `src/app/memory/vector-space/page.tsx`
- Replace all `--light-*` variables with dark theme equivalents
- Replace hardcoded colors with CSS variables
- Update D3 visualization colors (stroke, fill, text)
- Update UI element colors (buttons, panels, text)

#### 3. `src/app/memory/context-window/page.tsx`
- Replace all `--light-*` variables with dark theme equivalents
- Replace hardcoded colors with CSS variables
- Update visualization colors
- Update UI element colors

### Orchestration Section

#### 4. `src/app/orchestration/swarm-network/page.tsx`
- Replace all `--light-*` variables with dark theme equivalents
- Replace hardcoded colors (`bg-white`, `border-neutral-200`, `bg-neutral-50`, etc.) with CSS variables
- Update ReactFlow Controls, MiniMap, and Panel colors
- Update node component colors (AgentNodeData)
- Update AGENT_TYPE_CONFIG colors if using hardcoded values

#### 5. `src/app/orchestration/conversation-sequence/page.tsx`
- Replace all `--light-*` variables with dark theme equivalents
- Replace hardcoded colors with CSS variables
- Update visualization colors
- Update UI element colors

#### 6. `src/app/orchestration/swimlanes/page.tsx`
- Replace all `--light-*` variables with dark theme equivalents
- Replace hardcoded colors with CSS variables
- Update visualization colors
- Update UI element colors

### Observability Section

#### 7. `src/app/observability/latency-waterfall/page.tsx`
- Replace all `--light-*` variables with dark theme equivalents
- Replace hardcoded colors with CSS variables
- Update waterfall chart colors
- Update UI element colors

#### 8. `src/app/observability/risk-heatmap/page.tsx`
- Replace all `--light-*` variables with dark theme equivalents
- Replace hardcoded colors with CSS variables
- Update heatmap colors
- Update UI element colors

#### 9. `src/app/observability/token-burndown/page.tsx`
- Replace all `--light-*` variables with dark theme equivalents
- Replace hardcoded colors with CSS variables
- Update chart colors
- Update UI element colors

## Color Variable Mappings

### Background Colors
- `bg-white` → `bg-[var(--background)]`
- `bg-neutral-50` → `bg-[var(--brand-surface-soft)]`
- `bg-neutral-100` → `bg-[var(--brand-surface-soft)]`
- `bg-[var(--light-background)]` → `bg-[var(--background)]`
- `bg-[var(--light-surface-soft)]` → `bg-[var(--brand-surface-soft)]`

### Border Colors
- `border-neutral-200` → `border-[var(--brand-border-subtle)]`
- `border-neutral-300` → `border-[var(--brand-border-subtle)]`
- `border-[var(--light-border-subtle)]` → `border-[var(--brand-border-subtle)]`

### Text Colors
- `text-neutral-400` → `text-[var(--brand-muted)]`
- `text-neutral-500` → `text-[var(--brand-muted)]`
- `text-neutral-600` → `text-[var(--brand-muted)]`
- `text-neutral-700` → `text-[var(--foreground)]`
- `text-neutral-900` → `text-[var(--foreground)]`
- `text-black` → `text-[var(--foreground)]`
- `text-[var(--light-text-primary)]` → `text-[var(--foreground)]`
- `text-[var(--light-text-secondary)]` → `text-[var(--brand-muted)]`
- `text-[var(--light-text-tertiary)]` → `text-[var(--brand-muted)]`

### Light Theme Variable Replacements
- `--light-background` → `--background`
- `--light-surface-soft` → `--brand-surface-soft`
- `--light-border-subtle` → `--brand-border-subtle`
- `--light-text-primary` → `--foreground`
- `--light-text-secondary` → `--brand-muted`
- `--light-text-tertiary` → `--brand-muted`
- `--light-neutral-50` → `--brand-surface-soft`
- `--light-neutral-100` → `--brand-surface-soft`
- `--light-neutral-600` → `--brand-muted`
- `--light-neutral-700` → `--foreground`
- `--light-neutral-900` → `--brand-surface`

### Special Cases
- For status/state colors (like explored, pruned, optimal), check if they should use `--status-*` variables or `--brand-blue` equivalents
- For accent colors, use `--brand-blue` or `--brand-blue-soft`
- For grid lines, use `--brand-grid-line`

## Implementation Pattern

For each file:
1. Search for all instances of `--light-*` variables and replace with dark theme equivalents
2. Search for hardcoded Tailwind colors (`bg-white`, `border-neutral-*`, `text-neutral-*`) and replace with CSS variables
3. Update inline styles that use color values
4. Update D3/ReactFlow color configurations
5. Ensure all dynamic color assignments use CSS variables

## Notes

- Follow the exact same pattern used in `chain-of-thought/page.tsx`, `async-timeline/page.tsx`, and `tree-of-thoughts/page.tsx`
- Maintain consistency across all routes
- All colors should reference CSS variables from `globals.css` lines 4-16
- Check for any color values in JavaScript/TypeScript code (like D3 color maps, ReactFlow node colors, etc.)

