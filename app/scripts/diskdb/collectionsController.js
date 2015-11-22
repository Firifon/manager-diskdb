(function () {
	'use strict';
	
	angular.module('app').controller('collectionsController', ['diskdbService', '$routeParams', '$q', '$mdSidenav', '$mdDialog' ,'$location', CollectionsController]);
	
	function CollectionsController(diskdbService, $routeParams, $q, $mdSidenav, $mdDialog, $location) {
		
		console.log(" databaseName : "+ $routeParams.dbname);
		
		var self = this;
		self.database = $routeParams.dbname;	
		self.goBack = goBack;
		
		function goBack( path ) {
  			$location.path( '/' );
		};					
	}
})();