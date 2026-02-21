import React, { useEffect, useMemo, useState } from 'react'
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

// --- Navbar
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  useEffect(()=>{ const h=(e)=>{ if(!e.target.closest('.has-dropdown')) setOpenMenu(null) }; window.addEventListener('click',h); return()=>window.removeEventListener('click',h)},[])
  const navTo = (hash) => { window.location.hash = hash; setMobileOpen(false); setOpenMenu(null) }
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <div className="brand"><div className="logo">DSP</div><span className="brand-name">Data Solutions Platform</span></div>
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
            <li><a className="btn btn-orange" onClick={()=>navTo('#login')}>Login</a></li>
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
        <div className="brand-mini"><div className="logo small">DSP</div><span>Data Solutions Platform</span></div>
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
  useEffect(()=>{ if(state.anchor){ setTimeout(()=>{ const el=document.getElementById(state.anchor); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}) },50) } else { window.scrollTo({top:0,behavior:'instant'}) } },[state.route,state.anchor])
  return state
}

// --- Existing content blocks kept intact (Home helpers)
function HomeTop(){
  return (
    <section id="home" className="hero gradient">
      <div className="container grid-2">
        <div>
          <span className="badge sand">Enterprise Data • Cloud • AI</span>
          <h1 style={{ color: '#fff', marginTop: '0.75rem' }}>Data Solutions Platform</h1>
          <p style={{ color: 'rgba(255,255,255,.95)' }}>We help organizations design modern data platforms, unlock analytics, and upskill teams with actionable training.</p>
          <div className="actions">
            <a className="btn btn-orange" onClick={()=>window.location.hash='#request'}>Request our services</a>
            <button className="btn btn-ghost" onClick={()=>document.getElementById('consultancy-overview')?.scrollIntoView({behavior:'smooth'})}>Explore offerings</button>
          </div>
        </div>
        <div>
          <div className="card p-24">
            <div className="label">What we deliver</div>
            <ul className="bullets">
              <li>Cloud-native data platforms (Azure-first) with governance baked in</li>
              <li>Business intelligence: KPI frameworks, dashboards, data storytelling</li>
              <li>Migrations & modernization with minimal downtime</li>
              <li>Training programs—from workshops to enterprise bootcamps</li>
            </ul>
            <div className="stats">
              <div className="stat"><div className="stat-k">≤ 90 days</div><div className="stat-l">Avg. Time-to-Value</div></div>
              <div className="stat"><div className="stat-k">75+</div><div className="stat-l">Training NPS</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ConsultancyOverview(){
  return (
    <section className="section" id="consultancy-overview">
      <div className="container">
        <span className="badge sand">Consultancy</span>
        <h2>Outcomes, not deliverables</h2>
        <p>Partner with DSP to move from pilot to production—securely, reliably, and measurably.</p>
        <div className="cards four">
          <div className="card p-24"><h3>Data Strategy</h3><p>Target-state architecture, governance, and roadmaps aligned to business outcomes.</p></div>
          <div className="card p-24"><h3>Analytics & BI</h3><p>Decision-ready dashboards and KPI frameworks that scale across teams.</p></div>
          <div className="card p-24"><h3>Cloud & DevOps</h3><p>Azure-first blueprints, CI/CD, and infrastructure as code.</p></div>
          <div className="card p-24"><h3>Migrations</h3><p>Modernize platforms with minimal downtime and managed risk.</p></div>
        </div>
        <div className="mt-24"><a className="btn btn-outline" onClick={()=>window.location.hash='#consultancy'}>Explore Consultancy</a></div>
      </div>
    </section>
  )
}

function TrainingOverview(){
  return (
    <section className="section" id="training-overview">
      <div className="container">
        <span className="badge sand">Training</span>
        <h2>Practical enablement for real teams</h2>
        <p>From executive briefings to deep-dive bootcamps, we tailor programs to your context.</p>
        <div className="cards four">
          <div className="card p-24"><h3>Workshops</h3><p>Hands-on sessions with curated labs and takeaways.</p></div>
          <div className="card p-24"><h3>Bootcamps</h3><p>Intensive, outcome-focused upskilling.</p></div>
          <div className="card p-24"><h3>Cert Prep</h3><p>Guided pathways for Microsoft/AWS/GCP certifications.</p></div>
          <div className="card p-24"><h3>Custom Programs</h3><p>Role-based curricula aligned to your stack and goals.</p></div>
        </div>
        <div className="mt-24"><a className="btn btn-outline" onClick={()=>window.location.hash='#training'}>View Training</a></div>
      </div>
    </section>
  )
}

function About(){
  return (
    <section className="slab" id="about">
      <div className="container">
        <h1>About DSP</h1>
        <p className="lead">Our mission, values, and approach.</p>
        <div className="grid-2 gap-24">
          <div className="card p-24"><p>We partner with organizations to build modern, cloud-first data platforms that accelerate insights and foster a data-literate culture. Our approach balances strategy with execution—ensuring governance and adoption keep pace with delivery.</p></div>
          <div className="card p-24"><ul className="bullets">
            <li>Outcome-driven roadmaps with measurable KPIs</li>
            <li>Secure by design: governance and compliance integrated</li>
            <li>Enablement-first: documentation, playbooks, and training</li>
            <li>Vendor-agnostic recommendations, Azure-optimized execution</li>
          </ul></div>
        </div>
      </div>
    </section>
  )
}

function Consultancy(){
  return (
    <section className="section" id="consultancy">
      <div className="container">
        <h1>Consultancy</h1>
        <p className="lead">From strategy to production—safely and measurably.</p>
        <div id="strategy" className="anchor-block">
          <h2>Data Strategy</h2>
          <div className="cards three">
            <div className="card p-24"><h3>Target State</h3><p>Blueprints that align to business capabilities and SLAs.</p></div>
            <div className="card p-24"><h3>Governance</h3><p>Pragmatic policies, stewardship models, and lineage.</p></div>
            <div className="card p-24"><h3>Value Metrics</h3><p>KPI trees, OKRs, and ROI tracking.</p></div>
          </div>
        </div>
        <div id="analytics" className="anchor-block">
          <h2>Analytics & BI</h2>
          <div className="cards three">
            <div className="card p-24"><h3>Semantic Models</h3><p>Metrics layers with clear ownership.</p></div>
            <div className="card p-24"><h3>Dashboards</h3><p>Focused artifacts with adoption playbooks.</p></div>
            <div className="card p-24"><h3>Storytelling</h3><p>Narratives that drive action and alignment.</p></div>
          </div>
        </div>
        <div id="cloud" className="anchor-block">
          <h2>Cloud & DevOps</h2>
          <div className="cards three">
            <div className="card p-24"><h3>Data Platform</h3><p>Lakehouse, warehouses, and streaming patterns.</p></div>
            <div className="card p-24"><h3>Pipelines</h3><p>Git-driven deployments and automated testing.</p></div>
            <div className="card p-24"><h3>Security</h3><p>Identity, network, and data protection controls.</p></div>
          </div>
        </div>
        <div id="migrations" className="anchor-block">
          <h2>Migrations</h2>
          <div className="cards three">
            <div className="card p-24"><h3>Discovery</h3><p>Inventories, dependencies, risk assessment.</p></div>
            <div className="card p-24"><h3>Execution</h3><p>Phased cutovers with validation gates.</p></div>
            <div className="card p-24"><h3>Stabilization</h3><p>Runbooks, monitoring, and retrospectives.</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Training(){
  return (
    <section className="section" id="training">
      <div className="container">
        <h1>Training</h1>
        <p className="lead">Enablement that sticks—workshops, bootcamps, and custom programs.</p>
        <div id="workshops" className="anchor-block"><h2>Workshops</h2><div className="card p-24"><ul className="bullets"><li>Data storytelling for executives</li><li>Power BI essentials & semantic modeling</li><li>Azure data platform fundamentals</li></ul></div></div>
        <div id="bootcamps" className="anchor-block"><h2>Bootcamps</h2><div className="card p-24"><ul className="bullets"><li>Analytics Engineer: dbt, ELT, semantic layers</li><li>Data Engineer: pipelines, orchestration, IaC</li><li>BI Developer: modeling, DAX, governance</li></ul></div></div>
        <div id="certs" className="anchor-block"><h2>Certification Prep</h2><div className="card p-24"><p>Microsoft, AWS, and GCP pathways with practice labs, review sessions, and mock exams.</p></div></div>
        <div id="custom" className="anchor-block"><h2>Custom Programs</h2><div className="card p-24"><p>We co-design programs to match your technology stack, governance standards, and delivery processes.</p></div></div>
        <XSection title="Cloud Data Project"><VideoEmbed id="zQpc0GMA6AE" title="Workshop Preview" /></XSection>
      </div>
    </section>
  )
}

function Request(){
  const [selected, setSelected] = useState(new Set())
  const services = ['Data Strategy','Analytics & BI','Cloud & DevOps','Migrations','Training']
  const toggle = (s) => { const next = new Set(selected); next.has(s)?next.delete(s):next.add(s); setSelected(next) }
  return (
    <section className="section" id="request">
      <div className="container">
        <h1>Request our services</h1>
        <p className="lead">Tell us about your goals—we'll propose a plan within 2 business days.</p>
        <form className="card p-24 form" onSubmit={(e)=>{e.preventDefault(); alert("Thanks! We'll get back to you within 2 business days."); e.target.reset(); setSelected(new Set())}}>
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
          <div className="form-footer"><small>By submitting, you agree to our processing of your information per our privacy policy.</small><button className="btn btn-orange" type="submit">Submit request</button></div>
        </form>
      </div>
    </section>
  )
}

function Tech(){
  return (
    <section className="section" id="tech">
      <div className="container">
        <h1>Technology Stack</h1>
        <p className="lead">We are vendor-agnostic with an Azure-optimized backbone.</p>
        <div className="cards three">
          <div className="card p-24"><h3>Cloud & Platform</h3><div className="tags">Azure, Azure Synapse, Azure Databricks, Fabric, Kubernetes</div></div>
          <div className="card p-24"><h3>Data & Integration</h3><div className="tags">ADF, Azure Data Factory, Synapse Pipelines, dbt, Airflow</div></div>
          <div className="card p-24"><h3>Storage & Compute</h3><div className="tags">ADLS Gen2, Delta Lake, SQL, PostgreSQL, Cosmos DB</div></div>
          <div className="card p-24"><h3>Analytics & BI</h3><div className="tags">Power BI, Semantic Models, DAX, MDX, Notebooks</div></div>
          <div className="card p-24"><h3>DevOps & IaC</h3><div className="tags">Azure DevOps, GitHub, Terraform, Bicep, YAML</div></div>
        </div>
      </div>
    </section>
  )
}

function Contact(){
  return (
    <section className="section" id="contact">
      <div className="container">
        <h1>Contact us</h1>
        <p className="lead">We're here to help. Expect a response within 1–2 business days.</p>
        <form className="card p-24 form" onSubmit={(e)=>{e.preventDefault(); alert("Thanks for reaching out! We'll be in touch."); e.target.reset();}}>
          <label>Name</label>
          <input name="name" required placeholder="Jordan Lee" />
          <label>Email</label>
          <input type="email" name="email" required placeholder="you@company.com" />
          <label>Message</label>
          <textarea name="message" rows="6" required placeholder="How can we help?"></textarea>
          <button className="btn btn-orange" type="submit">Send message</button>
        </form>
      </div>
    </section>
  )
}

function Login(){
  return (
    <section className="section" id="login">
      <div className="container">
        <h1>Login</h1>
        <p className="lead">Access your engagement hub and training resources.</p>
        <form className="card p-24 form small" onSubmit={(e)=>{e.preventDefault(); alert('Logged in (demo)')}}>
          <label>Email</label>
          <input type="email" required placeholder="you@company.com" />
          <label>Password</label>
          <input type="password" required placeholder="••••••••" />
          <button className="btn btn-orange" type="submit">Login</button>
        </form>
      </div>
    </section>
  )
}

export default function App(){
  const { route } = useSectionRouter()

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

          <XSection eyebrow="Resources" title="Webinars & Playbooks" lead="Curated assets to speed up adoption.">
            <TilesGrid kind="three">
              <XCard><h3>Fabric Migration Playbook</h3><p>Checklist and templates.</p></XCard>
              <XCard><h3>Governance Starter</h3><p>Policies, roles, RACI.</p></XCard>
              <XCard><h3>BI Adoption Kit</h3><p>KPIs, rollout, training.</p></XCard>
            </TilesGrid>
          </XSection>

          <Overview
            id="consultancy-overview-2"
            eyebrow="Consultancy"
            title="What we can do for you"
            lead="Swap or add items in one place; the grid updates automatically."
            data={consultancyData}
            columns="four"
          />

          <XSection eyebrow="Learn" title="Build a Complete AWS Data Pipeline — From CSV to Power BI!">
            <VideoEmbed id="kGxLmxcNajQ" title="Build a Complete AWS Data Pipeline — From CSV to Power BI!" />
          </XSection>

          <XSection title="At a glance">
            <XCard>
              <MarkdownBlock text={'**DSP** helps teams ship *modern, governed* data platforms with measurable outcomes.'} />
            </XCard>
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
    </div>
  )
}
