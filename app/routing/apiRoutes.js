/**
 * The `apiRoutes.js` file contain two routes:
 * A GET route with the url `/api/friends`.
 * This will be used to display a JSON of all possible friends.
 * A POST routes `/api/friends`.
 * This will be used to handle incoming survey results.
 * This route will also be used to handle the compatibility logic.
 */
// Using npm dotenv
require('dotenv')
// Require Mongojs
let mongojs = require('mongojs')
// Mongo database config
// MONGODB_URI available at Heroku -> settings -> Config Vars
// Or run command on terminal `heroku config -a thefindfriends`
// Locally this info its saved on .env file
let databaseURL = process.env.MONGODB_URI
// Mongo collection(s) (like as "Tables" in SQL)
let collections = ['users']
// Init Mong db with congiguration
// This will create the database and collection
let db = mongojs(databaseURL, collections)

// On Error event listener
db.on('error', error => {
  console.log('⚠️ ☣️ ☢️'.repeat(10))
  console.error(error)
})
/**************************************
 * Method findMatch()
 * @param {Array} usrScore
 * @returns Promise
 *
 * This Method will compares users scores and find the closest match
 **************************************/
function findMatch (usrScore) {
  return new Promise((resolve, reject) => {
    // Max possible score will be 40
    let _matchedUser = { score: 40 }
    // Search for user on Mongodb
    db.users.find((err, found) => {
      // Check for error on database
      if (err) {
        console.error(err)
        // In case of error reject
        reject(err)
      } else {
        // Found will return a array with dababase object(s)
        // Loop throught found array to calculate results and find match
        found.forEach( (item, usrIndex) => {
          console.log('Looking for a match....')
          // Reset results to zero for each user
          let _results = 0
          // score its a array with numbers that users select on quetionary
          // Loop through score array and compare to find the match
          item.score.forEach( (item, index) => {
            // Get Sum of Diferrence between current user score and saved user score
            _results = _results + Math.abs(item - usrScore[index])
          })
          // Check if score its close to current user and get its index
          if (_matchedUser.score > _results) {
            _matchedUser.score = _results
            _matchedUser.index = usrIndex
          }
        })
        // Pass the Mathed user
        resolve(found[_matchedUser.index])
      }
    })
  })
}

function apiRoutes (app) {
  // API Friends
  /**************************************
   *
   * GETs Routes
   *
   **************************************/
  app.get('/api/friends', function (req, res) {
    db.users.find((err, found) => {
      if (err) {
        console.error(err)
        res.send(err)
      } else {
        res.send(found)
      }
    })
  })
  /**************************************
   *
   * POSTs Routes
   *
   **************************************/
  app.post('/api/friends', function (req, res) {
    // Call method findMath() to find Matched user
    findMatch(req.body.score).then(user => {
      // then send the matched user to client
      res.json(user)
      // and add it to friends array
      // friends.push(req.body)
      db.users.save(req.body)
    })
  })
}

module.exports = apiRoutes
