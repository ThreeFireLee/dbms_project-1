(function () {
    angular
        .module("App")
        .factory("SharedService", SharedService);

    function SharedService($routeParams, $location, UserService) {
        let maps = {
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
            browse: {
                route: '/home/:uid',
                view: 'views/browse.view.client.html',
                controller: 'BrowseController',
            },
            checkout: {
                route: '/home/:uid/checkout',
                view: 'views/checkout.view.client.html',
                controller: 'CheckoutController',
            },
            inventory: {
                route: '/inventory/:uid',
                view: 'views/inventory.view.client.html',
                controller: 'InventoryController',
            },
            orders: {
                route: '/orders/:uid',
                view: 'views/orders.view.client.html',
                controller: 'OrdersController',
            },
        };

        return {
            maps: maps,
            getRoute: getRoute,
            initController: initController,
            homePage: homePage,
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
            vm.logout = logout;

            if (callback !== undefined) callback();

            function logout(){
                $location.path(vm.shared.getRoute('login'));
            }
        }

        function homePage(uid) {
            UserService.findUserTypeById(uid).then(res => {
                let userType = res.data[0].type;
                redir = {Buyer: "browse", Seller: "inventory"};
                $location.path(getRoute(redir[userType], {uid: uid}));
            });
        }
    }
})
();
