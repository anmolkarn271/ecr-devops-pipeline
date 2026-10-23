const http = require("node:http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
if (req.url === "/health") {
res.writeHead(200, { "Content-Type": "application/json" });


return res.end(
  JSON.stringify({
    status: "healthy",
    application: "ecr-devops-pipeline"
  })
);


}

if (req.url === "/") {
res.writeHead(200, { "Content-Type": "text/html" });


return res.end(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ECR DevOps Pipeline</title>
    </head>
    <body>
      <h1>ECR DevOps Pipeline</h1>
      <p>Node.js application running successfully!</p>
      <p>Docker + AWS ECR + GitHub Actions</p>
      <p>Health endpoint: <a href="/health">/health</a></p>
    </body>
  </html>
`);


} else {
res.writeHead(404, { "Content-Type": "application/json" });
res.end(JSON.stringify({ error: "Not Found" }));
}
});

server.listen(PORT, "0.0.0.0", () => {
console.log(`Application running on port ${PORT}`);
});
