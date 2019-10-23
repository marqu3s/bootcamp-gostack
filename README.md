# Bootcamp GoStack

## Technologies used
- [NodeJS](https://nodejs.org)
- [ReactJS](https://reactjs.org)
- [React Native](https://facebook.github.io/react-native/)

## Tools used
- [VSCode](https://code.visualstudio.com/): Microsoft Visual Studio Code IDE.
- [Insomnia](https://insomnia.rest/): REST client to debug APIs. 
- [Postbird](https://electronjs.org/apps/postbird): PostgreSQL GUI client.
- [DevDocs](https://devdocs.egoist.moe/): DevDocs Desktop client.
- [Docker](https://www.docker.com/): Container engine to automate application development and deployment.
- [EditorConfig](https://editorconfig.org/): EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.

## Yarn packages dependencies used
- [Bcrypt](https://www.npmjs.com/package/bcryptjs): Bcrypt in JavaScript with zero dependencies.
- [EsLint](https://eslint.org/): The pluggable linting utility for JavaScript and JSX.
- [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
- [JWT](https://jwt.io/): JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
- [Nodemon](https://nodemon.io/): Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.
- [pg](https://www.npmjs.com/package/pg): Non-blocking PostgreSQL client for Node.js. Pure JavaScript and optional native libpq bindings.
- [pg-hstore](https://www.npmjs.com/package/pg-hstore): A node package for serializing and deserializing JSON data to hstore format.
- [Prettier](https://prettier.io/): An opinionated code formatter.
- [Sequelize](https://sequelize.org/): Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.
- [Sucrase](https://sucrase.io/): Super-fast Babel alternative.
- [Yup](https://github.com/jquense/yup): JavaScript object schema validator and object parser. 

---

## Installing the dependencies

### Yarn command to install dependencies on a new project
```
yarn add bcryptjs express jsonwebtoken pg pg-hstore sequelize yup
```

### Yarn command to install developer dependencies on a new project
```
yarn add eslint nodemon prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-import sequelize-cli sucrase -D
```

### Commands to run after yarn add
```
yarn eslint --init
```
After eslint installs it's NPM dependencies, remove the __package-lock.json__ file and execute ```yarn``` to install them using yarn.

---

## Migrations


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