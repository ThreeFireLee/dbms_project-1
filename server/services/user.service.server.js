module.exports = function (db, dbQuery) {

    return {
        register: register,
        login: login,
        findUserById: findUserById,
        updateProfile: updateProfile,
        findUserTypeById: findUserTypeById,
        getAddress: getAddress,
    };

    function register(req, res) {
        let user = req.body;
        let query = dbQuery(res, 'register');
        query.add(
            "insert into `Role` (`email`, `password`) values (?, ?)",
            [user.email, user.password]);
        query.add(
            "insert into `Name` (`role`) values (?)",
            ['@[1].insertId']);
        query.add(
            "insert into ?? (`role`) values (?)",
            [user.type, '@[1].insertId']);
        query.execute();
    }

    function login(req, res) {
        let user = req.body;
        let query = dbQuery(res, 'login');
        query.add(
            "select r.id from `Role` as r where r.email=? and r.password=?",
            [user.email, user.password]);
        query.execute();
    }

    function findUserById(req, res) {
        let uid = req.params.uid;
        let query = dbQuery(res, 'find user by id');
        query.add(
            "select r.email, r.age, m.first, m.middle, m.last " +
            "from `Role` as r, `Name` as m " +
            "where r.id=? and m.role=r.id",
            [uid]);
        query.execute();
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
        let query = dbQuery(res, 'update profile');
        console.log(user);
        query.add(
            "update `Role` as r, `Name` as m " +
            "set r.email=?, r.age=?, m.first=?, m.middle=?, m.last=? " +
            "where r.id=m.role and r.id=?",
            [user.email, user.age, user.first, user.middle, user.last, uid]);
        query.execute();
    }

    function getAddress(req, res) {
        let aid = req.params.aid;
        let query = dbQuery(res, 'get address');
        query.add(
            "select a.id,a.name,a.phone,a.postal,a.street,a.apt,a.state,a.country " +
            "from `Address` as a where a.id=?",
            [aid]);
        query.execute();
    }
};
