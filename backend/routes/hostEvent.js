require('dotenv').config();

module.exports = (app) => {

    app.get("/hostEvent", (req, res) => {
        const file_name = process.env.JSON_FILE;
        var json = require(`../${file_name}`);
        fs.writeFile(`../${file_name}`, "HELLO", (err) => {
            if (err)
                console.log(err);
            else {
                console.log("File written successfully\n");
                console.log("The written has the following contents:");
                console.log(fs.readFileSync(`../${file_name}`, "utf8"));
            }
        });
        console.log(req.data)
    });
};