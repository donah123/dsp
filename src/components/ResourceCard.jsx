import React, { useState } from 'react';
import LeadCaptureModal from './LeadCaptureModal';
import { trackInteraction } from '../utils/analytics';

export default function ResourceCard({ title, description, type = 'Playbook', icon = '📄' }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    trackInteraction('resource', 'click', title);
    setModalOpen(true);
  };

  return (
    <>
      <div className="card p-24 resource-card resource-card-animate" onClick={handleClick} role="button" tabIndex={0}>
        <div className="resource-icon">{icon}</div>
        <span className="badge sand" style={{ marginBottom: '0.5rem' }}>{type}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="resource-action">
          <span style={{ color: 'var(--orange)', fontWeight: 600 }}>Get Access →</span>
        </div>
      </div>
      
      <LeadCaptureModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        resourceName={title}
        resourceDescription={description}
      />
    </>
  );
}
