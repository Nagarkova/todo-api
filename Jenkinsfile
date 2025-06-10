pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Backend') {
                    steps {
                        dir('backend') {
                            script {
                                docker.image('node:18-alpine').inside {
                                    sh 'npm ci'
                                }
                            }
                        }
                    }
                }
                stage('Frontend') {
                    steps {
                        dir('frontend') {
                            script {
                                docker.image('node:18-alpine').inside {
                                    sh 'npm ci'
                                }
                            }
                        }
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    script {
                        docker.image('node:18-alpine').inside {
                            sh 'npm run build'
                        }
                    }
                }
            }
        }

        stage('Start Backend') {
            steps {
                dir('backend') {
                    script {
                        docker.image('node:18-alpine').inside {
                            sh 'npm run dev'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
