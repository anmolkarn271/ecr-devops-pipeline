const { test } = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const { spawn } = require("node:child_process");

test("application responds with a healthy status", async (t) => {
const port = 3100 + Math.floor(Math.random() * 1000);

const app = spawn(process.execPath, ["server.js"], {
env: { ...process.env, PORT: String(port) },
stdio: "ignore"
});

t.after(() => {
app.kill();
});

let ready = false;

for (let i = 0; i < 30; i++) {
if (app.exitCode !== null) {
throw new Error("Application stopped unexpectedly");
}


try {
  const response = await new Promise((resolve, reject) => {
    const request = http.get(
      `http://127.0.0.1:${port}/health`,
      resolve
    );

    request.on("error", reject);
  });

  const chunks = [];

  for await (const chunk of response) {
    chunks.push(chunk);
  }

  const body = JSON.parse(Buffer.concat(chunks).toString());

  assert.equal(response.statusCode, 200);
  assert.equal(body.status, "healthy");
  assert.equal(body.application, "ecr-devops-pipeline");

  ready = true;
  break;
} catch {
  await new Promise((resolve) => setTimeout(resolve, 200));
}


}

assert.equal(ready, true, "Application did not become healthy");
});
