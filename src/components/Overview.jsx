
import React from 'react';
import { Section, Tile, TilesGrid } from './ui.jsx';

export default function Overview({ id, eyebrow, title, lead, data = [], columns = 'four' }) {
  return (
    <Section id={id} eyebrow={eyebrow} title={title} lead={lead}>
      <TilesGrid kind={columns}>
        {data.map((item, i) => (
          <Tile key={i} title={item.title} description={item.description} onClick={item.onClick}>
            {item.badge && <span className="badge sand" style={{ marginBottom: 8 }}>{item.badge}</span>}
          </Tile>
        ))}
      </TilesGrid>
    </Section>
  );
}
