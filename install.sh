#!/bin/bash
source ~/.bashrc

# Preliminary intallations for Linux
sudo apt-get update
sudo apt install build-essential -y
sudo apt-get install wget -y
sudo apt install curl -y

# Installing node
curl https://deb.nodesource.com/setup_16.x | sudo -E bash - &&\
        sudo apt-get install -y nodejs
source ~/.bashrc
source ~/.profile
sudo apt-get install nginx -y

# Run React App
cd course-scheduler-app
npm install
npm run build
cd ..

sudo systemctl restart nginx # In case stopped for demo

# Installation for the Python Environment
sudo apt install python3-pip python3-dev build-essential libssl-dev libffi-dev python3-setuptools -y # Install the packages that will allow you to build the Python Enviroment
sudo apt install python3-venv -y
python3 -m venv server/venv
source server/venv/bin/activate
pip install flask
pip install wheel
pip install gunicorn
pip install pandas
deactivate

# Linking Nginx config
sudo rm -f /etc/nginx/sites-enabled/default # delete Nginx default, in case we use same port to test
sudo rm -f /etc/nginx/sites-available/server # delete existing file and replace it so we have no symlink issue
sudo cp -a server/server /etc/nginx/sites-available/server #configure Nginx to pass web requests to that socket using the uwsgi protocol
sudo rm -f /etc/nginx/sites-enabled/server
sudo ln -s /etc/nginx/sites-available/server /etc/nginx/sites-enabled #To enable the Nginx server block configuration you’ve just created, link the file to the sites
# sudo nginx -t # test for syntax errors
sudo systemctl reload nginx # loads up front end to public url

# Serve Flask
sudo rm -f /etc/systemd/system/scheduler.service
sudo cp -a server/scheduler.service /etc/systemd/system/
sudo systemctl stop scheduler
sudo systemctl daemon-reload
sudo systemctl start scheduler
sudo systemctl reload nginx
# sudo systemctl status scheduler # Check status
