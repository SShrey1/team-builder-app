import { useState } from 'react';
import './App.css';

const SKILLS = ['React', 'Node.js', 'Python', 'ML/AI', 'Flutter', 'UI/UX', 'Backend', 'DevOps'];

const PROJECTS = [
  { id: 1, title: 'Fintech App', skills: 'React, Node.js', members: 2, slots: 4, owner: 'Priya S.' },
  { id: 2, title: 'AI Chatbot', skills: 'Python, ML/AI', members: 1, slots: 4, owner: 'Rahul M.' },
  { id: 3, title: 'Health Tracker', skills: 'Flutter, Backend', members: 3, slots: 4, owner: 'Sneha K.' },
];

// ─── HOME ───────────────────────────────────────────
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
        <div className="home-card accent" onClick={() => setPage('ai')}>
          <span className="card-icon">🤖</span>
          <div>
            <div className="card-title">AI Team Match</div>
            <div className="card-sub">Let AI build your team</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE ────────────────────────────────────────
function Profile() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [saved, setSaved] = useState(false);

  const toggleSkill = (skill) =>
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );

  const handleSave = () => {
    if (!name.trim()) return alert('Please enter your name!');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="page">
      <h2 className="page-title">My Profile</h2>
      <p className="page-sub">Tell us about yourself</p>

      <label className="label">Full Name</label>
      <input className="input" placeholder="e.g. Arjun Kumar" value={name} onChange={e => setName(e.target.value)} />

      <label className="label">Role / Title</label>
      <input className="input" placeholder="e.g. Full Stack Developer" value={role} onChange={e => setRole(e.target.value)} />

      <label className="label">Skills</label>
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

      <button className={`btn-primary ${saved ? 'success' : ''}`} onClick={handleSave}>
        {saved ? 'Profile Saved!' : 'Save Profile'}
      </button>
    </div>
  );
}

// ─── PROJECTS ───────────────────────────────────────
function Projects() {
  const [projects, setProjects] = useState(PROJECTS);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [slots, setSlots] = useState('');

  const addProject = () => {
    if (!title.trim()) return;
    setProjects(prev => [...prev, { id: Date.now(), title, skills, members: 1, slots: parseInt(slots) || 3, owner: 'You' }]);
    setTitle(''); setSkills(''); setSlots('');
    setShowForm(false);
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
          <input className="input" placeholder="Skills needed (e.g. React, ML)" value={skills} onChange={e => setSkills(e.target.value)} />
          <input className="input" placeholder="Open slots (e.g. 3)" value={slots} onChange={e => setSlots(e.target.value)} type="number" />
          <button className="btn-primary" style={{ marginTop: 8 }} onClick={addProject}>Post Project</button>
        </div>
      )}

      <div className="project-list">
        {projects.map(p => (
          <div className="project-card" key={p.id}>
            <div className="project-card-top">
              <span className="project-card-title">{p.title}</span>
              <span className="badge">{p.members}/{p.slots} members</span>
            </div>
            <div className="project-card-skills">Skills: {p.skills}</div>
            <div className="project-card-bottom">
              <span className="project-card-owner">Owner: {p.owner}</span>
              <button className="join-btn">Join Team</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── AI MATCH ───────────────────────────────────────
function AIMatch() {
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [approved, setApproved] = useState(false);

  const handleMatch = () => {
    if (!goal.trim()) return;
    setLoading(true);
    setResult(null);
    setApproved(false);
    setTimeout(() => {
      setLoading(false);
      setResult({
        message: 'Here is your suggested team for the hackathon! I have drafted intro messages for each member.',
        roles: 'Frontend Lead · Backend Dev · Designer',
        matches: [
          { name: 'Priya S.', role: 'React Developer', match: '95%' },
          { name: 'Rahul M.', role: 'Backend Node.js', match: '88%' },
          { name: 'Sneha K.', role: 'UI/UX Designer', match: '82%' },
        ],
        nextSteps: ['Review profiles', 'Approve intro messages', 'Set up group chat'],
      });
    }, 2000);
  };

  return (
    <div className="page">
      <div className="ai-header">
        <div className="ai-icon">🤖</div>
        <div className="ai-title">AI Team Concierge</div>
        <div className="ai-sub">Tell me your goal and I will find your team</div>
      </div>

      <textarea
        className="ai-input"
        placeholder="e.g. Build my team for a fintech hack (need React + backend + pitch)"
        value={goal}
        onChange={e => setGoal(e.target.value)}
      />

      <button className="btn-primary" onClick={handleMatch}>Find My Team</button>

      {loading && (
        <div className="loading">
          <div className="spinner">⚙️</div>
          <div>AI is finding best matches...</div>
        </div>
      )}

      {result && !loading && (
        <div style={{ marginTop: 24 }}>
          <p className="result-msg">{result.message}</p>
          <p className="result-roles">{result.roles}</p>

          <div className="section-label">Suggested Members</div>
          {result.matches.map((m, i) => (
            <div className="member-card" key={i}>
              <div>
                <div className="member-name">{m.name}</div>
                <div className="member-role">{m.role}</div>
              </div>
              <div className="match-pct">{m.match}</div>
            </div>
          ))}

          <div className="section-label">Next Steps</div>
          <div className="steps">
            {result.nextSteps.map((s, i) => (
              <div className="step" key={i}>- {s}</div>
            ))}
          </div>

          <div className="trust-box">
            <div className="trust-title">AI suggests — you decide</div>
            <div className="trust-text">Review the matches above. Approve to send intro messages.</div>
            <button className={`btn-primary ${approved ? 'success' : ''}`} onClick={() => setApproved(true)}>
              {approved ? 'Messages Approved!' : 'Approve and Send Intros'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── APP ────────────────────────────────────────────
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
          <button className={`nav-btn ${page === 'ai' ? 'active' : ''}`} onClick={() => setPage('ai')}>AI Match</button>
        </div>
      </nav>

      {page === 'home' && <Home setPage={setPage} />}
      {page === 'profile' && <Profile />}
      {page === 'projects' && <Projects />}
      {page === 'ai' && <AIMatch />}

      <div className="footer">SRMIST Hackathon 2026</div>
    </>
  );
}
