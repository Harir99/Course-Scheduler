## Running the Web App Locally

**For consistency, please use a Linux based terminal or distribution**

### First Time Setup
If you are running this web app for the first time locally, there are a few things you may want to install globally to make your life easer.

1. Get the most up to date version of Node - follow the linked article below:
    [Update Node Version](https://phoenixnap.com/kb/update-node-js-version)
2. Install Flask Globally to avoid a virutal environment (either way works): run `sudo apt install python3-flask` in your terminal
3. Once you've pulled the code in and are in the c`is3760-104-online` directory, run: `cd sprint-4 && npm install`. **This is a one time command.**

### Starting the Web App
>1. You need to open 2 different Linux terminals. In the first one run `cd server && flask run`. This starts the flask server. As of October 24th, it's not in debug mode so you need to restart the server everytime you make changes.
>2. In the second terminal, run `cd sprint-4 && npm start`. This starts your front-end, and any changes are automatically updated.

### Axios Proxy -> READ THIS IT'S IMPORTANT
As of right now Axios is an installed dependency of the React component and added a proxy server to communicate directly to the flask app. 
>**When making API calls, you do not need to add localhost in front, you can just call the endpoint directly.**