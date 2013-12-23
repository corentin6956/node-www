'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
/*consulteoApp.angular.module('myApp.services', []).
  value('version', '0.1');*/

consulteoApp.factory('utilisateursSrvc', ['$resource', 
	function($resource) {
		return $resource('http://polar-basin-9014.herokuapp.com/utilisateurs/:utilisateurId', { utilisateurId: '@id' });
	}]);
  
 // consulteoApp.factory('interlocuteursSrvc', ['$http', function($http) {
	// var interlocuteurs = [
		// { id: 1, name: 'John Doe', age: '25' },
		// { id: 13, name: 'James Bond', age: '35' },
		// { id: 81, name: 'Mathieu Salem', age: '150' },
	// ];

	// var interlocuteursSrvc = {
		
		// getInterlocuteursList: function() {
			// return interlocuteurs;
		// },
		
		// getInterlocuteur: function(anId) {
			// var interlocuteur;
			// for(var i=0; i<interlocuteurs.length; i++) {
				// interlocuteur = interlocuteurs[i];
				// if(interlocuteur.id == anId) {
					// return interlocuteur;
				// }
			// }
		// },
	
		// couInterlocuteur: function(interlocuteur) {
			
		// }
	// };
	
	// return interlocuteursSrvc;

// }]);