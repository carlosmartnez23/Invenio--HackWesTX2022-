const fs = require('fs');
require('dotenv').config();

module.exports = (app) => {

    app.post("/joinEvent", (req, res) => {
        // read the json file
        const fileName = process.env.JSON_FILE;
        var json = require(`../${fileName}`);

        // get the name and description of the event from the request
        const teamID = 1;
        let valid = false;

        for (let i = 0; i < json.events.length; i++) {
            if (teamID == json.events[i].id) {
                valid = true;
            }
        }

        if (valid) {
            res.sendStatus(200);
        }
        res.sendStatus(404);
    });
};