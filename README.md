# Library Micro-Frontend Application

## 📸 Screenshots

### Home Page
![Home Page](/images/home_page.png)
*Home page featuring a modern dashboard with category cards and navigation sidebar*

### Book Catalog
![Catalog Page](/images/catalog.png)
*Book catalog displaying a responsive grid of book cards with titles and descriptions*

## 🎯 Overview

This project demonstrates a micro-frontend architecture using Webpack Module Federation. It consists of two applications running in separate branches:
- A parent application (main shell)
- A catalog micro-frontend (remote module)

The applications are built using React and Material-UI, featuring a modern, responsive design with a collapsible sidebar navigation.

## 🏗 Architecture

### Module Federation
This project leverages Webpack 5's Module Federation to enable micro-frontend architecture. The benefits include:
- Independent deployment of micro-frontends
- Runtime sharing of components and dependencies
- Reduced bundle sizes through shared libraries
- Improved team autonomy and scalability

### Components
- **Parent App**: Main shell application containing the layout and navigation
- **Catalog App**: Remote micro-frontend exposing a book catalog component
- **Shared Dependencies**: React, React-DOM, and Material-UI are shared between applications

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16
- npm or yarn
- AWS CLI (for deployment)

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
```

2. **Catalog App Setup**
```bash
git checkout catalog-app
cd catalog-app
npm install
npm start
```
The catalog app will run on port 3001.

3. **Parent App Setup**
```bash
git checkout parent-app
cd parent-app
npm install
npm start
```
The parent app will run on the default port (3000).

## 🔧 Configuration

### Webpack Configuration

Both applications use custom webpack configurations to enable Module Federation:

#### Catalog App (Remote)
- Exposes the Catalog component
- Configures shared dependencies
- Sets up development and production endpoints

#### Parent App (Host)
- Configures remote module loading
- Sets up shared dependency management
- Handles development and production URLs

## 📦 Deployment

The application is deployed to AWS S3 using GitHub Actions.

### AWS S3 Setup

1. Create two S3 buckets:
   - `parent-app-react-frontend`
   - `catalog-app-react-frontend`

2. Configure buckets for static website hosting:
   - Enable static website hosting
   - Set index.html as the index document
   - Configure proper CORS settings

### GitHub Actions Deployment

The workflow automatically deploys to S3 when pushing to specific branches:
- `parent-app` branch deploys to the parent app bucket
- `catalog-app` branch deploys to the catalog app bucket

Required secrets in GitHub:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

## 🔄 Development Workflow

1. Feature Development
   - Create feature branch from `parent-app` or `catalog-app`
   - Develop and test locally
   - Create pull request

2. Deployment
   - Merge to respective branch
   - GitHub Actions automatically builds and deploys
   - Changes are live within minutes

### Visual Development Guide

#### Deployment Flow
![Deployment Process](/images/deployment.png)
*GitHub Actions deployment workflow visualization*

## 📚 Available Scripts

### Catalog App
```bash
npm start    # Start development server
npm build    # Build for production
npm test     # Run tests
```

### Parent App
```bash
npm start    # Start development server
npm build    # Build for production
npm test     # Run tests
```

## 🎨 Features

- Responsive Material-UI design
- Collapsible sidebar navigation
- Dynamic component loading
- Shared dependency management
- Independent deployment capability
- AWS S3 static hosting

## 🔒 Environment Variables

Development:
```env
NODE_ENV=development
```

Production:
```env
NODE_ENV=production
```

## 📝 Notes

- Ensure proper CORS configuration in S3 buckets
- Keep shared dependency versions aligned
- Test thoroughly in both development and production modes
- Monitor bundle sizes and sharing effectiveness

## 🤝 Contributor

K.Janarthanan

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
