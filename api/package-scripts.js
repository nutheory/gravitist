// const {
//   series,
//   concurrent,
//   rimraf,
//   commonTags: {oneLine},
// } = require('nps-utils')
//
// const hiddenFromHelp = true
//
// module.exports = {
//   scripts: {
//     default: {
//       description: 'start the production server',
//       script: 'node ./dist',
//     },
//     test: {
//       default: {
//         description: 'Run both unit and integration tests in parallel',
//         script: concurrent.nps('test.unit', 'test.integration'),
//       },
//       unit: {
//         default: {
//           description: 'Run the unit tests and collect coverage',
//           script: 'jest --config=tests/jest.config.unit.json --coverage',
//         },
//         watch: {
//           description: 'run the unit tests in watch mode',
//           script: 'jest --config=tests/jest.config.unit.json --watch',
//         },
//       },
//       integration: {
//         default: {
//           description: oneLine`
//             Run the integration tests and collect coverage.
//             NOTE: the mongodb server must be running!
//           `,
//           script: 'jest --config=tests/jest.config.integration.json --coverage',
//         },
//         watch: {
//           description: oneLine`
//             Run the integration tests in watch mode.
//             NOTE: the mongodb server must be running!
//           `,
//           script: 'jest --config=tests/jest.config.integration.json --watch',
//         },
//       },
//     },
//   }
// }
