## Back-End Architecture

The back end of this application consists of Flask and NGINX. Flask is a Python module which can be uses for many different things, including API implementation, which is how we are using it. NGINX is a webserver which can be used for including hosting websites and serve as a gateway for APIs. In this cace, out NGINX server is hosting our React frontend and can make calls to the Flask API through NGINX.

The Server folder contains some of the setup required for NGINX and Flask, otherwise the installations of Python and NGINX are on the VM where we host the site from. 'app.py' contains the main API code for now.


### Resources 
1. [Flask Home](https://palletsprojects.com/p/flask/)
2. [NGNX APIs/Webservers](https://www.nginx.com/learn/api-gateway/)
3. [Python](https://docs.python.org/3.8/tutorial/)
