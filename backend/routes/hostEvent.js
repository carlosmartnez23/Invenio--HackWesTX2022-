const fs = require('fs');
require('dotenv').config();

module.exports = (app) => {

    app.get("/hostEvent", (req, res) => {
        const file_name = process.env.JSON_FILE;
        var json = require(`../${file_name}`);
        fs.writeFile(`test.json`, "HELLO", (err) => {
            if (err)
                console.log(err);
            else {
                console.log("File written successfully\n");
                console.log("The written has the following contents:");
                console.log(fs.readFileSync(`test.json`, "utf8"));
            }
        });
        console.log(req.data)
    });
};