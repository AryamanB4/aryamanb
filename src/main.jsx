import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "../styles.css";

const ROUTES = {
  home: { hash: "#/", title: "Aryaman Bhatia", label: "About" },
  experience: { hash: "#/experience", title: "Aryaman Bhatia | Experience", label: "Experience" },
  projects: { hash: "#/projects", title: "Aryaman Bhatia | Projects", label: "Projects" },
  tv: { hash: "#/tv", title: "Aryaman Bhatia | TV Rankings", label: "TV" },
  resume: { hash: "#/resume", title: "Aryaman Bhatia | Resume", label: "Resume" },
};

const experiences = [
  {
    company: "Pinnacle IBP", role: "Software Engineer Intern", place: "Dubai, UAE", dates: "Jun 2026 - Aug 2026",
    bullets: ["Developed CRM software to manage 100+ client records, building 3+ workflows used by a 5+ member team to organize client information and day-to-day operations.", "Tested existing CRM functionality and reworked inefficient workflows to simplify maintenance and support future feature development.", "Worked directly with business stakeholders to understand operational needs, turn them into CRM features, and prioritize improvements based on team requirements."],
  },
  {
    company: "Tech Mahindra", role: "Technical Support Intern", place: "Dubai, UAE", dates: "Jun 2025 - Aug 2025",
    bullets: ["Analyzed 10,000+ performance records to identify system bottlenecks and recurring issues, contributing to a 15% improvement in response efficiency.", "Troubleshot enterprise software issues alongside engineering teams and helped escalate technical problems for faster resolution.", "Reviewed recurring technical incidents to identify common support issues and highlight areas where internal processes could be improved."],
  },
  {
    company: "QHacks", role: "Co-Chair", place: "Kingston, ON", dates: "May 2025 - Present", current: true,
    bullets: ["Lead operations for a national hackathon with 500+ participants, coordinating 15+ vendors, 50+ volunteers, multiple venues, and logistics for the 48-hour event.", "Coordinate planning across operations, partnerships, technology, and participant experience teams to keep event preparation on schedule."],
  },
  {
    company: "Queen's University School of Computing", role: "Teaching Assistant - CISC 204 Logic for Computing", place: "Kingston, ON", dates: "Sep 2026 - Present", current: true,
    bullets: ["Support undergraduate students during tutorials by breaking down discrete mathematics and computing concepts and answering technical questions.", "Evaluate coursework and provide feedback on students' mathematical reasoning, problem-solving approaches, and technical accuracy."],
  },
  {
    company: "Queen's University Vice-Provost Global Engagement Office", role: "Lead International Student Ambassador", place: "Kingston, ON", dates: "Apr 2025 - Present", current: true,
    bullets: ["Lead mentorship, recruitment, and transition programming supporting 100+ international students as they prepare for and begin university.", "Represent Queen's at campus tours, recruitment events, and outreach programs while answering questions from prospective and incoming international students."],
  },
  {
    company: "Queen's UX Club (QUX)", role: "Web Developer", place: "Kingston, ON", dates: "Jun 2026 - Present", current: true,
    bullets: ["Maintain and improve the QUX website, keeping club resources accessible and supporting new digital initiatives as they are launched.", "Build internal tools that bring emails, contacts, and organizational information into one place for easier access across club teams."],
  },
];

