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
                let userType = res.data[0].type;
                let service = {'Buyer': BuyerService, 'Seller': SellerService};
                service[userType].loadOrders(vm.uid).then(res => {
                    vm.orders = res.data;
                    for (let i = 0; i < vm.orders.length; i++) {
                        service[userType].getOrderItems(vm.uid, vm.orders[i].id).then(res => {
                            vm.orders[i].items = res.data;
                        });
                    }
                });
            });
        }

    }
})();
