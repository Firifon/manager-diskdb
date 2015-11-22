
(function () {
    'use strict';
    
    var _templateBase = './scripts';
    
    angular.module('app', [
        'ngRoute',
        'ngMaterial',
        'ngAnimate'
    ]).config(['$routeProvider', '$mdIconProvider', function ($routeProvider, $mdIconProvider) {
        
            $mdIconProvider.fontSet('fa', 'fontawesome');
            
            $routeProvider.when('/', {
                templateUrl: _templateBase + '/diskdb/diskdb.html' ,
                controller: 'diskdbController',
                controllerAs: '_ctrl'
            });
            
            $routeProvider.when('/showCollections/:dbname', {
               templateUrl: _templateBase + '/diskdb/collections.html',
               controller: 'collectionsController',
               controllerAs: '_ctrl' 
            });
            
            $routeProvider.otherwise({ redirectTo: '/' });
        }
    ]);

})();