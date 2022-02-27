const fs = require('fs');
require('dotenv').config();

module.exports = (app) => {

    app.post("/joinEvent", (req, res) => {
        // read the json file
        const fileName = process.env.JSON_FILE;
        var json = require(`../${fileName}`);

        // get the name and description of the event from the request
        const teamID = 1;

        for (let i = 0; i < json.events.length; i++) {
            if (teamID == json.events[i].id) {
                valid = false;
            }
        }

        // rewrite the json file
        fs.writeFile(fileName, JSON.stringify(json), 'utf8', (err) => {
            if (err)
                console.log(err);
            res.send();
            console.log("File written successfully\n");
        });

        res.sendStatus(200);
    });
};