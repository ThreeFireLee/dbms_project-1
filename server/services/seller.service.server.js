module.exports = function (db, dbQuery) {

    return {
        createItem: createItem,
        listItems: listItems,
        editItem: editItem,
        deleteItem: deleteItem,
        listOrders: listOrders,
    };

    function createItem(req, res) {
        let role = req.params.uid;
        let item = req.body;
        let query = dbQuery(res);
        query.add(
            "insert into `Item` " +
            "(`name`, `price`, `quantity`, `description`, `seller`, `order`) " +
            "values (?,?,?,?,?,?)",
            [item.name, item.price, item.quantity, item.description, role, item.order]);
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
            "delete from `Item` as i where i.id=? and i.seller=? and i.order is null",
            [itemID, role]);
        query.execute();
    }

    function listOrders(req, res) {
        let role = req.params.uid;
        let query = dbQuery(res);
        query.add(
            "select o.id,o.createTime,o.address,o.buyer from `Order` as o " +
            "where exists( " +
            "select * from `Item` as i " +
            "where o.id=i.order and i.seller=?" +
            ")",
            [role]);
        query.execute();
    }
};
