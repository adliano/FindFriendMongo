// use fylesystem
// instanciate express
const express = require("express");
let app = express();
// Default PORT used by listener for routing
const PORT = process.env.PORT || 3000;

// Midlayers to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

/**************************************
 *
 * SERVER LISTEN
 *
 **************************************/
app.listen(PORT, function() {
  console.log(`Server runnig on PORT ${PORT}`);
});
