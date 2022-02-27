require('dotenv').config();

// api should receive
// eventId
// teamId (API intended for host)

module.exports = (app) => {
    app.post("/viewTeammates", (request, response) => {
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
                        if (team.teamId == obj.teamId) {
                            var membersNames = [];
                            for (var member of team.members) {
                                membersNames.push({ "name": member.name });
                            }
                            response.write(JSON.stringify({ "members": membersNames }));
                            response.send();
                            break;
                        }
                    }
                }
            };
        });
    });
}