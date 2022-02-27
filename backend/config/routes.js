module.exports = function (app) {

    require("../routes/hostEvent")(app);
    require("../routes/hostApprove")(app);
    require("../routes/hostDenial")(app);
    require("../routes/createTeam")(app);

    require("../routes/joinEvent")(app);
    require("../routes/joinTeam")(app);
    require("../routes/viewTeams")(app);
    require("../routes/viewRequests")(app);
    require("../routes/viewApprovals")(app); // user
    require("../routes/viewTeammates")(app); // host
};