import { useState, useEffect } from 'react';
import './App.css';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const SKILLS = ['React', 'Node.js', 'Python', 'ML/AI', 'Flutter', 'UI/UX', 'Backend', 'DevOps'];

// ─── HOME ────────────────────────────────────────────
function Home({ setPage }) {
  return (
    <div className="page home">
      <div className="home-emoji">🚀</div>
      <h1 className="home-title">Team Builder</h1>
      <p className="home-sub">Find your dream hackathon squad</p>
      <div className="home-cards">
        <div className="home-card" onClick={() => setPage('profile')}>
          <span className="card-icon">👤</span>
          <div>
            <div className="card-title">My Profile</div>
            <div className="card-sub">Set your skills and availability</div>
          </div>
        </div>
        <div className="home-card" onClick={() => setPage('projects')}>
          <span className="card-icon">📁</span>
          <div>
            <div className="card-title">Browse Projects</div>
            <div className="card-sub">Find teams looking for you</div>
          </div>
        </div>
        <div className="home-card" onClick={() => setPage('match')}>
          <span className="card-icon">🎯</span>
          <div>
            <div className="card-title">Skill Match</div>
            <div className="card-sub">Find projects matching your skills</div>
          </div>
        </div>
        <div className="home-card accent" onClick={() => setPage('ai')}>
          <span className="card-icon">🤖</span>
          <div>
            <div className="card-title">AI Team Builder</div>
            <div className="card-sub">Let AI build your team</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE ─────────────────────────────────────────
function Profile() {
  const [name, setName] = useState('');
  const [availability, setAvailability] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleSkill = (skill) =>
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );

  const handleSave = async () => {
    if (!name.trim() || !availability.trim() || selectedSkills.length === 0) {
      setStatus('error');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/createUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, skills: selectedSkills, availability }),
      });
      const data = await res.json();
      if (data.id) {
        setStatus('saved');
        setName(''); setAvailability(''); setSelectedSkills([]);
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <h2 className="page-title">My Profile</h2>
      <p className="page-sub">Create your profile to join projects</p>

      <label className="label">Full Name</label>
      <input className="input" placeholder="e.g. Arjun Kumar" value={name} onChange={e => setName(e.target.value)} />

      <label className="label">Availability</label>
      <input className="input" placeholder="e.g. Weekends, Full-time" value={availability} onChange={e => setAvailability(e.target.value)} />

      <label className="label">Skills (select all that apply)</label>
      <div className="skill-grid">
        {SKILLS.map(skill => (
          <div
            key={skill}
            className={`skill-chip ${selectedSkills.includes(skill) ? 'active' : ''}`}
            onClick={() => toggleSkill(skill)}
          >
            {skill}
          </div>
        ))}
      </div>

      {status === 'error' && <p className="error-msg">Please fill all fields and select at least one skill.</p>}
      {status === 'saved' && <p className="success-msg">Profile saved to database!</p>}

      <button className="btn-primary" onClick={handleSave} disabled={loading}>
        {loading ? 'Saving...' : 'Save Profile'}
      </button>
    </div>
  );
}

