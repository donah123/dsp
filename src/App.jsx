import React, { useEffect, useMemo, useState } from 'react'
import logoImage from './assets/logo.jpeg';
import slider2 from './assets/slider2.jpg';
import slide1 from './assets/slider1.jpg'; /* if you plan to keep previous sample */

// static stats display for hero
function StatSlider(){
  const stats=[
    {value:'50+',label:'Projects Delivered'},
    {value:'10+',label:'Consultants'},
    {value:'98%',label:'Client Satisfaction'}
  ];
  return (
    <div style={{ display:'flex', justifyContent:'center', gap:'2.5rem', flexWrap:'wrap' }}>
      {stats.map((s,idx)=>(
        <div key={idx} className="hero-animate-stat" style={{ textAlign:'center' }}>
          <div style={{ fontSize:'2rem', fontWeight:'800', color:'#fff' }}>{s.value}</div>
          <div style={{ fontSize:'.85rem', color:'rgba(255,255,255,.7)', textTransform:'uppercase', letterSpacing:'.05em' }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
import { Section as XSection, Card as XCard, TilesGrid } from './components/ui.jsx'
import Overview from './components/Overview.jsx'
import VideoEmbed from './components/VideoEmbed.jsx'
import MarkdownBlock from './components/MarkdownBlock.jsx'
import { CTA } from './components/cta.jsx'
import { Hero } from './components/hero.jsx'
import CookieConsent from './components/CookieConsent.jsx'
import ResourceCard from './components/ResourceCard.jsx'
import { 
  trackPageView, 
  trackInteraction, 
  trackServiceInterest, 
  trackTrainingInterest,
  trackVideoPlay,
  trackCTAClick,
  trackFormSubmission,
  initVisitorTracking
} from './utils/analytics.js'
import { sendServiceRequest, sendContactForm, sendLoginInquiry } from './utils/emailService.js'

// --- Navbar
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  useEffect(()=>{ const h=(e)=>{ if(!e.target.closest('.has-dropdown')) setOpenMenu(null) }; window.addEventListener('click',h); return()=>window.removeEventListener('click',h)},[])
  const navTo = (hash) => { window.location.hash = hash; setMobileOpen(false); setOpenMenu(null) }
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <div className="brand" onClick={()=>navTo('#home')} style={{cursor:'pointer'}}>
          <div className="logo">
            <img src={logoImage} alt="DSP logo" style={{width:'100%',height:'100%',borderRadius:'12px',objectFit:'contain'}} />
          </div>
          <span className="brand-name">Data Solutions Platform</span>
        </div>
        <nav className="nav" aria-label="Main">
          <button className="hamburger" aria-label="Open menu" aria-expanded={mobileOpen} onClick={()=>setMobileOpen(o=>!o)}>☰</button>
          <ul className={"nav-list" + (mobileOpen ? ' show' : '')}>
            <li><a onClick={()=>navTo('#about')}>About DSP</a></li>
            <li className="has-dropdown">
              <button className="drop-btn" aria-haspopup="menu" aria-expanded={openMenu==='consultancy'} onClick={()=>setOpenMenu(openMenu==='consultancy'?null:'consultancy')}>Consultancy ▾</button>
              <div className="dropdown" role="menu" style={{display: openMenu==='consultancy' ? 'block' : ''}}>
                <a onClick={()=>navTo('#consultancy&strategy')}>Data Strategy</a>
                <a onClick={()=>navTo('#consultancy&analytics')}>Analytics & BI</a>
                <a onClick={()=>navTo('#consultancy&cloud')}>Cloud & DevOps</a>
                <a onClick={()=>navTo('#consultancy&migrations')}>Migrations</a>
              </div>
            </li>
            <li className="has-dropdown">
              <button className="drop-btn" aria-haspopup="menu" aria-expanded={openMenu==='training'} onClick={()=>setOpenMenu(openMenu==='training'?null:'training')}>Training ▾</button>
              <div className="dropdown" role="menu" style={{display: openMenu==='training' ? 'block' : ''}}>
                <a onClick={()=>navTo('#training&workshops')}>Workshops</a>
                <a onClick={()=>navTo('#training&bootcamps')}>Bootcamps</a>
                <a onClick={()=>navTo('#training&certs')}>Cert Prep</a>
                <a onClick={()=>navTo('#training&custom')}>Custom Programs</a>
              </div>
            </li>
            <li><a onClick={()=>navTo('#request')}>Request our services</a></li>
            <li><a onClick={()=>navTo('#tech')}>Technology Stack</a></li>
            <li><a onClick={()=>navTo('#contact')}>Contact us</a></li>
            {/* login removed temporarily */}
          </ul>
        </nav>
      </div>
    </header>
  )
}

// --- Footer
function Footer(){
  const navTo = (hash)=>window.location.hash=hash
  return (
    <footer className="site-footer">
      <div className="container foot-wrap">
        <div className="brand-mini" onClick={()=>navTo('#home')} style={{cursor:'pointer'}}>
          <div className="logo small">
            {/* use the same jpeg imported at top for consistency */}
            <img src={logoImage} alt="DSP logo" style={{width:'100%',height:'100%',borderRadius:'inherit',objectFit:'contain'}} />
          </div>
          <span>Data Solutions Platform</span>
        </div>
        <div className="links">
          <a onClick={()=>navTo('#about')}>About DSP</a>
          <a onClick={()=>navTo('#consultancy')}>Consultancy</a>
          <a onClick={()=>navTo('#training')}>Training</a>
          <a onClick={()=>navTo('#tech')}>Technology Stack</a>
          <a onClick={()=>navTo('#contact')}>Contact us</a>
        </div>
        <small>© {new Date().getFullYear()} Data Solutions Platform. All rights reserved.</small>
      </div>
    </footer>
  )
}

// --- Hash router
function useSectionRouter(){
  const parse = () => { const raw = window.location.hash || '#home'; const clean = raw.replace('#',''); const [route, anchor] = clean.split('&'); return {route:route||'home', anchor} }
  const [state, setState] = useState(parse())
  useEffect(()=>{ const onHash=()=>setState(parse()); window.addEventListener('hashchange', onHash); return ()=>window.removeEventListener('hashchange', onHash)},[])
  useEffect(()=>{ 
    // Track page view
    trackPageView(state.route);
    trackInteraction('page_view', 'view', state.route);
    
    if(state.anchor){ 
      setTimeout(()=>{ 
        const el=document.getElementById(state.anchor); 
        if(el) {
          el.scrollIntoView({behavior:'smooth',block:'start'});
          trackInteraction('section_view', 'scroll', state.anchor);
        }
      },50) 
    } else { 
      window.scrollTo({top:0,behavior:'instant'}) 
    } 
  },[state.route,state.anchor])
  return state
}

// --- Existing content blocks kept intact (Home helpers)
function HomeTop(){
  const handlePrimaryClick = () => {
    trackCTAClick('hero_request_services');
    window.location.hash='#request';
  };
  const handleSecondaryClick = () => {
    trackCTAClick('hero_explore_offerings');
    document.getElementById('consultancy-overview')?.scrollIntoView({behavior:'smooth'});
  };

  // add additional slides below; background may be an imported asset path
  const slides = useMemo(()=>[
    {
      // first slide mirrors old hero content and includes card
      badge:'🚀 Enterprise Data • Cloud • AI',
      title:'Transform Your Data Into Strategic Advantage',
      text:'Partner with DSP to design modern data platforms, unlock powerful analytics, and upskill teams with world-class training programs.',
      primary:{label:'Get Started',onClick:handlePrimaryClick},
      secondary:{label:'Explore Solutions',onClick:handleSecondaryClick},
      card:(
        <div className="hero-animate-card hero-float" style={{ minHeight: '400px' }}>
          <div className="card p-24" style={{ background: 'rgba(255,255,255,.95)', backdropFilter: 'blur(10px)', height: '100%' }}>
            <div className="label hero-card-label" style={{ color: 'var(--primary)', marginBottom: '1rem' }}>💼 What We Deliver</div>
            <ul className="bullets" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
              <li className="hero-card-item" style={{ marginBottom: '.85rem', fontSize: '.95rem', lineHeight: '1.6' }}>
                <strong>Cloud-native platforms</strong> with Azure-first architecture and built-in governance
              </li>
              <li className="hero-card-item" style={{ marginBottom: '.85rem', fontSize: '.95rem', lineHeight: '1.6' }}>
                <strong>Business intelligence</strong> frameworks: KPIs, dashboards, and data storytelling
              </li>
              <li className="hero-card-item" style={{ marginBottom: '.85rem', fontSize: '.95rem', lineHeight: '1.6' }}>
                <strong>Seamless migrations</strong> with minimal downtime and managed risk
              </li>
              <li className="hero-card-item" style={{ marginBottom: '.85rem', fontSize: '.95rem', lineHeight: '1.6' }}>
                <strong>Training excellence</strong> from focused workshops to enterprise bootcamps
              </li>
            </ul>
            <div className="stats">
              <div className="stat hero-card-stat">
                <div className="stat-k">≤ 90 days</div>
                <div className="stat-l">Average Time to Value</div>
              </div>
              <div className="stat hero-card-stat">
                <div className="stat-k">85+ NPS</div>
                <div className="stat-l">Training Excellence</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // second slide uses the new image you added
    {
      background:slider2,
      title:'Build with Confidence',
      text:'Our Azure-certified engineers deliver scalable solutions on time and under budget.',
      primary:{label:'Learn More',onClick:()=>window.location.hash='#consultancy'}
    },
    // another sample slide (you can remove or replace this)
    {
      background:slide1,
      title:'Enterprise Data Solutions',
      text:'Scale with secure, compliant platforms built for modern analytics.',
      primary:{label:'Get Started',onClick:handlePrimaryClick}
    }
    // more slides can be added here
  ],[]);

  const [idx,setIdx]=useState(0);
  const [animClass,setAnimClass]=useState('');
  // automatic cycling re-enabled
  useEffect(()=>{
    if(slides.length>1){
      const id=setInterval(()=>setIdx(i=>(i+1)%slides.length),5000); // 30 seconds per slide
      return()=>clearInterval(id);
    }
  },[slides.length]);
  const prev = ()=>setIdx(i=>(i-1+slides.length)%slides.length);
  const next = ()=>setIdx(i=>(i+1)%slides.length);

  const slide = slides[idx];
  const slideStyle = slide.background
    ? { backgroundImage:`url(${slide.background})`,backgroundSize:'cover',backgroundPosition:'center',minHeight:'100vh' }
    : {};

  // apply slide-in animation whenever idx changes
  useEffect(()=>{
    setAnimClass('slide-in');
    const t=setTimeout(()=>setAnimClass(''),5000);
    return()=>clearTimeout(t);
  },[idx]);

  return (
    <section id="home" data-idx={idx} className={"hero" + (slide.background?'':' gradient') + (animClass?` ${animClass}`:'')} style={slideStyle}>
      <div className="container grid-2">
        <div>
          {slide.badge && <span className="badge sand hero-animate-badge">{slide.badge}</span>}
          {slide.title && (
            <h1 className="hero-animate-title" style={{ color: '#fff', marginTop: '1rem', lineHeight: '1.2' }}>
              {slide.title}
            </h1>
          )}
          {slide.text && (
            <p className="hero-animate-text" style={{ color: 'rgba(255,255,255,.85)', fontSize: '1.15rem', lineHeight: '1.7', marginTop: '1.5rem' }}>
              {slide.text}
            </p>
          )}
          {(slide.primary || slide.secondary) && (
            <div className="actions hero-animate-buttons" style={{ marginTop: '2rem' }}>
              {slide.primary && (
                <a className="btn btn-orange hero-pulse" onClick={slide.primary.onClick}>
                  <span style={{ fontSize: '1.1rem' }}>{slide.primary.label}</span>
                </a>
              )}
              {slide.secondary && (
                <button className="btn btn-ghost hero-glow" onClick={slide.secondary.onClick}>
                  <span>{slide.secondary.label}</span>
                  <span style={{ fontSize: '1.2rem' }}>→</span>
                </button>
              )}
            </div>
          )}
          {idx===0 && (
            <div style={{ marginTop: '3rem' }}>
              <StatSlider />
            </div>
          )}
          <div style={{position:'absolute',bottom:'1.5rem',left:'50%',transform:'translateX(-50%)',display:'flex',gap:'1rem'}}>
            {slides.map((_,i)=>(
              <button key={i} onClick={()=>setIdx(i)} style={{width:'10px',height:'10px',borderRadius:'50%',border:'none',background:i===idx?'#fff':'rgba(255,255,255,.4)',cursor:'pointer'}} />
            ))}
          </div>
        </div>
        {slide.card && slide.card}
        {/* arrows */}
        <button onClick={prev} style={{position:'absolute',top:'50%',left:'1rem',transform:'translateY(-50%)',background:'rgba(0,0,0,.3)',border:'none',color:'#fff',padding:'0.5rem 1rem',cursor:'pointer',borderRadius:'8px'}}>‹</button>
        <button onClick={next} style={{position:'absolute',top:'50%',right:'1rem',transform:'translateY(-50%)',background:'rgba(0,0,0,.3)',border:'none',color:'#fff',padding:'0.5rem 1rem',cursor:'pointer',borderRadius:'8px'}}>›</button>
      </div>
    </section>
  )
}

function ConsultancyOverview(){
  const handleExploreClick = () => {
    trackCTAClick('consultancy_explore');
    window.location.hash='#consultancy';
  };
  
  return (
    <section className="section section-animate section-visible" id="consultancy-overview" style={{  background: 'white', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge sand section-header-badge">🎯 Consultancy Services</span>
          <h2 className="section-header-title" style={{ marginTop: '1rem', fontSize: '2.5rem' }}>Outcomes, Not Just Deliverables</h2>
          <p className="lead section-header-lead" style={{ margin: '1rem auto' }}>Partner with DSP to move from pilot to production—securely, reliably, and measurably.</p>
        </div>
        <div className="cards four" style={{ gap: '1.5rem' }}>
          <div className="card p-24 consultancy-card" onClick={() => trackServiceInterest('Data Strategy')} style={{ cursor: 'pointer', borderLeft: '4px solid var(--primary)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '.75rem' }}>Data Strategy</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>Target-state architecture, governance frameworks, and roadmaps aligned to business outcomes.</p>
          </div>
          <div className="card p-24 consultancy-card" onClick={() => trackServiceInterest('Analytics & BI')} style={{ cursor: 'pointer', borderLeft: '4px solid var(--secondary)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📈</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '.75rem' }}>Analytics & BI</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>Decision-ready dashboards and KPI frameworks that scale across teams.</p>
          </div>
          <div className="card p-24 consultancy-card" onClick={() => trackServiceInterest('Cloud & DevOps')} style={{ cursor: 'pointer', borderLeft: '4px solid var(--accent)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>☁️</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '.75rem' }}>Cloud & DevOps</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>Azure-first blueprints, CI/CD pipelines, and infrastructure as code.</p>
          </div>
          <div className="card p-24 consultancy-card" onClick={() => trackServiceInterest('Migrations')} style={{ cursor: 'pointer', borderLeft: '4px solid var(--success)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚀</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '.75rem' }}>Migrations</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>Modernize platforms with minimal downtime and managed risk.</p>
          </div>
        </div>
        <div className="mt-24" style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a className="btn btn-outline section-cta-animate" onClick={handleExploreClick}>Explore All Services</a>
        </div>
      </div>
    </section>
  )
}

function TrainingOverview(){
  const handleViewTrainingClick = () => {
    trackCTAClick('training_view');
    window.location.hash='#training';
  };
  
  return (
    <section className="section section-animate" id="training-overview" style={{ background: 'var(--bg-light)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge sand section-header-badge">🎓 Training & Enablement</span>
          <h2 className="section-header-title" style={{ marginTop: '1rem', fontSize: '2.5rem' }}>Practical Training for Real Teams</h2>
          <p className="lead section-header-lead" style={{ margin: '1rem auto' }}>From executive briefings to deep-dive bootcamps, we tailor programs to your context.</p>
        </div>
        <div className="cards four" style={{ gap: '1.5rem' }}>
          <div className="card p-24 training-card" onClick={() => trackTrainingInterest('Workshops')} style={{ cursor: 'pointer', background: 'linear-gradient(135deg, white, #f0f9ff)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛠️</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '.75rem' }}>Workshops</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>Hands-on sessions with curated labs and actionable takeaways.</p>
          </div>
          <div className="card p-24 training-card" onClick={() => trackTrainingInterest('Bootcamps')} style={{ cursor: 'pointer', background: 'linear-gradient(135deg, white, #faf5ff)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💪</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '.75rem' }}>Bootcamps</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>Intensive, outcome-focused upskilling programs.</p>
          </div>
          <div className="card p-24 training-card" onClick={() => trackTrainingInterest('Cert Prep')} style={{ cursor: 'pointer', background: 'linear-gradient(135deg, white, #ecfeff)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏆</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '.75rem' }}>Certification Prep</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>Guided pathways for Microsoft, AWS, and GCP certifications.</p>
          </div>
          <div className="card p-24 training-card" onClick={() => trackTrainingInterest('Custom Programs')} style={{ cursor: 'pointer', background: 'linear-gradient(135deg, white, #f0fdf4)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚡</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '.75rem' }}>Custom Programs</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>Role-based curricula aligned to your stack and goals.</p>
          </div>
        </div>
        <div className="mt-24" style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a className="btn btn-outline section-cta-animate" onClick={handleViewTrainingClick}>View All Training</a>
        </div>
      </div>
    </section>
  )
}

function About(){
  useEffect(() => {
    trackInteraction('page_load', 'view', 'about_page');
  }, []);
  
  return (
    <section className="slab" id="about">
      <div className="container">
        <h1>About DSP</h1>
        <p className="lead">Our mission, values, and approach to data platform excellence.</p>
        
        <div className="grid-2 gap-24 mb-32">
          <div className="card p-24">
            <h3 style={{ marginTop: 0, color: 'var(--deep)' }}>Our Mission</h3>
            <p>
              We partner with organizations to build modern, cloud-first data platforms that 
              accelerate insights and foster a data-literate culture. Our approach balances 
              strategy with execution—ensuring governance and adoption keep pace with delivery.
            </p>
            <p>
              In an era where data represents both opportunity and complexity, we help teams 
              cut through the noise. We don't just implement technology—we enable sustainable 
              transformation through pragmatic engineering, clear governance, and hands-on enablement.
            </p>
          </div>
          
          <div className="card p-24">
            <h3 style={{ marginTop: 0, color: 'var(--deep)' }}>What Sets Us Apart</h3>
            <ul className="bullets">
              <li><strong>Outcome-driven roadmaps</strong> with measurable KPIs and business value alignment</li>
              <li><strong>Secure by design:</strong> governance and compliance integrated from day one</li>
              <li><strong>Enablement-first:</strong> comprehensive documentation, playbooks, and team training</li>
              <li><strong>Vendor-agnostic recommendations</strong> with Azure-optimized execution expertise</li>
              <li><strong>Real-world experience:</strong> battle-tested patterns from enterprise-scale implementations</li>
            </ul>
          </div>
        </div>
        
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Approach</h2>
        <div className="cards three mb-32">
          <div className="card p-24">
            <h3>Discovery & Alignment</h3>
            <p>
              We start by understanding your business context, technical landscape, and success criteria. 
              No cookie-cutter solutions—every engagement begins with discovery.
            </p>
          </div>
          <div className="card p-24">
            <h3>Pragmatic Delivery</h3>
            <p>
              We deliver value in phases with clear milestones. Modern engineering practices, 
              automated testing, and DevOps enable rapid iteration without sacrificing quality.
            </p>
          </div>
          <div className="card p-24">
            <h3>Sustainable Enablement</h3>
            <p>
              Success isn't just delivery—it's sustained adoption. We document, train, and empower 
              your team to own, evolve, and scale the solution independently.
            </p>
          </div>
        </div>
        
        <div className="card p-24">
          <h3 style={{ marginTop: 0, color: 'var(--deep)' }}>Our Values</h3>
          <div className="grid-2 gap-16">
            <div>
              <h4 style={{ color: 'var(--orange)', margin: '0.5rem 0' }}>Excellence Over Perfection</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                We ship working solutions that deliver value, then iterate based on feedback and outcomes.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--orange)', margin: '0.5rem 0' }}>Transparency Always</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                No surprises. We communicate progress, risks, and trade-offs clearly and consistently.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--orange)', margin: '0.5rem 0' }}>Learning Culture</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                We invest in team enablement because sustainable transformation requires capable teams.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--orange)', margin: '0.5rem 0' }}>Business Impact First</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                Technology serves business outcomes—not the other way around. We measure success in business terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Consultancy(){
  useEffect(() => {
    trackInteraction('page_load', 'view', 'consultancy_page');
  }, []);
  
  return (
    <section className="section" id="consultancy">
      <div className="container">
        <h1>Consultancy</h1>
        <p className="lead">From strategy to production—safely and measurably.</p>
        
        <div id="strategy" className="anchor-block">
          <h2>Data Strategy</h2>
          <p>Build a roadmap that aligns your data capabilities with business objectives. We help you define target architectures, governance models, and value metrics that drive decision-making.</p>
          <div className="cards three">
            <div className="card p-24" onClick={() => trackServiceInterest('Target State Architecture')}>
              <h3>Target State Architecture</h3>
              <p>Future-proof blueprints aligned to business capabilities, SLAs, and scalability requirements. Includes technology selection, integration patterns, and migration paths.</p>
            </div>
            <div className="card p-24" onClick={() => trackServiceInterest('Governance Foundations')}>
              <h3>Governance Foundations</h3>
              <p>Pragmatic policies, stewardship models, data lineage, and quality frameworks. Balances control with agility to enable self-service analytics.</p>
            </div>
            <div className="card p-24" onClick={() => trackServiceInterest('Value Metrics')}>
              <h3>Value Metrics & ROI</h3>
              <p>KPI trees, OKRs, and ROI tracking frameworks that connect data initiatives to business outcomes. Measure what matters.</p>
            </div>
          </div>
        </div>
        
        <div id="analytics" className="anchor-block">
          <h2>Analytics & BI</h2>
          <p>Transform data into action. We design analytics solutions that drive engagement, improve decision quality, and scale across your organization.</p>
          <div className="cards three">
            <div className="card p-24" onClick={() => trackServiceInterest('Semantic Models')}>
              <h3>Semantic Models & Metrics</h3>
              <p>Single source of truth for business metrics. Clear ownership, consistent definitions, and version-controlled semantic layers.</p>
            </div>
            <div className="card p-24" onClick={() => trackServiceInterest('Dashboards & Reports')}>
              <h3>Dashboards & Reports</h3>
              <p>Decision-ready artifacts with adoption playbooks. We design for clarity, performance, and maintainability—not just aesthetics.</p>
            </div>
            <div className="card p-24" onClick={() => trackServiceInterest('Data Storytelling')}>
              <h3>Data Storytelling</h3>
              <p>Narratives that drive action and alignment. We help teams communicate insights effectively to technical and non-technical audiences.</p>
            </div>
          </div>
        </div>
        
        <div id="cloud" className="anchor-block">
          <h2>Cloud & DevOps</h2>
          <p>Build resilient, scalable data platforms with modern engineering practices. Azure-optimized with vendor-agnostic principles.</p>
          <div className="cards three">
            <div className="card p-24" onClick={() => trackServiceInterest('Cloud Data Platforms')}>
              <h3>Cloud Data Platforms</h3>
              <p>Lakehouse patterns, data warehouses, streaming architectures. Designed for scale, performance, and cost optimization on Azure, AWS, or GCP.</p>
            </div>
            <div className="card p-24" onClick={() => trackServiceInterest('CI/CD Pipelines')}>
              <h3>CI/CD & DataOps</h3>
              <p>Git-driven deployments, automated testing, infrastructure as code. Ship faster with confidence through proper engineering discipline.</p>
            </div>
            <div className="card p-24" onClick={() => trackServiceInterest('Security & Reliability')}>
              <h3>Security & Reliability</h3>
              <p>Identity controls, network isolation, encryption at rest and in transit. Monitor, alert, and recover with confidence.</p>
            </div>
          </div>
        </div>
        
        <div id="migrations" className="anchor-block">
          <h2>Migrations & Integration</h2>
          <p>Modernize legacy platforms with minimal risk and downtime. Our phased approach ensures business continuity while delivering measurable improvements.</p>
          <div className="cards three">
            <div className="card p-24" onClick={() => trackServiceInterest('Migration Discovery')}>
              <h3>Discovery & Assessment</h3>
              <p>Comprehensive inventories, dependency mapping, risk assessment, and feasibility analysis. Know what you're migrating before you start.</p>
            </div>
            <div className="card p-24" onClick={() => trackServiceInterest('Migration Execution')}>
              <h3>Execution & Validation</h3>
              <p>Phased cutovers with validation gates, rollback plans, and parallel run strategies. Move with confidence, not hope.</p>
            </div>
            <div className="card p-24" onClick={() => trackServiceInterest('Post-Migration Support')}>
              <h3>Stabilization & Handover</h3>
              <p>Runbooks, monitoring dashboards, retrospectives, and team enablement. We don't just migrate—we ensure sustainable success.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Training(){
  useEffect(() => {
    trackInteraction('page_load', 'view', 'training_page');
  }, []);
  
  return (
    <section className="section" id="training">
      <div className="container">
        <h1>Training</h1>
        <p className="lead">Enablement that sticks—workshops, bootcamps, and custom programs.</p>
        
        <div id="workshops" className="anchor-block">
          <h2>Workshops</h2>
          <p>Interactive, hands-on sessions designed for immediate application. Perfect for teams looking to build specific skills quickly.</p>
          <div className="card p-24">
            <ul className="bullets">
              <li>Data storytelling for executives and decision makers</li>
              <li>Power BI essentials & semantic modeling fundamentals</li>
              <li>Azure data platform fundamentals and architecture</li>
              <li>Data governance and quality management</li>
              <li>Modern data warehousing patterns and best practices</li>
            </ul>
          </div>

         
        </div>
        
        <div id="bootcamps" className="anchor-block">
          <h2>Bootcamps</h2>
          <p>Intensive, multi-day programs that transform beginners into practitioners through real-world scenarios and projects.</p>
          <div className="card p-24">
            <ul className="bullets">
              <li><strong>Analytics Engineer:</strong> dbt, ELT patterns, semantic layers, data modeling</li>
              <li><strong>Data Engineer:</strong> pipelines, orchestration, IaC, cloud platforms</li>
              <li><strong>BI Developer:</strong> advanced modeling, DAX, MDX, governance frameworks</li>
              <li><strong>Azure Data Platform:</strong> end-to-end solutions on Azure ecosystem</li>
            </ul>
          </div>
        </div>
        
        <div id="certs" className="anchor-block">
          <h2>Certification Prep</h2>
          <p>Structured pathways to prepare for industry-recognized certifications with practice labs, review sessions, and mock exams.</p>
          <div className="card p-24">
            <h3 style={{ marginTop: 0 }}>Supported Certifications</h3>
            <ul className="bullets">
              <li><strong>Microsoft:</strong> Azure Data Engineer (DP-203), Data Analyst (PL-300), Azure Solutions Architect</li>
              <li><strong>AWS:</strong> Data Analytics Specialty, Solutions Architect, Machine Learning</li>
              <li><strong>GCP:</strong> Professional Data Engineer, Professional Cloud Architect</li>
              <li><strong>Databricks:</strong> Data Engineer Associate & Professional</li>
            </ul>
          </div>
        </div>
        
        <div id="custom" className="anchor-block">
          <h2>Custom Programs & Free Sessions</h2>
          <p>We co-design programs to match your technology stack, governance standards, and delivery processes. Also offering free learning resources to the community.</p>
          <div className="cards three mb-24">
            <div className="card p-24">
              <h3>Custom Enterprise Programs</h3>
              <p>Tailored curriculum for your organization's specific needs, tools, and maturity level. Includes role-based tracks and measurable outcomes.</p>
            </div>
            <div className="card p-24">
              <h3>Team Enablement</h3>
              <p>Ongoing support and training for teams adopting new platforms, tools, or methodologies.</p>
            </div>
            <div className="card p-24">
              <h3>Executive Briefings</h3>
              <p>Strategic sessions for leadership on data platform modernization, AI readiness, and digital transformation.</p>
            </div>
          </div>
          
          <h3>Featured Free Training Series</h3>
          <div className="mb-24">
            <h4 style={{ marginTop: '1rem', color: 'var(--deep)' }}>End-to-End Data Project with AWS & Databricks</h4>
            <p>Learn how to build a complete data platform from scratch using AWS services and Databricks.</p>
            <div style={{ marginTop: '1rem' }}>
              {/* single video embed as requested */}
              <VideoEmbed id="kGxLmxcNajQ" title="End-to-End Data Project with AWS & Databricks" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Request(){
  const [selected, setSelected] = useState(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const services = ['Data Strategy','Analytics & BI','Cloud & DevOps','Migrations','Training']
  const toggle = (s) => { const next = new Set(selected); next.has(s)?next.delete(s):next.add(s); setSelected(next) }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      company: formData.get('company'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      services: Array.from(selected).join(', '),
      message: formData.get('message')
    };
    
    try {
      const result = await sendServiceRequest(data);
      
      if (result.success) {
        trackFormSubmission('service_request');
        trackInteraction('form', 'submit_services', data.services);
        setSubmitStatus('success');
        e.target.reset();
        setSelected(new Set());
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        // Fallback to mailto if service fails
        if (result.fallbackMailto) {
          window.location.href = result.fallbackMailto;
          setSubmitStatus('fallback');
        } else {
          setSubmitStatus('error');
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="section" id="request">
      <div className="container">
        <h1>Request our services</h1>
        <p className="lead">Tell us about your goals—we'll propose a plan within 2 business days.</p>
        <form className="card p-24 form" onSubmit={handleSubmit}>
          <div className="grid-2 gap-16">
            <div><label>Full name</label><input name="name" required placeholder="Alex Rivera" /></div>
            <div><label>Company</label><input name="company" required placeholder="Contoso Ltd." /></div>
            <div><label>Email</label><input type="email" name="email" required placeholder="you@company.com" /></div>
            <div><label>Phone</label><input name="phone" placeholder="+1 (555) 000-0000" /></div>
            <div className="full">
              <label>Services</label>
              <div className="chips">
                {services.map(s => (<button type="button" key={s} className={'chip'+(selected.has(s)?' active':'')} onClick={()=>toggle(s)}>{s}</button>))}
              </div>
            </div>
            <div className="full"><label>Message</label><textarea name="message" rows="5" placeholder="Tell us about your use-case, timelines, and success criteria…"></textarea></div>
          </div>
          <div className="form-footer">
            <small>By submitting, you agree to our processing of your information per our privacy policy.</small>
            <button className="btn btn-orange" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Submit request'}
            </button>
          </div>
          {submitStatus === 'success' && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: '#10b98120', 
              border: '1px solid #10b981', 
              borderRadius: '12px', 
              color: '#065f46',
              fontWeight: '500'
            }}>
              ✓ Request submitted successfully! We'll get back to you within 2 business days.
            </div>
          )}
          {submitStatus === 'error' && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: '#ef444420', 
              border: '1px solid #ef4444', 
              borderRadius: '12px', 
              color: '#991b1b',
              fontWeight: '500'
            }}>
              ✗ There was an issue submitting your request. Please try again or contact us directly at admin@datasolutionsplatform.com
            </div>
          )}
          {submitStatus === 'fallback' && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: '#f59e0b20', 
              border: '1px solid #f59e0b', 
              borderRadius: '12px', 
              color: '#92400e',
              fontWeight: '500'
            }}>
              ℹ Your email client has been opened. Please send the email to complete your request.
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

function Tech(){
  useEffect(() => {
    trackInteraction('page_load', 'view', 'tech_stack_page');
  }, []);
  
  const techCategories = [
    {
      icon: '☁️',
      title: 'Cloud & Platform',
      color: '#2563eb',
      gradient: 'linear-gradient(135deg, #2563eb, #3b82f6)',
      technologies: [
        'Azure', 'Azure Synapse', 'Azure Databricks', 'Microsoft Fabric',
        'AWS', 'AWS Redshift', 'Databricks', 'Snowflake',
        'Google Cloud', 'BigQuery', 'Kubernetes', 'Docker',
        'Azure Functions', 'AWS Lambda'
      ]
    },
    {
      icon: '🔄',
      title: 'Data & Integration',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
      technologies: [
        'Azure Data Factory', 'Synapse Pipelines', 'dbt', 'Apache Airflow',
        'Fivetran', 'Airbyte', 'Apache Kafka', 'Event Hubs',
        'AWS Glue', 'Apache Spark', 'Databricks Workflows', 'Prefect'
      ]
    },
    {
      icon: '💾',
      title: 'Storage & Compute',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
      technologies: [
        'ADLS Gen2', 'Delta Lake', 'Azure SQL', 'PostgreSQL',
        'MySQL', 'Cosmos DB', 'MongoDB', 'S3',
        'Redshift', 'Snowflake', 'Azure Synapse', 'Databricks SQL', 'DuckDB'
      ]
    },
    {
      icon: '📊',
      title: 'Analytics & BI',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #34d399)',
      technologies: [
        'Power BI', 'Tableau', 'Looker', 'Semantic Models',
        'DAX', 'MDX', 'Jupyter Notebooks', 'Azure ML',
        'Python', 'R', 'Pandas', 'dbt Semantic Layer', 'LookML'
      ]
    },
    {
      icon: '⚙️',
      title: 'DevOps & IaC',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
      technologies: [
        'Azure DevOps', 'GitHub', 'GitLab', 'Terraform',
        'Bicep', 'ARM Templates', 'YAML Pipelines', 'CI/CD',
        'Git', 'Docker Compose', 'Kubernetes Helm', 'Pulumi', 'Ansible'
      ]
    },
    {
      icon: '💻',
      title: 'Programming & Scripting',
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899, #f472b6)',
      technologies: [
        'Python', 'SQL', 'PowerShell', 'Bash',
        'JavaScript', 'TypeScript', 'Scala', 'PySpark',
        'C#', '.NET', 'Node.js', 'React'
      ]
    }
  ];
  
  return (
    <section className="section" id="tech" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
      <div className="container">
        {/* Header Section */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '3.5rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(37,99,235,0.05), rgba(139,92,246,0.05))',
          borderRadius: '24px',
          border: '1px solid rgba(37,99,235,0.1)'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #2563eb, #8b5cf6)',
            fontSize: '2.5rem',
            marginBottom: '1.5rem',
            boxShadow: '0 10px 30px rgba(37,99,235,0.3)'
          }}>
            🚀
          </div>
          <h1 style={{ marginBottom: '1rem', fontSize: '2.75rem' }}>Technology Stack</h1>
          <p className="lead" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.15rem' }}>
            We are vendor-agnostic with an Azure-optimized backbone and deep expertise across the modern data ecosystem.
          </p>
        </div>

        {/* Technology Categories Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {techCategories.map((category, idx) => (
            <div 
              key={idx}
              className="card p-24"
              style={{
                background: 'white',
                border: `1px solid ${category.color}20`,
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 12px 30px ${category.color}30`;
                e.currentTarget.style.borderColor = category.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                e.currentTarget.style.borderColor = `${category.color}20`;
              }}
            >
              {/* Category Header */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: `2px solid ${category.color}20`
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: category.gradient,
                  fontSize: '1.5rem',
                  boxShadow: `0 6px 20px ${category.color}40`
                }}>
                  {category.icon}
                </div>
                <h3 style={{ margin: 0, fontSize: '1.35rem', color: category.color }}>
                  {category.title}
                </h3>
              </div>

              {/* Technologies */}
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '0.65rem'
              }}>
                {category.technologies.map((tech, techIdx) => (
                  <span 
                    key={techIdx}
                    style={{
                      padding: '0.5rem 1rem',
                      background: `${category.color}10`,
                      color: category.color,
                      borderRadius: '10px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      border: `1px solid ${category.color}20`,
                      transition: 'all 0.2s ease',
                      cursor: 'default'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = category.color;
                      e.target.style.color = 'white';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = `${category.color}10`;
                      e.target.style.color = category.color;
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div style={{
          padding: '2rem 2.5rem',
          background: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(139,92,246,0.08))',
          borderRadius: '20px',
          border: '1px solid rgba(37,99,235,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <div style={{
            fontSize: '2.5rem',
            flexShrink: 0
          }}>
            💡
          </div>
          <p style={{ 
            margin: 0, 
            fontWeight: '500',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: 'var(--text-dark)'
          }}>
            This is not an exhaustive list. We continuously evaluate emerging technologies 
            and adapt our stack to meet evolving business needs and industry best practices.
          </p>
        </div>
      </div>
    </section>
  )
}

function Contact(){
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };
    
    try {
      const result = await sendContactForm(data);
      
      if (result.success) {
        trackFormSubmission('contact');
        setSubmitStatus('success');
        e.target.reset();
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        if (result.fallbackMailto) {
          window.location.href = result.fallbackMailto;
          setSubmitStatus('fallback');
        } else {
          setSubmitStatus('error');
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="section" id="contact">
      <div className="container">
        <h1>Contact us</h1>
        <p className="lead">We're here to help. Expect a response within 1–2 business days.</p>
        <form className="card p-24 form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" required placeholder="Jordan Lee" />
          <label>Email</label>
          <input type="email" name="email" required placeholder="you@company.com" />
          <label>Message</label>
          <textarea name="message" rows="6" required placeholder="How can we help?"></textarea>
          <button className="btn btn-orange" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send message'}
          </button>
          {submitStatus === 'success' && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: '#10b98120', 
              border: '1px solid #10b981', 
              borderRadius: '12px', 
              color: '#065f46',
              fontWeight: '500'
            }}>
              ✓ Message sent successfully! We'll respond within 1-2 business days.
            </div>
          )}
          {submitStatus === 'error' && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: '#ef444420', 
              border: '1px solid #ef4444', 
              borderRadius: '12px', 
              color: '#991b1b',
              fontWeight: '500'
            }}>
              ✗ There was an issue sending your message. Please try again or email us at admin@datasolutionsplatform.com
            </div>
          )}
          {submitStatus === 'fallback' && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: '#f59e0b20', 
              border: '1px solid #f59e0b', 
              borderRadius: '12px', 
              color: '#92400e',
              fontWeight: '500'
            }}>
              ℹ Your email client has been opened. Please send the email to complete your message.
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

function Login(){
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const formData = new FormData(e.target);
    const data = {
      email: formData.get('email')
    };
    
    try {
      const result = await sendLoginInquiry(data);
      trackInteraction('form', 'attempt_login', 'portal_access_request');
      
      if (result.success) {
        setSubmitStatus('success');
        e.target.reset();
      } else {
        setSubmitStatus('info');
      }
    } catch (error) {
      console.error('Login inquiry error:', error);
      setSubmitStatus('info');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="section" id="login">
      <div className="container">
        <h1>Client Portal Login</h1>
        <p className="lead">Access your engagement hub, training resources, and project documentation.</p>
        
        <div className="card p-24" style={{ maxWidth: '480px', margin: '2rem auto', background: 'var(--sand)' }}>
          <p style={{ margin: 0, fontWeight: 600, textAlign: 'center' }}>
            🔒 Portal access is currently being developed. Enrolled clients and training participants will receive credentials directly.
          </p>
        </div>
        
        <form className="card p-24 form small" style={{ margin: '0 auto' }} onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" name="email" required placeholder="you@company.com" />
          <label>Password</label>
          <input type="password" name="password" required placeholder="••••••••" />
          <button className="btn btn-orange" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Request Access'}
          </button>
          {submitStatus === 'success' && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: '#10b98120', 
              border: '1px solid #10b981', 
              borderRadius: '12px', 
              color: '#065f46',
              fontWeight: '500',
              fontSize: '0.95rem'
            }}>
              ✓ Access request received! Our team will contact you with login credentials if you're an enrolled client or training participant.
            </div>
          )}
          {submitStatus === 'info' && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: '#2563eb20', 
              border: '1px solid #2563eb', 
              borderRadius: '12px', 
              color: '#1e40af',
              fontWeight: '500',
              fontSize: '0.95rem'
            }}>
              ℹ Portal access is for enrolled clients and training participants. Contact us to inquire about access.
            </div>
          )}
        </form>
        
        <div style={{ maxWidth: '480px', margin: '2rem auto' }}>
          <h3 style={{ textAlign: 'center' }}>What's Coming</h3>
          <ul className="bullets">
            <li>Access to exclusive training materials and recorded sessions</li>
            <li>Project documentation and deliverables repository</li>
            <li>Engagement dashboards and progress tracking</li>
            <li>Direct communication channel with DSP team</li>
            <li>Resource library with templates and playbooks</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default function App(){
  const { route } = useSectionRouter()
  
  // Initialize visitor tracking on app load
  useEffect(() => {
    initVisitorTracking();
  }, []);

  const consultancyData = [
    { title: 'Data Strategy', description: 'Target-state architecture, governance, roadmaps.' },
    { title: 'Analytics & BI', description: 'KPI frameworks, dashboards, storytelling.' },
    { title: 'Cloud & DevOps', description: 'Azure-first blueprints, CI/CD, IaC.' },
    { title: 'Migrations', description: 'Modernize with managed risk and minimal downtime.' },
  ]

  const Page = useMemo(()=>{
    switch(route){
      case 'about': return <About />
      case 'consultancy': return <Consultancy />
      case 'training': return <Training />
      case 'request': return <Request />
      case 'tech': return <Tech />
      case 'contact': return <Contact />
      case 'login': return <Login />
      case 'home':
      default:
        return (<>
          <HomeTop />
          <ConsultancyOverview />
          <TrainingOverview />

          <XSection eyebrow="Resources" title="Playbooks & Guides" lead="Access comprehensive resources to accelerate your data journey. Sign up for instant access.">
            <div className="cards three">
              <ResourceCard
                icon="📘"
                type="Playbook"
                title="Microsoft Fabric Migration Playbook"
                description="Complete checklist and templates for migrating to Microsoft Fabric. Includes governance setup, cost optimization, and team enablement strategies."
              />
              <ResourceCard
                icon="📊"
                type="Guide"
                title="Data Governance Starter Kit"
                description="Foundational policies, stewardship models, RACI matrices, and data quality frameworks to establish governance from day one."
              />
              <ResourceCard
                icon="📈"
                type="Framework"
                title="BI Adoption & KPI Framework"
                description="Proven methodologies for dashboard adoption, KPI standardization, semantic modeling, and measuring analytics ROI."
              />
              <ResourceCard
                icon="☁️"
                type="Architecture"
                title="Azure Data Platform Blueprint"
                description="Reference architectures for modern data platforms on Azure, including lakehouse patterns, security layers, and DevOps integration."
              />
              <ResourceCard
                icon="🎓"
                type="Learning Path"
                title="Analytics Engineer Curriculum"
                description="Complete learning path covering dbt, semantic layers, data modeling, testing, and analytics engineering best practices."
              />
              <ResourceCard
                icon="🔐"
                type="Security Guide"
                title="Data Platform Security Checklist"
                description="Comprehensive security controls for data platforms: identity, network, encryption, compliance, and threat detection."
              />
            </div>
          </XSection>

          <XSection eyebrow="Learn" title="30 Days SQL Challenge">
            <p className="lead mb-24">Watch our comprehensive tutorial on building end-to-end data pipelines.</p>
            {/* restored playlist embed as before */}
            <VideoEmbed 
              id="videoseries?list=PLfZzmUY-vwTG39mRlm4Y41bdUa7O9QevE" 
              title="DSP Training Playlist" 
            />
          </XSection>

          <XSection title="Why Organizations Choose DSP" eyebrow="Our Approach">
            <div className="cards three">
              <XCard>
                <h3>Outcome-Driven Delivery</h3>
                <p>We align every engagement to measurable business outcomes with clear KPIs, success criteria, and value realization timelines.</p>
              </XCard>
              <XCard>
                <h3>Secure by Design</h3>
                <p>Governance, compliance, and security are integrated from day one—not retrofitted. We build platforms that pass audit.</p>
              </XCard>
              <XCard>
                <h3>Enablement-First Culture</h3>
                <p>Every project includes documentation, playbooks, and training so your team can sustain and evolve the solution independently.</p>
              </XCard>
            </div>
          </XSection>

          <CTA />
        </>)
    }
  },[route])

  return (
    <div>
      <Navbar />
      <main id="app">{Page}</main>
      <Footer />
      <CookieConsent />
    </div>
  )
}
