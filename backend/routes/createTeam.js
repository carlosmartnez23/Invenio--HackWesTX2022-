// Dependencies

require('dotenv').config();

module.exports = (app) => {

    var fs = require('fs');
    const cors = require('cors');

    function getRandomID(digits) {
        return Math.floor(Math.random() * digits);
    }

    app.post('/createTeam', (request, response) => {

        const fileName = process.env.JSON_FILE;
        console.log("Post request on /createTeam");
        var fileData = require(`../${fileName}`);

        let buffer = '';
        request.on('data', chunk => {
            buffer += chunk;
        });
        request.on('end', () => {
            // POST request body is now available as `buffer`
            var obj = JSON.parse(buffer);
            console.log(obj);
            for (var event of fileData.events) {
                if (event.id == obj.eventId) {
                    // Found the event, now add the team
                    // get a team id
                    while (true) {
                        var valid = true;
                        var teamID = getRandomID(99999);
                        for (var i in event.teams) {
                            if (event.teams[i].teamId == teamID) {
                                valid = false;
                            }
                        }
                        if (valid) {
                            break;
                        }
                    };

                    var maxCap = obj.maxCapacity;
                    if (Number.isInteger(maxCap) == false) {
                        maxCap = parseInt(obj.maxCapacity);
                    }
                    const team = {
                        "teamName": obj.teamName, "maxCapacity": maxCap, "teamId": teamID, "host": {
                            "name": obj.hostName, "title": obj.hostTitle,
                            "description": JSON.parse(obj.hostDescription)
                        }, "currentMembers": 1, "members": []
                    };
                    event.teams.push(team);
                    fs.writeFileSync(`./${fileName}`, JSON.stringify(fileData), 'utf8', (err) => {
                        if (err) {
                            console.log(err);
                            response.send();
                        }
                        console.log("File written successfully\n");
                    });
                    response.write(`${teamID}, ${team.teamName}`);
                    response.send();
                }
            }
        });
    });
};

