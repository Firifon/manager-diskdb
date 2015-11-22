(function() {
	
	'use strict';
	
	var db = require('diskdb');
	
	/*console.log("uno");
	db.connect('examples/db', ['articles']);
	console.log("db ", db);
	console.log("db ", db.articles);
	
	var article1 = {
		title:"diskDB rocks",
		published: "today",
		rating: "5 stars"
	};
	
	var article2 = {
		title:"diskDB rocks",
		published: "yesterday",
		rating: "5 stars"
	};
	
	var article3 = {
		title:"diskDB rocks",
		published: "yesterday",
		rating: "4 stars"
	};*/
	
	//db.articles.save([article1, article2, article3]);			
	
	angular.module('app').service('diskdbService', ['$q', DiskdbService]);
		
	function DiskdbService($q) {
		return {
			create: createCollection,
			getArticles: getArticles//,
			/*getById: getArticleById,
			getByName: getArticleByName,
			create: createArticle,
			destroy: deleteArticle,
			update: updateArticle*/	
		};
		
		function createCollection(dbName, collectionName) {
			
			console.log(" dbName --> "+ dbName);
			console.log(" collectionName --> "+ collectionName);
			
			var deferred = $q.defer();
			db.connect('databases/'+ dbName, [collectionName]);			
			deferred.resolve('ok');
			return deferred.promise;			
		}
		
		function getArticles() {
			var deferred = $q.defer();
			var articles = {};
			//var articles = db.articles.find();			
			//console.log("articles ", articles);
			deferred.resolve(articles);
			return deferred.promise;
		}
	}
	
})();