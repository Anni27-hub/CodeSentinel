# CodeSentinel

## AI-Powered GitHub Pull Request Review Platform

CodeSentinel is an enterprise-grade code review automation platform that leverages artificial intelligence to analyze GitHub Pull Requests, identify security vulnerabilities, detect code quality issues, and generate comprehensive review reports. The platform is designed to accelerate the code review process while maintaining high standards of software quality and security.

**Technology Stack:** React | Node.js | Express | MongoDB | GitHub OAuth | Groq Llama 3.3 70B

---

## Overview

CodeSentinel automates the code review process by integrating with GitHub and utilizing advanced AI models to provide detailed analysis of pull requests. Rather than conducting manual line-by-line reviews, developers can connect their GitHub accounts, select pull requests, and receive comprehensive AI-generated reviews that identify issues, suggest improvements, and assess overall code quality.

Each review includes:
- Overall Code Quality Assessment (0-100 scale)
- Security Vulnerability Analysis
- Performance Optimization Insights
- Maintainability and Complexity Evaluation
- Code Readability Assessment
- Repository Health Metrics
- Risk Level Classification
- Actionable Remediation Recommendations
- Downloadable PDF Report Generation

---

## Core Features

### GitHub Integration & Authentication

Secure OAuth 2.0 based authentication with GitHub ensures that users maintain full control over repository access with minimal permission scope.

- Secure GitHub OAuth login and session management
- Session-based user authentication
- Repository-specific access control
- User data isolation and privacy

### Repository Discovery & Management

Comprehensive repository exploration capabilities enable users to browse, search, and manage all accessible GitHub repositories.

- Full repository inventory access
- Advanced search and filtering
- Pull request discovery and tracking
- Diff and file change retrieval
- Pull request metadata analysis

### Intelligent Code Review Engine

Powered by Groq's Llama 3.3 70B model, the review engine provides sophisticated code analysis across multiple dimensions.

**Analysis Dimensions:**
- Security Assessment: Identifies potential vulnerabilities, data exposure, and security best practices violations
- Performance Analysis: Detects inefficient algorithms, resource leaks, and optimization opportunities
- Maintainability Scoring: Evaluates code complexity, adherence to design patterns, and technical debt
- Readability Evaluation: Assesses naming conventions, documentation quality, and code clarity

### Risk Classification System

Each pull request receives a comprehensive risk assessment based on multiple factors:

**Low Risk:** Minor code style issues or documentation improvements with minimal impact
**Medium Risk:** Issues affecting performance, maintainability, or requiring additional testing
**High Risk:** Security vulnerabilities, critical bugs, or architectural concerns requiring immediate attention

### Automated Recommendations

Every identified issue includes context-specific remediation suggestions with examples and implementation guidance.

### Repository Health Dashboard

Real-time metrics and historical tracking provide visibility into repository quality trends.

- Total repository count and statistics
- Pull request volume and trends
- Review history and audit trail
- Performance metrics tracking
- Health score evolution over time

### Review History & Persistence

All generated reviews are stored in MongoDB, enabling historical analysis and trend identification across time periods.

- Complete review history retrieval
- Previous analysis comparison
- Trend analysis and metrics evolution
- Full audit trail for compliance

### Professional Report Generation

Export comprehensive reviews as PDF documents suitable for stakeholder communication and documentation purposes.

**Report Contents:**
- Repository metadata and configuration
- Pull request details and scope
- Overall quality score and risk classification
- Executive summary of findings
- Detailed issue categorization
- Security metrics and vulnerabilities
- Suggested fixes with implementation guidance
- Performance and maintainability insights

### User Interface

The platform features a modern, developer-centric interface designed for efficiency and clarity.

- Dark theme optimized for extended use
- Fully responsive design across devices
- Smooth animations and transitions
- Intuitive navigation and workflow
- Real-time status updates

---

## Technology Stack

### Frontend Architecture
- **Framework:** React.js with React Router for navigation
- **Styling:** Tailwind CSS for utility-based design system
- **Animation:** Framer Motion for smooth, performant animations
- **HTTP Client:** Axios for API communication
- **Components:** Lucide React icon library
- **Build Tool:** Vite for optimized bundling and development experience

### Backend Architecture
- **Runtime:** Node.js with Express.js framework
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** Passport.js with GitHub OAuth strategy
- **Session Management:** Express Session with persistent storage
- **API Integration:** GitHub REST API client
- **Security:** CORS, HTTPS, environment variable management

### AI & Analysis
- **LLM Provider:** Groq API
- **Model:** Llama 3.3 70B Versatile
- **Inference:** Real-time streaming for responsive user experience
- **Prompt Engineering:** Specialized templates for code review contexts

