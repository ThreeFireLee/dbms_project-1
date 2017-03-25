(function () {
    angular
        .module('App')
        .controller('OrdersController', OrdersController);

    function OrdersController(SharedService, UserService, BuyerService, SellerService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.orders = [];
            vm.loadOrders = loadOrders;

            vm.loadOrders();
        }

        function loadOrders() {
            UserService.findUserTypeById(vm.uid).then(res => {
                let userType = res.data[0].type
                if (userType === 'Buyer') {
                    BuyerService.loadOrders(vm.uid).then(res => {
                        vm.orders = res.data;
                    });
                } else if (userType === 'Seller') {
                    SellerService.loadOrders(vm.uid).then(res => {
                        vm.orders = res.data;
                    });
                }
            });
        }

    }
})();
