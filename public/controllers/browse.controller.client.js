(function () {
    angular
        .module('App')
        .controller('BrowseController', BrowseController);

    function BrowseController(SharedService, $location, BuyerService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.featuredItems = [];
            vm.shoppingCartItems = [];
            vm.loadFeaturedItems = loadFeaturedItems;
            vm.loadShoppingCart = loadShoppingCart;
            vm.addToCart = addToCart;
            vm.removeFromCart = removeFromCart;
            vm.updateItemInCart = updateItemInCart;
            vm.getOrderTotal = getOrderTotal;

            vm.loadFeaturedItems();
            vm.loadShoppingCart();
        }

        function loadFeaturedItems() {
            BuyerService.loadFeaturedItems().then(res => {
                vm.featuredItems = res.data;
            });
        }

        function loadShoppingCart() {
            BuyerService.loadShoppingCart(vm.uid).then(res => {
                vm.shoppingCartItems = res.data;
            });
        }

        function addToCart(iid, quantity) {
            quantity = quantity || 1;
            BuyerService.addItemToCart(vm.uid, iid, quantity).then(res => {
                vm.loadShoppingCart();
            });
        }

        function removeFromCart(iid) {
            BuyerService.removeItemFromCart(vm.uid, iid).then(res => {
                vm.loadShoppingCart();
            });
        }

        function updateItemInCart(item) {
            BuyerService.updateItemInCart(vm.uid, item).then(res => {
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
