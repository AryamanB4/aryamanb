import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "../styles.css";

const ROUTES = {
  home: {
    hash: "#/",
    title: "Aryaman Bhatia | Home",
    label: "Home",
  },
  experience: {
    hash: "#/experience",
    title: "Aryaman Bhatia | Experience",
    label: "Experience",
  },
  projects: {
    hash: "#/projects",
    title: "Aryaman Bhatia | Projects",
    label: "Projects",
  },
  resume: {
    hash: "#/resume",
    title: "Aryaman Bhatia | Resume",
    label: "Resume",
  },
};

function normalizeRoute(hash) {
  if (hash === ROUTES.experience.hash) {
    return "experience";
  }
  if (hash === ROUTES.projects.hash) {
    return "projects";
  }
  if (hash === ROUTES.resume.hash) {
    return "resume";
  }
  return "home";
}

function Nav({ currentRoute, darkMode, onToggleDarkMode }) {
  const navItems = ["home", "experience", "projects", "resume"];

  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="brand"><span className="dot"></span> Aryaman Bhatia</div>
        <div className="top-actions">
          <button
            type="button"
            className="mode-toggle"
            onClick={onToggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span aria-hidden="true">{darkMode ? "☀" : "☾"}</span>
          </button>
          <nav>
            {navItems.map((key) => {
              const route = ROUTES[key];
              return (
                <a
                  key={key}
                  href={route.hash}
                  style={currentRoute === key ? { background: "rgba(37,99,235,0.14)", borderColor: "rgba(37,99,235,0.34)", color: darkMode ? "#eaf0ff" : "rgba(15,23,42,1)" } : undefined}
                >
                  {route.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const [allReviewsExpanded, setAllReviewsExpanded] = useState(false);

  const syncExpandedState = () => {
    const details = Array.from(document.querySelectorAll(".review-dropdown"));
    setAllReviewsExpanded(details.length > 0 && details.every((item) => item.open));
  };

  const toggleAllReviews = () => {
    const nextState = !allReviewsExpanded;
    document.querySelectorAll(".review-dropdown").forEach((item) => {
      item.open = nextState;
    });
    setAllReviewsExpanded(nextState);
  };

  return (
    <div className="wrap hero">
      <div className="hero-grid">
        <div className="panel hero-main">
          <div className="blob"></div>
          <div className="kicker">Queen's Computing | Product/Tech | Leadership</div>
          <h1><span>Aryaman</span><span>Bhatia</span></h1>
          <p className="subtitle">
            I'm a Queen's University Computing student majoring in Computer Science and specializing in Software Design.
            I'm interested in creating practical projects that solve genuine problems, and I love working with people to
            build something bigger than what one person could do alone. Other than school and my project, I'm also interested in-
          </p>

          <ul className="bullets" style={{ marginTop: "10px" }}>
            <li>Consumer tech</li>
            <li>Environmental change</li>
            <li>Bingeing sitcoms</li>
          </ul>

          <p className="subtitle" style={{ marginTop: "10px" }}>
            <strong>Feel free to reach out - always happy to talk!</strong>
          </p>
        </div>

        <div className="panel side">
          <div className="mini">
            <h3>Links</h3>
            <p>
              <a href="https://www.linkedin.com/in/aryaman-bhatia-b78388372/" target="_blank" rel="noreferrer">LinkedIn</a> |
              <a href="https://github.com/AryamanB4" target="_blank" rel="noreferrer">GitHub</a> |
              <a href="mailto:aryaman.bhatia1@gmail.com">Email</a>
            </p>
            <div className="tags">
              <span className="tag">Operations</span>
              <span className="tag">Hackathons</span>
              <span className="tag">Tech</span>
              <span className="tag">Systems</span>
            </div>
          </div>

          <div className="mini">
            <h3>Currently</h3>
            <p>Co-Director of Logistics @ QHacks | Events Coordinator @ COMPSA | Director of Research & Insight @ QDAA</p>
          </div>

          <div className="mini cta-mini">
            <h3>Explore</h3>
            <div className="btnrow">
              <a className="btn" href={ROUTES.experience.hash}>Experience</a>
              <a className="btn" href={ROUTES.projects.hash}>Projects</a>
              <a className="btn" href={ROUTES.resume.hash}>Resume</a>
              <a className="btn" href="mailto:aryaman.bhatia1@gmail.com">Email</a>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="section-title home-section-title">
          <h2>TV Show Ranking</h2>
          <button type="button" className="review-toggle-all" onClick={toggleAllReviews}>
            {allReviewsExpanded ? "Collapse All" : "Expand All"}
          </button>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Show</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>Friends</td>
              <td>
                <details className="review-dropdown" onToggle={syncExpandedState}>
                  <summary>Read review</summary>
                  <p>
                    This is my comfort show and I can start it from literally any episode. It is always fun and easy to rewatch,
                    no matter what mood I am in. Also, to end the debate once and for all, they were on a break.
                  </p>
                </details>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Modern Family</td>
              <td>
                <details className="review-dropdown" onToggle={syncExpandedState}>
                  <summary>Read review</summary>
                  <p>
                    I love this show because the characters are so well written and every episode stays engaging. Watching the
                    kids grow up while I was growing up too made it feel way more personal. It is one of those shows that is
                    both funny and wholesome at the same time.
                  </p>
                </details>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>How I Met Your Mother</td>
              <td>
                <details className="review-dropdown" onToggle={syncExpandedState}>
                  <summary>Read review</summary>
                  <p>
                    This is basically my friend group's favorite show. We are always quoting random lines from it in conversations.
                    It just has that perfect mix of humor and moments that stick with you.
                  </p>
                </details>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Suits</td>
              <td>
                <details className="review-dropdown" onToggle={syncExpandedState}>
                  <summary>Read review</summary>
                  <p>
                    Mike and Harvey are honestly a goated duo. Their chemistry and the pace of the show make every episode fun to watch.
                    It almost made me want to go into law for a minute.
                  </p>
                </details>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Brooklyn Nine-Nine</td>
              <td>
                <details className="review-dropdown" onToggle={syncExpandedState}>
                  <summary>Read review</summary>
                  <p>
                    This was the first sitcom I ever watched, so it will always have a special place in my heart. The cast dynamic
                    is so good, and the show never takes itself too seriously. The Halloween heist episodes are still some of my favorites.
                  </p>
                </details>
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>The Boys</td>
              <td>
                <details className="review-dropdown" onToggle={syncExpandedState}>
                  <summary>Read review</summary>
                  <p>
                    This is superhero TV done right. It is funny when it needs to be, but it also has a really strong story underneath.
                    I like how it keeps surprising you while still being entertaining every episode.
                  </p>
                </details>
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>Invincible</td>
              <td>
                <details className="review-dropdown" onToggle={syncExpandedState}>
                  <summary>Read review</summary>
                  <p>
                    Another really well-written show that I genuinely enjoy. It brings out that childlike excitement in me, but
                    it still has depth and serious moments. Definitely one of my favorite animated shows right now.
                  </p>
                </details>
              </td>
            </tr>
            <tr>
              <td>8</td>
              <td>The Office</td>
              <td>
                <details className="review-dropdown" onToggle={syncExpandedState}>
                  <summary>Read review</summary>
                  <p>
                    I still love this show and there are so many iconic moments in it. But once Michael left, it definitely
                    dropped a level for me. I still rewatch it, just mostly for the earlier seasons.
                  </p>
                </details>
              </td>
            </tr>
            <tr>
              <td>9</td>
              <td>The Rookie</td>
              <td>
                <details className="review-dropdown" onToggle={syncExpandedState}>
                  <summary>Read review</summary>
                  <p>
                    I have not watched past season 6 yet, but I still really like the show. The characters and pacing make it
                    easy to keep watching. I was genuinely sad when Jackson died.
                  </p>
                </details>
              </td>
            </tr>
            <tr>
              <td>10</td>
              <td>Blood of Zeus</td>
              <td>
                <details className="review-dropdown" onToggle={syncExpandedState}>
                  <summary>Read review</summary>
                  <p>
                    Such a well-written anime, especially if you like Greek mythology. I like how it blends mythological themes
                    with strong character arcs and action. It is one of the more underrated animated series for me.
                  </p>
                </details>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function ExperiencePage() {
  const [allExperienceExpanded, setAllExperienceExpanded] = useState(false);

  const syncExperienceExpandedState = () => {
    const details = Array.from(document.querySelectorAll(".experience-dropdown"));
    setAllExperienceExpanded(details.length > 0 && details.every((item) => item.open));
  };

  const toggleAllExperience = () => {
    const nextState = !allExperienceExpanded;
    document.querySelectorAll(".experience-dropdown").forEach((item) => {
      item.open = nextState;
    });
    setAllExperienceExpanded(nextState);
  };

  return (
    <div className="wrap">
      <div className="section-title experience-section-title">
        <h2>Experience</h2>
        <button type="button" className="review-toggle-all" onClick={toggleAllExperience}>
          {allExperienceExpanded ? "Collapse All" : "Expand All"}
        </button>
      </div>

      <div className="grid">
        <details className="card experience-dropdown" onToggle={syncExperienceExpandedState}>
          <summary>
            <h3>Technical Support Intern - Tech Mahindra</h3>
            <div className="meta">Dubai, UAE | Jun 2024 - Aug 2024</div>
          </summary>
          <ul className="bullets">
            <li>Analyzed large datasets to spot performance gaps.</li>
            <li>Delivered insights to support efficiency improvements.</li>
          </ul>
        </details>

        <details className="card experience-dropdown" onToggle={syncExperienceExpandedState}>
          <summary>
            <h3>International Student Ambassador - Queen's University</h3>
            <div className="meta">Kingston, ON | Sep 2024 - Present</div>
          </summary>
          <ul className="bullets">
            <li>Supported international students adapting to Queen's.</li>
            <li>Acted as a liaison to improve student services.</li>
          </ul>
        </details>

        <details className="card experience-dropdown" onToggle={syncExperienceExpandedState}>
          <summary>
            <h3>Co-Director of Logistics - QHacks</h3>
            <div className="meta">Kingston, ON | Sep 2024 - Present</div>
          </summary>
          <ul className="bullets">
            <li>Coordinated venues, vendors, and services for the event.</li>
            <li>Helped ensure smooth execution for 500+ participants.</li>
          </ul>
        </details>

        <details className="card experience-dropdown" onToggle={syncExperienceExpandedState}>
          <summary>
            <h3>Director of Research & Insight - QDAA</h3>
            <div className="meta">Kingston, ON | Sep 2024 - Present</div>
          </summary>
          <ul className="bullets">
            <li>Led analysis of tech industry trends and insights.</li>
            <li>Published newsletters/social content for the community.</li>
          </ul>
        </details>

        <details className="card experience-dropdown" onToggle={syncExperienceExpandedState}>
          <summary>
            <h3>Project Manager - Merlin Neurotech</h3>
            <div className="meta">Kingston, ON | Sep 2024 - Apr 2025</div>
          </summary>
          <ul className="bullets">
            <li>Managed timeline and team collaboration end-to-end.</li>
            <li>Built a neuroscience game using real-time EEG/EMG signals.</li>
          </ul>
        </details>

        <details className="card experience-dropdown" onToggle={syncExperienceExpandedState}>
          <summary>
            <h3>Events Coordinator - COMPSA</h3>
            <div className="meta">Kingston, ON | Sep 2024 - Present</div>
          </summary>
          <ul className="bullets">
            <li>Organized athletics events to engage students.</li>
            <li>Collaborated across portfolios on cross-functional events.</li>
          </ul>
        </details>

        <details className="card experience-dropdown" onToggle={syncExperienceExpandedState}>
          <summary>
            <h3>Co-Director of Technology - E-waste Alliance (NPO)</h3>
            <div className="meta">Dubai, UAE | Oct 2021 - Aug 2024</div>
          </summary>
          <ul className="bullets">
            <li>Improved efficiency/security with tools and IT policies.</li>
            <li>Streamlined communication and event management systems.</li>
          </ul>
        </details>

        <div className="card">
          <h3>Contact</h3>
          <div className="meta">let's connect</div>
          <div className="links">
            <a href="mailto:aryaman.bhatia1@gmail.com">Email</a>
            <a href="https://www.linkedin.com/in/aryaman-bhatia-b78388372/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={ROUTES.projects.hash}>Projects</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsPage() {
  const [allProjectsExpanded, setAllProjectsExpanded] = useState(false);

  const syncProjectsExpandedState = () => {
    const details = Array.from(document.querySelectorAll(".project-dropdown"));
    setAllProjectsExpanded(details.length > 0 && details.every((item) => item.open));
  };

  const toggleAllProjects = () => {
    const nextState = !allProjectsExpanded;
    document.querySelectorAll(".project-dropdown").forEach((item) => {
      item.open = nextState;
    });
    setAllProjectsExpanded(nextState);
  };

  return (
    <div className="wrap">
      <div className="section-title experience-section-title">
        <h2>Projects</h2>
        <button type="button" className="review-toggle-all" onClick={toggleAllProjects}>
          {allProjectsExpanded ? "Collapse All" : "Expand All"}
        </button>
      </div>

      <div className="grid">
        <details className="card experience-dropdown project-dropdown" onToggle={syncProjectsExpandedState}>
          <summary>
            <h3>MedQuick</h3>
            <div className="meta">Healthcare workflow concept</div>
          </summary>
          <p>
            Simplifies hospital admin by condensing patient data into a secure QR code so check-in is faster and paperwork is reduced.
          </p>
          <ul className="bullets">
            <li>Designed a quick patient info flow using QR-based transfer.</li>
            <li>Focused on speed, privacy, and reducing bottlenecks.</li>
          </ul>
        </details>

        <details className="card experience-dropdown project-dropdown" onToggle={syncProjectsExpandedState}>
          <summary>
            <h3>Neurotech Game (EEG/EMG) - Merlin Neurotech</h3>
            <div className="meta">Project management + real-time biosignals</div>
          </summary>
          <p>
            Led a team building a neuroscience-driven game integrating real-time EEG and EMG data.
          </p>
          <ul className="bullets">
            <li>Owned milestones, coordination, and delivery timeline.</li>
            <li>Bridged dev + research collaboration.</li>
          </ul>
        </details>

        <details className="card experience-dropdown project-dropdown" onToggle={syncProjectsExpandedState}>
          <summary>
            <h3>Tech Industry Insights - QDAA</h3>
            <div className="meta">Analysis + publishing</div>
          </summary>
          <p>
            Led a team analyzing data trends in tech and publishing insights via newsletters and social posts.
          </p>
          <ul className="bullets">
            <li>Turned trends into clear, shareable takeaways.</li>
            <li>Built consistent content output for the community.</li>
          </ul>
        </details>

        <details className="card experience-dropdown project-dropdown" onToggle={syncProjectsExpandedState}>
          <summary>
            <h3>Hackathon Ops Systems - QHacks</h3>
            <div className="meta">Logistics + execution</div>
          </summary>
          <p>
            Built planning systems that make large events run smoothly (checklists, coordination, comms).
          </p>
          <ul className="bullets">
            <li>Coordinated vendors, services, and on-site operations.</li>
            <li>Optimized reliability for a 500+ person event.</li>
          </ul>
        </details>
      </div>
    </div>
  );
}

function ResumePage() {
  return (
    <div className="wrap">
      <div className="section-title">
        <h2>Resume</h2>
        <span>view / download</span>
      </div>

      <div className="card">
        <div className="btnrow">
          <a className="btn primary" href="/resume.pdf" target="_blank" rel="noreferrer">Open PDF</a>
          <a className="btn" href="/resume.pdf" download>Download</a>
        </div>
        <p style={{ marginTop: "12px" }}>
          If the PDF viewer doesn't load in your browser, click <b>Open PDF</b>.
        </p>
      </div>

      <iframe className="pdf" src="/resume.pdf" title="Resume PDF"></iframe>
    </div>
  );
}

function App() {
  const [currentRoute, setCurrentRoute] = useState(() => normalizeRoute(window.location.hash));
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = ROUTES.home.hash;
    }

    const handleHashChange = () => {
      setCurrentRoute(normalizeRoute(window.location.hash));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    document.title = ROUTES[currentRoute].title;
  }, [currentRoute]);

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  useEffect(() => {
    document.querySelectorAll(".btn").forEach((btn) => btn.classList.add("shimmer"));
  }, [currentRoute]);

  const page = useMemo(() => {
    if (currentRoute === "experience") {
      return <ExperiencePage />;
    }
    if (currentRoute === "projects") {
      return <ProjectsPage />;
    }
    if (currentRoute === "resume") {
      return <ResumePage />;
    }
    return <HomePage />;
  }, [currentRoute]);

  return (
    <>
      <Nav currentRoute={currentRoute} darkMode={darkMode} onToggleDarkMode={() => setDarkMode((prev) => !prev)} />
      {page}
      <div className="wrap">
        <footer>
          &copy; {new Date().getFullYear()} Aryaman Bhatia
        </footer>
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
