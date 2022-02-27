// Dependencies
var fs = require('fs');
require('dotenv').config();

eventId = 0;
teamId = 0;

member = {
    teamIdm: teamId,
    name: "Name 10"
}

console.log(" weid");
module.exports = (app) => {
    //get the team id and add the member to the array



    app.post("/joinTeam", (request, response) => {
        const fileName = process.env.JSON_FILE;
        console.log("sSOmething weid", member["memberId"]);
        var json = require(`../${fileName}`);

        const strMembers = JSON.stringify(member);

        json["events"][eventId]["teams"][teamId]["memberRequests"].push({
            "teamId": teamId,
            "name": member["name"]
        });

        fs.writeFile(`eventsData.json`, JSON.stringify(json), 'utf8', (err) => {
            if (err)
                console.log(err);
            else {
                console.log("File written successfully\n");
            }
        });
        response.send(json["events"][eventId]["teams"][teamId]["memberRequests"]);
    });



}