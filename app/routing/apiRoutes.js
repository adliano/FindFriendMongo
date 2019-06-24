/**
 * Your `apiRoutes.js` file should contain two routes:
 * A GET route with the url `/api/friends`.
 * This will be used to display a JSON of all possible friends.
 * A POST routes `/api/friends`.
 * This will be used to handle incoming survey results.
 * This route will also be used to handle the compatibility logic.
 */

// let friends = require('../data/friends')
// Require Mongojs
let mongojs = require('mongojs')
// Mongo database config
let databaseURL = 'friends'
let collections = ['users']
// Init Mong db with congiguration
let db = mongojs(databaseURL, collections)

// On Error event listener
db.on('error', (error) => {
  console.log('⚠️ ☣️ ☢️'.repeat(10))
  console.error(error)
})





function getAllFriends() {
  db.users.find( (err, found) => {
    if (err) {
      console.error(err)
      return
    }
   else {
     return found
   }
  })
}


/**************************************
 * Method findMatch()
 * @param {Array} usrScore
 * @returns Promise
 *
 * This Method will compares users scores and find the closest match
 **************************************/
function findMatch (usrScore) {
  // Return a Promise
  let friends = getAllFriends()
  console.log(friends)
  return new Promise((resolve, reject) => {
    // Max possible score will be 40
    let _matchedUser = { score: 40 }
    resolve(friends)
    //
    // Clear console for better debug
    // console.clear()
    // Loop throught friends array to calculate results
    // friends.forEach(function (item, usrIndex) {
    //   let _results = 0

    //   // console.log(item.score);
    //   // Loop through score array
    //   item.score.forEach(function (item, index) {
    //     // Get Sum of Diferrence between current user score and saved user score
    //     _results = _results + Math.abs(item - usrScore[index])
    //   })
    //   // Check if score its close to current user and get its index
    //   if (_matchedUser.score > _results) {
    //     _matchedUser.score = _results
    //     _matchedUser.index = usrIndex
    //   }
    // })
    // Pass the Mathed user
    // resolve(friends[_matchedUser.index])
  })
}

function apiRoutes (app) {
  // API Friends
  /**************************************
   *
   * GETs Routes
   *
   **************************************/
  let friends = getAllFriends()
  app.get('/api/friends', function (req, res) {
    res.send(friends)
  })

  /**************************************
   *
   * POSTs Routes
   *
   **************************************/
  app.post('/api/friends', function (req, res) {
    // Call method findMath() to find Matched user
    // findMatch(req.body.score).then(user => {
      // then send the matched user to client
      // res.json(user)
      // and add it to friends array
      // friends.push(req.body)
      db.users.save(req.body)
    // })
  })
}

module.exports = apiRoutes
