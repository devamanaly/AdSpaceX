pipeline {
    agent any
    
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                echo 'Step 1: Pulling latest code from GitHub...'
                checkout scm
                echo 'Code pulled successfully!'
            }
        }
        
        stage('Setup Environment') {
            steps {
                echo 'Step 2: Setting up environment files...'
                
                // Create .env file for docker-compose if not exists
                sh '''
                    if [ ! -f .env ]; then
                        echo "Creating .env file..."
                        cat > .env << 'EOF'
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin@123
POSTGRES_DB=AdSpaceX_DB
PORT=5000
JWT_SECRET=kNn5wXruz4g0wQD+4vmkkyr2RIV2yFo9NTUugpEBZlE=
EOF
                        echo ".env file created"
                    else
                        echo ".env file already exists"
                    fi
                '''
                
                // Create .env.docker for backend if not exists
                sh '''
                    if [ ! -f backend/.env.docker ]; then
                        echo "Creating backend/.env.docker file..."
                        cat > backend/.env.docker << 'EOF'
DATABASE_URL=postgresql://postgres:admin%40123@db:5432/AdSpaceX_DB
JWT_SECRET=kNn5wXruz4g0wQD+4vmkkyr2RIV2yFo9NTUugpEBZlE=
PORT=5000
EOF
                        echo "backend/.env.docker file created"
                    else
                        echo "backend/.env.docker file already exists"
                    fi
                '''
            }
        }
        
        stage('Stop Old Containers') {
            steps {
                echo 'Step 3: Stopping old containers...'
                sh '''
                    if [ -f docker-compose.yml ]; then
                        docker-compose down || echo "No containers to stop"
                    fi
                '''
            }
        }
        
        stage('Build and Deploy') {
            steps {
                echo 'Step 4: Building and starting all services...'
                sh '''
                    echo "Building images and starting containers..."
                    docker-compose up --build -d
                    echo "Waiting for services to start..."
                    sleep 15
                '''
            }
        }
        
        stage('Verify Deployment') {
            steps {
                echo 'Step 5: Verifying all containers are running...'
                
                sh '''
                    echo "Container Status:"
                    docker-compose ps
                    
                    echo ""
                    echo "All running containers:"
                    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
                '''
                
                sh '''
                    echo ""
                    echo "Checking backend health..."
                    sleep 5
                    if curl -s -f http://localhost:5000 > /dev/null 2>&1; then
                        echo "✓ Backend is running on port 5000"
                    else
                        echo "⚠ Backend might still be starting..."
                        echo "Check logs with: docker-compose logs backend"
                    fi
                '''
                
                sh '''
                    echo ""
                    echo "Checking frontend..."
                    if curl -s -f http://localhost:3000 > /dev/null 2>&1; then
                        echo "✓ Frontend is running on port 3000"
                    else
                        echo "⚠ Frontend might still be starting..."
                        echo "Check logs with: docker-compose logs frontend"
                    fi
                '''
            }
        }
    }
    
    post {
        success {
            echo '========================================='
            echo '🎉 DEPLOYMENT SUCCESSFUL!'
            echo '========================================='
            echo 'Frontend: http://localhost:3000'
            echo 'Backend:  http://localhost:5000'
            echo 'Database: localhost:5433'
            echo '========================================='
        }
        failure {
            echo '========================================='
            echo '❌ DEPLOYMENT FAILED!'
            echo '========================================='
            echo 'Showing logs for debugging:'
            sh 'docker-compose logs --tail=30 || echo "No docker-compose logs available"'
            echo ''
            echo 'Manual checks:'
            echo '  docker ps'
            echo '  docker-compose ps'
            echo '  sudo systemctl status jenkins'
        }
    }
}