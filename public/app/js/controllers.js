'use strict';

/* Controllers */
// var controllers = {};

// controllers.MyCtrl1 = function() {  };
  
// controllers.MyCtrl2 = function() {  };

consulteoApp.controller('UtilisateursCtrl', ['$scope', '$routeParams', '$location', 'utilisateursSrvc', function($scope, $routeParams, $location, utilisateursSrvc) {
	
    // Instantiate an object to store your scope data in (Best Practices)
   
	
	// Edition / Affichage
	if($routeParams.utilisateurId) {
		$scope.utilisateur = {};
		$scope.utilisateur = utilisateursSrvc.get({ utilisateurId: $routeParams.utilisateurId }, function () {});
	}
	// Listing
	else {
		$scope.utilisateurs = {};
		utilisateursSrvc.query(function(response) {
			$scope.utilisateurs = response;
		});
	}
	
	// Fonction pour sauver
	$scope.sauver = function() {
		$scope.utilisateur.$save();
		$location.path('/utilisateurs/'+$scope.utilisateur.id);
	}
	
	
  }]);
  
consulteoApp.controller('UtilisateursNewCtrl', ['$scope', '$location', 'utilisateursSrvc', function($scope, $location, utilisateursSrvc) {
	$scope.utilisateur = new utilisateursSrvc();
	//$scope.utilisateur.nom = "Doe";
	//$scope.utilisateur.prenom = "Bob";
	//alert($scope.utilisateur.nom);
	// Fonction pour sauver
	$scope.sauver = function() {		
		$scope.utilisateur.$save();
		$location.path('/utilisateurs/'+$scope.utilisateur.id);
	}	
  }]);

// controllers.InterlocuteursCtrl = function($scope, $routeParams, interlocuteursSrvc) {
	// if($routeParams.interlocuteurId) {
		// $scope.interlocuteur = interlocuteursSrvc.getInterlocuteur($routeParams.interlocuteurId);
	// }
	// else {
		// $scope.interlocuteurs = interlocuteursSrvc.getInterlocuteursList();
	// }
// };
  
// consulteoApp.controller(controllers);  