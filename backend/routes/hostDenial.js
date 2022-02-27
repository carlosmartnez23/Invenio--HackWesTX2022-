const fs = require('fs');
require('dotenv').config();

module.exports = (app) => {
    app.post("/hostDenial", (request, response) => {
        const fileName = process.env.JSON_FILE;
        var json = require(`../${fileName}`);

        let buffer = '';
        request.on('data', chunk => {
            buffer += chunk;
        });
        request.on('end', () => {
            // POST request body is now available as `buffer`
            var obj = JSON.parse(buffer);
            for (var event of json.events) {
                if (event.id == obj.eventId) {
                    let deleted = '';
                    for (var i in event.requests) {
                        if (event.requests[i].name == obj.name && event.requests[i].teamId == obj.teamId) {
                            console.log("Deleting...")
                            deleted = event.requests.splice(i, 1);
                            console.log(deleted);
                            fs.writeFile(fileName, JSON.stringify(json), 'utf8', (err) => {
                                if (err) {
                                    console.log(err);
                                    response.sendStatus(404);
                                }
                                console.log("File written successfully\n");
                            });
                            break;
                        };

                    };
                    response.sendStatus(200);
                }
            };
        });
    });
}