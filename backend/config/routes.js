module.exports = function (app) {

    require("../routes/hostEvent")(app);
    require("../routes/joinTeam")(app);
    require("../routes/hostTeam")(app);
    require("../routes/createTeam")(app);
    require("../routes/viewTeams")(app);
    require("../routes/viewRequests")(app);
    require("../routes/joinEvent")(app);
    require("../routes/hostApprove")(app);
    require("../routes/viewApprovals")(app);
    require("../routes/hostDeny")(app);
};