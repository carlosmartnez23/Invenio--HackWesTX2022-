

// Dependencies

require('dotenv').config();

module.exports = (app) =>{

    var fs = require('fs');
    const cors= require('cors'); 
    
    app.post('/createTeam', (request, response) => {
        response.header("Access-Control-Allow-Origin", "*");
        cors.apply(app);
        const fileName = process.env.JSON_FILE;
        console.log("Post request on /createTeam");
        var fileData = require(`../${fileName}`);
        //console.log(fileData);
        var team;
        let buffer = '';
        var obj;
        request.on('data', chunk => {
            buffer += chunk;
        });
        request.on('end', () => {
            // POST request body is now available as `buffer`
            //console.log(buffer)
            obj = JSON.parse(buffer);
            //console.log(fileData.events[0].name);
            for(var event of fileData.events){
                
                if(event.id == obj.eventId){
                    //console.log(event.name)
                    // Found the event, now add the team
                    event.teams.push(obj.team);
                    team = JSON.stringify(fileData, null, 2);
                    fs.writeFileSync(`./${fileName}`, JSON.stringify(fileData, null, 2), 'utf8');
                    console.log(obj.team)
                    response.send(obj.team)
                }
            }
        });
    });
};

