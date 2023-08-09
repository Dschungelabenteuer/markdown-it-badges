import mardownIt from 'markdown-it';

import type { PluginOptions } from '../src/types';
import { badgesPlugin } from '../src';
import { createHtmlTag } from '../src/utils';

export const exampleClass = 'sampleclass';

/**
 * Sets up the plugin with test options and render the given input.
 * @param options Plugin options.
 * @param input Source input to render (and therefore apply the rule to).
 */
export function render(options: PluginOptions, input: string) {
  const md = mardownIt().use(badgesPlugin, options);
  return md.render(input);
}

export const htmlBlocks = {
  p: (content: string) => `${createHtmlTag({ content, tagName: 'p' })}`,
  h2: (content: string) => `${createHtmlTag({ content, tagName: 'h2' })}`,
  h3: (content: string) => `${createHtmlTag({ content, tagName: 'h3' })}`,
  pre: (content: string) => `${createHtmlTag({ content, tagName: 'pre' })}\n`,
  code: (content: string, language?: string) =>
    language ? `<code class="language-${language}">${content}\n</code>` : `<code>${content}</code>`,
};

export const mdWrappers = {
  codeInline: (content: string) => `\`${content}\``,
  codeBlock: (content: string, language: string) => `\`\`\`${language}\n${content}\n\`\`\``,
};
