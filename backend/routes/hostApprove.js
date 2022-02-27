const fs = require('fs');
require('dotenv').config();

function getRandomID(digits) {
    return Math.floor(Math.random() * digits);
}

module.exports = (app) => {
    app.post("/hostApprove", (request, response) => {
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
                        if (event.requests[i].name == obj.name) {
                            console.log("Deleting...")
                            deleted = event.requests.splice(i, 1);
                            console.log(deleted);
                        };
                    };
                    for (var k in event.teams) {
                        let teamObj = event.teams[k];
                        if (teamObj.teamId == parseInt(obj.teamId) && teamObj.maxCapacity != teamObj.currentMembers) {
                            console.log("Pushing...")
                            event.teams[k].members.push({
                                "memberId": getRandomID(99999),
                                "name": deleted[0].name,
                                "skills": deleted[0].skills
                            });
                            event.teams[k].currentMembers = event.teams[k].currentMembers + 1;
                            fs.writeFile(fileName, JSON.stringify(json), 'utf8', (err) => {
                                if (err) {
                                    console.log(err);
                                    response.sendStatus(404);
                                }
                                console.log("File written successfully\n");
                            });
                            break;
                        }
                    };
                    response.sendStatus(200);
                }
            };
        });
    });
}