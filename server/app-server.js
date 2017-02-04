module.exports = function (app, db) {

    function dbQuery(sql, res) {
        sql = sql.replace(/^\s*/gm, '');
        console.log(`>>>\n${sql}\n`);
        db.query(sql, function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        });
    }

    let services = {
        user: require("./services/user.service.server.js")(dbQuery),
    };

    require('./api.server.js')(app, services);

};
