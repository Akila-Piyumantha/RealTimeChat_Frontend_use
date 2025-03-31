pipeline {  
    agent any  
    
    environment {  
        VITE_API_BASE_URL = 'http://localhost:5001/api'  // Corrected syntax (added `=` and quotes)  
        VITE_BASE_URL = 'http://localhost:5001'            // Corrected syntax (added `=` and quotes)  
        IMAGE_NAME = 'akilapiumantha/realTimeChat'         // Corrected syntax (removed space before the `=`)  
    }  

    stages {  
        stage('Clone Repository') {  
            steps {  
                checkout scm  
            }  
        }  

        stage('Install Dependencies') {  
            steps {  
                sh 'npm install'  
            }  
        }  

        stage('Build Docker Image') {  
            steps {  
                sh "docker build -t ${IMAGE_NAME} ."  // Use double quotes to expand IMAGE_NAME properly  
            }  
        }  

        stage('Push to Docker Hub') {  
            steps {  
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_HUB_USER', passwordVariable: 'DOCKER_HUB_PSW')]) {  
                    sh 'echo $DOCKER_HUB_PSW | docker login -u $DOCKER_HUB_USER --password-stdin'  
                    sh "docker push ${IMAGE_NAME}"  // Use double quotes for variable expansion  
                }  
            }  
        }  

        stage('Deploy with Ansible') {  
            steps {  
                sh 'ansible-playbook -i ansible/inventory.ini ansible/deploy.yml'  
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