### Data & Utilities
- **PDF Generation:** PDFKit for professional report rendering
- **Configuration:** Dotenv for environment variable management
- **Security:** Passport.js security middleware

---

## System Architecture

```
┌─────────────────────────────────────────┐
│       Developer Workstation              │
└────────────────┬────────────────────────┘
                 │
                 ▼
        ┌────────────────┐
        │  React Frontend │
        └────────┬───────┘
                 │
        ┌────────▼──────────┐
        │  GitHub OAuth 2.0  │
        └────────┬───────────┘
                 │
        ┌────────▼────────────┐
        │  Express Backend    │
        └────────┬────────────┘
                 │
        ┌────────▼────────────────┐
        │  GitHub REST API        │
        └────────┬────────────────┘
                 │
        ┌────────▼──────────────────────┐
        │  Pull Request Diff Retrieval   │
        └────────┬─────────────────────┘
                 │
        ┌────────▼─────────────────────┐
        │  Groq Llama 3.3 AI Analysis   │
        └────────┬────────────────────┘
                 │
        ┌────────▼───────────┐
        │  Code Review Engine │
        └────────┬───────────┘
                 │
        ┌────────▼──────────┐
        │  MongoDB Storage  │
        └────────┬──────────┘
                 │
    ┌────────────┼────────────┐
    ▼            ▼            ▼
Dashboard    Review      PDF
History      Export     Reports
```

---

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB instance (local or cloud-hosted)
- GitHub OAuth application credentials
- Groq API key

### Clone Repository

```bash
git clone https://github.com/Anni27-hub/CodeSentinel.git
cd CodeSentinel
```

### Backend Configuration

```bash
cd backend
npm install
npm run dev
```

### Frontend Configuration

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/codesentinel
SESSION_SECRET=your-session-secret-key
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:5000/auth/github/callback
FRONTEND_URL=http://localhost:5173
GROQ_API_KEY=your-groq-api-key
```

### Frontend Environment Variables

Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:5000/api
```

---

## Configuration Guide

### GitHub OAuth Setup

1. Navigate to GitHub Settings > Developer Settings > OAuth Apps
2. Create a new OAuth Application
3. Set Authorization Callback URL to `http://localhost:5000/auth/github/callback`
4. Copy Client ID and Client Secret to backend `.env`

### Groq API Configuration

1. Sign up at [Groq Cloud](https://console.groq.com)
2. Create an API key in your account settings
3. Add API key to backend `.env` as `GROQ_API_KEY`

### MongoDB Setup

For development, use MongoDB Atlas (cloud) or local MongoDB instance:
- Cloud: Create cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Local: Install MongoDB Community Edition and start service

---

## Usage Guide

1. **Authentication:** Click "Sign in with GitHub" to authenticate
2. **Repository Selection:** Browse your repositories and select target repository
3. **Pull Request Analysis:** Choose a pull request to review
4. **Review Execution:** Click "Generate Review" to initiate AI analysis
5. **Report Review:** Examine detailed findings and recommendations
6. **Export:** Download PDF report or save to review history

---

## Project Roadmap

The following features are planned for future releases:

- Interactive AI Chat interface for Pull Request Q&A
- Team collaboration and code review workflows
- Webhook-based automatic review triggering on PR creation
- GitHub Organization and Team support
- Slack and Discord notification integration
- Multi-LLM support (Claude, GPT-4, Gemini)
- Email notifications and digest reports
- API-first architecture for third-party integrations
- Custom review rule configuration
- Performance benchmarking and regression detection

---

## Contributing

Contributions are encouraged and welcome. Please follow the workflow below:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Implement your changes
4. Commit with descriptive messages: `git commit -m "Add description of changes"`
5. Push to your branch: `git push origin feature/your-feature-name`
6. Open a Pull Request with detailed description of changes

### Code Standards

- Follow ESLint configuration for code consistency
- Write descriptive commit messages
- Include relevant documentation updates
- Test your changes before submitting PR

---

## License

This project is licensed under the MIT License. See LICENSE file for details.

---

## Author

**Anish Agarwal**

- GitHub: [Anni27-hub](https://github.com/Anni27-hub)
- LinkedIn: https://www.linkedin.com/in/anish-agarwal-b37521225/

---

## Support & Documentation

For issues, feature requests, or questions:
1. Check existing GitHub Issues
2. Review project documentation
3. Open a new GitHub Issue with detailed description

---

## Acknowledgments

- Groq for providing the Llama 3.3 70B model
- GitHub for the comprehensive REST API
- React, Node.js, and open-source communities

---

**Built with best practices in code quality, security, and performance.**
