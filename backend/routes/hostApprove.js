const fs = require('fs');
require('dotenv').config();
const cors = require('cors');
const { request } = require('http');
// var teamId= 0;
// var eventId=0;
// var name ="abc";
// title = "Java Dev",
// description = "String example"

function getRandomID(digits) {
    return Math.floor(Math.random() * digits);
}
var memberId = getRandomID(9999);

module.exports = (app) => {  
    app.get("/hostApprove", (request, response) => {
        const fileName = process.env.JSON_FILE;
        var json = require(`../${fileName}`);
    
        let buffer = '';
        request.on('data', chunk => {
            buffer += chunk;
        });
        request.on('end', () => {
            // POST request body is now available as `buffer`
            console.log("0npm", member);
            var obj = JSON.parse(buffer);
            for (var member of json.events[obj.eventId].requests) {
                console.log("le= ", json.events[obj.eventId].requests.length )
                if (json.events[obj.eventId].requests.length > 0){
                    if (member.name == obj.name) {
                        // Found the event, now add the request
                        var hasRequested = false;
                        console.log("1.1");
                        //
                        var k = 0;
                       var  requests = json.events[obj.eventId].requests;
                        for (var request in requests) {
                            //check if its in the request , delete it and break
                            console.log("delete", requests[k]);
                            if (requests[k].name == obj.name && requests[k].teamId == obj.teamId) {
                                hasRequested = true;
                                console.log("Aha", requests[k]);
                                delete json.events[obj.eventId].requests[k];
                                if (json.events[obj.eventId].requests == 1){
                                    json.events[obj.eventId].requests = []
                                }
                                k += 1;
      
                                fs.writeFile(fileName, JSON.stringify(json), 'utf8', (err) => {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(404);
                                }
                                console.log("File written successfully\n");
                                response.status(200).end();
                            });
                                break;
                            };
                        };
                        //if not put it in the request array
                        if (hasRequested == false) {
                            console.log("push");
                            json.events[obj.eventId].teams[obj.teamId].members.push({
                                "teamId": obj.teamId,
                                "name": obj.name,
                                "title": obj.title,
                                "eventId": obj.eventId
                            }
                            );
                          
                            hasRequested= true;
                            fs.writeFile(fileName, JSON.stringify(json), 'utf8', (err) => {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(404);
                                }
                                console.log("File written successfully\n");
                                response.status(200).end();
                            });
                        };
                        console.log("res", member);
                        response.send(json["events"]);
                    }else{
                        response.send("Not found 404");
                        break;
                    }
                }
                
                
            }
        });
    });
        
        
          
        
    ;
}
