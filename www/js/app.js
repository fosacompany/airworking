// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })        

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.details-annonce', {
        url: '/details-annonce',
        views: {
            'menuContent': {
                templateUrl: 'templates/details-annonce.html',
                controller: 'DetailsAnnonceCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.decouvrir', {
        url: '/decouvrir',
        views: {
            'menuContent': {
                templateUrl: 'templates/decouvrir.html',
                controller: 'DecouvrirCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.signup', {
        url: '/signup',
        views: {
            'menuContent': {
                templateUrl: 'templates/signup.html',
                controller: 'SignupCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'SplashScreenCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.splashScreen', {
        url: '/splashScreen',
        views: {
            'menuContent': {
                templateUrl: 'templates/splashScreen.html',
                controller: 'SplashScreenCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});