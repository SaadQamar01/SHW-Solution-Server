## Our Work so far
Assignment 1: API document,ERD both in Assignment folder and mockup link https://drive.google.com/drive/u/0/folders/0B4jbSXWB1yALUURsTDdfd0c1VGs
Assignment 2: Signup Login Multiplication Assignment Completed

Signup API: http://localhost:8000/api/signup before hit this api must pass JSON object via postman
{"name":"name",   "email": "email@gmail.com","password": "password"}

Login API: http://localhost:8000/api/login before hit this api must pass JSON object via postman
{"email": "email@gmail.com","password": "password"}

Multiplication API: http://localhost:8000/api/multiplication before hit this api must pass JSON object
{"num1":4,"num2":4}

result show on console

using technologies/tools:
1) Node-js
2) Express-js
3) Mongolab (Data will store on cloud, benefits of Mongolab we can fetch data anywhere from database and don't have to start database any time)
4) Mongoose

# node-js-getting-started

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone git@github.com:heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
