module.exports = function (app, db) {

    function dbQuery(query, values, callback) {
        // a shortened api for simple query
        let sql = db.format(query, values);
        console.log('exec -> ' + sql);
        db.query(sql, (error, results, fields) => {
            if (error) throw error;
            callback(results, fields);
            console.log('done -> ' + sql);
        });
    }

    let services = {
        user: require("./services/user.service.server.js")(db, dbQuery),
        seller: require("./services/seller.service.server.js")(db, dbQuery),
        buyer: require("./services/buyer.service.server.js")(db, dbQuery),
    };

    require('./api.server.js')(app, services);

};
