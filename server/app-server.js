module.exports = function (app, db) {

    let services = {
        user: require("./services/user.service.server.js")(db),
        seller: require("./services/seller.service.server.js")(db),
        buyer: require("./services/buyer.service.server.js")(db),
    };

    require('./api.server.js')(app, services);

};
