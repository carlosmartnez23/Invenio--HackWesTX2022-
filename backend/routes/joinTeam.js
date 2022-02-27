// Dependencies
var fs = require('fs');
require('dotenv').config();

const cors = require('cors');
console.log("sSOmething");

module.exports = (app) => {
 //get the team id and add the member to the array

 console.log(" weid");
 app.get("/joinTeam", (request, response) => {
    const fileName = process.env.JSON_TEAM_DATA;
    console.log("sSOmething weid");
    var json = require(`../${fileName}`);
    var fileData = JSON.parse(json);

        const strMembers= JSON.stringify(member);

        json["events"][eventId]["teams"][teamId]["memberRequests"].push({
        "memberId": member["memberID"],
        "name": member["name"], 
        "title": member["title"],
        "description": member["description"]
        })

        fs.writeFile(`test.json`, JSON.stringify(json), 'utf8', (err) => {
            if (err)
                console.log(err);
            else {
                console.log("File written successfully\n");
            }
        });
        response.send(json["events"][eventId]["teams"][teamId]["memberRequests"]);
    });

    

}