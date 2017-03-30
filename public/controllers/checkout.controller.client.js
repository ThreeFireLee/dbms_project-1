(function () {
    angular
        .module('App')
        .controller('CheckoutController', CheckoutController);

    function CheckoutController(SharedService, $location, BuyerService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.order = {};
            vm.shoppingCartItems = [];
            vm.shippingAddresses = [];
            vm.loadShoppingCart = loadShoppingCart;
            vm.loadShippingAddresses = loadShippingAddresses;
            vm.loadPayMethods = loadPayMethods;
            vm.placeOrder = placeOrder;
            vm.getOrderTotal = getOrderTotal;

            vm.loadShoppingCart();
            vm.loadShippingAddresses();
            vm.loadPayMethods();
        }

        function loadShoppingCart() {
            BuyerService.loadShoppingCart(vm.uid).then(res => {
                vm.shoppingCartItems = res.data;
            });
        }

        function loadShippingAddresses() {
            BuyerService.loadShippingAddresses(vm.uid).then(res => {
                vm.shippingAddresses = res.data;
            });
        }

        function loadPayMethods() {
            BuyerService.listPayments(vm.uid).then(res => {
                vm.paymentMethods = res.data;
            });
        }

        function placeOrder() {
            vm.order.items = vm.shoppingCartItems;
            BuyerService.placeOrder(vm.uid, vm.order).then(res => {
                let orderId = res.data.insertId;
                $location.path(vm.shared.getRoute('orders'));
            });
        }

        function getOrderTotal() {
            let total = 0;
            for (let item of vm.shoppingCartItems){
                total += item.price * item.quantity;
            }
            return total;
        }
    }

})();
