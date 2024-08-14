pipeline {
    agent any

    environment {
        REMOTE_USER = 'ubuntu'  // Replace with your SSH username
        REMOTE_HOST = 'getzetachi.com'  // Replace with the target server's IP or hostname
        REMOTE_DIR = '/home/ubuntu/zetachi-frontend'  // Replace with the full path to the project folder
        SSH_CREDENTIALS_ID = 'Kuldeep-Backend'  // Jenkins stored SSH credentials ID
        GIT_CREDENTIALS_ID = '438bf32e-3b5e-4512-9c92-5eeca959630c'  // Jenkins stored Git credentials ID
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
                        # Check if npm process is running
                        if pgrep -f "npm start"; then
                            echo "Stopping existing npm process..." &&
                            pkill -f "npm start"
                        else
                            echo "No running npm process found."
                        fi
                        '
                    """
                }
            }
        }

        stage('Start Application') {
            steps {
                sshagent(credentials: ["${SSH_CREDENTIALS_ID}"]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} '
                        cd ${REMOTE_DIR} &&
                        nohup npm start > app.log 2>&1 &
                        exit
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
    }
}
