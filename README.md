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

You can then reference add simple badges (e.g. `[[some badge]]`) and reference badges (e.g.)
`[[ref:label|some URL]]`

### Options

#### `className?: string` (defaults to `undefined`)

When defined all badges will have the specified class along with the default `md-badge` one.

---

## Example

Input:

```md
## Options [[ref:reference|https://github.com]]

Some [[item]]…

### isEntry [[default]] [[recommended]]

Some other content…
```

Output:

```md
<h2>Options <span class="md-badge"><a href="https://github.com">reference</a></span></h2>

Some <span class="md-badge">item</span>…

<h3>isEntry <span class="md-badge">default</span> <span class="md-badge">recommended</span></h3>

Some other content…
```
