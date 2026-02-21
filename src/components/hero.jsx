
import React from 'react';
import { Card } from './ui.jsx';

export function Hero({ eyebrow = 'Enterprise Data • Cloud • AI', title = 'Data Solutions Platform', lead, onPrimary, onSecondary }) {
  return (
    <section className="hero gradient"> 
      <div className="container grid-2"> 
        <div> 
          <span className="badge sand">{eyebrow}</span> 
          <h1 style={{ color: '#fff', marginTop: '0.75rem' }}>{title}</h1> 
          {lead && <p style={{ color: 'rgba(255,255,255,.95)' }}>{lead}</p>} 
          <div className="actions"> 
            <a className="btn btn-orange" onClick={onPrimary || (() => (window.location.hash = '#request'))}>Request our services</a> 
            <button className="btn btn-ghost" onClick={onSecondary || (() => document.getElementById('consultancy-overview')?.scrollIntoView({ behavior: 'smooth' }))}>Explore offerings</button> 
          </div> 
        </div> 
        <div> 
          <Card> 
            <div className="label">What we deliver</div> 
            <ul className="bullets"> 
              <li>Cloud‑native data platforms (Azure‑first) with governance baked in</li> 
              <li>BI: KPI frameworks, dashboards, data storytelling</li> 
              <li>Migrations & modernization with minimal downtime</li> 
              <li>Training programs—from workshops to enterprise bootcamps</li> 
            </ul> 
            <div className="stats"> 
              <div className="stat"> 
                <div className="stat-k">≤ 90 days</div> 
                <div className="stat-l">Avg. Time-to-Value</div> 
              </div> 
              <div className="stat"> 
                <div className="stat-k">75+</div> 
                <div className="stat-l">Training NPS</div> 
              </div> 
            </div> 
          </Card> 
        </div> 
      </div> 
    </section>
  );
}
