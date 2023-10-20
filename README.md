# markdown-it-badges

An easy way of adding badges to your markdown content.

## Install

```bash
# Using npm
npm i markdown-it-badges
# Using Yarn
yarn add markdown-it-badges
# Using pnpm
pnpm add markdown-it-badges
```

## Usage

```ts
import mardownIt from 'markdown-it';
import { badgesPlugin } from 'markdown-it-badges';

const md = mardownIt().use(badgesPlugin);
```

### Simple badges

- Simple badges are simply defined by wrapping their content with `[[` and `]]`.
- You may specify a custom class by wrapping the class name between double tilde `~~`.
- If the double tilde wraps the whole badge content, then its content will be used as the class
  name.

```md
- [[default]]
- [[~~custom-class~~default]]
- [[~~recommended~~]]
```

### Reference badges

- Reference badges work the same way as simple badges, but they include a link.
- Just like simple badges, their content is delimited by `[[` and `]]`.
- Inside thoese delimiters, you must use the `ref` keyword, followed by a pipe `|` and the link.
- By default, the badge content will display "reference".
- A custom label can be set by adding a `:` after the `ref` keyword, followed by the label.

```md
- [[ref|https://example.com]]
- [[ref:Lean more|https://example.com]]
- [[~~custom-class~~ref|https://example.com]]
- [[~~custom-class~~ref:Lean more|https://example.com]]
```

### Options

#### `className?: string` (defaults to `undefined`)

When defined all badges will have the specified class along with the default `md-badge` one.

---

## Example

Input:

```md
## Options [[ref:reference|https://github.com]]

Some [[~~customClass~~item]]…

### isEntry [[default]] [[~~recommended~~]]

Some other content…
```

Output:

```md
<h2>Options <span class="md-badge"><a href="https://github.com">reference</a></span></h2>

Some <span class="md-badge customClass">item</span>…

<h3>isEntry <span class="md-badge">default</span> <span class="md-badge recommended">recommended</span></h3>

Some other content…
```
