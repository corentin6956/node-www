'use strict';

/* Controllers */
// var controllers = {};

// controllers.MyCtrl1 = function() {  };
  
// controllers.MyCtrl2 = function() {  };

consulteoApp.controller('UtilisateursCtrl', ['$scope', '$routeParams', '$location', 'utilisateursSrvc', function($scope, $routeParams, $location, utilisateursSrvc, u, getResponseHeaders) {
	
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
		$scope.utilisateur.$save(function(u, putResponseHeaders) {
			//u => saved user object
			//putResponseHeaders => $http header getter
			$location.path('/utilisateurs/'+u.id);
		});		
	}
	
	// Fonction pour supprimer
    $scope.supprimer = function (id) {
        if (!confirm('Confirm delete')) {
            return;
        }

        utilisateursSrvc.remove({utilisateurId: id}, {}, function (data) {
            $location.path('/utilisateurs');
        });
    }
	
	/*$scope.supprimer = function() {
		$scope.utilisateur.$delete(function(u, putResponseHeaders) {
			//u => saved user object
			//putResponseHeaders => $http header getter
			$location.path('/utilisateurs');
		});		
	}*/
	
  }]);
  
consulteoApp.controller('UtilisateursNewCtrl', ['$scope', '$location', 'utilisateursSrvc', function($scope, $location, utilisateursSrvc, u, getResponseHeaders) {
	$scope.utilisateur = new utilisateursSrvc();
	//$scope.utilisateur.nom = "Doe";
	//$scope.utilisateur.prenom = "Bob";
	//alert($scope.utilisateur.nom);
	// Fonction pour sauver
	$scope.sauver = function() {		
		$scope.utilisateur.$save(function(u, putResponseHeaders) {
			//u => saved user object
			//putResponseHeaders => $http header getter
			$location.path('/utilisateurs/'+u.id);
		});		
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