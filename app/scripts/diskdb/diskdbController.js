(function () {
	'use strict';
	
	var fs = require('fs');
	
	angular.module('app').controller('diskdbController', ['diskdbService', '$q', '$mdSidenav', '$mdDialog', '$location', DiskdbController]);
		
	function DiskdbController(diskdbService, $q, $mdSidenav, $mdDialog, $location) {
		
		var self = this;
		self.databases = [];
		self.database = '';
		self.collection = '';
		//self.toggleSidenav = toggleSidenav;
		self.createNewDatabase = createNewDatabase;
		self.createNewCollection = createNewCollection;	
		self.showDialog = showDialog;	
		self.go = go;
				
		loadDatabases();
		
		function loadDatabases() {
			self.databases = [];
			var folders = fs.readdirSync('databases');						
			for (var i = 0; i < folders.length; i++) {				
				if (fs.lstatSync('databases/'+ folders[i]).isDirectory()) {
					
					var newDatabase = {
						name: folders[i]
					};
					
					self.databases.push(newDatabase);
				}	
			}						
		}				
		
		function go( path ) {
  			$location.path( '/showCollections/'+ path );
		};
		
  		/*function toggleSidenav(menuId) {			
    		$mdSidenav(menuId).toggle();
  		};*/
		  
		function createNewDatabase(name) {						
			if (!fs.existsSync('databases/'+ name)) {				
				fs.mkdirSync('databases/'+ name)
			}		
			loadDatabases();	
		};
		
		function createNewCollection(database, name) {
			diskdbService.create(database, name).then(function (response) {
				console.log("response : "+ response);
			});
		};
		
		function showDialog($event) {						
			
       		var parentEl = angular.element(document.body);
       		$mdDialog.show({
         		parent: parentEl,
         		targetEvent: $event,
         		template:
				 '<md-dialog aria-label="New Database" flex>'+				 				 
            	'  <md-dialog-content layout="column">' +
				
				' <md-input-container flex> '+
                ' 	<label>Name</label> '+
                '	<input ng-model="new_database" >' +
              	' </md-input-container> '+
				
				'  <md-dialog-actions layout="row">' +
				'	<md-button ng-click="save()" class="md-primary">' +
            	'      Save' +
            	'    </md-button>' +
            	'    <md-button ng-click="closeDialog()" class="md-primary">' +
            	'      Close' +
            	'    </md-button>' +
            	'  </md-dialog-actions>'+
				' </md-dialog-content>'+				          
            	'</md-dialog>',           			 
				locals: {
		           new_database: ''
        		},  		
         		controller: DialogController
      		});
			  
      		function DialogController($scope, $mdDialog) {								
				$scope.new_database = '';        		
        		$scope.closeDialog = function() {
					$mdDialog.hide();
        		}
				
				$scope.save = function() {										
					$mdDialog.hide();          			
					self.createNewDatabase($scope.new_database);
				}
      		}
    	};	
	}
	
})();