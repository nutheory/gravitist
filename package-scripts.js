const {
  concurrent,
  series,
  runInNewWindow,
  commonTags,
} = require('nps-utils')

const {oneLine} = commonTags

module.exports = {
  scripts: {
    default: {
      script: concurrent.nps( 'dev.server', 'dev.build'),
    },
    test: {
      default: {
        script: 'nps api.test.integration.default',
      }
    },
    dev: {
      server: "nodemon \"./index.js\" --watch \"./api\"",
      build: "webpack --config webpack.config.js --watch",
    },
    api: {
      test: {
        integration: {
          default: {
            script: 'jest --config=api/__tests__/jest.config.integration.json --watch --coverage --verbose'
          },
          watch: {
            script: 'jest --config=api/__tests__/jest.config.integration.json --watch',
          },
        },
        // unit: {
        //   default: {
        //     script: 'jest --config=api/__tests__/jest.config.unit.json --coverage',
        //   },
        //   watch: {
        //     script: 'jest --config=api/__tests__/jest.config.unit.json --watch',
        //   },
        // },
      }
    },
    client: {

    },
    build: {
      default: {
        script: 'webpack --config webpack.config.js --watch',
      },
    }
  }
}
