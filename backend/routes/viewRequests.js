const fs = require('fs');
require('dotenv').config();

eventID = 0;
teamId = 0;
const cors = require('cors');

module.exports = (app) => {
    app.get("/viewRequests", (req, res) => {
        // read the json file
        const fileName = process.env.JSON_FILE;
        var json = require(`../${fileName}`);

        res.send(json["events"][eventID]["teams"][teamId]["memberRequests"]);

    });
};