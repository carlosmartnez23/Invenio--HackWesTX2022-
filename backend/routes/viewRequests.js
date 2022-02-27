require('dotenv').config();

module.exports = (app) => {
    app.get("/viewRequests", (req, res) => {
        // read the json file
        const fileName = process.env.JSON_FILE;
        var json = require(`../${fileName}`);
        res.send(json.events[0].requests);
    });
};