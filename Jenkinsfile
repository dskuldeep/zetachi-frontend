pipeline {
    agent any

    environment {
        REMOTE_USER = 'ubuntu'  // Replace with your SSH username
        REMOTE_HOST = 'getzetachi.com'  // Replace with the target server's IP or hostname
        REMOTE_DIR = '/home/ubuntu/zetachi-frontend'  // Replace with the full path to the project folder
        SSH_CREDENTIALS_ID = 'Kuldeep-Backend'  // Jenkins stored SSH credentials ID
        GIT_CREDENTIALS_ID = '438bf32e-3b5e-4512-9c92-5eeca959630c'  // Jenkins stored Git credentials ID
        SCREEN_NAME = 'npm-app'  // The name of the screen session for npm
    }

    stages {
        stage('SSH into Server and Update Project') {
            steps {
                sshagent(credentials: ["${SSH_CREDENTIALS_ID}"]) {
                    withCredentials([usernamePassword(credentialsId: "${GIT_CREDENTIALS_ID}", usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} '
                            cd ${REMOTE_DIR} && 
                            git config credential.helper store &&
                            echo "https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com" > ~/.git-credentials &&
                            git pull &&
                            npm install &&
                            npm run build
                            '
                        """
                    }
                }
            }
        }

        stage('Stop Existing Application if Running') {
            steps {
                sshagent(credentials: ["${SSH_CREDENTIALS_ID}"]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} '
                        cd ${REMOTE_DIR} &&
                        # Check and stop existing screen session
                        if screen -list | grep -q "${SCREEN_NAME}"; then
                            echo "Stopping existing screen session..." &&
                            screen -S ${SCREEN_NAME} -X quit || echo "Failed to stop screen session."
                        else
                            echo "No existing screen session found."
                        fi
                        '
                    """
                }
            }
        }

        stage('Start Application in New Screen Session') {
            steps {
                sshagent(credentials: ["${SSH_CREDENTIALS_ID}"]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} '
                        cd ${REMOTE_DIR} &&
                        # Start a new screen session for npm
                        screen -dmS ${SCREEN_NAME} bash -c "npm start; exec bash" &&
                        echo "New screen session started for npm."
                        '
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        failure {
            echo 'Pipeline failed.'
        }
        success {
            echo 'Pipeline succeeded.'
        }
    }
}
