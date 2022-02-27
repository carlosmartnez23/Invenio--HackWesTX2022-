const fs = require('fs');
require('dotenv').config();

eventID = 0;

const cors = require('cors');

module.exports = (app) => {
    app.get("/viewTeams", (req, res) => {
        // read the json file
        const fileName = process.env.JSON_FILE;
        var json = require(`../${fileName}`);

        res.send(json["events"][eventID]["teams"]);

    });
};