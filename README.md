<h1 align="center">🌐 IoT Sensor Monitoring & Alerting Platform</h1>

<p align="center">
  <b>⚡ Cloud-Native | 🔐 Secure | 📊 Real-Time | ☁️ AWS-Powered</b><br/>
  A full-stack, production-ready IoT dashboard that monitors sensors, triggers alerts via email/SMS, and auto-scales securely on AWS.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?logo=react" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?logo=node.js" />
  <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb" />
  <img src="https://img.shields.io/badge/Auth-AWS Cognito-orange?logo=amazonaws" />
  <img src="https://img.shields.io/badge/Alerting-SNS/SES-yellow?logo=amazonaws" />
  <img src="https://img.shields.io/badge/CI/CD-GitHub Actions-blue?logo=githubactions" />
  <img src="https://img.shields.io/badge/Infra-Terraform-purple?logo=terraform" />
  <img src="https://img.shields.io/badge/Deployed-AWS Elastic Beanstalk-ff9900?logo=amazonaws" />
</p>

---

## 🚀 Live Preview

> 🌐 **Hosted on AWS Elastic Beanstalk**  
> 🔐 Cognito-secured dashboard  
> 📩 Live alerts via email (SES) and SMS (SNS)

📸 [View screenshots »](./screenshots)

---

## 🧠 Project Highlights

| 🌟 Feature                   | ⚙️ Implementation                                                                 |
|-----------------------------|-----------------------------------------------------------------------------------|
| 🔐 **User Auth**             | AWS Cognito (Hosted UI + JWT-secured APIs)                                       |
| 📊 **Live Dashboard**        | React + Material UI + Chart.js                                                   |
| 📨 **Threshold Alerts**      | AWS SES (Email), AWS SNS (SMS), Toasts                                          |
| 🐳 **Containerized**         | Docker + Docker Compose (frontend & backend)                                     |
| 🔁 **CI/CD Automation**      | GitHub Actions → Build → Push to ECR → Deploy to Elastic Beanstalk              |
| ☁️ **IaC (Infra as Code)**   | Terraform for provisioning Cognito, SES, SNS, ECR, IAM, EB                      |
| 📦 **Cloud Monitoring**      | AWS CloudWatch integration                                                       |

---

## 🖼️ Architecture Diagram

<p align="center">
  <img src="./screenshots/architecture.png" width="550" alt="IoT Platform Architecture">
</p>

---

## 🛠️ Tech Stack Overview

| Layer       | Tech Used                                                                 |
|-------------|---------------------------------------------------------------------------|
| Frontend    | React.js, Material UI, Chart.js, Axios, Toasts                            |
| Backend     | Node.js, Express, Mongoose                                                |
| Database    | MongoDB Atlas                                                             |
| Auth        | AWS Cognito (JWT-secured)                                                 |
| Alerts      | AWS SNS (SMS), AWS SES (Email)                                            |
| CI/CD       | GitHub Actions + Docker + ECR + Elastic Beanstalk                         |
| Infra (IaC) | Terraform (AWS Services: Cognito, SES, SNS, EB, IAM, CloudWatch)          |

---

## 📦 Quick Start

```bash
# 1. Clone Repo
git clone https://github.com/Simran-Kaur1996/iot-platform.git
cd iot-platform

# 2. Create .env files in frontend & backend
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 3. Run full stack
docker-compose up --build
```
## ✅ CI/CD Pipeline
Auto-deployment with test coverage, Docker builds, and production deployment to AWS
```bash
# GitHub Actions Workflow Summary
- Run tests (frontend & backend)
- Build Docker images
- Push to ECR
- Deploy to AWS Elastic Beanstalk
```
## 🧪 Testing
```
# Frontend
cd frontend && npm test

# Backend
cd backend && npm test
```

### 📊 Dashboard Modules
🔐 Login & Signup (Cognito)
📋 Sensor List & CRUD
📈 Live Sensor Charts (temp/humidity)
🛎️ In-app alerts + SMS/Email
🧾 Notification Drawer + Toasts
⚙️ Admin Configuration Options

👩‍💻 Author
Simranjeet Kaur Sudan
🚀 AWS Certified | Full Stack | Cloud | DevOps
📍 Based in Canada

