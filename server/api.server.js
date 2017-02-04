module.exports = function (app, services) {

    app.get('/api/user/:uid', services.user.findUserById);
    app.post('/api/user/register', services.user.register);
    app.post('/api/user/login', services.user.login);

};
