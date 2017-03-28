module.exports = function (db, dbQuery) {

    return {
        searchItem: searchItem,
        checkout: checkout,
        listAddresses: listAddresses,
        createAddress: createAddress,
        editAddress: editAddress,
        deleteAddress: deleteAddress,
        listPayments: listPayments,
        createPayment: createPayment,
        editPayment: editPayment,
        deletePayment: deletePayment,
        listOrders: listOrders,
        featuredItems: featuredItems,
        listShoppingCartItems: listShoppingCartItems,
        addItemToCart: addItemToCart,
    };

    function searchItem(req, res) {
        let keyword = `%${req.params.keywords}%`;
        let query = dbQuery(res);
        query.add("select i.id, i.name, i.price, i.quantity, i.description` " +
            "from `Item` as i where i.name like ? or i.description like ?",
            [keyword, keyword]);
        query.execute();
    }

    function checkout(req, res) {

    }

    function listAddresses(req, res) {
        let role = req.params.uid;
        let query = dbQuery(res);
        query.add(
            "select a.id,a.name,a.phone,a.postal,a.street,a.apt,a.state,a.country " +
            "from `Address` as a where a.role=?",
            [role]);
        query.execute('list addresses');
    }

    function createAddress(req, res) {
        let role = req.params.uid;
        let addr = req.body;
        let query = dbQuery(res);
        query.add(
            "insert into `Address` " +
            "(`name`,`phone`,`postal`,`street`,`apt`,`state`,`country`,`role`) " +
            "values (?,?,?,?,?,?,?,?)",
            [addr.name, addr.phone, addr.postal, addr.street, addr.apt, addr.state, addr.country, role]);
        query.execute();
    }

    function editAddress(req, res) {
        let role = req.params.uid;
        let addrID = req.params.aid;
        let addr = req.body;
        let query = dbQuery(res);
        query.add(
            "update `Address` as a set "
            + "a.name=?, a.phone=?, a.postal=?, a.street=?, a.apt=?, a.state=?, a.country=? "
            + "where a.role=? and a.id=?",
            [addr.name, addr.phone, addr.postal, addr.street, addr.apt, addr.state, addr.country, role, addrID]);
        query.execute();
    }

    function deleteAddress(req, res) {
        let role = req.params.uid;
        let addrID = req.params.aid;
        let query = dbQuery(res);
        query.add(
            "delete from `Address` as a where a.role=? and a.id=?",
            [role, addrID]);
        query.execute();
    }

    function listPayments(req, res) {
        let role = req.params.uid;
        let query = dbQuery(res);
        query.add(
            "select p.id,p.creditType,p.cardNumber,p.validDate,p.cardHolder " +
            "from `Payment` as p where p.role=?",
            [role]);
        query.execute('list payments');
    }

    function createPayment(req, res) {
        let role = req.params.uid;
        let pay = req.body;
        let query = dbQuery(res);
        query.add(
            "insert into `Payment` " +
            "(`creditType`,`cardNumber`,`validDate`,`cardHolder`,`role`) " +
            "values (?,?,?,?,?)",
            [pay.creditType, pay.cardNumber, pay.validDate, pay.cardHolder, role]);
        query.execute();
    }

    function editPayment(req, res) {
        let role = req.params.uid;
        let payID = req.params.pid;
        let pay = req.body;
        let query = dbQuery(res);
        query.add(
            "update `Payment` as p set " +
            "p.creditType=?, p.cardNumber=?, p.validDate=?, p.cardHolder=? " +
            "where p.role=? and p.id=?",
            [pay.creditType, pay.cardNumber, pay.validDate, pay.cardHolder, role, payID]);
        query.execute();
    }

    function deletePayment(req, res) {
        let role = req.params.uid;
        let payID = req.params.pid;
        let query = dbQuery(res);
        query.add(
            "delete from `Payment` as p where p.role=? and p.id=?",
            [role, payID]);
        query.execute();
    }

    function listOrders(req, res) {
        let role = req.params.uid;
        let query = dbQuery(res);
        query.add(
            "select o.id, o.createTime, o.address from `Order` as o where o.buyer=?",
            [role]);
        query.execute();
    }

    function featuredItems(req, res) {
        let query = dbQuery(res);
        query.add(
            "select i.id, i.name, i.price from `Item` as i " +
            "where i.order is null order by id desc",
            []);
        query.execute();
    }

    function listShoppingCartItems(req, res) {
        let role = req.params.uid;
        let query = dbQuery(res);
        query.add(
            "select i.id, i.name, i.price, c.quantity " +
            "from `Buyer` as b, `Item` as i, `ShoppingCart` as c " +
            "where b.role=? and c.buyer=b.role and c.item=i.id",
            [role]);
        query.execute();
    }

    function addItemToCart(req, res) {
        let role = req.params.uid;
        let iid = req.body.iid;
        let quantity = req.body.quantity;
        let query = dbQuery(res);
        query.add(
            "insert into `ShoppingCart` " +
            "(`buyer`, `item`, `quantity`) values(?, ?, ?) " +
            "on duplicate key update `quantity`=`quantity`+?",
            [role, iid, quantity, quantity]);
        console.log(role, iid, quantity);
        query.execute();
    }
};
