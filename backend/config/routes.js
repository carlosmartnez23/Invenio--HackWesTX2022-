module.exports = function (app) {

    require("../routes/hostEvent.js")(app);
    require("../routes/hostTeam.js")(app);

};