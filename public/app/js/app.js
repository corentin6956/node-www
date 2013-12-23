'use strict';


// Declare app level module which depends on filters, and services
var consulteoApp = angular.module('consulteoApp', ['ngRoute', 'ngResource']);

consulteoApp.config(['$routeProvider',
	function($routeProvider) {
    $routeProvider
		.when('/view1',
			{
				templateUrl: 'partials/partial1.html',
				controller: 'MyCtrl1'
			})
		.when('/view2',
			{
				templateUrl: 'partials/partial2.html',
				controller: 'MyCtrl2'
			})
		.when('/utilisateurs',
			{
				templateUrl: 'partials/utilisateurs-list.html',
				controller: 'UtilisateursCtrl'
			})
		.when('/utilisateurs/new',
			{
				templateUrl: 'partials/utilisateurs-edit.html',
				controller: 'UtilisateursNewCtrl'
			})
		.when('/utilisateurs/:utilisateurId/edit',
			{
				templateUrl: 'partials/utilisateurs-edit.html',
				controller: 'UtilisateursCtrl'
			})
		.when('/utilisateurs/:utilisateurId',
			{
				templateUrl: 'partials/utilisateurs-show.html',
				controller: 'UtilisateursCtrl'
			})
		.when('/interlocuteurs',
			{
				templateUrl: 'partials/interlocuteurs-list.html',
				controller: 'InterlocuteursCtrl'
			})
		.when('/interlocuteurs/new',
			{
				templateUrl: 'partials/interlocuteurs-edit.html',
				controller: 'InterlocuteursCtrl'
			})
		.when('/interlocuteurs/:interlocuteurId/edit',
			{
				templateUrl: 'partials/interlocuteurs-edit.html',
				controller: 'InterlocuteursCtrl'
			})
		.when('/interlocuteurs/:interlocuteurId',
			{
				templateUrl: 'partials/interlocuteurs-show.html',
				controller: 'InterlocuteursCtrl'
			})
		.when('/interlocuteurs/:interlocuteurId/postes/new',
			{
				templateUrl: 'partials/postes-edit.html',
				controller: 'PostesCtrl'
			})
		.when('/interlocuteurs/:interlocuteurId/postes/:posteId/edit',
			{
				templateUrl: 'partials/postes-edit.html',
				controller: 'PostesCtrl'
			})
		.when('/interlocuteurs/:interlocuteurId/echanges/new',
			{
				templateUrl: 'partials/echanges-edit.html',
				controller: 'EchangesCtrl'
			})
		.when('/interlocuteurs/:interlocuteurId/echanges/:echangeId/edit',
			{
				templateUrl: 'partials/echanges-edit.html',
				controller: 'EchangesCtrl'
			})
		.when('/interlocuteurs/:interlocuteurId/cadeaux/new',
			{
				templateUrl: 'partials/cadeaux-edit.html',
				controller: 'CadeauxCtrl'
			})
		.when('/interlocuteurs/:interlocuteurId/cadeaux/:cadeauId/edit',
			{
				templateUrl: 'partials/cadeaux-edit.html',
				controller: 'CadeauxCtrl'
			})
		.otherwise({redirectTo: '/utilisateurs'});
	}]);
consulteoApp.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
	delete $httpProvider.defaults.headers.common['Origin'];
});
