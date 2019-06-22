/**
 * Your `htmlRoutes.js` file should include two routes:
 * A GET Route to `/survey` which should display the survey page.
 * A default, catch-all route that leads to `home.html` which displays the home page.
 */

let path = require("path");

function htmlRoutes(app) {
  /**************************************
   *
   * GETs Routes
   *
   **************************************/
  // survey
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });
  // home
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
}

module.exports = htmlRoutes;
