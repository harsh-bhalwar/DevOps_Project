import express from "express";

const app = express();
// Middleware to parse JSON
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Harsh Bhalwar’s DevOps Project API, deployed on GCP VM',
    available_endpoints: ['/project', '/status', '/team', '/metrics']
  });
});

// 1️⃣ Project Information Endpoint
app.get('/project', (req, res) => {
  res.json({
    developer: 'Harsh Bhalwar',
    title: 'DevOps Automation and Deployment Pipeline Project',
    description: 'This is a full DevOps demo project that includes containerization using Docker, CI/CD with Jenkins, deploying image to DockerHub, and deployment to DigitalOcean.',
    technologies: ['Node.js', 'Express.js', 'Docker', 'Jenkins', 'SonarQube', 'DigitalOcean'],
    version: '1.0.0'
  });
});

// 2️⃣ Application Status Endpoint
app.get('/status', (req, res) => {
  res.json({
    status: 'running',
    uptime: process.uptime().toFixed(2) + ' seconds',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// 3️⃣ Team Members Endpoint
app.get('/team', (req, res) => {
  res.json({
    project_team: [
      { name: 'Harsh Bhalwar', role: 'DevOps Engineer / Developer' },
      { name: 'Jenkins', role: 'CI/CD Automation' },
      { name: 'Docker', role: 'Containerization' }
    ],
    note: 'This project demonstrates automated build, test, and deploy pipelines.'
  });
});

// 4️⃣ Sample System Metrics Endpoint (extra)
app.get('/metrics', (req, res) => {
  const used = process.memoryUsage();
  const memoryUsageMB = {};
  for (let key in used) {
    memoryUsageMB[key] = (used[key] / 1024 / 1024).toFixed(2) + ' MB';
  }

  res.json({
    cpu_architecture: process.arch,
    node_version: process.version,
    memory_usage: memoryUsageMB,
    platform: process.platform,
  });
});

export default app;