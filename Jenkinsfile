pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/ChamodiJayakody/SolveIt-backend.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t solveit-user-service ./userService'
                sh 'docker build -t solveit-ticket-service ./ticketService'
            }
        }

        stage('Push Docker Images') {
            steps {
                sh 'docker tag solveit-user-service chamodijayakody/solveit-user-service'
                sh 'docker tag solveit-ticket-service chamodijayakody/solveit-ticket-service'

                sh 'docker push chamodijayakody/solveit-user-service'
                sh 'docker push chamodijayakody/solveit-ticket-service'
            }
        }

        stage('Deploy Containers') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            echo 'Backend Pipeline completed!'
        }
    }
}