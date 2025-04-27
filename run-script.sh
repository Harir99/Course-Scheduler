#!/bin/bash
source ~/.bashrc

# Run React App
cd course-scheduler-app
npm install
npm run build
cd ..

# Serve Flask
sudo systemctl stop scheduler
sudo rm -f /etc/systemd/system/scheduler.service
sudo cp -a server/scheduler.service /etc/systemd/system/
sudo rm -f /etc/nginx/sites-available/server # delete existing file and replace it so we have no symlink issue
sudo rm -f /etc/nginx/sites-enabled/server
sudo cp -a server/server /etc/nginx/sites-available/server #configure Nginx to pass web requests to that socket using the uwsgi protocol
sudo ln -s /etc/nginx/sites-available/server /etc/nginx/sites-enabled
sudo systemctl daemon-reload
sudo systemctl start scheduler
sudo systemctl reload nginx
