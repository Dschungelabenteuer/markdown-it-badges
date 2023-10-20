/** Base plugin name. */
export const basePluginName = 'markdown-it-badges';

/** Base rule name to avoid collision. */
export const baseRuleName = 'badges_rule';

/** Base renderer name to avoid collision. */
export const baseRendererName = 'badgesRenderer';

/** Inline markdown pattern which triggers the plugin logic. */
export const rulePattern = /#\{([^}]*)}/g;

/** Start delimiter of a badge. */
export const ruleStartsWith = '[[';

/** End delimiter of a badge. */
export const ruleEndsWith = ']]';

/** Identifier for reference badges. */
export const referenceIdentifier = 'ref:';

/** Delimiter for custom classes. */
export const classNameDelimiter = '~~';

/** Pattern for custom classes. */
export const classNamePattern = /~~(.*)~~/g;

/** Default reference label. */
export const referenceLabel = 'reference';

/** Separator used to split reference URL and its label. */
export const referenceSeparator = '|';

/** Default className of badges. */
export const defaultClassName = 'md-badge';
