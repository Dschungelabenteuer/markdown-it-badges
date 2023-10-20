import type BaseStateInline from 'markdown-it/lib/rules_inline/state_inline';

/** Rule function's signature. */
export type RuleFunction = (state: BaseStateInline, silent: boolean) => void;

/** Options of the plugin. */
export type PluginOptions = {
  /** Base class name for badges. */
  className?: string;
};

/** HTML Tag definition. */
export type HTMLTagDefinition = {
  tagName: keyof HTMLElementTagNameMap;
  content: string;
  attributes?: Record<string, any>;
};

/** Structure of a parsed badge. */
export type ParsedBadge = {
  className?: string;
  label: string;
  url?: string;
};
