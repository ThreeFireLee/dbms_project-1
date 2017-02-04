(function () {
    angular
        .module("App")
        .factory("SharedService", SharedService);

    function SharedService($routeParams) {
        var maps = {
            login: {
                route: '/login',
                view: 'views/login.view.client.html',
                controller: 'LoginController',
            },
            register: {
                route: '/register',
                view: 'views/register.view.client.html',
                controller: 'RegisterController',
            },
            profile: {
                route: '/profile/:uid',
                view: 'views/profile.view.client.html',
                controller: 'ProfileController',
            },
        };

        return {
            maps: maps,
            getRoute: getRoute,
            initController: initController,
        };

        /*
         * Dynamically convert route pattern into real url
         * Example:
         * in: website_edit
         * out: /user/123/website/456, when :uid=123 and :wid=456
         * note: priorDict is used to map keys prior to $routeParams
         * */
        function getRoute(routeKey, priorDict) {
            return maps[routeKey].route
            // match ":" plus non ("\" or "/" )one or more time
                .replace(/:([^\/]+)/g, function (_, key) {
                    return priorDict && key in priorDict ?
                        priorDict[key] : $routeParams[key];
                });
        }

        /*
         * Initialize given view controller, then callback after finishing
         */
        function initController(vm, callback) {
            vm.uid = $routeParams.uid;
            if (callback !== undefined) callback();
        }
    }
})
();
