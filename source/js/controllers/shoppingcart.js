'use strict';

var app = angular.module('paymentApp');

app.controller('shoppingcartCtrl', function($scope, $state, $localStorage, $http, ENV) {
  var user = $scope.$storage.id;

  $http.get('/users/cart/' + $scope.$storage.id)
  .then(function(res){
    $scope.cartItems = res.data.cart;
    var cartArray = res.data.cart;
    var total = 0;
    for (var i = 0; i < cartArray.length; i++) {
      total = total + cartArray[i].price;
    }
    $scope.total = total;
  }, function(err) {
    console.error(err);
  }); 

  $scope.formatPrice = function(num) {
    return Math.round(num * 100);
  };

  $scope.doCheckout = function(tokenObj) {
    $http.post(`${ENV.API_URL}/checkout`, {
      tokenObj: tokenObj,
      total: $scope.total
    })
    .then(function(res) {
      swal("Success!", "Your purchase was successful!", "success");
    }, function(err) {
      swal("Oh no!", "Your purchase failed.", "error");
    })
  };
});
