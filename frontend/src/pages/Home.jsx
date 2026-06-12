import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="home">

      {/* HEADER */}

      <header className="header">

        <div className="logo">
          LearningRoadmap
        </div>

        <nav>

          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#testimonials">Reviews</a>

        </nav>

        <div className="auth-buttons">

          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="signup-btn">
              Sign Up
            </button>
          </Link>

        </div>

      </header>

      {/* HERO */}

      <section className="hero">

        <div className="hero-left">

          <h1>
            Build Your Learning Roadmap
            With AI
          </h1>

          <p>
            Create personalized study plans,
            track progress, and achieve your
            career goals faster.
          </p>

          <Link to="/signup">

            <button className="hero-btn">
              Start Building Free
            </button>

          </Link>

        </div>

        <div className="hero-right">

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="dashboard"
          />

        </div>

      </section>

      {/* ROADMAP PREVIEW */}

      <section className="preview">

        <h2>
          Interactive Roadmap Preview
        </h2>

        <div className="roadmap-preview">

          <div className="week-card">
            Week 1
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>Mini Project</li>
            </ul>
          </div>

          <div className="week-card">
            Week 2
            <ul>
              <li>JavaScript</li>
              <li>DOM</li>
              <li>Portfolio</li>
            </ul>
          </div>

          <div className="week-card">
            Week 3
            <ul>
              <li>React</li>
              <li>Hooks</li>
              <li>Dashboard</li>
            </ul>
          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section
        className="features"
        id="features"
      >

        <h2>Core Features</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>AI Roadmaps</h3>
            <p>
              Generate personalized learning
              paths instantly.
            </p>
          </div>

          <div className="feature-card">
            <h3>Progress Tracking</h3>
            <p>
              Monitor your completion
              percentage in real time.
            </p>
          </div>

          <div className="feature-card">
            <h3>Weekly Goals</h3>
            <p>
              Stay focused with structured
              learning objectives.
            </p>
          </div>

          <div className="feature-card">
            <h3>Projects</h3>
            <p>
              Practice with real-world
              projects every week.
            </p>
          </div>

        </div>

      </section>

      {/* INTEGRATIONS */}

      <section className="integrations">

        <h2>
          Collaboration & Integrations
        </h2>

        <p>
          Connect your workflow with
          Jira, Slack, GitHub,
          Notion and Google Calendar.
        </p>

      </section>

      {/* TESTIMONIALS */}

      <section
        className="testimonials"
        id="testimonials"
      >

        <h2>What Users Say</h2>

        <div className="testimonial-card">

          <p>
            "This roadmap system helped me
            become a frontend developer in
            just a few months."
          </p>

          <h4>
            - Software Engineer
          </h4>

        </div>

        <div className="testimonial-card">

          <p>
            "The AI roadmap saved me weeks
            of planning."
          </p>

          <h4>
            - College Student
          </h4>

        </div>

      </section>

      {/* PRICING */}

      <section
        className="pricing"
        id="pricing"
      >

        <h2>Pricing</h2>

        <div className="pricing-grid">

          <div className="price-card">

            <h3>Free</h3>

            <h1>₹0</h1>

            <p>
              Basic roadmap generation
            </p>

          </div>

          <div className="price-card premium">

            <h3>Premium</h3>

            <h1>₹299</h1>

            <p>
              Advanced analytics and AI
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="cta">

        <h2>
          Ready To Build Your Future?
        </h2>

        <Link to="/signup">

          <button className="hero-btn">
            Start For Free
          </button>

        </Link>

      </section>

      {/* FOOTER */}

      <footer className="footer">

        <div>
          LearningRoadmap © 2026
        </div>

        <div>

          <a href="#">
            Documentation
          </a>

          <a href="#">
            Blog
          </a>

          <a href="#">
            GitHub
          </a>

        </div>

      </footer>

    </div>
  );
}

export default Home;