const projects = [
  {
    name: "SwingIO", type: "Golf coaching platform",
    description: "A computer-vision golf coaching platform that analyzes live and recorded swings and turns movement into personalized feedback.",
    bullets: ["Developed workflows that identify swing phases, score technique, and generate personalized feedback.", "Built motion-analysis and ball-tracking features that highlight areas for improvement and surface relevant coaching clips."],
    stack: ["Computer Vision", "Motion Analysis", "Full-stack"],
  },
  {
    name: "DeepShield", type: "Image authenticity",
    description: "A full-stack image-authenticity platform for signing, validating, and evaluating digital images.",
    bullets: ["Built the platform using Next.js, TypeScript, and Tailwind CSS.", "Implemented SHA-256 hashing and signed PNG metadata verification to detect pixel-level changes, alongside AI-image detection for unsigned files."],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "SHA-256"],
    links: [{ label: "GitHub", href: "https://github.com/abdelrmobarak/hackher2026" }, { label: "Demo", href: "https://drive.google.com/file/d/1hYpWCdb1xWgOdngYKJJe9UQjRfBu9vM4/view?usp=sharing" }],
  },
  {
    name: "UniPulse", type: "Operations dashboard",
    description: "A centralized dashboard for administrative workflows and team information supporting a global community of 50,000+ students.",
    bullets: ["Consolidated administrative workflows into one internal tool.", "Streamlined payroll and recordkeeping across ambassador activity and operational records."],
    stack: ["Dashboards", "Operations", "Data"],
  },
];

const shows = [
  { name: "Friends", review: "This is my comfort show and I can start it from literally any episode. It is always fun and easy to rewatch, no matter what mood I am in.", spoiler: "To end the debate for once and for all, Ross and Rachel were on a BREAK." },
  { name: "Modern Family", review: "I love this show because the characters are so well written and every episode stays engaging. Watching the kids grow up while I was growing up too made it feel way more personal. It is one of those shows that is both funny and wholesome at the same time." },
  { name: "How I Met Your Mother", review: "This is basically my friend group's favorite show. We are always quoting random lines from it in conversations. It just has that perfect mix of humor and moments that stick with you.", spoiler: "Tracy (the mom) being introduced so far late in the show and Ted going back to Robin in the final episode boils my blood every time." },
  { name: "Suits", review: "Mike and Harvey are honestly a goated duo. Their chemistry and the pace of the show make every episode fun to watch. It almost made me want to go into law for a minute.", spoiler: "Once Mike and Rachel leave, the show kind of starts going down from there." },
  { name: "Brooklyn Nine-Nine", review: "This was the first sitcom I ever watched, so it will always have a special place in my heart. The cast dynamic is so good, and the show never takes itself too seriously. The Halloween heist episodes are still some of my favorites." },
  { name: "The Boys", review: "This is superhero TV done right. It is funny when it needs to be, but it also has a really strong story underneath. I like how it keeps surprising you while still being entertaining every episode." },
  { name: "Invincible", review: "Another really well-written show that I genuinely enjoy. It brings out that childlike excitement in me, but it still has depth and serious moments. Definitely one of my favorite animated shows right now." },
  { name: "The Office", review: "I still love this show and there are so many iconic moments in it.", spoiler: "Once Michael leaves, I usually stop watching in my rewatches. Still an enjoyable show, but it was goated in the earlier ones." },
  { name: "The Rookie", review: "I have not watched past season 6 yet, but I still really like the show. The characters and pacing make it easy to keep watching.", spoiler: "Jackson's death was lowkey traumatic, I loved that character." },
  { name: "Blood of Zeus", review: "Such a well-written anime, especially if you like Greek mythology. I like how it blends mythological themes with strong character arcs and action. It is one of the more underrated animated series for me." },
];

function normalizeRoute(hash) {
  const key = hash?.replace("#/", "");
  return Object.prototype.hasOwnProperty.call(ROUTES, key) ? key : "home";
}

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? "↗" : "→"}</span>;
}

function Header({ currentRoute, darkMode, onToggleDarkMode }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#/" aria-label="Aryaman Bhatia, home"><span className="wordmark-mark">AB</span><span>Aryaman Bhatia</span></a>
        <div className="header-actions">
          <nav aria-label="Primary navigation">
            {Object.entries(ROUTES).map(([key, route]) => <a key={key} href={route.hash} aria-current={currentRoute === key ? "page" : undefined}>{route.label}</a>)}
          </nav>
          <button className="theme-toggle" type="button" onClick={onToggleDarkMode} aria-label="Toggle colour theme">{darkMode ? "Light" : "Dark"}</button>
        </div>
      </div>
    </header>
  );
}

