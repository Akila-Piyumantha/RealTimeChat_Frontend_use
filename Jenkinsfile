pipeline {
    agent any

    environment {
        VITE_API_BASE_URL = 'http://54.221.83.205:5000/api'
        VITE_BASE_URL = 'http://54.221.83.205:5000'
        IMAGE_NAME = 'akilapiumantha/realTimeChat'
        CONTAINER_PORT = '5173'
        HOST_PORT = '5174'
    }

    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'VITE_API_BASE_URL="http://54.221.83.205:5000/api" VITE_BASE_URL="http://54.221.83.205:5000" npx vite build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('frontend') {
                    sh "docker build -t ${IMAGE_NAME}:latest -f Dockerfile ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_HUB_USER', passwordVariable: 'DOCKER_HUB_PSW')]) {
                    sh 'echo $DOCKER_HUB_PSW | docker login -u $DOCKER_HUB_USER --password-stdin'
                    sh "docker tag ${IMAGE_NAME}:latest ${IMAGE_NAME}:latest"
                    sh "docker push ${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy with Ansible') {
            steps {
                sh 'ansible-playbook -i ansible/inventory.ini ansible/deploy.yml'
            }
        }

        stage('Run Container') {
            steps {
                sh "docker stop realTimeChat || true"
                sh "docker rm realTimeChat || true"
                sh "docker run -d --name realTimeChat -p ${HOST_PORT}:${CONTAINER_PORT} ${IMAGE_NAME}:latest"
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Build Failed! Check logs.'
        }
    }
}
