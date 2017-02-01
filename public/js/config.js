(function () {
    angular
        .module('App')
        .config(Config);

    function Config($routeProvider, SharedServiceProvider) {
        var maps = SharedServiceProvider.$get().maps;

        $.each(maps, (_, item) => {
            $routeProvider
                .when(item.route, {
                    templateUrl: item.view,
                    controller: item.controller,
                    controllerAs: 'vm',
                });
        });

        $routeProvider
            .otherwise({
                redirectTo: maps.login.route,
            });
    }
})();
