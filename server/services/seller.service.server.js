module.exports = function (db, dbQuery) {

    return {
        createItem: createItem,
        listItems: listItems,
        editItem: editItem,
        deleteItem: deleteItem,
        listOrders: listOrders,
        getOrderItems: getOrderItems,
    };

    function createItem(req, res) {
        let role = req.params.uid;
        let item = req.body;
        let query = dbQuery(res);
        query.add(
            "insert into `Item` " +
            "(`name`, `price`, `quantity`, `description`, `seller`) values (?,?,?,?,?)",
            [item.name, item.price, item.quantity, item.description, role]);
        query.execute();
    }

    function listItems(req, res) {
        let role = req.params.uid;
        let query = dbQuery(res);
        query.add(
            "select i.id,i.name,i.price,i.quantity,i.description from `Item` as i " +
            "where i.seller=? and i.order is null " +
            "order by id desc",
            [role]);
        query.execute();
    }

    function editItem(req, res) {
        let role = req.params.uid;
        let itemID = req.params.iid;
        let item = req.body;
        let query = dbQuery(res);
        query.add(
            "update `Item` as i set " +
            "i.name=?, i.price=?, i.quantity=?, i.description=? " +
            "where i.id=? and i.seller=? and i.order is null",
            [item.name, item.price, item.quantity, item.description, itemID, role]);
        query.execute();
    }

    function deleteItem(req, res) {
        let role = req.params.uid;
        let itemID = req.params.iid;
        let query = dbQuery(res);
        query.add(
            "delete from `Item` where `id`=? and `seller`=? and `order` is null",
            [itemID, role]);
        query.execute();
    }

    function listOrders(req, res) {
        let role = req.params.uid;
        let query = dbQuery(res, 'list orders');
        query.add(
            "select o.id,o.createTime,o.address,o.buyer from `Order` as o " +
            "where exists( " +
            "select * from `Item` as i " +
            "where o.id=i.order and i.seller=? " +
            ") " +
            "order by o.createTime desc",
            [role]);
        query.execute();
    }

    function getOrderItems(req, res) {
        let role = req.params.uid;
        let orderId = req.params.oid;
        let query = dbQuery(res, 'get order items');
        query.add(
            "select i.id, i.name, i.price, i.quantity " +
            "from `Item` as i, `Order` as o " +
            "where o.id=? and i.order=o.id and i.seller=?",
            [orderId, role]);
        query.execute();
    }
};
