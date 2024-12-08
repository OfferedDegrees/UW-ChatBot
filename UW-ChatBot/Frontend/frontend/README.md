# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# How to obtain the source code
To obtain the source code, run this command in the directory of your choice:

```bash
git clone https://github.com/RyanLe101/UW-ChatBot.git
```

```bash
cd UW-Chatbot
```

# Installations Before Running Everything
Install [Node.js](https://nodejs.org/en)

Setup the API Key:
- go to your `UW-Chatbot/Frontend/frontend/src/` directory and create a `.env` file.
- add your OpenAI API key to the `.env` file:

```bash
REACT_APP_OPENAI_API_KEY=your_api_key
```

# How to Run the Program itself:
Go to the directory `UW-ChatBot\UW-Chatbot\Frontend\frontend`.

Open terminal (or whatever you use to run commands) and run this command:
```bash
npm install
```

If there is an issue, then run this:
```bash
npm install --legacy-peer-deps
```

To run the program, run this command:
```bash
npm run start
```

To close the program:
```bash
[ctrl][c]
```

# The Layout of Our Directory Structure
The layout of the directory is in the src:
- `UW-Chatbot/Frontend/frontend/frontend/src/__test__`: Contains the test files.
- `src`: Contains the frontend code, including `.tsx` files for rendering the components and `.css` files for customizing the website's styling after rendering.

# How to Build the Software
To build the software, run this command in the terminal:

```bash
npm run build
```

This will output to the build directory.

# How to Test the Software
- Test files are located in the `./frontend/src/__tests__` directory.

- Each test file should be named with the `.test.tsx` extension/ ending.
- Example: `[componentName].test.tsx`

- The names of the tests should describe what is being tested

- To test the software, run this command in the terminal:
```bash
npm test
```

# How to Build a Release of the Software
- To build a release of the software:
```bash
npm run build
```

This will output to the `build` directory


## Available Scripts

In the project directory, you can run:

```bash
npm install
```


```bash
npm run start
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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).


To learn React, check out the [React documentation](https://reactjs.org/).
