// Dependencies
var fs = require('fs');
require('dotenv').config();

console.log(" weid");
module.exports = (app) => {
    //get the team id and add the member to the array



    app.post("/joinTeam", (request, response) => {
        const fileName = process.env.JSON_FILE;
        console.log("sSOmething weid", member["memberId"]);
        var json = require(`../${fileName}`);

        const strMembers = JSON.stringify(member);

        request.on('data', chunk => {
            buffer += chunk;
        });
        request.on('end', () => {
            // POST request body is now available as `buffer`
            console.log(buffer)
            obj = JSON.parse(buffer);

            json["events"][obj.eventId].push({
                "teamId": obj.teamId,
                "name": obj.name
            });

            fs.writeFile(`eventsData.json`, JSON.stringify(json), 'utf8', (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully\n");
                }
            });
        });
        response.status(200).end();
    });



}