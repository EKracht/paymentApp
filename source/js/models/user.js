'use strict';

var app = angular.module('paymentApp');
var herokuLink = 'https://serene-bayou-1253.herokuapp.com/'

app.service('UserService', function($http, ENV) {
  this.register = function(user) {
    return $http.post(`${ENV.API_URL}/users/register`, user);
  };
  this.login = function(user) {
    return $http.post(`${ENV.API_URL}/users/login`, user);
  };
  this.cart = function(user) {
    return $http.get(`${ENV.API_URL}/users/cart/`, user);
  }
});
