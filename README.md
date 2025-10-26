## Deployment Overview

This project is a **full-stack web application** with a React frontend, Node.js backend, and MySQL database, deployed on **AWS EC2 using Docker**. It is configured with a **CI/CD pipeline via GitHub Actions** to automate builds and deployment.

### Architecture

- **Frontend**:  
  - Built with React and served via Nginx inside a Docker container.  
  - Calls backend APIs via a centralized configuration file (`config.js`) for easy URL management.  
  - Docker image pushed to Docker Hub (`indikaeranga06/book-crd-frontend`).

- **Backend**:  
  - Node.js + Express server, handling RESTful API endpoints for CRUD operations.  
  - Connects to a MySQL database.  
  - Docker image pushed to Docker Hub (`indikaeranga06/book-crd-backend`).  
  - Proper error handling and logging for easy debugging.

- **Database**:  
  - MySQL hosted same EC2 instance.  
  - Managed with a dedicated user and proper authentication (`mysql_native_password` for Node.js compatibility).  

### CI/CD Pipeline

- **GitHub Actions Workflows**:  
  - Separate workflows for frontend and backend: build Docker images and push to Docker Hub.
  - separate deployment workflow file.
  - Deployment workflow connects to the AWS EC2 instance via SSH and pulls the latest images.  
  - Stops old containers and runs updated ones automatically.  
  - Manual triggers are available for deploying specific tags.

### Deployment on AWS

- **Dockerized deployment**:  
  - Frontend: exposed on port `5173`.  
  - Backend: exposed on port `3030`.  
  - Uses Docker to isolate services and simplify updates.  
  - Automated deployment ensures that any code changes merged to the `main` branch are quickly reflected in the live environment.

### Features

- Fully containerized stack for easy replication and scaling.  
- Centralized API URLs for frontend to simplify environment changes.  
- Proper logging and health checks for backend services.  
- CI/CD automation for fast and reliable deployment.
