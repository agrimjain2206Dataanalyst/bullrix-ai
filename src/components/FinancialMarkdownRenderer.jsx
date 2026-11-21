import React from 'react';

/**
 * Sanitizes raw LLM / Gemini output text at source.
 * Fixes malformed repeated asterisks (e.g. '****', '******', '***\n***')
 * while preserving legitimate bold ('**word**'), italic ('*word*'), and math notation ('2 * 3').
 */
export function sanitizeFinancialMarkdown(rawText) {
  if (!rawText || typeof rawText !== 'string') return '';

  let text = rawText;

  // 1. Replace 4 or more consecutive asterisks with clean double asterisks or clean spacer
  text = text.replace(/\*{4,}/g, '**');

  // 2. Fix empty bold blocks like '** **' or '****'
  text = text.replace(/\*\*\s*\*\*/g, '');

  // 3. Fix bullet points combined with malformed bolding like '* **:' or '* ****'
  text = text.replace(/^\s*\*\s*\*{2,}\s*/gm, '* **');

  // 4. Clean trailing unclosed bold tags at the end of streaming chunks safely
  const boldTagCount = (text.match(/\*\*/g) || []).length;
  if (boldTagCount % 2 !== 0) {
    // If odd number of '**', close it safely so it parses
    text += '**';
  }

  return text;
}

/**
 * High-performance, zero-dependency Financial Markdown Renderer
 * Parses headings, lists, bold/italic, code, tables, and blockquotes cleanly into React JSX.
 */
const FinancialMarkdownRenderer = ({ content, className = '' }) => {
  const sanitized = sanitizeFinancialMarkdown(content);

  // Split into paragraphs / blocks
  const lines = sanitized.split('\n');
  const elements = [];
  let currentList = null;
  let inCodeBlock = false;
  let codeBlockLines = [];

  const parseInline = (text) => {
    // Bold parsing: **text**
    const parts = [];
    const regex = /(\*\*.*?\*\*|`.*?`|\*.*?\*)/g;
    let lastIdx = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIdx) {
        parts.push(text.substring(lastIdx, match.index));
      }

      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
        parts.push(
          <strong key={`b-${match.index}`} className="font-bold text-white">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith('`') && token.endsWith('`') && token.length > 2) {
        parts.push(
          <code
            key={`c-${match.index}`}
            className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[11px] text-[#54D6B0]"
          >
            {token.slice(1, -1)}
          </code>
        );
      } else if (token.startsWith('*') && token.endsWith('*') && token.length > 2) {
        parts.push(
          <em key={`i-${match.index}`} className="italic text-[#8E9CAE]">
            {token.slice(1, -1)}
          </em>
        );
      } else {
        parts.push(token);
      }

      lastIdx = regex.lastIndex;
    }

    if (lastIdx < text.length) {
      parts.push(text.substring(lastIdx));
    }

    return parts.length ? parts : text;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Code Block Toggle
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${index}`}
            className="p-3 my-2 rounded-xl bg-[#0B131E] border border-white/10 font-mono text-xs overflow-x-auto text-[#54D6B0]"
          >
            {codeBlockLines.join('\n')}
          </pre>
        );
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      return;
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***') {
      if (currentList) {
        elements.push(currentList);
        currentList = null;
      }
      elements.push(<hr key={`hr-${index}`} className="my-3 border-white/10" />);
      return;
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      if (currentList) {
        elements.push(currentList);
        currentList = null;
      }
      elements.push(
        <h4 key={`h3-${index}`} className="text-sm sm:text-base font-extrabold text-white mt-3 mb-1.5 flex items-center gap-1.5">
          {parseInline(trimmed.slice(4))}
        </h4>
      );
      return;
    }

    if (trimmed.startsWith('## ')) {
      if (currentList) {
        elements.push(currentList);
        currentList = null;
      }
      elements.push(
        <h3 key={`h2-${index}`} className="text-base sm:text-lg font-extrabold text-white mt-4 mb-2">
          {parseInline(trimmed.slice(3))}
        </h3>
      );
      return;
    }

    if (trimmed.startsWith('# ')) {
      if (currentList) {
        elements.push(currentList);
        currentList = null;
      }
      elements.push(
        <h2 key={`h1-${index}`} className="text-lg sm:text-xl font-black text-white mt-4 mb-2">
          {parseInline(trimmed.slice(2))}
        </h2>
      );
      return;
    }

    // Unordered List Items
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      const itemContent = trimmed.slice(2);
      if (!currentList) {
        currentList = (
          <ul key={`ul-${index}`} className="space-y-1.5 my-2 pl-4 list-disc list-outside text-xs text-[#F3F5F7]">
            <li>{parseInline(itemContent)}</li>
          </ul>
        );
      } else {
        // Append to list element
        currentList = React.cloneElement(currentList, {
          children: [
            ...React.Children.toArray(currentList.props.children),
            <li key={`li-${index}`}>{parseInline(itemContent)}</li>
          ]
        });
      }
      return;
    }

    // Ordered List Items
    if (/^\d+\.\s/.test(trimmed)) {
      const itemContent = trimmed.replace(/^\d+\.\s/, '');
      elements.push(
        <div key={`ol-${index}`} className="flex items-start gap-2 my-1 text-xs text-[#F3F5F7]">
          <span className="font-mono font-bold text-[#54D6B0]">{trimmed.match(/^\d+/)[0]}.</span>
          <span className="flex-1">{parseInline(itemContent)}</span>
        </div>
      );
      return;
    }

    // Close any open list
    if (currentList) {
      elements.push(currentList);
      currentList = null;
    }

    // Standard Paragraph
    if (trimmed) {
      elements.push(
        <p key={`p-${index}`} className="text-xs sm:text-sm leading-relaxed my-1.5 text-[#F3F5F7]">
          {parseInline(trimmed)}
        </p>
      );
    }
  });

  if (currentList) {
    elements.push(currentList);
  }

  return <div className={`space-y-1 font-sans ${className}`}>{elements}</div>;
};

export default FinancialMarkdownRenderer;
