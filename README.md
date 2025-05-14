# MERN Stack Kubernetes Deployment

This project demonstrates how to deploy a complete MERN (MongoDB, Express, React, Node.js) stack application on Kubernetes using Minikube, Docker, and GitHub Actions for CI/CD.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Docker](https://www.docker.com/products/docker-desktop/) (v20.10.0 or higher)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/) (v1.30.0 or higher)
- [kubectl](https://kubernetes.io/docs/tasks/tools/) (v1.26.0 or higher)
- [Git](https://git-scm.com/downloads) (v2.30.0 or higher)
- [Node.js](https://nodejs.org/) (v16.0.0 or higher)
- [npm](https://www.npmjs.com/) (v8.0.0 or higher)
- [Docker Hub Account](https://hub.docker.com/)
- [GitHub Account](https://github.com/)

## Project Structure

```
my-mern-app/
├── client/ (React frontend)
├── server/ (Node/Express backend)
├── Dockerfile
├── deployment.yaml
├── service.yaml
└── README.md
```


## Step-by-Step Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/AbdulMoizQureshi-2640/SCD_PROJECT.git
```

### 2. Start Minikube

```bash
minikube start
```

Verify that Minikube is running:

```bash
minikube status
```

### 3. Configure Docker to Use Minikube's Docker Daemon

For macOS/Linux:
```bash
eval $(minikube docker-env)
```

For Windows PowerShell:
```powershell
minikube docker-env | Invoke-Expression
```

### 4. Create Kubernetes Namespace

```bash
kubectl apply -f kubernetes/namespace.yaml
```

### 5. Deploy MongoDB

```bash
kubectl apply -f kubernetes/mongodb-pvc.yaml
kubectl apply -f kubernetes/mongodb-deployment.yaml
```

### 6. Build and Push Docker Images

Make sure you're logged in to Docker Hub:

```bash
docker login
```

Build and push the backend image:

```bash
cd server
docker build -t yourusername/mern-backend:latest .
docker push yourusername/mern-backend:latest
cd ..
```

Build and push the frontend image:

```bash
cd client
docker build -t yourusername/mern-frontend:latest .
docker push yourusername/mern-frontend:latest
cd ..
```

### 7. Update Kubernetes Deployment Files

Replace `yourusername` in the deployment files with your actual Docker Hub username:

```bash
sed -i 's/yourusername/your-actual-username/g' kubernetes/backend-deployment.yaml
sed -i 's/yourusername/your-actual-username/g' kubernetes/frontend-deployment.yaml
```

### 8. Deploy Backend and Frontend

```bash
kubectl apply -f kubernetes/backend-deployment.yaml
kubectl apply -f kubernetes/frontend-deployment.yaml
```

### 9. Verify Deployments

Check that all pods are running:

```bash
kubectl get pods -n mern-namespace
```

Check all services:

```bash
kubectl get services -n mern-namespace
```

Check all deployments:

```bash
kubectl get deployments -n mern-namespace
```

### 10. Access Your Application

```bash
minikube service frontend-service -n mern-namespace
```

This will open your default browser with the application.

## Setting Up GitHub Actions for CI/CD

### 1. Set Up a Self-Hosted GitHub Actions Runner

1. Go to your GitHub repository
2. Navigate to Settings > Actions > Runners
3. Click "New self-hosted runner"
4. Follow the instructions to install and configure the runner on your machine

### 2. Add Docker Hub Secrets to GitHub

1. Go to your GitHub repository
2. Navigate to Settings > Secrets > Actions
3. Add the following secrets:
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub password or token

### 3. Push Code to GitHub

Make sure all your code is committed and pushed to GitHub:

```bash
git add .
git commit -m "Deploy MERN app to Kubernetes"
git push origin main
```

## Troubleshooting

### Pods Stuck in Pending State

If pods are stuck in pending state, check if Minikube has enough resources:

```bash
minikube stop
minikube start --memory=4096 --cpus=2
```

### Connection Issues

If the frontend cannot connect to the backend, check:

1. Services are running correctly:
```bash
kubectl get services -n mern-namespace
```

2. Pods are running:
```bash
kubectl get pods -n mern-namespace
```

3. Check pod logs:
```bash
kubectl logs <pod-name> -n mern-namespace
```

### Database Connection Issues

If the application cannot connect to MongoDB, check:

1. MongoDB service is running:
```bash
kubectl get services mongodb-service -n mern-namespace
```

2. MongoDB pod is running:
```bash
kubectl get pods -l app=mongodb -n mern-namespace
```

3. Check the environment variables in the backend pod:
```bash
kubectl exec -it <backend-pod-name> -n mern-namespace -- env | grep MONGO
```

## Cleaning Up

To delete everything:

```bash
kubectl delete namespace mern-namespace
```

To stop Minikube:

```bash
minikube stop
```

## Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- [Minikube Documentation](https://minikube.sigs.k8s.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
