
import React from 'react';

export default function MarkdownBlock({ text = '' }) {
  const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const rules = [
    { regex: /\*\*(.+?)\*\*/g, repl: '<strong>$1</strong>' },
    { regex: /\*(.+?)\*/g, repl: '<em>$1</em>' },
    { regex: /\[(.+?)\]\((.+?)\)/g, repl: '<a href="$2" target="_blank" rel="noopener">$1</a>' },
    { regex: /\n/g, repl: '<br/>' },
  ];
  let html = escape(text);
  for (const r of rules) html = html.replace(r.regex, r.repl);
  return <div className="lead" dangerouslySetInnerHTML={{ __html: html }} />;
}
