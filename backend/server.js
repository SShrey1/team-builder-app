require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const db = require("./firebase");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI Setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Root Route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});


// 🔹 Create User
app.post("/createUser", async (req, res) => {
  try {
    const { name, skills, availability } = req.body;

    if (!name || !skills || !availability) {
      return res.status(400).json({ error: "All fields required" });
    }

    const userRef = await db.collection("users").add({
      name,
      skills,
      availability,
    });

    res.json({ message: "User created", id: userRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔹 Create Project
app.post("/createProject", async (req, res) => {
  try {
    const { title, skillsRequired, description } = req.body;

    if (!title || !skillsRequired || !description) {
      return res.status(400).json({ error: "All fields required" });
    }

    const projectRef = await db.collection("projects").add({
      title,
      skillsRequired,
      description,
    });

    res.json({ message: "Project created", id: projectRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔹 Get Projects
app.get("/getProjects", async (req, res) => {
  try {
    const snapshot = await db.collection("projects").get();

    let projects = [];
    snapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔹 Skill Match API
app.post("/match", async (req, res) => {
  try {
    const { userSkills } = req.body;

    if (!userSkills) {
      return res.status(400).json({ error: "userSkills required" });
    }

    const snapshot = await db.collection("projects").get();

    let matchedProjects = [];

    snapshot.forEach((doc) => {
      const project = doc.data();

      const match = project.skillsRequired.some((skill) =>
        userSkills.includes(skill)
      );

      if (match) {
        matchedProjects.push({ id: doc.id, ...project });
      }
    });

    res.json(matchedProjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔥 AI TEAM BUILDER ENDPOINT
app.post("/ai/build-team", async (req, res) => {
  try {
    const { idea } = req.body;

    if (!idea) {
      return res.status(400).json({ error: "Idea is required" });
    }

    let result;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Build a hackathon team for this idea: ${idea}`,
          },
        ],
      });

      result = response.choices[0].message.content;

    } catch (err) {
      console.log("AI failed, using fallback");

      // 🔥 FALLBACK RESPONSE
      result = `
Team Roles:
- Frontend Developer (React)
- Backend Developer (Node.js)
- UI/UX Designer

Suggested Structure:
3–4 members working collaboratively

Intro Message:
"Hi! I'm building a project on ${idea}. Looking for teammates skilled in frontend, backend, and design. Let's collaborate and build something amazing!"
      `;
    }

    res.json({ result });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔹 Test Firebase
app.get("/test-db", async (req, res) => {
  try {
    await db.collection("test").add({
      message: "Firebase connected 🚀",
      time: new Date(),
    });

    res.send("Firebase working ✅");
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});