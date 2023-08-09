import { describe, it, expect } from 'vitest';
import { render, htmlBlocks, mdWrappers, exampleClass } from './utils';
import { defaultClassName, referenceLabel } from '../src/config';

const { p, h2, h3, pre, code } = htmlBlocks;
const withClassNameString = '(with className)';
type TheyParams = { src: string; expected: string };

const they = (statement: string, { src, expected }: TheyParams) => {
  const run = (className?: string) => {
    const finalClassName = className ? `${defaultClassName} ${className}` : defaultClassName;
    const replace = `<span class="${finalClassName}">$1</span>`;
    const actuallyExpected = expected.replace(/<#>(.*?)<\/#>/g, replace);
    expect(render({ className }, src)).toStrictEqual(`${actuallyExpected}\n`);
  };

  it(statement, () => {
    run();
  });

  it(`${statement} ${withClassNameString}`, () => {
    run(exampleClass);
  });
};

describe('Rule', () => {
  describe('base behaviour', () => {
    const baseInput = '### isEntry [[default]] and [[recommended]] :)';

    they('should replace simple badges', {
      src: baseInput,
      expected: h3('isEntry <#>default</#> and <#>recommended</#> :)'),
    });

    they('should replace reference badges with custom label', {
      src: '## isEntry [[ref:custom|https://github.com]]',
      expected: h2('isEntry <#><a href="https://github.com">custom</a></#>'),
    });

    they('should replace reference badges with default label', {
      src: '## isEntry [[ref:https://github.com]]',
      expected: h2(`isEntry <#><a href="https://github.com">${referenceLabel}</a></#>`),
    });

    it('should not transform when used withing inline code', () => {
      const src = baseInput;
      const expected = `${p(code(src))}\n`;
      const input = mdWrappers.codeInline(src);
      expect(render({}, input)).toStrictEqual(expected);
    });

    it('should not transform when used withing code blocks', () => {
      const src = baseInput;
      const language = 'bash';
      const expected = pre(code(src, language));
      const input = mdWrappers.codeBlock(src, language);
      expect(render({}, input)).toStrictEqual(expected);
    });
  });
});
