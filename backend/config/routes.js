module.exports = function (app) {

    require("../routes/hostEvent.js")(app);
    require("../routes/hostTeam.js")(app);
    require("../routes/viewTeams.js")(app);
    require("../routes/viewRequests.js")(app);
};