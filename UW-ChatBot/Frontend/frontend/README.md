# Getting Started with Create React App


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Installations Before Running Everything
Install [Node.js] (https://nodejs.org/en)

Open terminal and run:

```bash
node -v
```

```bash
npm -v
```

Setup the API Key (kind of broken right now and the key is hardcoded right now in the `Chatbot.tsx` file)
- go to your `./frontend/src/ directory` and create a `.env` file.
- add your OpenAI API key to the `.env` file:

```bash
REACT_APP_OPENAI_API_KEY=your_api_key
```

## Available Scripts


In the project directory, you can run:


```bash
npm start
```


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


The page will reload if you make edits.\
You will also see any lint errors in the console.


```bash
npm test
```


Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


```bash
npm run build
```


Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


```bash
npm run eject
```


**Note: this is a one-way operation. Once you `eject`, you can’t go back!**


If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.


Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.


You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# How to obtain the source code
To obtain the source code, run this command in the directory of your choice:

```bash
git clone https://github.com/RyanLe101/UW-ChatBot.git
```

```bash
cd UW-Chatbot
```

# The layout of your directory structure
The layout of the directory is in the src:
- `frontend/src/__test__`: Contains the test files.
- `src`: Contains the frontend code, including `.tsx` files for rendering the components and `.css` files for customizing the website's styling after rendering.

# How to build the software
To build the software, run this command in the terminal:

```bash
npm run build
```

This will output to the build directory.

# How to test the software
- Test files are located in the `./frontend/src/__tests__` directory.

- Each test file should be named with the `.test.tsx` extension/ ending.
- Example: `[componentName].test.tsx`

- The names of the tests should describe what is being tested

- To test the software, run this command in the terminal:
```bash
npm test
```

# How to build a release of the software
- To build a release of the software:
```bash
npm run build
```

This will output to the `build` directory

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).


To learn React, check out the [React documentation](https://reactjs.org/).
