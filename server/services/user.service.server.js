module.exports = function (db, dbQuery) {

    return {
        register: register,
        login: login,
        findUserById: findUserById,
        updateProfile: updateProfile,
        findUserTypeById: findUserTypeById,
    };

    function register(req, res) {
        let user = req.body;
        let query = dbQuery(res);
        query.add(
            "insert into `Role` (`email`, `password`) values (?, ?)",
            [user.email, user.password]);
        query.add(
            "insert into `Name` (`role`) values (?)",
            ['@insertId']);
        query.add(
            "insert into ?? (`role`) values (?)",
            [user.type, '@insertId']);
        query.execute('register');
    }

    function login(req, res) {
        let user = req.body;
        let query = dbQuery(res);
        query.add(
            "select r.id from `Role` as r where r.email=? and r.password=?",
            [user.email, user.password]);
        query.execute('login');
    }

    function findUserById(req, res) {
        let uid = req.params.uid;
        let query = dbQuery(res);
        query.add(
            "select r.email, r.age, m.first, m.middle, m.last " +
            "from `Role` as r, `Name` as m " +
            "where r.id=? and m.role=r.id",
            [uid]);
        query.execute('find user by id');
    }

    function findUserTypeById(req, res) {
        let uid = req.params.uid;
        let query = dbQuery(res);
        query.add(
            "select case " +
            "when exists(select * from `Buyer` where `role`=?) then 'Buyer' " +
            "when exists(select * from `Seller` where `role`=?) then 'Seller' " +
            "end as `type` ",
            [uid, uid]);
        query.execute();
    }

    function updateProfile(req, res) {
        let uid = req.params.uid;
        let user = req.body;
        let query = dbQuery(res);
        console.log(user);
        query.add(
            "update `Role` as r, `Name` as m " +
            "set r.email=?, r.age=?, m.first=?, m.middle=?, m.last=? " +
            "where r.id=m.role and r.id=?",
            [user.email, user.age, user.first, user.middle, user.last, uid]);
        query.execute('update profile')
    }
};
