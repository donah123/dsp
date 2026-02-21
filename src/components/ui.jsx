
import React from 'react';

export function Section({ id, eyebrow, title, lead, children }) {
  return (
    <section id={id} className={eyebrow || title ? 'section section-animate section-visible' : ''}>
      <div className="container">
        {eyebrow && <span className="badge sand section-header-badge">{eyebrow}</span>}
        {title && <h2 className="section-header-title" style={{ marginTop: eyebrow ? '0.75rem' : 0 }}>{title}</h2>}
        {lead && <p className="lead section-header-lead">{lead}</p>}
        <div style={{ marginTop: '1rem' }}>{children}</div>
      </div>
    </section>
  );
}

export function Card({ children, className = '' }) {
  return <div className={`card p-24 ${className}`.trim()}>{children}</div>;
}

export function Tile({ title, description, onClick, href, children }) {
  const content = (
    <div className="card p-24" role="button" tabIndex={0} onClick={onClick}>
      {children}
      {title && <h3>{title}</h3>}
      {description && <p className="lead" style={{ opacity: 0.9 }}>{description}</p>}
    </div>
  );
  return href ? (
    <a onClick={(e) => { e.preventDefault(); href && href(); }}>{content}</a>
  ) : content;
}

export function TilesGrid({ columns = 'auto', children, kind = 'four' }) {
  const gridClass = kind === 'three' ? 'cards three' : 'cards four';
  return <div className={gridClass}>{children}</div>;
}
