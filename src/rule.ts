import type MarkdownIt from 'markdown-it';

import type { ParsedBadge, PluginOptions, RuleFunction } from './types';

import {
  baseRendererName,
  defaultClassName,
  referenceIdentifier,
  referenceLabel,
  referenceSeparator,
  ruleEndsWith,
  ruleStartsWith,
} from './config';

/**
 * Parses badge content.
 * @param content Raw content of the badge.
 */
function parseBadgeContent(content: string): ParsedBadge {
  if (content.startsWith(referenceIdentifier)) {
    const referenceParams = content.replace(referenceIdentifier, '').split(referenceSeparator);
    return referenceParams.length > 1
      ? { label: referenceParams[0], url: referenceParams[1] }
      : { label: referenceLabel, url: referenceParams[0] };
  }

  return { label: content };
}

/**
 * Replaces and returns the badge with the adequate content.
 * @param content Content of the badge.
 * @param className Class name of the badge.
 */
function getBadgeContent(content: string, className: string) {
  const { url, label } = parseBadgeContent(content);
  const actualContent = url ? createLink(label, url) : label;
  return createBadge(actualContent, className);
}

/**
 * Creates a badge with specified class name and content.
 * @param label Label of the reference link.
 * @param url Target URL of the reference.
 */
function createLink(label: string, url: string) {
  return `<a href="${url}">${label}</a>`;
}

/**
 * Creates a badge with specified class name and label.
 * @param label Label of the badge.
 * @param className Class name of the badge.
 */
function createBadge(label: string, className?: PluginOptions['className']) {
  return className ? `<span class="${className}">${label}</span>` : label;
}

/**
 * Returns the inline-rule ready to be pushed into Markdown-it's inline ruler.
 * @param md MarkdownIt's parser class.
 * @param options Options of the plugin.
 */
export function createBadgeRule(md: MarkdownIt, options: PluginOptions) {
  const badgeRule: RuleFunction = (state, silent) => {
    if (silent || !state.src.slice(state.pos).startsWith(ruleStartsWith)) return false;

    // We start from the first character within the rule delimiters.
    const start = state.pos + ruleStartsWith.length;

    // Then we move right until the end delimiter.
    let end = start + 1;
    while (end < state.src.length && state.src.slice(end, end + 2) !== ruleEndsWith) end += 1;

    // Create a token for the inline rule
    const className = [defaultClassName, options?.className].filter(Boolean).join(' ');
    const token = state.push(baseRendererName, '', 0);
    const content = state.src.slice(start, end);
    token.content = getBadgeContent(content, className);

    // Move right after the end delimiter to get rid of it.
    state.pos = end + ruleEndsWith.length;
    return true;
  };

  return badgeRule;
}
