/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('SplashScreenCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicHistory) {
    // Set History
    $scope.GoBack = function() {
        $ionicHistory.goBack();
      };

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('DetailsAnnonceCtrl', function($scope, $stateParams, $http, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicHistory) {
    // Set History
    $scope.GoBack = function() {
        $ionicHistory.goBack();
      };

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('DecouvrirCtrl', function($scope, $stateParams, $http, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicHistory) {
    // Set History
    $scope.GoBack = function() {
        $ionicHistory.goBack();
      };

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    // $scope.items = [1, 2, 3];
    $http.get("http://riaa123.alwaysdata.net/airworking/api/v1/announcement/")
        .success(function(data) {     
        console.log(data);
        $scope.items = data;
    });    
})

.controller('SignupCtrl', function($scope, $stateParams, $timeout, $ionicPopup, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, $ionicHistory, $http) {
    // Set History
    $scope.GoBack = function() {
        $ionicHistory.goBack();
      };
    $scope.showLoadingProperTimes = function() {
        $ionicLoading.show({
          templateUrl:"templates/loading.html"
        });
      };
    $scope.hideLoadingProperTimes = function() {
        $ionicLoading.hide();
    };          
    //inscription
    $scope.signup = function() {        
        var email = document.getElementById('email').value;
        var mdp = document.getElementById('password').value;
        var prenom = document.getElementById('prenoms').value;
        var nom = document.getElementById('nom').value;                    
        if(email=="" || mdp=="" || prenom=="" || nom ==""){
            $scope.showAlert = function() {
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur de connexion',
                    template: 'Veuillez remplir tous les champs'
                });
                alertPopup.then(function(res) {
                console.log('ok');
                });
            };
            $scope.showAlert();
        }else{
            $scope.showLoadingProperTimes();
            var myobject = {email : email, password  : mdp, nom: nom, prenoms: prenom};            
            Object.toparams = function ObjecttoParams(obj) {
                var p = [];
                for (var key in obj) {
                    p.push(key + '=' + encodeURIComponent(obj[key]));
                }
                return p.join('&');
            };
            $http({
                url: 'http://riaa123.alwaysdata.net/airworking/api/v1/member/signup',
                method: "POST",
                data: Object.toparams(myobject),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {                
                console.log(response);
                $scope.hideLoadingProperTimes();
                if(response.data.response=="false")
                {
                    $scope.showAlert = function() {
                        var alertPopup = $ionicPopup.alert({
                            title: "Echec de l'inscription",
                            template: 'Veuillez reessayer'
                        });
                        alertPopup.then(function(res) {
                        console.log('ok');
                        });
                     };
                     $scope.showAlert();
                }else{
                    window.location = 'index.html#/app/login';
                }
            }, 
            function(response) { // optional
                console.log(response);
                $scope.hideLoadingProperTimes();
            });
        }        
      };
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})


.controller('LoginCtrl', function($scope, $stateParams, $timeout, $ionicPopup, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, $ionicHistory, $http) {
    // Set History
    $scope.GoBack = function() {
        $ionicHistory.goBack();
      };
    $scope.showLoadingProperTimes = function() {
        $ionicLoading.show({
          templateUrl:"templates/loading.html"
        });
    };
    $scope.hideLoadingProperTimes = function() {
        $ionicLoading.hide();
    };          
    $scope.login = function() {                
        var email = document.getElementById('email').value;
        var mdp = document.getElementById('password').value;             
        if(email=="" || mdp==""){                       
            $scope.showAlert = function() {
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur de connexion',
                    template: 'Veuillez remplir tous les champs'
                });
                alertPopup.then(function(res) {
                console.log('ok');
                });
            };
            $scope.showAlert();
        }else{
            $scope.showLoadingProperTimes();
            var myobject = {email : email, password  : mdp};            
            Object.toparams = function ObjecttoParams(obj) {
                var p = [];
                for (var key in obj) {
                    p.push(key + '=' + encodeURIComponent(obj[key]));
                }
                return p.join('&');
            };
            $http({
                url: 'http://riaa123.alwaysdata.net/airworking/api/v1/member/signin',
                method: "POST",
                data: Object.toparams(myobject),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {                
                console.log(response);
                $scope.hideLoadingProperTimes();
                if(response.data[0].response=="false")
                {
                    $scope.showAlert = function() {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Erreur de connexion',
                            template: 'Email ou mot de passe invalide, Veuillez reessayer'
                        });
                        alertPopup.then(function(res) {
                        console.log('ok');
                        });
                     };
                     $scope.showAlert();
                }else{
                    window.location = 'index.html#/app/decouvrir';
                }    
            }, 
            function(response) { // optional
                console.log(response);
                $scope.hideLoadingProperTimes();
            });
        }        
      };
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

;
