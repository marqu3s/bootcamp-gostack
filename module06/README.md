# How to start a new React Native project

To install emulators: https://docs.rocketseat.dev

```shell
npx react-native init MyApp
```

Start the emulator (Genymotion). Then inside the project folder:

```shell
react-native run-android
yarn start
```

# Editor Config

Create on the root folder a file named `.editorconfig` with the folowing content:

```
root = true

[*]
end_of_line =  = lf
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

# ESLint and Prettier

ESLint find and fix problems in your JavaScript code.
Delete the file `.eslintrc.js` that was automatically created. Then execute:

```shell
yarn add eslint -D
yarn eslint --init
```

During the configuration, choose the following options:
* Check syntax, find problems and enforce code style
* Javascript modules (import/export)
* React framework
* uncheck all options for the question "Where does your code run?"
* Yes to use a popular style guide
* Choose Airbnb style
* Javascript as the file format
* Accept all the suggested packages installation

Remove the file `package-lock.json` and execute `yarn` to reinstall the depencies using yarn instead npm.

## Adding more extensions to ESLint

```shell
yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D
```

Now edit file `.eslintrc.js` and make it looks like the one bellow:

```js
module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/sort-comp': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.js']
      }
    ],
    'import/prefer-default-export': 'off'
  },
};
```

Edit the file `.prettierrc.js` to be like this:

```js
module.exports = {
  bracketSpacing: true,
  jsxBracketSameLine: true,
  singleQuote: true,
  trailingComma: 'es5',
};
```

Now restart VSCode for all the changes to take effect.

Kill the `yarn start` command and execute it again with the --reset-cache flag:

```sh
yarn start --reset-cache
```

# Reactotron

Reactotron is a macOS, Windows, and Linux app for inspecting your React JS and React Native apps.

Instalation instruction: https://github.com/infinitered/reactotron
Check the quick start for react native.

To add it to the project:

```shell
yarn add reactotron-react-native
```

To make the simulator work with reactotron I had to enable the WiFi connection
on the simulator.

Also, try to redirect the port used by reactotron to the simulator:

```shell
adb reverse tcp:9090 tcp:9090
```

# React Navigation

Check the documentation for the current version at https://reactnavigation.org/docs/en/getting-started.html

Mostly it envolves installing the dependencies, like shown bellow:

```shell
yarn add react-navigation
yarn add react-native-reanimated react-native-gesture-handler react-native-screens@^1.0.0-alpha.23
```

And editing some files, so check the documentation carefully.

# Styled Components

```shell
yarn add styled-components
```

# Axios

```shell
yarn add axios
```

# Async Storage

```shell
yarn add @react-native-community/async-storage
```