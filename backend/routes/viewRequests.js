require('dotenv').config();

module.exports = (app) => {
    app.get("/viewRequests", (req, res) => {
        // read the json file
        const fileName = process.env.JSON_FILE;
        var json = require(`../${fileName}`);
        let buffer = '';
        req.on('data', chunk => {
            buffer += chunk;
        });
        req.on('end', () => {
            var obj = JSON.parse(buffer);
            for (var event of json.events) {
                if (event.id == obj.eventId) {
                    res.send(event.requests);
                }
            }
        });
    });
};