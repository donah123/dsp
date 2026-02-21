
import React from 'react';

export default function VideoEmbed({ id, title = 'YouTube video', start = 0 }) {
  const src = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&start=${start}`;
  return (
    <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--sand)' }}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
      />
    </div>
  );
}
