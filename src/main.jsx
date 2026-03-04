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
  const [selectedMobileReview, setSelectedMobileReview] = useState(null);
  const [revealedSpoilers, setRevealedSpoilers] = useState({});

  const revealSpoiler = (id) => {
    setRevealedSpoilers((prev) => ({ ...prev, [id]: true }));
  };

  const renderReview = (reviewParts) =>
    reviewParts.map((part, index) => {
      if (!part.spoiler) {
        return (
          <span key={`${part.id || "plain"}-${index}`}>
            {part.text}{" "}
          </span>
        );
      }

      const isRevealed = !!revealedSpoilers[part.id];
      return (
        <span
          key={part.id}
          className={`spoiler-inline ${isRevealed ? "is-revealed" : ""}`}
        >
          <span className="spoiler-text">{part.text}</span>
          {!isRevealed && (
            <button
              type="button"
              className="spoiler-toggle"
              onClick={() => revealSpoiler(part.id)}
            >
              Spoiler - Click to reveal
            </button>
          )}
        </span>
      );
    });

  const showRankings = [
    {
      id: "friends-review",
      rank: 1,
      show: "Friends",
      reviewParts: [
        { text: "This is my comfort show and I can start it from almost any episode and still enjoy it. The rewatch value is unreal because every character has moments that never get old, and the balance between humor and emotion is exactly why it stays at number one for me." },
        { id: "friends-spoiler-1", spoiler: true, text: "Even after so many rewatches, Ross and Rachel's on-a-break arc still starts arguments every single time." },
      ],
    },
    {
      id: "modern-family-review",
      rank: 2,
      show: "Modern Family",
      reviewParts: [
        { text: "I love this show because the writing stays sharp across so many seasons, and every family dynamic feels different in a good way. Watching the kids grow up while I was growing up made it feel a lot more personal, and the jokes still land even on repeat." },
        { id: "modern-family-spoiler-1", spoiler: true, text: "The emotional episodes around major family milestones hit harder than most sitcoms expect you to feel." },
      ],
    },
    {
      id: "himym-review",
      rank: 3,
      show: "How I Met Your Mother",
      reviewParts: [
        { text: "This is basically my friend group's favorite show, and we quote random lines from it all the time. It has that perfect mix of running jokes, ridiculous storytelling, and emotional moments that unexpectedly stay with you." },
        { id: "himym-spoiler-1", spoiler: true, text: "The final stretch is still one of the most debated sitcom endings, and it always sparks a full discussion." },
      ],
    },
    {
      id: "suits-review",
      rank: 4,
      show: "Suits",
      reviewParts: [
        { text: "Mike and Harvey are honestly one of my favorite duos in TV. The pacing, confidence, and back-and-forth in every episode make the show super easy to binge, and it almost convinced me to go into law for a while." },
        { id: "suits-spoiler-1", spoiler: true, text: "Once the secret starts becoming public, the stakes and tension go up in a way that changes the whole tone." },
      ],
    },
    {
      id: "b99-review",
      rank: 5,
      show: "Brooklyn Nine-Nine",
      reviewParts: [
        { text: "This was the first sitcom I watched properly, so it will always be special to me. The cast dynamic is amazing, the humor stays light without feeling shallow, and the Halloween heists are still some of my favorite recurring episodes in any show." },
        { id: "b99-spoiler-1", spoiler: true, text: "Even when the show handles heavier topics, it still keeps the characters feeling real and close." },
      ],
    },
    {
      id: "boys-review",
      rank: 6,
      show: "The Boys",
      reviewParts: [
        { text: "This is superhero TV done right for me. It is chaotic, funny, and sharp when it needs to be, but underneath all of that there is still a really strong story and commentary that keeps you hooked." },
        { id: "boys-spoiler-1", spoiler: true, text: "The major power shifts between characters every season keep raising the stakes in ways you do not see coming." },
      ],
    },
    {
      id: "invincible-review",
      rank: 7,
      show: "Invincible",
      reviewParts: [
        { text: "Another really well-written show that I genuinely enjoy. It brings out that childlike excitement from superhero animation, but it still has real emotional weight and consequences that make it stand out." },
        { id: "invincible-spoiler-1", spoiler: true, text: "Some of the family reveal moments completely shift your understanding of the main conflict." },
      ],
    },
    {
      id: "office-review",
      rank: 8,
      show: "The Office",
      reviewParts: [
        { text: "I still love this show and there are so many iconic moments that I can rewatch forever. The awkward humor and character bits are still unmatched, even if some seasons work better than others." },
        { id: "office-spoiler-1", spoiler: true, text: "After Michael leaves, the energy changes a lot, so I mostly revisit the earlier seasons first." },
      ],
    },
    {
      id: "rookie-review",
      rank: 9,
      show: "The Rookie",
      reviewParts: [
        { text: "I have not watched past season 6 yet, but I still really like the show. The pacing is easy to follow, the cast chemistry works well, and it is one of those series you can keep watching without forcing it." },
        { id: "rookie-spoiler-1", spoiler: true, text: "Jackson's death was genuinely one of the hardest moments in the show for me." },
      ],
    },
    {
      id: "boz-review",
      rank: 10,
      show: "Blood of Zeus",
      reviewParts: [
        { text: "Such a well-written animated show, especially if you like Greek mythology. I like how it blends mythological themes with solid character arcs and action scenes without feeling empty." },
        { id: "boz-spoiler-1", spoiler: true, text: "The conflict between gods and family loyalties creates some of the strongest turning points in the series." },
      ],
    },
  ];

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

  const toggleReviewFromShow = (id, show, reviewParts) => {
    const detail = document.getElementById(id);
    if (!detail) {
      return;
    }
    detail.open = !detail.open;
    syncExpandedState();
    setSelectedMobileReview(detail.open ? { id, show, reviewParts } : null);
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
              {showRankings.map((item) => (
                <tr key={item.id}>
                  <td>{item.rank}</td>
                  <td>
                    <button
                      type="button"
                      className="show-review-trigger"
                      onClick={() => toggleReviewFromShow(item.id, item.show, item.reviewParts)}
                    >
                      {item.show}
                    </button>
                  </td>
                  <td>
                    <details id={item.id} className="review-dropdown" onToggle={syncExpandedState}>
                      <summary>Read review</summary>
                      <p>{renderReview(item.reviewParts)}</p>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedMobileReview && (
          <div className="mobile-review-panel">
            <h3>{selectedMobileReview.show}</h3>
            <p>{renderReview(selectedMobileReview.reviewParts)}</p>
          </div>
        )}
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
      <div className="section-title experience-section-title">
        <h2>Resume</h2>
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