function SectionHeading({ title, count }) {
  return <div className="section-heading"><h2>{title}{count !== undefined && <sup>{count}</sup>}</h2></div>;
}

function ExperienceList({ items = experiences }) {
  const [openRow, setOpenRow] = useState(null);
  const toggleRow = (key) => setOpenRow((current) => current === key ? null : key);

  return (
    <div className="index-list">
      {items.map((item) => {
        const key = `${item.company}-${item.role}`;
        const isOpen = openRow === key;
        return (
        <div className={`index-row ${isOpen ? "is-open" : ""}`} key={key}>
          <button className="row-summary" type="button" aria-expanded={isOpen} onClick={() => toggleRow(key)}>
            <span className={`status-dot ${item.current ? "is-current" : ""}`} aria-hidden="true" />
            <span className="row-main"><strong>{item.company}</strong><span className="row-separator">·</span><span>{item.role}</span></span>
            <span className="row-date">{item.dates}</span>
            <span className="expand-icon" aria-hidden="true" />
          </button>
          <div className="detail-shell" aria-hidden={!isOpen}><div className="row-detail"><p className="row-location">{item.place}</p><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div></div>
        </div>
      )})}
    </div>
  );
}

function ProjectList({ items = projects }) {
  const [openRow, setOpenRow] = useState(null);
  const toggleRow = (key) => setOpenRow((current) => current === key ? null : key);

  return (
    <div className="index-list project-list">
      {items.map((project, index) => {
        const isOpen = openRow === project.name;
        return (
        <div className={`index-row project-row ${isOpen ? "is-open" : ""}`} key={project.name}>
          <button className="row-summary" type="button" aria-expanded={isOpen} onClick={() => toggleRow(project.name)}><span className="project-number">0{index + 1}</span><span className="row-main"><strong>{project.name}</strong><span>{project.type}</span></span><span className="expand-icon" aria-hidden="true" /></button>
          <div className="detail-shell" aria-hidden={!isOpen}><div className="row-detail project-detail">
            <p className="project-description">{project.description}</p>
            <ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            <div className="tag-list">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
            {project.links && <div className="inline-links">{project.links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label} <Arrow diagonal /></a>)}</div>}
          </div></div>
        </div>
      )})}
    </div>
  );
}

