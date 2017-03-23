module.exports = function (db, dbQuery) {

    return {
        register: register,
        login: login,
        findUserById: findUserById,
        updateProfile: updateProfile,
    };

    function register(req, res) {
        let user = req.body;
        let query, values;
        db.beginTransaction(err => {
            if (err) throw err;
            console.log(`registering: (${user.type}) ${user.email}`);
            query = "insert into `Role` (`email`, `password`) values (?, ?)";
            values = [user.email, user.password];
            dbQuery(query, values, (results, fields) => {
                uid = results.insertId;
                query = "insert into ?? (`role`) values (?)";
                values = [user.type, uid];
                dbQuery(query, values, (results, fields) => {
                    db.commit(err => {
                        if (err) {
                            return db.rollback(() => {
                                throw err;
                            });
                        }
                        console.log(`registered: (${user.type}) ${user.email}`);
                        res.json(results);
                    });
                });
            });
        });
    }

    function login(req, res) {
        let user = req.body;
        let query, values;
        console.log(`logging-in: ${user.email}`);
        query = "select `id` from `Role` where `email`=? and `password`=?";
        values = [user.email, user.password];
        dbQuery(query, values, res);
    }

    function findUserById(req, res) {
        let uid = req.params.uid;
        let query, values;
        console.log(`finding user # ${uid}`);
        query = "select `email`,`dateOfBirth` from `Role` where `id`=?";
        values = [uid];
        dbQuery(query, values, res);
    }

    function updateProfile(req, res) {

    }
};
