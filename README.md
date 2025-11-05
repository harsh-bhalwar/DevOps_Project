## DevOps Project (Node.js + Express)

A minimal API showcasing DevOps practices: containerization with Docker, automated testing with Jest, and CI/CD using a Jenkins declarative pipeline (build, test, multi-arch image buildx, optional push, and local deploy).

### Features
- **Express API** with endpoints: `/`, `/project`, `/status`, `/team`, `/metrics`
- **Jest + Supertest** for API tests with **JUnit** reports in `test-results/junit.xml`
- **Docker** image (Node 18 Alpine) exposing port 3000
- **Jenkins pipeline** with stages: Checkout → Install & Test → Build Docker Image → Push (optional) → Deploy (local)
- **Multi-arch images** via `docker buildx` for `linux/amd64` and `linux/arm64`

### Tech Stack
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express
- **Testing**: Jest, Supertest, jest-junit
- **CI/CD**: Jenkins declarative pipeline
- **Container**: Docker

---

## Getting Started (Local)

### Prerequisites
- Node.js 18+
- npm 9+

### Install
```bash
npm install
```

### Run
```bash
npm start
# Server listens on http://localhost:3000
```

### Test
```bash
npm test
# JUnit report written to test-results/junit.xml
```

---

## API Endpoints
Base URL: `http://localhost:3000`

### `/` (GET)
- Returns a welcome message and available endpoints.
```bash
curl http://localhost:3000/
```

### `/project` (GET)
- Project metadata: developer, title, description, technologies, version.
```bash
curl http://localhost:3000/project
```

### `/status` (GET)
- Runtime status: `running`, uptime, environment, timestamp.
```bash
curl http://localhost:3000/status
```

### `/team` (GET)
- Demo project team details.
```bash
curl http://localhost:3000/team
```

### `/metrics` (GET)
- Basic system metrics: CPU arch, Node version, memory usage, platform.
```bash
curl http://localhost:3000/metrics
```

---

## Docker

### Build
```bash
docker build -t devops-project:local .
```

### Run
```bash
docker run -d --name devops_project -p 3000:3000 devops-project:local
# Visit http://localhost:3000
```

### Dockerfile
- Based on Node 18 Alpine
- Uses `npm ci --only=production`
- Exposes `3000`
- Starts via `node index.js`

---

## Jenkins Pipeline
The `JenkinsFile` defines the CI/CD flow:

### Parameters
- **PUSH_TO_DOCKERHUB**: boolean (default: true)
- **DOCKERHUB_REPO**: string (default: `bhawarharsh/devops_project`)

### Environment
- **IMAGE_NAME**: derived from `DOCKERHUB_REPO`
- **IMAGE_TAG**: currently `jenkins-4`

### Stages
1. **Checkout**: `checkout scm`
2. **Install & Test**:
   - Ensures Node/npm in PATH
   - `npm ci` then `npm test` (allows empty tests)
   - Publishes JUnit at `test-results/junit.xml`
3. **Build Docker Image**:
   - Sets up `docker buildx`
   - Builds multi-arch image (`linux/amd64, linux/arm64`) and loads locally
4. **Push to DockerHub** (conditional):
   - Requires Jenkins credentialsId: `docker-pat`
   - Tags and pushes `${IMAGE_NAME}:${IMAGE_TAG}`
5. **Deploy (local)**:
   - Stops existing container `devops_project` if present
   - Runs container mapped to host port 80 → container 3000
   - App reachable at `http://localhost:80`

### Jenkins Requirements
- Jenkins agent with Docker CLI access and permissions
- Credentials with ID `docker-pat` (username/password for DockerHub)
- Docker Buildx available (plugin or CLI support)

---

## Project Structure
```
/Users/harshbhalwar/Documents/DevOps Project
├─ app.js               # Express app and routes
├─ index.js             # Server bootstrap (PORT 3000 default)
├─ Dockerfile           # Container build
├─ JenkinsFile          # Declarative pipeline
├─ jest.config.js       # Jest configuration (node env, no transform)
├─ test/                # Jest + Supertest tests
│  └─ app.test.js
├─ test-results/        # JUnit XML output (jest-junit)
├─ package.json         # Scripts and deps
└─ package-lock.json
```

---

## Scripts
- **start**: `node index.js`
- **test**: `NODE_OPTIONS=--experimental-vm-modules jest --ci --reporters=default --reporters=jest-junit`

---

## Configuration Notes
- Uses ES modules (`"type": "module"`)
- Default port is `3000` (override with `PORT` env var when running `index.js`)
- Test reports written to `test-results/junit.xml` (configured via `jest-junit`)

---

## License
ISC

---

## Author
Harsh Bhalwar

