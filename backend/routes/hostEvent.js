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
        var valid = false;



        json["events"].push({
            "name": "Hackathon",
            "id": 0,
            "description": "string",
            "teams": []
        })

        res.sendStatus(200);

        // fs.writeFile(`test.json`, JSON.stringify(json), 'utf8', (err) => {
        //     if (err)
        //         console.log(err);
        //     else {
        //         console.log("File written successfully\n");
        //     }
        // });

    });
};