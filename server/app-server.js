module.exports = function (app, db) {
    db.query('select name from t1', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });
};
