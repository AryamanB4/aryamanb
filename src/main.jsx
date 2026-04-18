import React, { useEffect, useMemo, useRef, useState } from "react";
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

function HeroBlobEasterEgg() {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const buttonRef = useRef(null);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const explodedRef = useRef(false);
  const blobRef = useRef({
    x: 0,
    y: 0,
    vx: 170,
    vy: 125,
    radius: 178,
    driftTimer: 0,
  });
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return undefined;
    }

    const syncCanvasSize = () => {
      const rect = stage.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const blob = blobRef.current;
      const maxX = Math.max(rect.width - blob.radius * 2, 0);
      const maxY = Math.max(rect.height - blob.radius * 2, 0);
      blob.x = Math.min(blob.x, maxX);
      blob.y = Math.min(blob.y, maxY);
    };

    const positionBlobButton = () => {
      const button = buttonRef.current;
      if (!button) {
        return;
      }
      const blob = blobRef.current;
      const hitPadding = 96;
      button.style.transform = `translate(${blob.x - hitPadding}px, ${blob.y - hitPadding}px)`;
      button.style.width = `${blob.radius * 2 + hitPadding * 2}px`;
      button.style.height = `${blob.radius * 2 + hitPadding * 2}px`;
    };

    const drawBlobParticle = (x, y, radius, alpha = 0.6) => {
      context.save();
      context.globalAlpha = alpha;
      context.filter = "blur(14px)";
      const gradient = context.createRadialGradient(
        x - radius * 0.35,
        y - radius * 0.35,
        radius * 0.12,
        x,
        y,
        radius
      );
      gradient.addColorStop(0, "rgba(96,165,250,0.78)");
      gradient.addColorStop(1, "rgba(37,99,235,0.38)");
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const drawParticles = () => {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      context.clearRect(0, 0, width, height);

      for (const particle of particlesRef.current) {
        drawBlobParticle(particle.x, particle.y, particle.radius);
      }
    };

    const step = (timestamp) => {
      if (!canvas.dataset.lastTime) {
        canvas.dataset.lastTime = String(timestamp);
      }

      const width = stage.clientWidth;
      const height = stage.clientHeight;
      const lastTime = Number(canvas.dataset.lastTime);
      const delta = Math.min((timestamp - lastTime) / 1000, 0.032);
      canvas.dataset.lastTime = String(timestamp);

      if (!explodedRef.current) {
        const blob = blobRef.current;
        const maxX = Math.max(width - blob.radius * 2, 0);
        const maxY = Math.max(height - blob.radius * 2, 0);

        blob.driftTimer -= delta;
        if (blob.driftTimer <= 0) {
          blob.vx += (Math.random() - 0.5) * 70;
          blob.vy += (Math.random() - 0.5) * 70;
          blob.driftTimer = 0.6 + Math.random() * 1.3;
        }

        blob.x += blob.vx * delta;
        blob.y += blob.vy * delta;

        if (blob.x <= 0) {
          blob.x = 0;
          blob.vx = 120 + Math.random() * 120;
        } else if (blob.x >= maxX) {
          blob.x = maxX;
          blob.vx = -(120 + Math.random() * 120);
        }

        if (blob.y <= 0) {
          blob.y = 0;
          blob.vy = 100 + Math.random() * 120;
        } else if (blob.y >= maxY) {
          blob.y = maxY;
          blob.vy = -(100 + Math.random() * 120);
        }

        positionBlobButton();
      }

      const gravity = 760;

      for (const particle of particlesRef.current) {
        if (particle.settled) {
          continue;
        }

        particle.vy += gravity * delta;
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;

        if (particle.x - particle.radius <= 0) {
          particle.x = particle.radius;
          particle.vx = Math.abs(particle.vx) * 0.86;
        } else if (particle.x + particle.radius >= width) {
          particle.x = width - particle.radius;
          particle.vx = -Math.abs(particle.vx) * 0.86;
        }

        if (particle.y - particle.radius <= 0) {
          particle.y = particle.radius;
          particle.vy = Math.abs(particle.vy) * 0.8;
        } else if (particle.y + particle.radius >= height) {
          particle.y = height - particle.radius;
          particle.vy = -Math.abs(particle.vy) * 0.6;
          particle.vx *= 0.96;

          if (Math.abs(particle.vy) < 14) {
            particle.vy = 0;
          }
          if (Math.abs(particle.vx) < 5) {
            particle.vx = 0;
          }
          if (particle.vy === 0 && particle.vx === 0) {
            particle.settled = true;
          }
        }

      }

      drawParticles();
      animationFrameRef.current = window.requestAnimationFrame(step);
    };

    syncCanvasSize();
    const initialRadius = Math.max(Math.min(stage.clientWidth, 390) * 0.42, 170);
    blobRef.current = {
      x: Math.max(stage.clientWidth * 0.08, 0),
      y: Math.max(stage.clientHeight * 0.08, 0),
      vx: 170,
      vy: 125,
      radius: initialRadius,
      driftTimer: 0.8,
    };
    positionBlobButton();
    drawParticles();
    canvas.dataset.lastTime = "";
    animationFrameRef.current = window.requestAnimationFrame(step);

    window.addEventListener("resize", syncCanvasSize);

    return () => {
      window.removeEventListener("resize", syncCanvasSize);
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      particlesRef.current = [];
      canvas.dataset.lastTime = "";
      context.clearRect(0, 0, stage.clientWidth, stage.clientHeight);
    };
  }, []);

  return (
    <div className={`blob-stage ${exploded ? "is-exploded" : ""}`} ref={stageRef}>
      <canvas ref={canvasRef} className="blob-canvas"></canvas>
      {!exploded && (
        <button
          type="button"
          ref={buttonRef}
          className="blob-button"
          aria-label="Secret bouncing ball easter egg"
          title="Try clicking the bouncing ball"
          onClick={() => {
            explodedRef.current = true;
            setExploded(true);
            const blob = blobRef.current;
            const centerX = blob.x + blob.radius;
            const centerY = blob.y + blob.radius;
            const particleCount = 36;

            particlesRef.current = Array.from({ length: particleCount }, () => {
              const angle = Math.random() * Math.PI * 2;
              const speed = 220 + Math.random() * 260;
              const radius = 9 + Math.random() * 16;

              return {
                x: centerX + (Math.random() - 0.5) * 24,
                y: centerY + (Math.random() - 0.5) * 24,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 180,
                radius,
                settled: false,
              };
            });
          }}
        ></button>
      )}
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
        { text: "This is my comfort show and I can start it from literally any episode. It is always fun and easy to rewatch, no matter what mood I am in." },
        { id: "friends-spoiler-1", spoiler: true, text: "To end the debate for once and for all, Ross and Rachel were on a BREAK." },
      ],
    },
    {
      id: "modern-family-review",
      rank: 2,
      show: "Modern Family",
      reviewParts: [
        { text: "I love this show because the characters are so well written and every episode stays engaging. Watching the kids grow up while I was growing up too made it feel way more personal. It is one of those shows that is both funny and wholesome at the same time." },
      ],
    },
    {
      id: "himym-review",
      rank: 3,
      show: "How I Met Your Mother",
      reviewParts: [
        { text: "This is basically my friend group's favorite show. We are always quoting random lines from it in conversations. It just has that perfect mix of humor and moments that stick with you." },
        { id: "himym-spoiler-1", spoiler: true, text: "Tracy (the mom) being introduced so far late in the show and Ted going back to Robin in the final episode boils my blood every time." },
      ],
    },
    {
      id: "suits-review",
      rank: 4,
      show: "Suits",
      reviewParts: [
        { text: "Mike and Harvey are honestly a goated duo. Their chemistry and the pace of the show make every episode fun to watch. It almost made me want to go into law for a minute." },
        { id: "suits-spoiler-1", spoiler: true, text: "Once Mike and Rachel leave, the show kind of starts going down from there." },
      ],
    },
    {
      id: "b99-review",
      rank: 5,
      show: "Brooklyn Nine-Nine",
      reviewParts: [
        { text: "This was the first sitcom I ever watched, so it will always have a special place in my heart. The cast dynamic is so good, and the show never takes itself too seriously. The Halloween heist episodes are still some of my favorites." },
      ],
    },
    {
      id: "boys-review",
      rank: 6,
      show: "The Boys",
      reviewParts: [
        { text: "This is superhero TV done right. It is funny when it needs to be, but it also has a really strong story underneath. I like how it keeps surprising you while still being entertaining every episode." },
      ],
    },
    {
      id: "invincible-review",
      rank: 7,
      show: "Invincible",
      reviewParts: [
        { text: "Another really well-written show that I genuinely enjoy. It brings out that childlike excitement in me, but it still has depth and serious moments. Definitely one of my favorite animated shows right now." },
      ],
    },
    {
      id: "office-review",
      rank: 8,
      show: "The Office",
      reviewParts: [
        { text: "I still love this show and there are so many iconic moments in it." },
        { id: "office-spoiler-1", spoiler: true, text: "Once Michael leaves, I usually stop watching in my rewatches. Still an enjoyable show, but it was goated in the earlier ones." },
      ],
    },
    {
      id: "rookie-review",
      rank: 9,
      show: "The Rookie",
      reviewParts: [
        { text: "I have not watched past season 6 yet, but I still really like the show. The characters and pacing make it easy to keep watching." },
        { id: "rookie-spoiler-1", spoiler: true, text: "Jackson's death was lowkey traumatic, I loved that character." },
      ],
    },
    {
      id: "boz-review",
      rank: 10,
      show: "Blood of Zeus",
      reviewParts: [
        { text: "Such a well-written anime, especially if you like Greek mythology. I like how it blends mythological themes with strong character arcs and action. It is one of the more underrated animated series for me." },
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

  const hideAllSpoilers = () => {
    setRevealedSpoilers({});
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
          <HeroBlobEasterEgg />
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
          <div className="review-actions">
            <button type="button" className="review-toggle-all" onClick={toggleAllReviews}>
              {allReviewsExpanded ? "Collapse All" : "Expand All"}
            </button>
            <button
              type="button"
              className="review-toggle-all"
              onClick={hideAllSpoilers}
              disabled={Object.keys(revealedSpoilers).length === 0}
            >
              Hide Spoilers
            </button>
          </div>
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
            <h3>Tech Mahindra</h3>
            <div className="meta">Dubai, UAE | Jun 2024 - Aug 2024</div>
          </summary>
          <ul className="bullets">
            <li><strong>Role:</strong> Technical Support Intern</li>
            <li>Analyzed large datasets to spot performance gaps.</li>
            <li>Delivered insights to support efficiency improvements.</li>
          </ul>
        </details>

        <details className="card experience-dropdown" onToggle={syncExperienceExpandedState}>
          <summary>
            <h3>Queen's University</h3>
            <div className="meta">Kingston, ON | Sep 2024 - Present</div>
          </summary>
          <ul className="bullets">
            <li><strong>Role:</strong> International Student Ambassador</li>
            <li>Supported international students adapting to Queen's.</li>
            <li>Acted as a liaison to improve student services.</li>
          </ul>
        </details>

        <details className="card experience-dropdown" onToggle={syncExperienceExpandedState}>
          <summary>
            <h3>QHacks</h3>
            <div className="meta">Kingston, ON | Sep 2024 - Present</div>
          </summary>
          <ul className="bullets">
            <li><strong>Roles:</strong> Co-Director of Logistics, Co-Chair</li>
            <li>Coordinated venues, vendors, and services for the event.</li>
            <li>Helped ensure smooth execution for 500+ participants.</li>
          </ul>
        </details>

        <details className="card experience-dropdown" onToggle={syncExperienceExpandedState}>
          <summary>
            <h3>QDAA</h3>
            <div className="meta">Kingston, ON | Sep 2024 - Present</div>
          </summary>
          <ul className="bullets">
            <li><strong>Role:</strong> Director of Research & Insight</li>
            <li>Led analysis of tech industry trends and insights.</li>
            <li>Published newsletters/social content for the community.</li>
          </ul>
        </details>

        <details className="card experience-dropdown" onToggle={syncExperienceExpandedState}>
          <summary>
            <h3>Merlin Neurotech</h3>
            <div className="meta">Kingston, ON | Sep 2024 - Apr 2025</div>
          </summary>
          <ul className="bullets">
            <li><strong>Role:</strong> Project Manager</li>
            <li>Managed timeline and team collaboration end-to-end.</li>
            <li>Built a neuroscience game using real-time EEG/EMG signals.</li>
          </ul>
        </details>

        <details className="card experience-dropdown" onToggle={syncExperienceExpandedState}>
          <summary>
            <h3>COMPSA</h3>
            <div className="meta">Kingston, ON | Sep 2024 - Present</div>
          </summary>
          <ul className="bullets">
            <li><strong>Role:</strong> Events Coordinator</li>
            <li>Organized athletics events to engage students.</li>
            <li>Collaborated across portfolios on cross-functional events.</li>
          </ul>
        </details>

        <details className="card experience-dropdown" onToggle={syncExperienceExpandedState}>
          <summary>
            <h3>E-waste Alliance (NPO)</h3>
            <div className="meta">Dubai, UAE | Oct 2021 - Aug 2024</div>
          </summary>
          <ul className="bullets">
            <li><strong>Role:</strong> Co-Director of Technology</li>
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
            <h3>DeepShield</h3>
            <div className="meta">AI deepfake detection project</div>
          </summary>
          <p>
            Built DeepShield to detect manipulated media and improve trust in digital content through an accessible detection workflow.
          </p>
          <ul className="bullets">
            <li>Created during HackHer 2026 with a focus on practical, user-friendly verification.</li>
            <li>Combined technical implementation with clear demo storytelling and delivery.</li>
          </ul>
          <div className="btnrow">
            <a className="btn" href="https://github.com/abdelrmobarak/hackher2026" target="_blank" rel="noreferrer">GitHub</a>
            <a className="btn" href="https://www.youtube.com/watch?v=qTgxovIvxF0&feature=youtu.be" target="_blank" rel="noreferrer">Demo</a>
          </div>
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
