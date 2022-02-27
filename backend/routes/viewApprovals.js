require('dotenv').config();

// api should receive
// eventId
// name of the client (API not intended for host)

module.exports = (app) => {
    app.post("/viewApprovals", (request, response) => {
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
                    for (var team of event.teams) {
                        var approved = false;
                        var membersNames = [];
                        for (var member of team.members) {
                            if (member.name == obj.name) {
                                approved = true;
                            } else {
                                membersNames.push({ "name": member.name });
                            }
                        }
                        if (approved) {
                            response.write(JSON.stringify({
                                "teamName": team.teamName,  // team name
                                "host": team.host.name,     // team host name
                                "members": membersNames     // list of member names
                            }));
                            response.send();
                            break;
                        }
                    }
                    if (approved == false) {
                        response.write("");
                        response.send();
                    }
                }
            };
        });
    });
}