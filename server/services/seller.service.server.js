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
        let query, values;
        query = "insert into `Item` " +
            "(`name`, `price`, `quantity`, `description`, `seller`, `order`) " +
            "values (?,?,?,?,?,?)";
        values = [item.name, item.price, item.quantity, item.description, role, item.order];
        dbQuery(query, values, res);
    }

    function listItems(req, res) {
        let role = req.params.uid;
        let query, values;
        query = "select i.id,i.name,i.price,i.quantity,i.description from `Item` " +
            "where i.seller=? and i.order is null";
        values = [role];
        dbQuery(query, values, res);
    }

    function editItem(req, res) {
        let role = req.params.uid;
        let itemID = req.params.iid;
        let item = req.body;
        let query, values;
        query = "update `Item` as i set " +
            "i.name=?, i.price=?, i.quantity=?, i.description=? " +
            "where i.id=? and i.seller=? and i.order is null";
        values = [item.name, item.price, item.quantity, item.description, itemID, role];
        dbQuery(query, values, res);
    }

    function deleteItem(req, res) {
        let role = req.params.uid;
        let itemID = req.params.iid;
        let query, values;
        query = "delete from `Item` as i where i.id=? and i.seller=? and i.order is null";
        values = [itemID, role];
        dbQuery(query, values, res);
    }

    function listOrders(req, res) {
        let role = req.params.uid;
        let query, values;
        query = "select o.id,o.createTime,o.address,o.buyer from `Order` as o " +
            "where exists( " +
            "select * from `Item` as i " +
            "where o.id=i.order and i.seller=?" +
            ")";
        values = [role];
        dbQuery(query, values, res);
    }
};
