module.exports = function (app, db) {

    function dbQuery(res) {
        let bundle = {
            res: res,
            queries: [
                // {format: '', values: []}
            ],
            lastResult: null,
        };

        return {
            add: addQuery.bind(bundle),
            execute: startTransaction.bind(bundle),
        };

        function addQuery(format, values) {
            this.queries.push({
                format: format,
                values: values,
            });
        }

        function startTransaction(description) {
            console.log('\033[33m[', description, ']\033[0m');
            if (!this.queries.length) return;
            db.beginTransaction(function (err) {
                if (err) throw err;
                continued.bind(this)();
            }.bind(this));
        }

        function continued(error, results, fields) {
            if (error) throw error;
            this.lastResult = results;
            if (typeof results !== 'undefined') console.log('<<<', results);
            if (!this.queries.length) {
                db.commit(function (err) {
                    if (err) return db.rollback(() => {
                        throw err;
                    });
                    console.log('='.repeat(80));
                    this.res.json(results);
                }.bind(this));
            } else {
                let sql_prep = this.queries.shift();
                sql_prep.values = sql_prep.values.map(val => {
                    if (typeof val === 'string' && val[0] === '@') {
                        val = eval(val.replace('@', 'this.lastResult.'));
                    }
                    return val;
                });
                let sql = db.format(sql_prep.format, sql_prep.values);
                console.log('\033[32m>>>', sql, '\033[0m');
                db.query(sql, continued.bind(this));
            }
        }
    }

    let services = {
        user: require("./services/user.service.server.js")(db, dbQuery),
        seller: require("./services/seller.service.server.js")(db, dbQuery),
        buyer: require("./services/buyer.service.server.js")(db, dbQuery),
    };

    require('./api.server.js')(app, services);

};
