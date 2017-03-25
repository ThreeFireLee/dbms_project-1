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

        function addToCart(iid, quantity){
            quantity = quantity || 1;
            BuyerService.addItemToCart(vm.uid, iid, quantity).then(res=>{
                vm.loadShoppingCart();
            });
        }
    }

})();
