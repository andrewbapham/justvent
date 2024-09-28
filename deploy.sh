#!/bin/bash

echo "Deploying backend..."

rsync -avz --rsh="ssh -p 22 -i ~/.ssh/justvent-server-keys.pem " \
    -r ./backend/ ubuntu@ec2-3-144-14-87.us-east-2.compute.amazonaws.com:/app/backend/ 

ssh -i ~/.ssh/justvent-server-keys.pem -p 22 ubuntu@ec2-3-144-14-87.us-east-2.compute.amazonaws.com "chmod u+x /app/backend/uvicorn_start | echo $?" 

echo "Copied files to backend!"

echo "Deploying frontend..."

# cd ./frontend
# npm install --quiet
# npm run build

# scp -i ~/.ssh/justvent-server-keys.pem -P 22 -r ./dist/ ubuntu@ec2-3-144-14-87.us-east-2.compute.amazonaws.com:/app/frontend/

# echo "Copied files to frontend!"

# echo "Deployed successfully!"