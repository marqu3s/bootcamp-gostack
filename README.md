# Bootcamp GoStack

## TECHNOLOGIES USED
- [NodeJS](https://nodejs.org)
- [ReactJS](https://reactjs.org)
- [React Native](https://facebook.github.io/react-native/)

## TOOLS USED
- [VSCode](https://code.visualstudio.com/): Microsoft Visual Studio Code IDE.
- [Insomnia](https://insomnia.rest/): REST client to debug APIs. 
- [Postbird](https://electronjs.org/apps/postbird): PostgreSQL GUI client.
- [DevDocs](https://devdocs.egoist.moe/): DevDocs Desktop client.
- [Docker](https://www.docker.com/): Container engine to automate application development and deployment.
- [EditorConfig](https://editorconfig.org/): EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
- [Mailtrap](https://mailtrap.io/): Safe Email Testing for Staging & Development.
- [Handlebars](https://handlebarsjs.com/): Build semantic templates effectively with no frustration.
- [Sentry](https://sentry.io): Provides open-source and hosted error monitoring that helps all software
teams discover, triage, and prioritize errors in real-time.
- [Redis](https://redis.io/): In-memory data structure store, used as a database, cache and message broker.

## YARN PACKAGES USED
- [Bcrypt](https://www.npmjs.com/package/bcryptjs): Bcrypt in JavaScript with zero dependencies.
- [Bee-queue](https://github.com/bee-queue/bee-queue): A simple, fast, robust job/task queue for Node.js, backed by Redis.
- [Date-fns](https://date-fns.org/): Modern Javascript date utility library.
- [EsLint](https://eslint.org/): The pluggable linting utility for JavaScript and JSX.
- [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
- [JWT](https://jwt.io/): JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
- [Mongoose](https://mongoosejs.com/): Elegant mongodb object modeling for node.js.
- [Multer](https://github.com/expressjs/multer): Node.js middleware for handling `multipart/form-data`.
- [Nodemailer](https://nodemailer.com/about/): Module for Node.js applications to allow easy as cake email sending.
- [Nodemon](https://nodemon.io/): Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.
- [pg](https://www.npmjs.com/package/pg): Non-blocking PostgreSQL client for Node.js. Pure JavaScript and optional native libpq bindings.
- [pg-hstore](https://www.npmjs.com/package/pg-hstore): A node package for serializing and deserializing JSON data to hstore format.
- [Prettier](https://prettier.io/): An opinionated code formatter.
- [Sequelize](https://sequelize.org/): Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.
- [Sequelize CLI](https://github.com/sequelize/cli): The Sequelize CLI.
- [Sucrase](https://sucrase.io/): Super-fast Babel alternative.
- [Yup](https://github.com/jquense/yup): JavaScript object schema validator and object parser. 
- [Youch](https://www.npmjs.com/package/youch): Pretty error reporting for Node.js

---

## INSTALLING DEPENDENCIES

### Yarn command to install dependencies on a new project
```
yarn add bcryptjs bee-queue date-fns express express-async-errors express-handlebars jsonwebtoken mongoose multer nodemailer pg pg-hstore @sentry/node@5.7.1 sequelize youch yup
```

### Yarn command to install developer dependencies on a new project
```
yarn add eslint eslint-config-airbnb-base eslint-config-prettier eslint-plugin-import eslint-plugin-prettier nodemon prettier sequelize-cli sucrase -D
```

### Commands to run after yarn add
```
yarn eslint --init
```
After eslint installs it's NPM dependencies, remove the __package-lock.json__ file and execute ```yarn``` to install them using yarn.

---

## MIGRATIONS


### Creating migrations
```
yarn sequelize migration:create --name=desired-name
```

### Executing migrations
```
yarn sequelize db:migrate
```

### Undoing migrations
```
yarn sequelize db:migrate:undo[:all]
```

## DOCKER COMMANDS
```
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11.5
docker run --name mongobarber -p 27017:27017 -d -t mongo
docker run --name redisbarber -p 6379:6379 -d -t redis:alpine
```
