# Home Library Service REST application

## Description

This is an app Home Library Service! `Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & install Docker](https://www.docker.com/get-started/)

## Downloading

```
git clone https://github.com/dzemlyakov/nodejs2022Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Running application
# Important!!!
Before starting you have to change name of the file .env.example to .env or create your own file with enviroments variables!

then:
- Run Docker app
- Run this command in terminal with project directory:
```
docker-compose up
```
- Wait until the application is bulding, it might take some time(~2-5min) - it depends on your internet speed and computer performance) 

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

- to stop application press `Ctrl+C` into terminal
- to stop docker containers run this command: 
 ```
docker-compose down
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

