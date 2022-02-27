// Dependencies
var fs = require('fs');
require('dotenv').config();

module.exports = (app) => {
    //get the team id and add the member to the array

    app.post("/joinTeam", (request, response) => {
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
                    // Found the event, now add the request
                    var hasRequested = false;
                    for (var i in event.requests) {
                        if (event.requests[i].name == obj.name && event.requests[i] == obj.teamId) {
                            hasRequested = true;
                        };
                    };
                    if (hasRequested == false) {
                        event.requests.push({
                            "teamId": obj.teamId,
                            "name": obj.name
                        });
                        fs.writeFile(fileName, JSON.stringify(json), 'utf8', (err) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(404);
                            }
                            console.log("File written successfully\n");
                            response.sendStatus(200);
                        });
                    } else {
                        response.sendStatus(404);
                    }
                }
            }
        });
    });
}