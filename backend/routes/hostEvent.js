const fs = require('fs');
require('dotenv').config();

module.exports = (app) => {
    function getRandomID(digits) {
        return Math.floor(Math.random() * digits);
    }

    app.post("/hostEvent", (req, res) => {
        const fileName = process.env.JSON_FILE;
        var json = require(`../${fileName}`);
        json["events"].push({
            "name": "Hackathon",
            "id": 0,
            "description": "string",
            "teams": []
        })
        //console.log(json["events"])
        console.log(req.body);
        console.log(req.data);
        console.log(req.query);
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