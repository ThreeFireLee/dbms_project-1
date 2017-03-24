(function () {
    angular
        .module('App')
        .controller('BrowseController', BrowseController);

    function BrowseController(SharedService, $location, UserService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            UserService.findUserTypeById(vm.uid).then(res => {
                vm.userType = res.data[0].type;
            });
        }

    }

})();