function ShowList() {
  const [openRow, setOpenRow] = useState(null);
  const [revealedSpoilers, setRevealedSpoilers] = useState({});
  const toggleRow = (key) => setOpenRow((current) => current === key ? null : key);
  const spoilerShows = shows.filter((show) => show.spoiler);
  const allSpoilersRevealed = spoilerShows.every((show) => revealedSpoilers[show.name]);
  const revealAllSpoilers = () => setRevealedSpoilers(Object.fromEntries(spoilerShows.map((show) => [show.name, true])));

  return (
    <div className="show-panel">
      <div className="spoiler-actions">
        <button type="button" onClick={revealAllSpoilers} disabled={allSpoilersRevealed}>Reveal all spoilers</button>
        <button type="button" onClick={() => setRevealedSpoilers({})} disabled={Object.keys(revealedSpoilers).length === 0}>Reblur spoilers</button>
      </div>
      <div className="show-list">
      {shows.map(({ name, review, spoiler }, index) => {
        const isOpen = openRow === name;
        const spoilerRevealed = !!revealedSpoilers[name];
        return (
        <div className={`show-row ${isOpen ? "is-open" : ""}`} key={name}>
          <button className="show-summary" type="button" aria-expanded={isOpen} onClick={() => toggleRow(name)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{name}</strong><span className="show-plus" /></button>
          <div className="detail-shell" aria-hidden={!isOpen}><div className="show-review">
            <p>{review}</p>
            {spoiler && <div className={`spoiler-line ${spoilerRevealed ? "is-revealed" : ""}`}><span className="spoiler-copy">{spoiler}</span>{!spoilerRevealed && <button type="button" className="spoiler-reveal" onClick={() => setRevealedSpoilers((items) => ({ ...items, [name]: true }))}>Spoiler - click to reveal</button>}</div>}
          </div></div>
        </div>
      )})}
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <main className="home-page">
      <section className="intro page-shell">
        <div className="intro-title">
          <h1>Aryaman Bhatia</h1>
          <p className="intro-meta">Toronto / Kingston · Queen's University</p>
        </div>
        <div className="intro-copy">
          <p>Hi, I'm <strong>Aryaman Bhatia</strong>, a Computer Science student at <strong className="queens-wordmark"><span className="queens-blue">Queen's </span><span className="queens-gold">U</span><span className="queens-red">niversity</span></strong> specializing in <strong>Software Design</strong>. I enjoy building and optimizing solutions to real-world problems to create <strong>meaningful impact</strong>.</p>
          <p>Outside of coding, I explore <strong>new technologies</strong> and train for <strong className="sport golf">golf</strong> and <strong className="sport badminton">badminton</strong>.</p>
          <div className="contact-line"><a href="https://www.linkedin.com/in/aryaman-bhatia-b78388372/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/AryamanB4" target="_blank" rel="noreferrer">GitHub</a></div>
        </div>
      </section>
      <div className="page-shell content-stack">
        <section id="experience"><SectionHeading title="Experience" count={experiences.length} /><ExperienceList /></section>
        <section id="projects"><SectionHeading title="Projects" count={projects.length} /><ProjectList /></section>
      </div>
    </main>
  );
}

function TvPage() {
  return <main className="page-shell subpage"><div className="page-intro"><h1>TV ranking<sup>{shows.length}</sup></h1><p>My completely subjective list. Open a title for the take.</p></div><ShowList /></main>;
}

function ResumePage() {
  return <main className="page-shell subpage resume-page"><div className="page-intro resume-intro"><h1>Résumé</h1><div className="resume-actions"><a href="/resume.pdf" target="_blank" rel="noreferrer">Open PDF <Arrow diagonal /></a><a href="/resume.pdf" download>Download <Arrow /></a></div></div><iframe className="pdf-frame" src="/resume.pdf" title="Aryaman Bhatia resume" /></main>;
}

function Footer() {
  return <footer className="page-shell site-footer"><span className="motto">Omnia bene evenient</span><div className="footer-links"><a href="https://www.linkedin.com/in/aryaman-bhatia-b78388372/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/AryamanB4" target="_blank" rel="noreferrer">GitHub</a><a href="mailto:aryaman.bhatia1@gmail.com">Email</a></div></footer>;
}

function App() {
  const [currentRoute, setCurrentRoute] = useState(() => normalizeRoute(window.location.hash));
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  useEffect(() => {
    if (!window.location.hash) window.location.hash = ROUTES.home.hash;
    const handleHashChange = () => { setCurrentRoute(normalizeRoute(window.location.hash)); window.scrollTo({ top: 0, behavior: "smooth" }); };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  useEffect(() => {
    document.title = ROUTES[currentRoute].title;
    if (currentRoute === "experience" || currentRoute === "projects") {
      requestAnimationFrame(() => document.getElementById(currentRoute)?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentRoute]);
  useEffect(() => { document.documentElement.dataset.theme = darkMode ? "dark" : "light"; localStorage.setItem("theme", darkMode ? "dark" : "light"); }, [darkMode]);
  let page = <HomePage />;
  if (currentRoute === "tv") page = <TvPage />;
  if (currentRoute === "resume") page = <ResumePage />;
  return <><Header currentRoute={currentRoute} darkMode={darkMode} onToggleDarkMode={() => setDarkMode((value) => !value)} />{page}<Footer /></>;
}

createRoot(document.getElementById("root")).render(<App />);
