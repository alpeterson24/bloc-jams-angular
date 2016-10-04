(function() {
     function config($stateProvider, $locationProvider) {
     	 $locationProvider
         .html5Mode({
             enabled: true,
             requireBase: false
         });
         $stateProvider
         .state('landing', {
             url: '/landing',
             templateUrl: '/templates/landing.html'
         })
         .state('album', {
             url: '/album',
             templateUrl: '/templates/album.html'
         })
         .state('collection', {
             url: '/collection',
             templateUrl: '/template/collection.html'   
         });
     }

     angular
         .module('blocJams', ['ui.router'])
         .config(config);
 })();