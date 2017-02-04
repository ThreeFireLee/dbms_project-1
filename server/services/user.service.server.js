module.exports = function (dbQuery) {

    return {
        register: register,
        login: login,
        findUserById: findUserById,
    };

    function register(req, res) {
        let user = req.body;
        let sql = `
        insert into user (\`username\`, \`password\`) 
        values ("${user.username}", "${user.password}")`;
        dbQuery(sql, res);
    }

    function login(req, res) {
        let user = req.body;
        let sql = `
        select id from \`user\`
        where username = "${user.username}" and password = "${user.password}"`;
        dbQuery(sql, res);
    }

    function findUserById(req, res) {
        let uid = req.params.uid;
        let sql = `
        select * from \`user\` 
        where id = ${uid}`;
        dbQuery(sql, res);
    }

};