// ─── PROJECTS ────────────────────────────────────────
function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [status, setStatus] = useState('');

  const fetchProjects = async () => {
    setFetching(true);
    try {
      const res = await fetch(`${API}/getProjects`);
      const data = await res.json();
      setProjects(data);
    } catch {
      setProjects([]);
    }
    setFetching(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const toggleSkill = (skill) =>
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );

  const addProject = async () => {
    if (!title.trim() || !description.trim() || selectedSkills.length === 0) {
      setStatus('error'); return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/createProject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, skillsRequired: selectedSkills }),
      });
      const data = await res.json();
      if (data.id) {
        setTitle(''); setDescription(''); setSelectedSkills([]);
        setShowForm(false); setStatus('');
        fetchProjects();
      }
    } catch {
      setStatus('error');
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <div className="project-header">
        <div>
          <h2 className="page-title">Projects</h2>
          <p className="page-sub">Browse or create a project</p>
        </div>
        <button className="btn-secondary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Project'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <input className="input" placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} />
          <input className="input" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={{ marginTop: 10 }} />
          <label className="label" style={{ marginTop: 12 }}>Skills Required</label>
          <div className="skill-grid">
            {SKILLS.map(skill => (
              <div
                key={skill}
                className={`skill-chip ${selectedSkills.includes(skill) ? 'active' : ''}`}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </div>
            ))}
          </div>
          {status === 'error' && <p className="error-msg">Please fill all fields.</p>}
          <button className="btn-primary" style={{ marginTop: 12 }} onClick={addProject} disabled={loading}>
            {loading ? 'Posting...' : 'Post Project'}
          </button>
        </div>
      )}

      {fetching ? (
        <div className="loading"><div className="spinner">⚙️</div><div>Loading projects...</div></div>
      ) : projects.length === 0 ? (
        <div className="empty">No projects yet. Be the first to create one!</div>
      ) : (
        <div className="project-list">
          {projects.map(p => (
            <div className="project-card" key={p.id}>
              <div className="project-card-top">
                <span className="project-card-title">{p.title}</span>
              </div>
              <div className="project-card-skills">
                {p.description && <div style={{ marginBottom: 6, color: '#ccc' }}>{p.description}</div>}
                Skills: {Array.isArray(p.skillsRequired) ? p.skillsRequired.join(', ') : p.skillsRequired}
              </div>
              <div className="project-card-bottom">
                <span className="project-card-owner"></span>
                <button className="join-btn">Join Team</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SKILL MATCH ─────────────────────────────────────
function SkillMatch() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleSkill = (skill) =>
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );

  const handleMatch = async () => {
    if (selectedSkills.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userSkills: selectedSkills }),
      });
      const data = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <h2 className="page-title">Skill Match</h2>
      <p className="page-sub">Select your skills to find matching projects</p>

      <label className="label">Your Skills</label>
      <div className="skill-grid">
        {SKILLS.map(skill => (
          <div
            key={skill}
            className={`skill-chip ${selectedSkills.includes(skill) ? 'active' : ''}`}
            onClick={() => toggleSkill(skill)}
          >
            {skill}
          </div>
        ))}
      </div>

      <button className="btn-primary" onClick={handleMatch} disabled={loading || selectedSkills.length === 0}>
        {loading ? 'Matching...' : 'Find Matching Projects'}
      </button>

      {results !== null && (
        <div style={{ marginTop: 28 }}>
          <div className="section-label">
            {results.length === 0 ? 'No matches found' : `${results.length} Matching Project(s)`}
          </div>
          <div className="project-list">
            {results.map(p => (
              <div className="project-card" key={p.id}>
                <div className="project-card-top">
                  <span className="project-card-title">{p.title}</span>
                </div>
                <div className="project-card-skills">
                  {p.description && <div style={{ marginBottom: 6, color: '#ccc' }}>{p.description}</div>}
                  Skills: {Array.isArray(p.skillsRequired) ? p.skillsRequired.join(', ') : p.skillsRequired}
                </div>
                <div className="project-card-bottom">
                  <button className="join-btn">Join Team</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AI TEAM BUILDER ─────────────────────────────────
function AIMatch() {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleBuild = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${API}/ai/build-team`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });
      const data = await res.json();
      setResult(data.result);
    } catch {
      setResult('Could not connect to backend. Make sure server is running on port 5000.');
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <div className="ai-header">
        <div className="ai-icon">🤖</div>
        <div className="ai-title">AI Team Builder</div>
        <div className="ai-sub">Describe your idea and AI will suggest your team</div>
      </div>

      <textarea
        className="ai-input"
        placeholder="e.g. Build a fintech app that helps students manage expenses"
        value={idea}
        onChange={e => setIdea(e.target.value)}
      />

      <button className="btn-primary" onClick={handleBuild} disabled={loading}>
        {loading ? 'Building your team...' : 'Build My Team'}
      </button>

      {loading && (
        <div className="loading">
          <div className="spinner">⚙️</div>
          <div>AI is building your team...</div>
        </div>
      )}

      {result && !loading && (
        <div className="result-box">
          <div className="section-label">AI Recommendation</div>
          <div className="ai-result">{result}</div>
        </div>
      )}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('home');

  return (
    <>
      <nav className="nav">
        <span className="nav-logo">🚀 Team Builder</span>
        <div className="nav-links">
          <button className={`nav-btn ${page === 'home' ? 'active' : ''}`} onClick={() => setPage('home')}>Home</button>
          <button className={`nav-btn ${page === 'profile' ? 'active' : ''}`} onClick={() => setPage('profile')}>Profile</button>
          <button className={`nav-btn ${page === 'projects' ? 'active' : ''}`} onClick={() => setPage('projects')}>Projects</button>
          <button className={`nav-btn ${page === 'match' ? 'active' : ''}`} onClick={() => setPage('match')}>Skill Match</button>
          <button className={`nav-btn ${page === 'ai' ? 'active' : ''}`} onClick={() => setPage('ai')}>AI Builder</button>
        </div>
      </nav>

      {page === 'home' && <Home setPage={setPage} />}
      {page === 'profile' && <Profile />}
      {page === 'projects' && <Projects />}
      {page === 'match' && <SkillMatch />}
      {page === 'ai' && <AIMatch />}

      <div className="footer">SRMIST Hackathon 2026</div>
    </>
  );
}