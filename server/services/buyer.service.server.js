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
        featuredItems: featuredItems,
        listShoppingCartItems: listShoppingCartItems,
        addItemToCart: addItemToCart,
    };

    function searchItem(req, res) {
        let keyword = `%${req.params.keywords}%`;
        let query, values;
        query = "select i.id, i.name, i.price, i.quantity, i.description` " +
            "from `Item` as i where i.name like ? or i.description like ?";
        values = [keyword, keyword];
        dbQuery(query, values, res);
    }

    function checkout(req, res) {

    }

    function createAddress(req, res) {
        let role = req.params.uid;
        let addr = req.body;
        let query, values;
        query = "insert into `Address` " +
            "(`name`,`phone`,`postal`,`street`,`apt`,`state`,`country`,`role`) " +
            "values (?,?,?,?,?,?,?,?)";
        values = [addr.name, addr.phone, addr.postal, addr.street, addr.apt, addr.state, addr.country, role];
        dbQuery(query, values, res);
    }

    function editAddress(req, res) {
        let role = req.params.uid;
        let addrID = req.params.aid;
        let addr = req.body;
        let query, values;
        query = "update `Address` as a set "
            + "a.name=?, a.phone=?, a.postal=?, a.street=?, a.apt=?, a.state=?, a.country=? "
            + "where a.role=? and a.id=?";
        values = [addr.name, addr.phone, addr.postal, addr.street, addr.apt, addr.state, addr.country, role, addrID];
        dbQuery(query, values, res);
    }

    function deleteAddress(req, res) {
        let role = req.params.uid;
        let addrID = req.params.aid;
        let query, values;
        query = "delete from `Address` as a where a.role=? and a.id=?";
        values = [role, addrID];
        dbQuery(query, values, res);
    }

    function createPayment(req, res) {
        let role = req.params.uid;
        let pay = req.body;
        let query, values;
        query = "insert into `Payment` " +
            "(`creditType`,`cardNumber`,`validDate`,`cardHolder`,`role`) " +
            "values (?,?,?,?,?)";
        values = [pay.creditType, pay.cardNumber, pay.validDate, pay.cardHolder, role];
        dbQuery(query, values, res);
    }

    function editPayment(req, res) {
        let role = req.params.uid;
        let payID = req.params.pid;
        let pay = req.body;
        let query, values;
        query = "update `Payment` as p set " +
            "p.creditType=?, p.cardNumber=?, p.validDate=?, p.cardHolder=? " +
            "where p.role=? and p.id=?";
        values = [pay.creditType, pay.cardNumber, pay.validDate, pay.cardHolder, role, payID];
        dbQuery(query, values, res);
    }

    function deletePayment(req, res) {
        let role = req.params.uid;
        let payID = req.params.pid;
        let query, values;
        query = "delete from `Payment` as p where p.role=? and p.id=?";
        values = [role, payID];
        dbQuery(query, values, res);
    }

    function listOrders(req, res) {
        let role = req.params.uid;
        let query, values;
        query = "select o.id, o.createTime, o.address from `Order` as o where o.buyer=?";
        values = [role];
        dbQuery(query, values, res);
    }

    function featuredItems(req, res) {
        let query, values;
        query = "select i.id, i.name, i.price from `Item` as i " +
            "where i.order is null order by id desc";
        values = [];
        dbQuery(query, values, res);
    }

    function listShoppingCartItems(req, res) {
        let role = req.params.uid;
        let query, values;
        query = "select i.id, i.name, i.price, c.quantity " +
            "from `Buyer` as b, `Item` as i, `ShoppingCart` as c " +
            "where b.role=? and c.buyer=b.role and c.item=i.id";
        values = [role];
        dbQuery(query, values, res);
    }

    function addItemToCart(req, res) {
        let role = req.params.uid;
        let iid = req.body.iid;
        let quantity = req.body.quantity;
        let query, values;
        query = "insert into `ShoppingCart` " +
            "(`buyer`, `item`, `quantity`) values(?, ?, ?) " +
            "on duplicate key update `quantity`=`quantity`+?";
        values = [role, iid, quantity, quantity];
        console.log(role, iid, quantity);
        dbQuery(query, values, res);
    }
};
