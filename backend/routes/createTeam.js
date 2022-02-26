

// Dependencies
var fs = require('fs');




const cors=require('cors');

module.exports = (app) =>{
    require('dotenv').config();
    //var fileData;
    /*fs.readFile(filePath, 'utf8', (error, data) => {
        if(error){
        console.log(error);
        return;
        }
        fileData = JSON.parse(data);
        
    })*/
    
    app.post('/createTeam', (request, response) => {
        
        const fileName = process.env.JSON_TEAM_DATA;
    
        var json = require(`../${fileName}`);
        var fileData = JSON.parse(json);
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
                    fs.writeFileSync(fileName, JSON.stringify(fileData, null, 2), 'utf8');
                    //console.log(event)
                }
            }
        });

        response.status(200).send(JSON.stringify(obj.team));      
    });
}

