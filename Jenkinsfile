pipeline {  
    agent any  

    environment {  
        VITE_API_BASE_URL = 'http://localhost:5001/api'  
        VITE_BASE_URL = 'http://localhost:5001'  
        IMAGE_NAME = 'akilapiumantha/realTimeChat'  
        CONTAINER_PORT = '5173' // Change this if necessary  
        HOST_PORT = '5174' // Exposing on 5174  
    }  

    stages {  
        stage('Clone Repository') {  
            steps {  
                checkout scm  
            }  
        }  

        stage('Install Dependencies') {  
            steps {  
                dir('frontend') { // Navigate to frontend folder  
                    sh 'npm install'  
                }  
            }  
        }  

        stage('Build Frontend') {  
            steps {  
                dir('frontend') {  
                    sh 'npm run build'  
                }  
            }  
        }  

        stage('Build Docker Image') {  
            steps {  
                dir('frontend') {  
                    sh "docker build -t ${IMAGE_NAME}:latest ."  
                }  
            }  
        }  

        stage('Push to Docker Hub') {  
            steps {  
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_HUB_USER', passwordVariable: 'DOCKER_HUB_PSW')]) {  
                    sh 'echo $DOCKER_HUB_PSW | docker login -u $DOCKER_HUB_USER --password-stdin'  
                    sh "docker tag ${IMAGE_NAME}:latest ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest"  
                    sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest"  
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
                sh "docker run -d -p ${HOST_PORT}:${CONTAINER_PORT} ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest"  
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
