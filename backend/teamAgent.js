function buildTeam(projectIdea) {
  const idea = projectIdea.toLowerCase();

  let roles = new Set();
  let skills = new Set();
  let executionPlan = [];
  let reasoningParts = [];
  let teamSize = 0;
  let timeline = "";

  // ── FINTECH / PAYMENT / BANKING ──────────────────────
  if (idea.includes("fintech") || idea.includes("payment") || idea.includes("bank") || idea.includes("wallet") || idea.includes("transaction") || idea.includes("finance")) {
    roles.add("Backend Developer");
    roles.add("Security Expert");
    skills.add("Payment Gateway Integration");
    skills.add("Secure API Design");
    skills.add("Encryption & Auth");
    executionPlan.push("Implement secure transaction APIs");
    executionPlan.push("Set up fraud detection logic");
    executionPlan.push("Build user wallet and balance system");
    reasoningParts.push("Fintech requires strong security, compliance, and payment handling");
    teamSize += 2;
  }

  // ── AI / ML / DATA ───────────────────────────────────
  if (idea.includes("ai") || idea.includes("ml") || idea.includes("machine learning") || idea.includes("model") || idea.includes("predict") || idea.includes("detect") || idea.includes("recommend") || idea.includes("chatbot") || idea.includes("nlp") || idea.includes("data")) {
    roles.add("ML Engineer");
    roles.add("Data Scientist");
    skills.add("Python & TensorFlow");
    skills.add("Model Training & Deployment");
    skills.add("Data Pipeline");
    executionPlan.push("Collect and preprocess training data");
    executionPlan.push("Train and evaluate ML model");
    executionPlan.push("Deploy model as REST API");
    reasoningParts.push("AI/ML functionality needs data pipeline and model development");
    teamSize += 2;
  }

  // ── MOBILE APP ───────────────────────────────────────
  if (idea.includes("app") || idea.includes("mobile") || idea.includes("android") || idea.includes("ios") || idea.includes("flutter") || idea.includes("react native")) {
    roles.add("Mobile Developer");
    skills.add("React Native / Flutter");
    skills.add("Mobile UI Design");
    skills.add("Push Notifications");
    executionPlan.push("Build mobile UI screens and navigation");
    executionPlan.push("Integrate backend APIs into mobile app");
    executionPlan.push("Test on Android and iOS devices");
    reasoningParts.push("Mobile interface is required for on-the-go user interaction");
    teamSize += 1;
  }

  // ── WEB APP ──────────────────────────────────────────
  if (idea.includes("web") || idea.includes("website") || idea.includes("dashboard") || idea.includes("portal") || idea.includes("platform")) {
    roles.add("Frontend Developer");
    skills.add("React.js");
    skills.add("Responsive Design");
    skills.add("REST API Integration");
    executionPlan.push("Build responsive web interface");
    executionPlan.push("Create dashboard and data visualization");
    reasoningParts.push("Web platform needs a clean, responsive frontend");
    teamSize += 1;
  }

  // ── BACKEND / API ────────────────────────────────────
  if (idea.includes("api") || idea.includes("backend") || idea.includes("server") || idea.includes("database") || idea.includes("cloud")) {
    roles.add("Backend Developer");
    skills.add("Node.js / Express");
    skills.add("Database Design");
    skills.add("Cloud Deployment");
    executionPlan.push("Design and build REST APIs");
    executionPlan.push("Set up database schema and queries");
    executionPlan.push("Deploy to cloud (AWS / GCP / Heroku)");
    reasoningParts.push("Robust backend is needed for data management and API services");
    teamSize += 1;
  }

  // ── HEALTHCARE / MEDICAL ─────────────────────────────
  if (idea.includes("health") || idea.includes("medical") || idea.includes("doctor") || idea.includes("hospital") || idea.includes("patient") || idea.includes("medicine")) {
    roles.add("Backend Developer");
    roles.add("Healthcare Domain Expert");
    skills.add("HIPAA Compliance");
    skills.add("Medical Data Handling");
    skills.add("Appointment Scheduling System");
    executionPlan.push("Build secure patient data management");
    executionPlan.push("Implement appointment and reminder system");
    executionPlan.push("Add medicine tracking and alerts");
    reasoningParts.push("Healthcare apps require strict data privacy and domain knowledge");
    teamSize += 2;
  }

  // ── ECOMMERCE / RETAIL ───────────────────────────────
  if (idea.includes("ecommerce") || idea.includes("shop") || idea.includes("store") || idea.includes("product") || idea.includes("order") || idea.includes("delivery") || idea.includes("inventory")) {
    roles.add("Frontend Developer");
    roles.add("Backend Developer");
    skills.add("Cart & Checkout System");
    skills.add("Product Catalog Management");
    skills.add("Order Tracking");
    executionPlan.push("Build product listing and search");
    executionPlan.push("Implement cart, checkout, and payment");
    executionPlan.push("Create order tracking and inventory system");
    reasoningParts.push("E-commerce needs smooth UX, secure payments, and inventory management");
    teamSize += 2;
  }

  // ── EDUCATION / LEARNING ─────────────────────────────
  if (idea.includes("education") || idea.includes("learning") || idea.includes("course") || idea.includes("student") || idea.includes("quiz") || idea.includes("tutor")) {
    roles.add("Frontend Developer");
    roles.add("Content Strategist");
    skills.add("LMS Integration");
    skills.add("Quiz & Assessment Engine");
    skills.add("Progress Tracking");
    executionPlan.push("Build course content and quiz modules");
    executionPlan.push("Implement student progress tracking");
    executionPlan.push("Add gamification and leaderboards");
    reasoningParts.push("Ed-tech needs engaging UX and structured content delivery");
    teamSize += 2;
  }

  // ── SOCIAL / COMMUNITY ───────────────────────────────
  if (idea.includes("social") || idea.includes("community") || idea.includes("chat") || idea.includes("message") || idea.includes("forum") || idea.includes("feed") || idea.includes("network")) {
    roles.add("Frontend Developer");
    roles.add("Backend Developer");
    skills.add("Real-time Messaging (WebSocket)");
    skills.add("User Feed Algorithm");
    skills.add("Notifications System");
    executionPlan.push("Build real-time chat and messaging");
    executionPlan.push("Implement social feed and follow system");
    executionPlan.push("Add notifications and user discovery");
    reasoningParts.push("Social platforms need real-time features and scalable architecture");
    teamSize += 2;
  }

  // ── DESIGN / UI ──────────────────────────────────────
  if (idea.includes("design") || idea.includes("ui") || idea.includes("ux") || idea.includes("figma") || idea.includes("prototype")) {
    roles.add("UI/UX Designer");
    skills.add("Figma & Prototyping");
    skills.add("User Research");
    skills.add("Design System");
    executionPlan.push("Create wireframes and prototypes");
    executionPlan.push("Build consistent design system");
    executionPlan.push("Conduct user testing and iteration");
    reasoningParts.push("Strong UX design improves user adoption and satisfaction");
    teamSize += 1;
  }

  // ── BLOCKCHAIN / WEB3 ────────────────────────────────
  if (idea.includes("blockchain") || idea.includes("crypto") || idea.includes("nft") || idea.includes("web3") || idea.includes("smart contract") || idea.includes("defi")) {
    roles.add("Blockchain Developer");
    roles.add("Smart Contract Engineer");
    skills.add("Solidity");
    skills.add("Web3.js / Ethers.js");
    skills.add("Wallet Integration");
    executionPlan.push("Write and deploy smart contracts");
    executionPlan.push("Build wallet connect and transaction UI");
    executionPlan.push("Test contracts on testnet before mainnet");
    reasoningParts.push("Blockchain projects need specialized Web3 and smart contract expertise");
    teamSize += 2;
  }

  // ── GAME ─────────────────────────────────────────────
  if (idea.includes("game") || idea.includes("gaming") || idea.includes("unity") || idea.includes("multiplayer")) {
    roles.add("Game Developer");
    roles.add("Game Designer");
    skills.add("Unity / Unreal Engine");
    skills.add("Game Physics & Logic");
    skills.add("Multiplayer Networking");
    executionPlan.push("Design core game mechanics and levels");
    executionPlan.push("Implement game physics and scoring");
    executionPlan.push("Add multiplayer and leaderboard features");
    reasoningParts.push("Game development needs strong design thinking and performance optimization");
    teamSize += 2;
  }

  // ── IOT / HARDWARE ───────────────────────────────────
  if (idea.includes("iot") || idea.includes("sensor") || idea.includes("hardware") || idea.includes("arduino") || idea.includes("raspberry") || idea.includes("smart home")) {
    roles.add("IoT Engineer");
    roles.add("Embedded Systems Developer");
    skills.add("Arduino / Raspberry Pi");
    skills.add("MQTT Protocol");
    skills.add("Sensor Data Processing");
    executionPlan.push("Set up hardware sensors and microcontrollers");
    executionPlan.push("Build data pipeline from device to cloud");
    executionPlan.push("Create real-time monitoring dashboard");
    reasoningParts.push("IoT projects need hardware expertise and reliable cloud connectivity");
    teamSize += 2;
  }

  // ── DEFAULT FALLBACK ─────────────────────────────────
  if (roles.size === 0) {
    roles.add("Frontend Developer");
    roles.add("Backend Developer");
    roles.add("UI/UX Designer");
    skills.add("React.js");
    skills.add("Node.js");
    skills.add("REST APIs");
    executionPlan.push("Plan and define core features");
    executionPlan.push("Build frontend interface");
    executionPlan.push("Develop backend APIs and database");
    executionPlan.push("Test and deploy the application");
    reasoningParts.push("Every project needs a solid frontend, backend, and great design");
    teamSize = 3;
  }

  // Always add a Project Manager for large teams
  if (teamSize >= 4) {
    roles.add("Project Manager");
    executionPlan.push("Coordinate team tasks and track progress");
    reasoningParts.push("Large teams need coordination to hit hackathon deadlines");
    teamSize += 1;
  }

  // Timeline logic
  if (teamSize >= 5) {
    timeline = "Full MVP in 48 hours with parallel workstreams";
  } else if (teamSize >= 3) {
    timeline = "Working prototype in 24 hours";
  } else {
    timeline = "Core feature demo in 12 hours";
  }

  const aiSummary =
    `The AI Agent has analyzed your idea and recommends a team of ${teamSize} members.

Roles Needed:
${Array.from(roles).map(r => `  - ${r}`).join("\n")}

Key Skills Required:
${Array.from(skills).map(s => `  - ${s}`).join("\n")}

Execution Plan:
${executionPlan.map((step, i) => `  ${i + 1}. ${step}`).join("\n")}

Timeline: ${timeline}

Reasoning: ${reasoningParts.join(". ")}.`;

  return {
    roles: Array.from(roles),
    skills: Array.from(skills),
    reasoning: reasoningParts.join(". "),
    teamSize,
    executionPlan,
    timeline,
    message: "AI Agent has analyzed your idea and constructed an optimal team with execution strategy.",
    aiSummary,
  };
}

module.exports = { buildTeam };