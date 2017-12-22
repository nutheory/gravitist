const { task, of, waitAll } = require('folktale/concurrency/task')
const R = require('ramda')
const Result = require('folktale/result')
const Maybe = require('folktale/maybe')
const axios = require('axios')
const chalk = require('chalk')
const db = require('./api/models')

const randSix = () => {
  return Math.floor(100000 + Math.random() * 900000)
}

const res1 = [
  {
    name: "Derek Rush",
    email: `drush81+${randSix()}@gmail.com`,
    password: "blahblahblah",
    type: "agent",
    workRadius: 50,
    isVerified: "true",
    stripeToken: "tok_visa",
    bio: "ghfjghfkjgfk jhg hjkg  hggjk gjkghjkgkhjgh gh",
    createdAt: new Date(),
    updatedAt: new Date(),
    address: {
      address1: '25632 Peter A. Hartman Way',
      city: 'Mission Viejo',
      state: 'CA',
      zipCode: '92691',
      lat: 33.6211337,
      lng: -117.6828289
    },
    contacts: [
      {
        content: '(949) 280-8977',
        type: 'phone'
      },
      {
        content: 'http://nutheory.com',
        type: 'url'
      },
    ]
  }, {
    name: "Derek Rush",
    email: `drush81+${randSix()}@gmail.com`,
    password: "blahblahblah",
    type: "agent",
    workRadius: 50,
    isVerified: "true",
    stripeToken: "tok_visa",
    bio: "ghfjghfkjgfk jhg hjkg  hggjk gjkghjkgkhjgh gh",
    createdAt: new Date(),
    updatedAt: new Date(),
    address: {
      address1: '25632 Peter A. Hartman Way',
      city: 'Mission Viejo',
      state: 'CA',
      zipCode: '92691',
      lat: 33.6211337,
      lng: -117.6828289
    },
    contacts: [
      {
        content: '(949) 280-8977',
        type: 'phone'
      },
      {
        content: 'http://nutheory.com',
        type: 'url'
      },
    ]
  }, {
    name: "Derek Rush",
    email: `drush81+${randSix()}@gmail.com`,
    password: "blahblahblah",
    type: "agent",
    workRadius: 50,
    isVerified: "true",
    stripeToken: "tok_visa",
    bio: "ghfjghfkjgfk jhg hjkg  hggjk gjkghjkgkhjgh gh",
    createdAt: new Date(),
    updatedAt: new Date(),
    address: {
      address1: '25632 Peter A. Hartman Way',
      city: 'Mission Viejo',
      state: 'CA',
      zipCode: '92691',
      lat: 33.6211337,
      lng: -117.6828289
    },
    contacts: [
      {
        content: '(949) 280-8977',
        type: 'phone'
      },
      {
        content: 'http://nutheory.com',
        type: 'url'
      },
    ]
  }
]

const res = [
  {
    'blue': 'hjghgk',
    'green': 'vhjhvjhvj',
    'red': null,
    'address.black': 'd',
    'agent.white': 'new',
    'purple': false,
    'agent.peach': 'jkljlh',
    'pink': null
  }
]


// console.log(process.env.NODE_ENV)
//
const log =
  R.tap(console.log)
//
const obj = { }

// R.forEachObjIndexed( , res[0] )
// R.forEachObjIndexed
// R.ifElse - key contains dot


// if dot
// -----------
// split key to array
// obj[0][1]

// const arrayOfeachColInResult = []

// const getPropsWithoutPrefix = (val, key) => R.not(R.contains(".", key))
// const getPropsWithPrefix = (val, key) => R.contains(".", key)
// const getPropsByAgentPrefix = (val, key) => R.startsWith("agent.", key)
// const AddColumnObjectToArrayForMerge = (colObj) => endArray.push(colObj)
// const st = (s) => R.forEachObjIndexed(dotPipeline, s)
// const addToArr = objToAdd => R.mergeAll(obj, objToAdd)
// "address.black": 'd',
// const eachPairModifier = pair => R.map(buildProperJSONFromRawSqlQuery, pair)

// const res = [
//   {
//     'blue': 'hjghgk',
//     'green': 'vhjhvjhvj',
//     'red': null,
//     'address.black': 'd',
//     'agent.white': 'jgfjfj',
//     'purple': false,
//     'agent.peach': 'jkljlh',
//     'pink': null
//   }
// ]

// .spread((res, meta) => {
//   let json = []
//   _.each(res, (order) => {
//     let newOrder = {}
//     let address = {}
//     let agent = {}
//     _.each(order, (val, key) => {
//       if(key.indexOf('address') !== -1){
//         let newKey = key.split('.')[1]
//         address[newKey] = val
//       } else if(key.indexOf('agent') !== -1) {
//         let newKey = key.split('.')[1]
//         agent[newKey] = val
//       } else {
//         newOrder[key] = val
//       }
//     })
//     newOrder['agent'] = agent
//     newOrder['address'] = address
//     json.push(newOrder)
//   })
//   return json
// })
// return missions
// }
//
// const splitDbColumnOnDot = key => key[0].split('.').concat(key[1])
// const createObjFromArrayUsingPath = (arr) => R.assocPath(R.init(arr), R.last(arr), obj)
// const mapOverPairsOfObj = pairs => R.map(buildProperJSONFromRawSqlQuery, pairs)
// const recursivelyMergeAllCols = col => R.reduce(R.mergeWith(R.merge), {}, col)
//
// const buildProperJSONFromRawSqlQuery = R.pipe(
//   splitDbColumnOnDot,
//   createObjFromArrayUsingPath
// )
//
// const build = R.pipe(
//   R.toPairs,
//   mapOverPairsOfObj,
//   recursivelyMergeAllCols,
//   log
// )
//
// build(res[0])

const usr = {}
usr.id = 5


const ordr = {}
ordr[`pilotId`] = 6

var incCount = R.ifElse(
  R.isNil,

  x => usr.id,

  x => R.ifElse(
    R.equals( ordr[`pilotId`], usr.id ),
    x => "jgj",
    x => 'Already Assigned.'
  )
)

// var incCount = R.ifElse(
//   R.is(String),
//   x => "ghgh",
//   x => "ghjhjhjhj"
// );
// console.log(incCount("hfhf"));           //=> { count: 1 }
console.log(incCount(ordr[`pilotId`])); //=> { count: 2 }
//
// console.log(R.isNil(ordr[`pilotId`]))
// console.log(R.equals(ordr[`pilotId`], usr.id))

// const fin = st(res[0])
// console.log(fin)
// dotPipeline(res[0])
// const order = R.pickBy(getPropsWithoutPrefix, res[0])
// const agents = R.pickBy(getPropsWithPrefix, res[0])
// console.log(order)
// console.log(agents)
// console.log('split',res[0].map(k,v => k))

// const repairKey = (val, key) => obj[key.split(".")[1]] = val

// const tData = R.objOf(R.forEachObjIndexed(pipeline, res[0]))




// console.log(tData)
// const tData =

// res.map()

// const pipeline =
//   R.pipe(
//
//   )

// console.log(pipeline(res))








// const addToObj = (arr) => R.assocPath(R.init(arr), R.last(arr), obj)












// end
