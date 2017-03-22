module.exports = function (db, dbQuery) {

    return {
        searchItem: searchItem,
        checkout: checkout,
        createAddress: createAddress,
        editAddress: editAddress,
        deleteAddress: deleteAddress,
        createPayment: createPayment,
        editPayment: editPayment,
        deletePayment: deletePayment,
        listOrders: listOrders,
    };

    function searchItem(req, res) {
        let keyword = `%${req.params.keywords}%`;
        let query, values;
        query = "select `id`,`name`,`price`,`quantity`,`description` "
            + "from `Item` where `name` like ? or `description` like ?";
        values = [keyword, keyword];
        dbQuery(query, values, (results, fields) => {
            res.json(results);
        });
    }

    function checkout(req, res) {

    }

    function createAddress(req, res) {
        let role = req.params.uid;
        let addr = req.body;
        let query, values;
        query = "insert into `Address` "
            + "(`name`,`phone`,`postal`,`street`,`apt`,`state`,`country`,`role`) "
            + "values (?,?,?,?,?,?,?,?)";
        values = [addr.name, addr.phone, addr.postal, addr.street, addr.apt, addr.state, addr.country, role];
        dbQuery(query, values, (results, fields) => {
            res.json(results.insertId);
        });
    }

    function editAddress(req, res) {
        let role = req.params.uid;
        let addrID = req.params.aid;
        let addr = req.body;
        let query, values;
        query = "update `Address` set "
            + "`name`=?,`phone`=?,`postal`=?,`street`=?,`apt`=?,`state`=?,`country`=? "
            + "where `role`=? and `id`=?";
        values = [addr.name, addr.phone, addr.postal, addr.street, addr.apt, addr.state, addr.country, role, addrID];
        dbQuery(query, values, (results, fields) => {
            res.json(results.affectedRows);
        });
    }

    function deleteAddress(req, res) {
        let role = req.params.uid;
        let addrID = req.params.aid;
        let query, values;
        query = "delete `Address` where `role`=? and `id`=?";
        values = [role, addrID];
        dbQuery(query, values, (results, fields) => {
            res.json(results.affectedRows);
        });
    }

    function createPayment(req, res) {
        let role = req.params.uid;
        let pay = req.body;
        let query, values;
        query = "insert into `Payment` "
            + "(`creditType`,`cardNumber`,`validDate`,`cardHolder`,`role`) "
            + "values (?,?,?,?,?)";
        values = [pay.creditType, pay.cardNumber, pay.validDate, pay.cardHolder, role];
        dbQuery(query, values, (results, fields) => {
            res.json(results.insertId);
        });
    }

    function editPayment(req, res) {
        let role = req.params.uid;
        let payID = req.params.pid;
        let pay = req.body;
        let query, values;
        query = "update `Payment` set "
            + "`creditType`=?,`cardNumber`=?,`validDate`=?,`cardHolder`=? "
            + "where `role`=? and `id`=?";
        values = [pay.creditType, pay.cardNumber, pay.validDate, pay.cardHolder, role, payID];
        dbQuery(query, values, (results, fields) => {
            res.json(results.affectedRows);
        });
    }

    function deletePayment(req, res) {
        let role = req.params.uid;
        let payID = req.params.pid;
        let query, values;
        query = "delete `Payment` where `role`=? and `id`=?";
        values = [role, payID];
        dbQuery(query, values, (results, fields) => {
            res.json(results.affectedRows);
        });
    }

    function listOrders(req, res) {
        let role = req.params.uid;
        let query, values;
        query = "select `id`,`createTime`,`address` from `Order` where `buyer`=?";
        values = [role];
        dbQuery(query, values, (results, fields) => {
            res.json(results);
        });
    }
};
