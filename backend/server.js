const { buildTeam } = require("./teamAgent");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./firebase");

const app = express();
app.use(cors());
app.use(express.json());

// Root
app.get("/", (req, res) => {
  res.send("Backend running!");
});

// Create User
app.post("/createUser", async (req, res) => {
  try {
    const { name, skills, availability } = req.body;
    if (!name || !skills || !availability)
      return res.status(400).json({ error: "All fields required" });

    const ref = await db.collection("users").add({ name, skills, availability });
    res.json({ message: "User created", id: ref.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Project
app.post("/createProject", async (req, res) => {
  try {
    const { title, skillsRequired, description } = req.body;
    if (!title || !skillsRequired || !description)
      return res.status(400).json({ error: "All fields required" });

    const ref = await db.collection("projects").add({ title, skillsRequired, description });
    res.json({ message: "Project created", id: ref.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Projects
app.get("/getProjects", async (req, res) => {
  try {
    const snapshot = await db.collection("projects").get();
    const projects = [];
    snapshot.forEach(doc => projects.push({ id: doc.id, ...doc.data() }));
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Skill Match
app.post("/match", async (req, res) => {
  try {
    const { userSkills } = req.body;
    if (!userSkills) return res.status(400).json({ error: "userSkills required" });

    const snapshot = await db.collection("projects").get();
    const matched = [];
    snapshot.forEach(doc => {
      const project = doc.data();
      const isMatch = project.skillsRequired.some(skill => userSkills.includes(skill));
      if (isMatch) matched.push({ id: doc.id, ...project });
    });
    res.json(matched);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AI Team Builder (fallback, no OpenAI needed)
app.post("/ai/build-team", async (req, res) => {
  try {
    const { idea } = req.body;
    if (!idea) return res.status(400).json({ error: "Idea is required" });

    const result = buildTeam(idea);
    res.json({ result: result.aiSummary, details: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Test Firebase
app.get("/test-db", async (req, res) => {
  try {
    await db.collection("test").add({ message: "Firebase connected!", time: new Date() });
    res.send("Firebase working!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));