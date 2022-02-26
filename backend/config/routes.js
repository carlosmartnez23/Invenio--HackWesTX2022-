module.exports = function (app) {

    require("../routes/hostEvent.js")(app);
    require("../routes/createTeam.js")(app);
    //require("../routes/joinTeam")(app);
    //require("../routes/joinEvent")(app);

};