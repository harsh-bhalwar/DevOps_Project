// test/app.test.js
import request from "supertest";
import app from "../index.js";

describe("GET /", () => {
      it("responds with a welcome message", async () => {
            const res = await request(app).get("/");
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty(
                  "message",
                  "Welcome to Harsh Bhalwar’s DevOps Project API, deployed on GCP VM"
            );
            expect(res.body).toHaveProperty("available_endpoints");
            expect(res.body.available_endpoints).toContain("/project");
      });
});

// /project Endpoint Test
describe("GET /project", () => {
      it("should return project details", async () => {
            const res = await request(app).get("/project");
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("developer", "Harsh Bhalwar");
            expect(res.body).toHaveProperty("title");
            expect(res.body).toHaveProperty("technologies");
            expect(Array.isArray(res.body.technologies)).toBe(true);
      });
});

// /status Endpoint Test
describe("GET /status", () => {
      it("should return status and uptime information", async () => {
            const res = await request(app).get("/status");
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("status", "running");
            expect(res.body).toHaveProperty("uptime");
            expect(res.body).toHaveProperty("environment");
            expect(res.body).toHaveProperty("timestamp");
      });
});

// /team Endpoint Test
describe("GET /team", () => {
      it("should return team details", async () => {
            const res = await request(app).get("/team");
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("project_team");
            expect(Array.isArray(res.body.project_team)).toBe(true);
            expect(res.body.project_team[0]).toHaveProperty("name");
            expect(res.body.project_team[0]).toHaveProperty("role");
      });
});

// /metrics Endpoint Test
describe("GET /metrics", () => {
      it("should return system metrics info", async () => {
            const res = await request(app).get("/metrics");
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("cpu_architecture");
            expect(res.body).toHaveProperty("node_version");
            expect(res.body).toHaveProperty("memory_usage");
            expect(res.body).toHaveProperty("platform");
            expect(typeof res.body.memory_usage).toBe("object");
      });
});
