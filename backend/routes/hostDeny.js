require('dotenv').config();

module.exports = (app) => {
    app.post("/hostDeny", (request, response) => {
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
                        if (event.requests[i].name == obj.name && event.requests[i].teamId) {
                            console.log("Deleting...")
                            deleted = event.requests.splice(i, 1);
                            console.log(deleted);
                        };
                    };
                    response.sendStatus(200);
                }
            };
        });
    });
}