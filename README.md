# 🚀 ECR DevOps Pipeline

A containerized Node.js application built to practice real-world DevOps workflows using Docker, GitHub, AWS Elastic Container Registry (ECR), and GitHub Actions.

The project starts with local Docker development and manual image publishing to Amazon ECR. The next phase will automate testing, image building, and publishing through GitHub Actions.

## 📌 Project Overview

This project demonstrates how to containerize a web application, test it, publish its Docker image to a private AWS ECR repository, and prepare it for automated CI/CD deployment.

### Project Objectives

* Build and run a Node.js application.
* Create a Docker image using a Dockerfile.
* Run the application inside a Docker container.
* Create a private Amazon ECR repository.
* Authenticate Docker with AWS ECR.
* Push Docker images to ECR.
* Automate testing and image publishing using GitHub Actions.
* Prepare for deployment on Amazon EC2.
* Apply security, version control, and monitoring practices.

## 🛠️ Technologies Used

| Technology         | Purpose                        |
| ------------------ | ------------------------------ |
| Linux (Ubuntu/WSL) | Development environment        |
| Node.js            | Web application                |
| Git                | Version control                |
| GitHub             | Source code hosting            |
| Docker             | Application containerization   |
| Amazon ECR         | Private Docker image registry  |
| AWS IAM            | Identity and access management |
| GitHub Actions     | CI/CD automation               |
| Amazon EC2         | Planned application hosting    |
| Amazon CloudWatch  | Planned monitoring and logging |

## 🏗️ Architecture

```text
Developer
   |
   | Git Commit and Push
   v
GitHub Repository
   |
   | Planned: GitHub Actions
   v
Automated Tests
   |
   v
Docker Image Build
   |
   v
Amazon ECR
   |
   | Planned: Pull Image
   v
Amazon EC2
   |
   v
Running Web Application
```

**Note:** Automated CI/CD and EC2 deployment are planned stages. The current implementation includes the Node.js application, Docker image, and manual ECR image publishing.

## 📂 Project Structure

```text
ecr-devops-pipeline/
├── .dockerignore
├── .gitignore
├── Dockerfile
├── README.md
├── package.json
├── server.js
└── test/
    └── app.test.js
```

## ⚙️ Application Features

* Lightweight Node.js HTTP server.
* Home page describing the project.
* `/health` endpoint for application health checks.
* HTTP 404 response for unknown routes.
* Configurable application port using the `PORT` environment variable.
* Automated health endpoint test using Node.js's built-in test runner.
* Docker container runs as a non-root user.

## 💻 Run Locally

### Prerequisites

Install the following tools:

* Node.js 22 or later
* npm
* Git
* Docker

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ecr-devops-pipeline.git
cd ecr-devops-pipeline
```

Replace `YOUR_USERNAME` with your GitHub username after publishing the repository.

### 2. Run the application

```bash
npm start
```

The application listens on port `3000` by default.

Open:

```text
http://localhost:3000
```

### 3. Check application health

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "healthy",
  "application": "ecr-devops-pipeline"
}
```

### 4. Run automated tests

```bash
npm test
```

The test verifies that the health endpoint returns HTTP 200 and the expected application status.

## 🐳 Docker Setup

### 1. Build the Docker image

```bash
docker build -t ecr-devops-pipeline:1.0 .
```

### 2. Run the container

```bash
docker run -d \
  --name ecr-devops-app \
  -p 3000:3000 \
  ecr-devops-pipeline:1.0
```

### 3. Test the container

```bash
curl http://localhost:3000/health
```

### 4. View container logs

```bash
docker logs ecr-devops-app
```

### 5. Stop and remove the container

```bash
docker stop ecr-devops-app
docker rm ecr-devops-app
```

## ☁️ Amazon ECR Integration

The Docker image can be stored in a private Amazon ECR repository.

### Prerequisites

* An AWS account.
* AWS CLI configured with an authorized IAM identity.
* A private ECR repository named `ecr-devops-pipeline`.
* Docker installed and running.

Set the AWS Region and repository variables:

```bash
export AWS_REGION=ap-south-1
export ECR_REPOSITORY=ecr-devops-pipeline
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
export ECR_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}"
```

Use the Region in which your ECR repository was created.

### 1. Authenticate Docker with ECR

```bash
aws ecr get-login-password --region "$AWS_REGION" \
  | docker login \
      --username AWS \
      --password-stdin "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"
```

### 2. Tag the image

```bash
docker tag ecr-devops-pipeline:1.0 "$ECR_URI:1.0"
```

### 3. Push the image

```bash
docker push "$ECR_URI:1.0"
```

### 4. Verify the image

```bash
aws ecr describe-images \
  --repository-name "$ECR_REPOSITORY" \
  --region "$AWS_REGION"
```

## 🔐 DevOps Security Practices

This project follows or plans to implement these practices:

* Exclude environment files and private keys from Git using `.gitignore`.
* Exclude unnecessary and sensitive files from Docker build contexts using `.dockerignore`.
* Run the application inside Docker as a non-root user.
* Use IAM permissions following the principle of least privilege.
* Prefer GitHub Actions OIDC for AWS authentication instead of long-lived access keys.
* Use versioned Docker image tags.
* Run automated tests before publishing images.
* Keep AWS credentials out of source code and Docker images.

## 🚧 Project Roadmap

* [x] Build the Node.js application.
* [x] Add a health-check endpoint.
* [x] Create an automated application test.
* [x] Create a Dockerfile and `.dockerignore`.
* [x] Build and test the Docker image locally.
* [x] Create a private Amazon ECR repository.
* [x] Push a Docker image to ECR manually.
* [ ] Publish the project to GitHub.
* [ ] Configure GitHub Actions.
* [ ] Configure AWS IAM OIDC authentication.
* [ ] Automate testing and Docker image publishing.
* [ ] Deploy the ECR image to Amazon EC2.
* [ ] Add application health monitoring and CloudWatch logging.
* [ ] Document deployment and troubleshooting procedures.

## 📚 Learning Outcomes

Through this project, I am practicing:

* Git and GitHub workflows.
* Docker image creation and container management.
* AWS ECR repository management.
* AWS IAM and secure authentication.
* CI/CD pipeline design.
* Automated application testing.
* Container deployment and monitoring.

## 👨‍💻 Author

**Anmol Karn**

Aspiring DevOps Engineer

GitHub: https://
