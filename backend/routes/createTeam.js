

// Dependencies
var fs = require('fs');
require('dotenv').config();


filePath = 'teamData.json';

const cors=require('cors');

module.export = (app) =>{


    var fileData;

    fs.readFile('teamData.json', 'utf8', (error, data) => {
        if(error){
        console.log(error);
        return;
        }
        fileData = JSON.parse(data);
        
    })

    function createTeam(request, response){
        let buffer = '';
        console.log("Post request on /createTeam");
        request.on('data', chunk => {
            buffer += chunk;
        });
        request.on('end', () => {
            // POST request body is now available as `buffer`
            console.log(buffer)
            var obj = JSON.parse(buffer);
            //console.log(fileData.events[0].name);
            for(var event of fileData.events){
                
                if(event.id == obj.eventId){
                    //console.log(event.name)
                    // Found the event, now add the team
                    event.teams.push(obj.team);
                    console.log(event.teams);
                    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf8');
                    //console.log(event)
                }
            }
        });

        response.send(200);      
    }
}

