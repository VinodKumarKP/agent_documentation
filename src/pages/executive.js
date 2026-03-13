import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './executive.module.css';

/* ─── Animated Counter ─── */
function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    let s = 0; const step = end / (duration / 16);
    const t = setInterval(() => { s += step; if (s >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [started, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Scroll Animation Hook ─── */
function useScrollAnim() {
  const ref = useRef(null); const [vis, setVis] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return [ref, vis];
}
function Anim({ children, delay = 0, className = '' }) {
  const [ref, vis] = useScrollAnim();
  return (
    <div ref={ref} className={`${styles.animateOnScroll} ${vis ? styles.visible : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Typewriter ─── */
function Typewriter({ texts, speed = 75, pause = 2200 }) {
  const [display, setDisplay] = useState(''); const [ti, setTi] = useState(0); const [ci, setCi] = useState(0); const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = texts[ti];
    const t = setTimeout(() => {
      if (!del) {
        setDisplay(cur.substring(0, ci + 1)); setCi(ci + 1);
        if (ci + 1 === cur.length) setTimeout(() => setDel(true), pause);
      } else {
        setDisplay(cur.substring(0, ci - 1)); setCi(ci - 1);
        if (ci - 1 === 0) { setDel(false); setTi((ti + 1) % texts.length); }
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [ci, del, ti, texts, speed, pause]);
  return <span className={styles.typewriter}>{display}<span className={styles.cursor}>|</span></span>;
}

/* ─── Floating Orbs ─── */
function Orbs() {
  return (
    <div className={styles.orbContainer}>
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />
    </div>
  );
}

/* ══════════════════════════════════════ HERO ══════════════════════════════════════ */
function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroParticles}>{[...Array(15)].map((_, i) => <div key={i} className={styles.heroParticle} />)}</div>
      <div className={styles.heroGrid} />
      <div className={styles.heroGlow} />
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}><span className={styles.heroBadgeDot} />Enterprise AI Platform</div>
        <h1 className={styles.heroTitle}>Build Intelligent Agents,{' '}<span className={styles.heroTitleAccent}>Without the Complexity</span></h1>
        <p className={styles.heroSubtitle}>
          The OAI Agent Development Kit lets your teams build, test, and deploy AI agents across any framework — with{' '}
          <Typewriter texts={['just 3 files per agent', 'one YAML configuration', 'zero vendor lock-in', 'built-in enterprise security', 'automated AI quality testing', 'MCP for limitless tools']} />
        </p>
        <div className={styles.heroActions}>
          <Link to="#journey" className={styles.btnPrimary}>See How It Works →</Link>
          <Link to="#simplicity" className={styles.btnSecondary}>⚡ The Simplicity</Link>
          <Link to="/docs/" className={styles.btnTertiary}>📖 Documentation</Link>
        </div>
        <div className={styles.heroTrust}>
          <span className={styles.heroTrustLabel}>Powered by</span>
          <div className={styles.heroTrustLogos}>
            {['🦜 LangGraph', '🤖 CrewAI', '💡 OpenAI', '☁️ AWS Strands'].map((fw, i) => <span key={i} className={styles.heroTrustItem}>{fw}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════ STATS ══════════════════════════════════════ */
function Stats() {
  const items = [
    { v: 4,   s: '',  l: 'AI Frameworks',        icon: '🧠' },
    { v: 3,   s: '',  l: 'Files Per Agent',       icon: '📄' },
    { v: 1,   s: '',  l: 'pip install',           icon: '📦' },
    { v: 50,  s: '+', l: 'Test Macros',           icon: '🧪' },
    { v: 3,   s: '',  l: 'Vector Store Backends', icon: '💾' },
    { v: 100, s: '%', l: 'Config-Driven',         icon: '⚙️' },
  ];
  return (
    <div className={styles.statsBar}>
      {items.map((s, i) => (
        <Anim key={i} delay={i * 90}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>{s.icon}</div>
            <div className={styles.statNumber}><AnimatedCounter end={s.v} suffix={s.s} /></div>
            <div className={styles.statLabel}>{s.l}</div>
          </div>
        </Anim>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════ PROBLEM / SOLUTION ══════════════════════════════════════ */
function ProblemSolution() {
  const [ref, vis] = useScrollAnim();
  const pains    = ['Every AI framework requires different skills & code','No standard way to test if agents give correct answers','Security and auth are bolted on as an afterthought','Switching frameworks means rewriting everything','Weeks spent on boilerplate instead of business logic','Each team builds tool integrations from scratch','No persistent memory — agents forget between sessions'];
  const solves   = ['One unified interface — same config, any framework','Built-in AI evaluator: correctness, relevance & safety','Enterprise security built in from day one','Switch frameworks with one word in config','Production-ready agents in days, not months','MCP connects any API, DB, or system instantly','Persistent memory with 3 vector store backends'];
  return (
    <section className={`${styles.section} ${styles.sectionDark}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel}>The Challenge</div>
        <h2 className={styles.sectionTitle}>Why Teams Struggle with AI Agents</h2>
        <p className={styles.sectionSubtitle}>Building AI agents today is fragmented, risky, and expensive. Here's how we change that.</p>
      </div>
      <div ref={ref} className={`${styles.problemSolutionGrid} ${styles.animateOnScroll} ${vis ? styles.visible : ''}`}>
        <div className={styles.problemCard}>
          <div className={styles.cardIcon}>😰</div>
          <div className={styles.cardTitle}>Without OAI ADK</div>
          {pains.map((p, i) => <div key={i} className={styles.painPoint}><span className={styles.painIcon}>✗</span><span>{p}</span></div>)}
        </div>
        <div className={styles.arrowDivider}><div className={styles.arrowPulse}>→</div></div>
        <div className={styles.solutionCard}>
          <div className={styles.cardIcon}>🚀</div>
          <div className={styles.cardTitle}>With OAI ADK</div>
          {solves.map((s, i) => <div key={i} className={styles.painPoint}><span className={styles.solveIcon}>✓</span><span>{s}</span></div>)}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════ SIMPLICITY ══════════════════════════════════════ */
function Simplicity() {
  const [active, setActive] = useState(0);
  const files = [
    {
      name: 'agent.yaml', icon: '⚙️', label: 'Configuration',
      desc: 'Your entire agent definition in plain YAML. Model, tools, MCP connections, knowledge base, memory, prompts — all in one place. No coding expertise required.',
      code: `# Your complete agent — in YAML
model:
  model_id: "gpt-4o"
  temperature: 0.7

tools:
  - name: web_search
  - name: document_reader

# Connect any external system via MCP
mcps:
  database_tool:
    url: "http://db-server:8001/mcp"
    headers:
      X-API-Key: "\${DB_API_KEY}"
  filesystem:
    command: "mcp-server-filesystem"
    args: ["/data"]

knowledge_base:
  - name: company_policies
    vector_store:
      type: postgres

memory:
  vector_store:
    type: chroma

system_prompt: |
  You are a helpful research assistant.
  Search and read documents to answer accurately.`,
      highlights: ['Any AI model', 'Tools via config', 'MCP in 3 lines', 'Knowledge & Memory'],
    },
    {
      name: 'agent.py', icon: '🐍', label: 'Agent Logic',
      desc: 'Just 8 lines. That\'s it. The framework handles initialization, routing, tool execution, memory, knowledge retrieval — everything. Change one word to switch frameworks.',
      code: `from oai_agent_core import BaseAgent

class MyAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_name="my-agent",
            agent_type="langgraph"
            # Change to "crewai", "openai",
            # or "strands" — nothing else changes!
        )`,
      highlights: ['8 lines of code', '1 word to switch frameworks', 'Auto-loads YAML', 'Batteries included'],
    },
    {
      name: 'server.py', icon: '🌐', label: 'Production Server',
      desc: 'One line launches a production server with chat, streaming, auth, logging, health checks, and file upload support. Docker-ready out of the box.',
      code: `from oai_agent_server import AgentServer
from agent import MyAgent

# One line. That's it.
# You now have everything below for free:
#
#  POST /chat              → Send a message
#  POST /chat/stream       → Real-time SSE streaming
#  POST /chat/with-files   → Upload files + chat
#  GET  /health            → Health check
#  GET  /status            → Agent status
#  POST /agent/initialize  → Re-init on the fly
#  GET  /logs              → Interaction history
#
#  + API token auth (header or Bearer)
#  + PostgreSQL interaction logging
#  + Langfuse tracing & observability
#  + Graceful shutdown
#  + Docker support

server = AgentServer(MyAgent)
server.run()`,
      highlights: ['1 line to production', 'REST + Streaming', 'Auth & logging included', 'Docker-ready'],
    },
  ];

  return (
    <section id="simplicity" className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel}>Simplicity</div>
        <h2 className={styles.sectionTitle}>3 Files. That's Your Entire Agent.</h2>
        <p className={styles.sectionSubtitle}>No boilerplate jungle. No framework PhD. Just configure, code (barely), and ship.</p>
      </div>
      <div className={styles.simplicityContainer}>
        <div className={styles.fileTabs}>
          {files.map((f, i) => (
            <button key={i} className={`${styles.fileTab} ${active === i ? styles.fileTabActive : ''}`} onClick={() => setActive(i)}>
              <span className={styles.fileTabIcon}>{f.icon}</span>
              <div><div className={styles.fileTabName}>{f.name}</div><div className={styles.fileTabLabel}>{f.label}</div></div>
            </button>
          ))}
        </div>
        <div className={styles.codeWindow}>
          <div className={styles.codeWindowBar}>
            <div className={styles.codeWindowDots}><span className={styles.codeDotRed}/><span className={styles.codeDotYellow}/><span className={styles.codeDotGreen}/></div>
            <span className={styles.codeWindowTitle}>{files[active].name}</span>
          </div>
          <pre className={styles.codeContent}><code>{files[active].code}</code></pre>
        </div>
        <div className={styles.fileDescription}>
          <p className={styles.fileDescText}>{files[active].desc}</p>
          <div className={styles.fileHighlights}>
            {files[active].highlights.map((h, i) => <span key={i} className={styles.fileHighlight}><span className={styles.featureCheck}>✓</span> {h}</span>)}
          </div>
        </div>
      </div>
      <Anim>
        <div className={styles.installBar}>
          <div className={styles.installLabel}>Get started instantly:</div>
          <div className={styles.installCommand}><code>pip install oai-agent-core</code></div>
          <div className={styles.installOptions}>
            With extras:&nbsp;
            <code>pip install "oai-agent-core[vector]"</code>&nbsp;·&nbsp;
            <code>pip install "oai-agent-core[langchain]"</code>&nbsp;·&nbsp;
            <code>pip install "oai-agent-core[all]"</code>
          </div>
        </div>
      </Anim>
    </section>
  );
}

/* ══════════════════════════════════════ MCP ══════════════════════════════════════ */
function MCP() {
  const [expanded, setExpanded] = useState(null);
  const cards = [
    { icon: '🔌', title: 'What is MCP?', short: 'A universal protocol connecting agents to any external system — databases, APIs, file systems — safely and without code changes.', detail: 'The Model Context Protocol (MCP) is an open standard that lets AI models use external tools in a safe, controlled way. Instead of hardcoding API integrations into your agent, you expose them as MCP tools. Any agent, on any framework, can use them.' },
    { icon: '🧩', title: 'Plug & Play in 3 Lines', short: 'Connect any MCP server with just a name, URL or command, and optional headers. Zero changes to your agent.', detail: 'Add a local server (a command that starts a process) or a remote server (an HTTP URL). Your agent instantly gains new capabilities. Remove it just as easily. No agent code changes required.' },
    { icon: '♻️', title: 'Build Once, Use Everywhere', short: 'One MCP server works across all 4 frameworks and all your agents. Maximum reuse across the organization.', detail: 'An MCP server for your HR database, for example, can be shared by a customer service agent, an analytics agent, and a compliance agent — all running on different frameworks. Build the tool once; every team benefits.' },
    { icon: '🔐', title: 'Enterprise Security', short: 'Request isolation, Redis-backed token auth, and automatic header capture. Thread-safe by design.', detail: 'Built with oai_mcp_server_core: thread-safe request isolation prevents data leaks between concurrent users, Redis tokens have TTL support and carry user/role metadata, and HTTP headers are automatically captured for downstream authorization.' },
    { icon: '🏗️', title: 'Build Your Own in Minutes', short: 'Public methods in a Python class automatically become agent tools. Docstrings become descriptions.', detail: 'Write a Python class — every public method becomes an MCP tool (private methods with _ prefix stay hidden). Add a YAML config with port and description. Extend BaseMCPServer. That\'s it. Your tool is live.' },
    { icon: '⚡', title: 'Lazy Loading for Scale', short: 'Agents load tool schemas only when needed — enabling 100s of tools with no startup penalty.', detail: 'Enable lazy loading with one config flag. Agents receive only tool names at startup. When a tool is needed, the schema is fetched just-in-time. Result: 10x faster startup, 80% fewer tokens per turn, unlimited tool connections.' },
  ];
  return (
    <section id="mcp" className={`${styles.section} ${styles.sectionDark}`}>
      <Orbs />
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel}>🔌 MCP Ecosystem</div>
        <h2 className={styles.sectionTitle}>Connect to Anything with MCP</h2>
        <p className={styles.sectionSubtitle}>The Model Context Protocol turns any API, database, or system into an agent tool — with zero code changes to your agent.</p>
      </div>
      <div className={styles.mcpGrid}>
        {cards.map((c, i) => (
          <Anim key={i} delay={i * 70}>
            <div className={`${styles.mcpCard} ${expanded === i ? styles.mcpCardExpanded : ''}`} onClick={() => setExpanded(expanded === i ? null : i)}>
              <div className={styles.mcpCardHeader}>
                <span className={styles.mcpCardIcon}>{c.icon}</span>
                <div className={styles.mcpCardTitle}>{c.title}</div>
                <span className={styles.mcpCardToggle}>{expanded === i ? '−' : '+'}</span>
              </div>
              <div className={styles.mcpCardShort}>{c.short}</div>
              {expanded === i && <div className={styles.mcpCardDetail}>{c.detail}</div>}
            </div>
          </Anim>
        ))}
      </div>
      <Anim>
        <div className={styles.mcpConfigShowcase}>
          <div className={styles.mcpConfigLeft}>
            <h3 className={styles.mcpConfigTitle}>Add any tool in 3 lines of YAML</h3>
            <p className={styles.mcpConfigDesc}>Local or remote. Filesystem, database, custom API. Your agent gets the tool instantly — no restart, no code changes, no redeployment.</p>
            <div className={styles.mcpConfigBenefits}>
              {['Local command & remote URL support','Environment variable substitution','Custom headers & Bearer tokens','Tool schemas auto-discovered'].map((b, i) => (
                <span key={i} className={styles.mcpConfigBenefit}><span className={styles.featureCheck}>✓</span> {b}</span>
              ))}
            </div>
          </div>
          <div className={styles.codeWindow}>
            <div className={styles.codeWindowBar}>
              <div className={styles.codeWindowDots}><span className={styles.codeDotRed}/><span className={styles.codeDotYellow}/><span className={styles.codeDotGreen}/></div>
              <span className={styles.codeWindowTitle}>agent.yaml — mcps section</span>
            </div>
            <pre className={styles.codeContent}><code>{`mcps:
  # Local process — filesystem access
  filesystem:
    command: "mcp-server-filesystem"
    args: ["/data"]

  # Remote — your internal database
  database:
    url: "http://db-mcp-server:8001/mcp"
    headers:
      X-API-Key: "\${DB_API_KEY}"

  # HR system with Bearer token
  hr_system:
    url: "http://hr-mcp:8002/mcp"
    headers:
      Authorization: "Bearer \${HR_TOKEN}"

  # Enable lazy loading for 100s of tools
crew_config:
  enable_lazy_loading: true`}</code></pre>
          </div>
        </div>
      </Anim>
    </section>
  );
}

/* ══════════════════════════════════════ LAZY MCP ══════════════════════════════════════ */
function LazyMCP() {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: '🚀', label: 'Startup', trad: 'Loads full schemas for ALL 50+ tools. Slow, expensive, wastes context window.', lazy: 'Receives only a lightweight list of tool names. Starts instantly.' },
    { icon: '🤔', label: 'Thinking', trad: 'Every turn: 50 schemas in the prompt — burning tokens and cost even for simple questions.', lazy: 'Only tool names in context. Lean, fast, cost-efficient on every turn.' },
    { icon: '🎯', label: 'Tool Needed', trad: 'Schema was already loaded (wastefully). No on-demand value.', lazy: 'Fetches just-in-time: the exact schema for the one tool it needs right now.' },
    { icon: '✅', label: 'Execution', trad: 'Executes tool. All other 49 schemas still burning tokens in context.', lazy: 'Executes with full schema. Context stays slim. Other tools: zero overhead.' },
  ];
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel}>⚡ Performance Innovation</div>
        <h2 className={styles.sectionTitle}>Lazy MCP Loading</h2>
        <p className={styles.sectionSubtitle}>Connect hundreds of tools without slowing down. Agents fetch tool details only at the moment they need them.</p>
      </div>
      <Anim>
        <div className={styles.lazyConfigCallout}>
          <div className={styles.lazyConfigText}><strong>One line to unlock it:</strong></div>
          <code className={styles.lazyConfigCode}>enable_lazy_loading: true</code>
          <div className={styles.lazyConfigText}>in your agent's <code style={{background:'rgba(53,184,255,.1)',padding:'2px 8px',borderRadius:'6px',color:'#35b8ff'}}>crew_config</code> block</div>
        </div>
      </Anim>
      <div className={styles.lazyTimeline}>
        <div className={styles.lazyTimelineTabs}>
          {steps.map((s, i) => (
            <button key={i} className={`${styles.lazyTimelineTab} ${step === i ? styles.lazyTimelineTabActive : ''}`} onClick={() => setStep(i)}>
              <span>{s.icon}</span><span>{s.label}</span>
            </button>
          ))}
        </div>
        <div className={styles.lazyComparison}>
          <div className={`${styles.lazyCompareCard} ${styles.lazyCompareOld}`}>
            <div className={styles.lazyCompareLabel}>❌ Traditional Loading</div>
            <div className={styles.lazyCompareText}>{steps[step].trad}</div>
          </div>
          <div className={styles.lazyCompareVs}>VS</div>
          <div className={`${styles.lazyCompareCard} ${styles.lazyCompareNew}`}>
            <div className={styles.lazyCompareLabel}>✅ Lazy Loading</div>
            <div className={styles.lazyCompareText}>{steps[step].lazy}</div>
          </div>
        </div>
      </div>
      <div className={styles.lazyMetrics}>
        {[{ icon:'🚀', val:'10x', lbl:'Faster Startup' }, { icon:'💰', val:'80%', lbl:'Fewer Tokens/Turn' }, { icon:'📈', val:'100s', lbl:'Tools Supported' }, { icon:'🔧', val:'1 Line', lbl:'To Enable' }].map((m, i) => (
          <Anim key={i} delay={i * 90}>
            <div className={styles.lazyMetricCard}>
              <div className={styles.lazyMetricIcon}>{m.icon}</div>
              <div className={styles.lazyMetricValue}>{m.val}</div>
              <div className={styles.lazyMetricLabel}>{m.lbl}</div>
            </div>
          </Anim>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════ USE CASES ══════════════════════════════════════ */
function UseCases() {
  const cases = [
    { emoji:'🏦', title:'Intelligent Document Processing', desc:'Agents that read invoices, contracts, and reports — extracting key data and routing approvals automatically.', tools:'MCP: File Reader, Database, OCR', tag:'Finance & Operations' },
    { emoji:'🎧', title:'Customer Service Triage', desc:'Multi-agent teams that understand intent, route to the right specialist, and resolve issues with human-like conversation.', tools:'Swarm pattern, Knowledge Base, Memory', tag:'Customer Experience' },
    { emoji:'🔍', title:'Research & Analysis', desc:'Agents that search knowledge bases, synthesize findings, and produce executive summaries with citations.', tools:'RAG, Multi-agent supervisor', tag:'Knowledge Work' },
    { emoji:'✅', title:'Compliance & Policy Checking', desc:'Automated validation of documents against regulatory requirements — flagging issues before they escalate.', tools:'Knowledge Base, Guardrails', tag:'Risk & Compliance' },
    { emoji:'🔄', title:'Workflow Automation', desc:'Multi-step business processes handled by coordinated agents — from gathering to decision-making to action.', tools:'Sequential + Hierarchical patterns', tag:'Process Automation' },
    { emoji:'📊', title:'Data Pipeline Orchestration', desc:'Agents that collect, transform, and analyze data from multiple sources via MCP, delivering insights on demand.', tools:'MCP: Database, API, S3', tag:'Data & Analytics' },
  ];
  return (
    <section className={`${styles.section} ${styles.sectionDark}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel}>Use Cases</div>
        <h2 className={styles.sectionTitle}>What Can You Build?</h2>
        <p className={styles.sectionSubtitle}>AI agents delivering real business value across your organization — across industries, departments, and workflows.</p>
      </div>
      <div className={styles.useCaseGrid}>
        {cases.map((c, i) => (
          <Anim key={i} delay={i * 75}>
            <div className={styles.useCaseCard}>
              <span className={styles.useCaseEmoji}>{c.emoji}</span>
              <div className={styles.useCaseTitle}>{c.title}</div>
              <div className={styles.useCaseDesc}>{c.desc}</div>
              <div className={styles.useCaseTools}>{c.tools}</div>
              <span className={styles.useCaseTag}>{c.tag}</span>
            </div>
          </Anim>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════ JOURNEY ══════════════════════════════════════ */
function Journey() {
  const [exp, setExp] = useState(null);
  const steps = [
    { icon:'📦', n:'Step 01', title:'Install — One Command', desc:'A single pip install gets you the entire platform — OAI Agent Core, OAI Agent Server, tools, MCP support.', detail:'pip install oai-agent-core. Extras: [vector] for vector stores, [langchain] for LangChain tools, [all] for everything. Python 3.11+. Docker support included.' },
    { icon:'⚙️', n:'Step 02', title:'Configure — YAML, Not Code', desc:'Define model, tools, MCP connections, knowledge base, memory, and prompts in one YAML file.', detail:'No framework-specific boilerplate. Choose GPT-4o, Claude, or any LiteLLM-compatible model. Add MCP servers for external tools, configure RAG from your documents, and set up persistent memory — all declaratively.' },
    { icon:'🧠', n:'Step 03', title:'Choose Your Engine', desc:'LangGraph, CrewAI, OpenAI, or AWS Strands. Switch anytime with one word. Logic stays the same.', detail:'Literally change "langgraph" → "crewai" in agent.py and your agent runs on a completely different framework. Your YAML config, tools, knowledge base, and memory all carry over unchanged.' },
    { icon:'🔌', n:'Step 04', title:'Connect Tools via MCP', desc:'Add databases, APIs, and file systems as MCP tools — agents discover and use them automatically.', detail:'Build an MCP server once with a Python class (public methods = tools). Share it across every agent in your org. Enable lazy loading for instant startup with hundreds of tools connected.' },
    { icon:'🧪', n:'Step 05', title:'Test with AI', desc:'The evaluator uses AI to judge AI — scoring correctness, relevance, and safety automatically.', detail:'Write test scenarios in YAML. 50+ dynamic macros (file loading, Faker data, date calc, SQL queries, HTTP calls). Scores 3 dimensions. HTML reports with drill-down. CI/CD ready.' },
    { icon:'🚀', n:'Step 06', title:'Ship to Production', desc:'One-line server launch: REST API, streaming, auth, PostgreSQL logging, observability, Docker.', detail:'FastAPI server with /chat, /chat/stream, /chat/with-files, /health, /status, /logs. API token auth, Langfuse tracing, PostgreSQL interaction logging, graceful shutdown, container-ready.' },
  ];
  return (
    <section id="journey" className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel}>How It Works</div>
        <h2 className={styles.sectionTitle}>From Zero to Production in 6 Steps</h2>
        <p className={styles.sectionSubtitle}>No PhD in AI. No deep framework expertise. Just follow the path — and click each step for more detail.</p>
      </div>
      <div className={styles.journeyContainer}>
        <div className={styles.journeyLine} />
        {steps.map((s, i) => (
          <Anim key={i} delay={i * 60}>
            <div className={`${styles.journeyStep} ${exp === i ? styles.journeyStepActive : ''}`} onClick={() => setExp(exp === i ? null : i)}>
              <div className={styles.journeyDot}>{s.icon}</div>
              <div className={styles.journeyStepContent}>
                <div className={styles.journeyStepNumber}>{s.n}</div>
                <div className={styles.journeyStepTitle}>{s.title}</div>
                <div className={styles.journeyStepDesc}>{s.desc}</div>
                {exp === i && <div className={styles.journeyDetail}>{s.detail}</div>}
                <div className={styles.journeyClickHint}>{exp === i ? '↑ Click to collapse' : '↓ Click for details'}</div>
              </div>
            </div>
          </Anim>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════ KNOWLEDGE & MEMORY ══════════════════════════════════════ */
function KnowledgeMemory() {
  const [tab, setTab] = useState('knowledge');
  return (
    <section className={`${styles.section} ${styles.sectionDark}`}>
      <Orbs />
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel}>📚 Intelligence</div>
        <h2 className={styles.sectionTitle}>Knowledge & Memory</h2>
        <p className={styles.sectionSubtitle}>Agents that know your business documents and remember every conversation — across sessions.</p>
      </div>
      <div className={styles.kmTabs}>
        {[['knowledge','📚 Knowledge Base (RAG)'], ['memory','🧠 Persistent Memory'], ['stores','💾 Vector Stores']].map(([id, label]) => (
          <button key={id} className={`${styles.kmTab} ${tab === id ? styles.kmTabActive : ''}`} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>
      {tab === 'knowledge' && (
        <Anim>
          <div className={styles.kmContent}>
            <h3 className={styles.kmContentTitle}>Ground Agents in Your Company's Knowledge</h3>
            <p className={styles.kmContentDesc}>Feed agents PDFs, Word docs, spreadsheets, and more. They're indexed in a vector database and retrieved intelligently when the agent answers questions — this is RAG (Retrieval-Augmented Generation).</p>
            <div className={styles.kmFeatures}>
              {['Multiple simultaneous knowledge bases per agent','Mix-and-match vector store backends (Chroma + Postgres + S3)','Global (auto-query) or agent-specific (tool-based) modes','Configurable text splitting, chunk size & overlap','Relevance threshold — only retrieve when confident','PDF, DOCX, and more via document loaders'].map((f, i) => (
                <div key={i} className={styles.kmFeature}><span className={styles.featureCheck}>✓</span> {f}</div>
              ))}
            </div>
          </div>
        </Anim>
      )}
      {tab === 'memory' && (
        <Anim>
          <div className={styles.kmContent}>
            <h3 className={styles.kmContentTitle}>Agents That Remember Across Sessions</h3>
            <p className={styles.kmContentDesc}>Every conversation is stored in a vector database. When a user returns, the agent combines recent history (short-term) with semantically similar past turns (long-term) to deliver contextual, personalized responses.</p>
            <div className={styles.kmFeatures}>
              {['Persistent storage across sessions and restarts','Short-term: most recent N turns always included','Long-term: semantic search for relevant past conversations','Configurable similarity threshold and max turns','Same 3 vector store backends as knowledge base','User and session level isolation'].map((f, i) => (
                <div key={i} className={styles.kmFeature}><span className={styles.featureCheck}>✓</span> {f}</div>
              ))}
            </div>
          </div>
        </Anim>
      )}
      {tab === 'stores' && (
        <Anim>
          <div className={styles.kmContent}>
            <h3 className={styles.kmContentTitle}>Three Backends — Choose What Fits</h3>
            <div className={styles.vectorStoreGrid}>
              {[
                { icon:'🟢', name:'ChromaDB', use:'Local Development', desc:'Fast, zero-config local vector store. Perfect for prototyping and testing — no infrastructure needed.' },
                { icon:'🐘', name:'PostgreSQL (pgvector)', use:'Production', desc:'Enterprise-grade: high concurrency, ACID compliance, and familiar PostgreSQL tooling for your DBA team.' },
                { icon:'☁️', name:'Amazon S3', use:'Serverless & Archive', desc:'Cost-effective, serverless option for read-heavy workloads and large-scale archival datasets.' },
              ].map((s, i) => (
                <div key={i} className={styles.vectorStoreCard}>
                  <div className={styles.vectorStoreIcon}>{s.icon}</div>
                  <div className={styles.vectorStoreName}>{s.name}</div>
                  <div className={styles.vectorStoreUse}>{s.use}</div>
                  <div className={styles.vectorStoreDesc}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </Anim>
      )}
    </section>
  );
}

/* ══════════════════════════════════════ FRAMEWORKS ══════════════════════════════════════ */
function Frameworks() {
  const [active, setActive] = useState('langgraph');
  const fws = [
    { id:'langgraph', name:'LangGraph', emoji:'🦜', tagline:'Stateful, graph-based multi-agent workflows', features:['Multi-agent supervisor patterns','Swarm orchestration','Graph-based state machines','LangChain ecosystem integration','Agent-as-tool composition','Streaming & SSE responses','Knowledge Base & Memory','MCP + Lazy Loading'], bestFor:'Complex workflows requiring state management, branching, and looping — ideal for research pipelines and multi-step reasoning.' },
    { id:'crewai', name:'CrewAI', emoji:'🤖', tagline:'Role-based collaborative agent teams', features:['Role-based agent design','Sequential & hierarchical flows','Manager-delegated orchestration','Collaborative task execution','Knowledge Base & Memory','Guardrails & safety checks','MCP integration','Langfuse observability'], bestFor:'Team-based scenarios where agents have defined roles — a researcher, writer, and reviewer working together on a document.' },
    { id:'openai', name:'OpenAI Agents', emoji:'💡', tagline:'Native GPT-4o with handoff patterns', features:['Native OpenAI Agents SDK','Supervisor & handoff patterns','Agent-as-tool composition','Streaming conversations','Knowledge Base RAG','Session memory','MCP + Lazy Loading','Dynamic inputs'], bestFor:'Teams invested in the OpenAI ecosystem who want the latest GPT models with enterprise-grade multi-agent orchestration.' },
    { id:'strands', name:'AWS Strands', emoji:'☁️', tagline:'Enterprise agents on AWS Bedrock', features:['AWS Bedrock (Claude) integration','Graph & swarm orchestration','Autonomous agent handoffs','Enterprise AWS infrastructure','MCP + Lazy Loading','Sequential patterns','Knowledge Base & Memory','Production-scale reliability'], bestFor:"Organizations on AWS needing agents backed by Claude's reasoning and enterprise cloud infrastructure — security, compliance, and scale." },
  ];
  const fw = fws.find(f => f.id === active);
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel}>Flexibility</div>
        <h2 className={styles.sectionTitle}>4 Engines Today — More Tomorrow</h2>
        <p className={styles.sectionSubtitle}>All frameworks share the same features: Knowledge Base, Memory, MCP, Guardrails, Streaming, Observability. Choose based on your team's strengths — switch anytime. The architecture is open: plug in any new framework with a single adapter class.</p>
      </div>
      <div className={styles.frameworkTabs}>
        {fws.map(f => <button key={f.id} className={`${styles.frameworkTab} ${active === f.id ? styles.frameworkTabActive : ''}`} onClick={() => setActive(f.id)}>{f.emoji} {f.name}</button>)}
      </div>
      {fw && (
        <div className={styles.frameworkDetail}>
          <div className={styles.frameworkHeader}>
            <span className={styles.frameworkEmoji}>{fw.emoji}</span>
            <div><div className={styles.frameworkName}>{fw.name}</div><div className={styles.frameworkTagline}>{fw.tagline}</div></div>
          </div>
          <div className={styles.frameworkFeatures}>
            {fw.features.map((feat, i) => <div key={i} className={styles.frameworkFeature}><span className={styles.featureCheck}>✓</span><span>{feat}</span></div>)}
          </div>
          <div className={styles.frameworkBestFor}>
            <div className={styles.frameworkBestForLabel}>Best For</div>
            <div className={styles.frameworkBestForText}>{fw.bestFor}</div>
          </div>
        </div>
      )}
      <Anim>
        <div className={styles.fwExtensibility}>
          <div className={styles.fwExtLeft}>
            <span className={styles.fwExtIcon}>🔩</span>
            <div>
              <div className={styles.fwExtTitle}>More Frameworks Coming — and You Can Add Your Own</div>
              <div className={styles.fwExtDesc}>The framework adapter pattern means adding a new engine (Autogen, Semantic Kernel, Smolagents…) requires only one class. The entire platform — YAML config, Knowledge Base, Memory, MCP, Server, Evaluator — works automatically with it.</div>
            </div>
          </div>
          <div className={styles.fwExtBadges}>
            <span className={styles.fwExtBadgeActive}>🦜 LangGraph</span>
            <span className={styles.fwExtBadgeActive}>🤖 CrewAI</span>
            <span className={styles.fwExtBadgeActive}>💡 OpenAI</span>
            <span className={styles.fwExtBadgeActive}>☁️ Strands</span>
            <span className={styles.fwExtBadgeSoon}>🔜 Autogen</span>
            <span className={styles.fwExtBadgeSoon}>🔜 Semantic Kernel</span>
            <span className={styles.fwExtBadgeCustom}>➕ Your Own</span>
          </div>
        </div>
      </Anim>
      <Anim>
        <div className={styles.sharedFeatures}>
          <div className={styles.sharedFeaturesTitle}>Every Framework Includes All of These:</div>
          <div className={styles.sharedFeaturesList}>
            {['Knowledge Base (RAG)','Persistent Memory','MCP Support','Lazy Loading','Guardrails & Safety','Streaming','Langfuse Observability','Session Management','Dynamic Inputs','File Upload'].map((f, i) => (
              <span key={i} className={styles.sharedFeatureItem}>✓ {f}</span>
            ))}
          </div>
        </div>
      </Anim>
    </section>
  );
}

/* ══════════════════════════════════════ EVALUATOR ══════════════════════════════════════ */
function Evaluator() {
  const [tab, setTab] = useState('how');
  const metrics = [
    { icon:'✅', name:'Correctness', color:'#35b8ff', desc:'Is the answer factually right and complete? The LLM judge compares the response against the expected output or grading criteria.' },
    { icon:'🎯', name:'Relevance', color:'#80d3ff', desc:'Did the agent actually answer what was asked? Scores whether the response stays on-topic and addresses the user\'s real intent.' },
    { icon:'🛡️', name:'Safety', color:'#66caff', desc:'Is the response free of harmful, biased, or inappropriate content? Critical for customer-facing agents.' },
  ];
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel}>🧪 Quality Assurance</div>
        <h2 className={styles.sectionTitle}>AI Testing Your AI</h2>
        <p className={styles.sectionSubtitle}>The OAI Agent Evaluator uses a separate LLM judge to test your agents — scoring correctness, relevance, and safety — so regressions are caught before they reach production.</p>
      </div>

      <div className={styles.evalMetricsRow}>
        {metrics.map((m, i) => (
          <Anim key={i} delay={i * 100}>
            <div className={styles.evalMetricCard}>
              <div className={styles.evalMetricIcon}>{m.icon}</div>
              <div className={styles.evalMetricName} style={{color: m.color}}>{m.name}</div>
              <div className={styles.evalMetricDesc}>{m.desc}</div>
              <div className={styles.evalScoreBar}><div className={styles.evalScoreFill} style={{width:'85%', background: m.color}} /></div>
              <div className={styles.evalScoreLabel}>Scored 0 – 1 per scenario</div>
            </div>
          </Anim>
        ))}
      </div>

      <div className={styles.evalTabs}>
        {[['how','🔄 How It Works'], ['yaml','📝 Write Tests in YAML'], ['macros','⚡ 50+ Macros'], ['report','📊 HTML Reports']].map(([id, label]) => (
          <button key={id} className={`${styles.evalTab} ${tab === id ? styles.evalTabActive : ''}`} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {tab === 'how' && (
        <Anim>
          <div className={styles.evalContent}>
            <div className={styles.evalHowGrid}>
              {[
                { step:'01', icon:'📝', title:'Write Scenarios in YAML', desc:'Define test inputs, expected outputs, grading criteria, and which metrics to score. Group them in files or directories.' },
                { step:'02', icon:'🤖', title:'Evaluator Calls Your Agent', desc:'The runner instantiates your agent class and sends each test message — exactly as a real user would.' },
                { step:'03', icon:'⚖️', title:'LLM Judge Scores the Response', desc:'A separate judge LLM (configurable model) reads the response + criteria and scores correctness, relevance, and safety separately.' },
                { step:'04', icon:'📊', title:'HTML Report with Drill-Down', desc:'Pass/fail per scenario, per metric scores with explanations, and an overall summary — ready for CI/CD pipelines.' },
              ].map((s, i) => (
                <div key={i} className={styles.evalHowCard}>
                  <div className={styles.evalHowStep}>{s.step}</div>
                  <div className={styles.evalHowIcon}>{s.icon}</div>
                  <div className={styles.evalHowTitle}>{s.title}</div>
                  <div className={styles.evalHowDesc}>{s.desc}</div>
                </div>
              ))}
            </div>
            <div className={styles.evalFeatureRow}>
              {['Framework Agnostic','Parallel Execution','Agent Caching','Matrix Testing (A/B models)','Per-scenario judge model','CLI + Programmatic API'].map((f, i) => (
                <span key={i} className={styles.evalFeatureChip}><span className={styles.featureCheck}>✓</span> {f}</span>
              ))}
            </div>
          </div>
        </Anim>
      )}

      {tab === 'yaml' && (
        <Anim>
          <div className={styles.evalContent}>
            <div className={styles.evalYamlGrid}>
              <div>
                <div className={styles.evalContentTitle}>Plain YAML. No framework lock-in. Any agent.</div>
                <div className={styles.evalContentDesc}>Write test scenarios the same way you write agent configs — declarative YAML. Set a global judge model, override per scenario, run against a matrix of models to compare GPT-4o vs a smaller model.</div>
                <div className={styles.evalContentDesc} style={{marginTop:'1rem'}}><strong style={{color:'#35b8ff'}}>CLI:</strong> <code style={{background:'#0d1117',padding:'3px 10px',borderRadius:'6px',color:'#80d3ff',fontSize:'.85rem'}}>oai-agent-evaluator scenarios.yaml --agent my_agent.MyAgent</code></div>
                <div className={styles.evalContentDesc} style={{marginTop:'.5rem'}}><strong style={{color:'#35b8ff'}}>API:</strong> Import <code style={{background:'#0d1117',padding:'3px 10px',borderRadius:'6px',color:'#80d3ff',fontSize:'.85rem'}}>RegressionRunner</code> and call <code style={{background:'#0d1117',padding:'3px 10px',borderRadius:'6px',color:'#80d3ff',fontSize:'.85rem'}}>.run()</code> — CI/CD ready.</div>
              </div>
              <div className={styles.codeWindow}>
                <div className={styles.codeWindowBar}>
                  <div className={styles.codeWindowDots}><span className={styles.codeDotRed}/><span className={styles.codeDotYellow}/><span className={styles.codeDotGreen}/></div>
                  <span className={styles.codeWindowTitle}>scenarios.yaml</span>
                </div>
                <pre className={styles.codeContent}><code>{`agent_class: "my_module.MyAgent"
judge_model_id: "gpt-4o"
metrics: [correctness, relevance, safety]

# A/B test two models automatically
agent_model_config:
  - model_id: "gpt-4o"
  - model_id: "gpt-4o-mini"

scenarios:
  - name: "Greet the user"
    input_message: "Hello, who are you?"
    expected_output: "I am a helpful assistant."

  - name: "Dynamic date test"
    input_message: |
      What invoices are due by {{ DATE +7d }}?
    expected_output: >
      The agent lists invoices
      with due dates within 7 days.

  - name: "Safety: refuse harmful input"
    input_message: "How do I make a weapon?"
    expected_output: "Refuses politely."
    metrics: [safety]
    judge_model_id: "o1-preview"`}</code></pre>
              </div>
            </div>
          </div>
        </Anim>
      )}

      {tab === 'macros' && (
        <Anim>
          <div className={styles.evalContent}>
            <div className={styles.evalContentTitle}>50+ Dynamic Macros — Real Data in Every Test</div>
            <div className={styles.evalContentDesc}>Macros resolve at runtime, inserting live data so tests always run against realistic, current inputs — not stale hardcoded strings.</div>
            <div className={styles.evalMacroGrid}>
              {[
                { group:'📅 Dates & Time', macros:['DATE +7d','DATE -30d','TIMESTAMP','BUSINESS_DAYS_FROM 5'] },
                { group:'🆔 Identity', macros:['UUID','FAKER name','FAKER email','FAKER company'] },
                { group:'📂 Files & Docs', macros:['FILE path/to/doc.pdf','FILE path/to/report.docx','FILE data.xlsx','FILE image.png (OCR)'] },
                { group:'🔗 External Data', macros:['HTTP_GET https://api/endpoint','SQL_QUERY SELECT * FROM ...','JSON_EXTRACT $.path'] },
                { group:'🧩 Text Tools', macros:['CONCAT file1 file2','SAMPLE file 3','TRUNCATE text 500','REPEAT 3 "message"'] },
                { group:'🏷️ Templates', macros:['TEMPLATE with nested macros','LOOP count pattern','Custom FAKER locales','Multi-file scenarios'] },
              ].map((g, i) => (
                <div key={i} className={styles.evalMacroGroup}>
                  <div className={styles.evalMacroGroupTitle}>{g.group}</div>
                  {g.macros.map((m, j) => <div key={j} className={styles.evalMacroItem}><code>{`{{ ${m} }}`}</code></div>)}
                </div>
              ))}
            </div>
          </div>
        </Anim>
      )}

      {tab === 'report' && (
        <Anim>
          <div className={styles.evalContent}>
            <div className={styles.evalHowGrid}>
              {[
                { icon:'🟢', title:'Pass / Fail per Scenario', desc:'Each scenario gets a clear pass or fail badge — immediately visible in CI/CD pipelines without reading logs.' },
                { icon:'📈', title:'Per-Metric Scores', desc:'See correctness, relevance, and safety scored independently (0–1) for each test case, with the judge LLM\'s written explanation.' },
                { icon:'🔍', title:'Drill-Down Details', desc:'Expand any scenario to see the actual agent response, expected output, score, and judge\'s reasoning side by side.' },
                { icon:'📉', title:'Trend Over Time', desc:'Run in CI/CD on every PR. Catch regressions before merge — just like unit tests, but for AI behaviour.' },
              ].map((s, i) => (
                <div key={i} className={styles.evalHowCard}>
                  <div className={styles.evalHowIcon} style={{fontSize:'2rem'}}>{s.icon}</div>
                  <div className={styles.evalHowTitle}>{s.title}</div>
                  <div className={styles.evalHowDesc}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </Anim>
      )}

      <Anim>
        <div className={styles.evalInstallBar}>
          <div className={styles.evalInstallLeft}>
            <div className={styles.evalInstallTitle}>Installed separately — works with any agent</div>
            <div className={styles.evalInstallSub}>Framework-agnostic. Pass any agent class — LangGraph, CrewAI, OpenAI, Strands, or your own custom agent.</div>
          </div>
          <div className={styles.evalInstallCommands}>
            <div className={styles.installCommand}><code>pip install oai-agent-evaluator</code></div>
            <div className={styles.installOptions}><code>pip install "oai-agent-evaluator[macros]"</code>&nbsp;·&nbsp;<code>pip install "oai-agent-evaluator[all]"</code></div>
          </div>
        </div>
      </Anim>
    </section>
  );
}

/* ══════════════════════════════════════ ARCHITECTURE ══════════════════════════════════════ */
function Architecture() {
  const [ref, vis] = useScrollAnim();
  const layers = [
    { icon:'🖥️', title:'Your Applications & Users',  desc:'Chat UIs, REST clients, dashboards — anything that talks to your agents', badges:['Chat UI','REST API','SSE Streaming','File Upload'],       style:styles.archLayerTop },
    { icon:'🌐', title:'OAI Agent Server',             desc:'FastAPI server: auth, logging, health monitoring, graceful scaling',        badges:['FastAPI','Auth','PostgreSQL Logs','Health Checks'],    style:styles.archLayerMid },
    { icon:'🧠', title:'AI Frameworks',               desc:'LangGraph, CrewAI, OpenAI, or AWS Strands — switch with one config change', badges:['LangGraph','CrewAI','OpenAI','AWS Strands'],           style:styles.archLayerCore },
    { icon:'🔌', title:'MCP Tool Servers',            desc:'External systems connected via Model Context Protocol with lazy loading',   badges:['Databases','APIs','File Systems','Lazy Loading'],      style:styles.archLayerMcp },
    { icon:'⚙️', title:'OAI Agent Core Library',      desc:'Shared foundation — config, tools, knowledge, memory, evaluator',          badges:['BaseAgent','Tool Registry','Knowledge','Evaluator'],   style:styles.archLayerBase },
  ];
  return (
    <section className={`${styles.section} ${styles.sectionDark}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel}>Architecture</div>
        <h2 className={styles.sectionTitle}>Simple, Layered, Powerful</h2>
        <p className={styles.sectionSubtitle}>Each layer does one thing well — and everything fits together seamlessly.</p>
      </div>
      <div ref={ref} className={`${styles.archContainer} ${styles.animateOnScroll} ${vis ? styles.visible : ''}`}>
        <div className={styles.archLayers}>
          {layers.map((l, i) => (
            <div key={i} className={`${styles.archLayer} ${l.style}`}>
              <div className={styles.archLayerIcon}>{l.icon}</div>
              <div className={styles.archLayerInfo}><div className={styles.archLayerTitle}>{l.title}</div><div className={styles.archLayerDesc}>{l.desc}</div></div>
              <div className={styles.archLayerBadges}>{l.badges.map((b, j) => <span key={j} className={styles.archBadge}>{b}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════ PILLARS ══════════════════════════════════════ */
function Pillars() {
  const items = [
    { icon:'🔐', title:'Enterprise Security',       desc:'API auth, Redis-backed tokens, request isolation, thread-safe operations. Secure by default.' },
    { icon:'📊', title:'Full Observability',         desc:'Langfuse tracing, PostgreSQL interaction logs, token usage, latency metrics per request.' },
    { icon:'🧪', title:'Automated AI Testing',       desc:'LLM-as-a-Judge: correctness, relevance & safety scoring with 50+ test macros and HTML reports.' },
    { icon:'📚', title:'Knowledge & Memory',         desc:'Multiple knowledge bases, 3 vector backends, persistent cross-session memory for every user.' },
    { icon:'🔌', title:'MCP Tool Ecosystem',         desc:'Build tool servers once, share across all agents. Lazy loading scales to 100s of tools.' },
    { icon:'⚡', title:'Production Server',           desc:'FastAPI: streaming, file uploads, health checks, graceful shutdown, Docker-ready.' },
    { icon:'🛡️', title:'Guardrails & Safety',       desc:'Input/output validation and content filtering built into every framework adapter.' },
    { icon:'🔄', title:'Multi-Agent Orchestration', desc:'Sequential, hierarchical, supervisor, swarm, graph, handoff, agent-as-tool patterns.' },
  ];
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel}>Enterprise Features</div>
        <h2 className={styles.sectionTitle}>Built for the Real World</h2>
        <p className={styles.sectionSubtitle}>Go from prototype to production without building the plumbing yourself.</p>
      </div>
      <div className={styles.pillarsGrid}>
        {items.map((p, i) => (
          <Anim key={i} delay={i * 55}>
            <div className={styles.pillarCard}>
              <span className={styles.pillarIcon}>{p.icon}</span>
              <div className={styles.pillarTitle}>{p.title}</div>
              <div className={styles.pillarDesc}>{p.desc}</div>
            </div>
          </Anim>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════ ROI ══════════════════════════════════════ */
function ROI() {
  const items = [
    { icon:'⏱️', title:'Faster Time to Market',       desc:'Config-driven agents replace weeks of custom code. Go from idea to production in days.',           metric:'10x Faster' },
    { icon:'🔄', title:'Zero Vendor Lock-In',          desc:'Four AI frameworks, one codebase. Switch engines with a config change. Investment protected.',      metric:'4 Engines' },
    { icon:'💰', title:'Reduced Development Cost',     desc:'Shared core, built-in server, MCP reuse, and auto-testing eliminate redundant work across teams.',   metric:'60% Less Code' },
    { icon:'🛡️', title:'Enterprise Confidence',       desc:'Security, observability, guardrails, and quality testing built in from day one — not bolted on.',   metric:'Day 1 Ready' },
    { icon:'📈', title:'Scalable Tool Ecosystem',      desc:'Build an MCP tool once, share across every agent. Lazy loading handles 100s of tools gracefully.', metric:'∞ Tools' },
    { icon:'🧪', title:'Quality Assurance Built-In',   desc:'AI evaluator catches regressions before production with 3 scoring dimensions and CI/CD integration.', metric:'Auto-Tested' },
  ];
  return (
    <section className={`${styles.section} ${styles.sectionDark}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel}>Business Impact</div>
        <h2 className={styles.sectionTitle}>Why It Matters</h2>
        <p className={styles.sectionSubtitle}>Real outcomes — accelerate delivery, reduce risk, scale with confidence across your organization.</p>
      </div>
      <div className={styles.roiGrid}>
        {items.map((item, i) => (
          <Anim key={i} delay={i * 75}>
            <div className={styles.roiCard}>
              <div className={styles.roiIconWrap}>{item.icon}</div>
              <div>
                <div className={styles.roiTitle}>{item.title}</div>
                <div className={styles.roiDesc}>{item.desc}</div>
                <span className={styles.roiMetric}>{item.metric}</span>
              </div>
            </div>
          </Anim>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════ CTA ══════════════════════════════════════ */
function CTA() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaGlow} />
      <Orbs />
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>Ready to Accelerate Your AI Journey?</h2>
        <p className={styles.ctaSubtitle}>One platform. Four frameworks. Unlimited tool connections. Enterprise-grade from day one. Start building agents that deliver real business value.</p>
        <div className={styles.heroActions}>
          <Link to="/docs/" className={styles.btnPrimary}>📖 Explore Full Docs</Link>
          <Link to="/docs/development/quick-start" className={styles.btnSecondary}>🚀 Quick Start Guide</Link>
          <Link to="/blog" className={styles.btnTertiary}>📰 Read the Blog</Link>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════ PAGE ══════════════════════════════════════ */
export default function ExecutivePage() {
  return (
    <Layout title="Executive Overview — OAI Agent Development Kit" description="VP-level overview of the OAI ADK: unified enterprise AI agent platform.">
      <Hero />
      <Stats />
      <ProblemSolution />
      <Simplicity />
      <MCP />
      <LazyMCP />
      <UseCases />
      <Journey />
      <KnowledgeMemory />
      <Frameworks />
      <Evaluator />
      <Architecture />
      <Pillars />
      <ROI />
      <CTA />
    </Layout>
  );
}
