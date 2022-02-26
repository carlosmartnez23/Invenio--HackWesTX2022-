const express = require("express");
const path = require("path");
const fs = require('fs');

const app = express();
const port = "5000";

module.exports = app;

app.get("/", (req, res) => {
    res.status(200).send("HackWesTx!! 2022");
});

require("./config/routes.js")(app);

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});