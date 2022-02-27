const express = require("express");

const app = express();
const port = "3000";

module.exports = app;
require("./config/routes.js")(app);

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});