const fs = require('fs');
require('dotenv').config();

module.exports = (app) => {
    function getRandomID(digits) {
        return Math.floor(Math.random() * digits);
    }

    app.post("/hostEvent", (req, res) => {
        // read the json file
        const fileName = process.env.JSON_FILE;
        var json = require(`../${fileName}`);

        // get the name and description of the event from the request
        const name = "TTU Hackathon";
        const description = "Hackathon organized by TTU";

        // create an event ID and check if it's valid
        while (true) {
            var valid = true;
            var teamID = getRandomID(99999);
            for (let i = 0; i < json.events.length; i++) {
                if (teamID == json.events[i].id) {
                    valid = false;
                }
            }
            if (valid) {
                break
            }
        }

        // append all the information to the json
        json["events"].push({
            "name": name,
            "id": teamID,
            "description": description,
            "teams": []
        })

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