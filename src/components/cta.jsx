
import React from 'react';
import { Card } from './ui.jsx';

export function CTA({ title = 'Ready to accelerate your data outcomes?', sub = 'Book a discovery call and receive a tailored proposal within 2 business days.', onClick }) {
  return (
    <section className="cta"> 
      <div className="container"> 
        <Card className="cta-card"> 
          <div> 
            <div className="cta-title">{title}</div> 
            <div className="cta-sub">{sub}</div> 
          </div> 
          <a className="btn btn-orange" onClick={onClick || (() => (window.location.hash = '#request'))}> 
            Request our services 
          </a> 
        </Card> 
      </div> 
    </section>
  );
}
