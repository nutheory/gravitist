"start": "nodemon index.babel.js webpack --config webpack.config.js",
"flow": "flow",
"start-local": "nodemon index.js --ignore client --exec babel-node",
"start-dev": "node backend-dev.js",
"build-dev": "webpack --config webpack.config.js --progress",


"start": "npm-run-all --parallel watch:server watch:build",
"watch:build": "webpack --config webpack.config.js --watch",
"watch:server": "nodemon \"./index.babel.js\" --watch \"./server\"",
"start-dev": "node backend-dev.js",
"build-dev": "webpack --config webpack.config.js --progress",
"test": "test"
