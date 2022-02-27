

// Dependencies

require('dotenv').config();

module.exports = (app) => {

    var fs = require('fs');
    const cors = require('cors');

    app.post('/createTeam', (request, response) => {

        const fileName = process.env.JSON_FILE;
        console.log("Post request on /createTeam");
        var fileData = require(`../${fileName}`);

        let buffer = '';
        var obj;
        request.on('data', chunk => {
            buffer += chunk;
        });
        request.on('end', () => {
            // POST request body is now available as `buffer`
            console.log(buffer)
            obj = JSON.parse(buffer);
            //console.log(fileData.events[0].name);
            for (var event of fileData.events) {

                if (event.id == obj.eventId) {
                    //console.log(event.name)
                    // Found the event, now add the team
                    event.teams.push(obj.team);
                    fs.writeFileSync(`../${fileName}`, JSON.stringify(fileData, null, 2), 'utf8');
                    console.log(event)
                }
            }
        });
        response.status(200).end();
        //response.sendStatus(200);
        //response.status(200).send(JSON.stringify());      
    });
};

