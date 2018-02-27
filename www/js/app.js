// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

  .run(function ($ionicPlatform, $cordovaNetwork, $ionicPopup, $state, $ionicLoading) {
    $ionicPlatform.ready(function () {
      if (window.Connection) {
        if (!$cordovaNetwork.isOnline()) {
          $ionicLoading.hide();
          $state.go('app.offline');
        }
      }

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
    //FirebaseDB.initialize();
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/menu/home.html',
            controller: 'HomeCtrl'
          }
        }
      })

      .state('app.atractivos', {
        url: '/atractivos',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/menu/atractivos.html',
            controller: 'AtractivosCtrl'
          }
        }
      })
      .state('app.atractivo', {
        url: '/atractivo/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/atractivos/atractivo.html',
            controller: 'AtractivoCtrl'
          }
        }
      })
          .state('app.detalle', {
            url: '/atractivo/detalle/:id',
            views: {
              'menuContent': {
                templateUrl: 'templates/app/atractivos/detalle.html',
                controller: 'AtractivoDetalleCtrl'
              }
            }
          })
          .state('app.descripcion', {
            url: '/atractivo/descripcion/:id',
            views: {
              'menuContent': {
                templateUrl: 'templates/app/atractivos/descripcion.html',
                controller: 'AtractivoDetalleCtrl'
              }
            }
          })
      .state('app.modal_share', {
        url: '/share',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/util/modal_share.html',
            controller: 'AtractivoCtrl'

          }
        }
      })
      .state('app.agencias', {
        url: '/agencias',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/menu/agencias.html',
            controller: 'AgenciasCtrl'
          }
        }
      })
      .state('app.agencia', {
        url: '/agencia/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/agencias/agencia.html',
            controller: 'AgenciaCtrl'
          }
        }
      })
      .state('app.paquetes', {
        url: '/paquetes',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/agencias/paquetes.html',
            controller: 'PaqueteCtrl'
          }
        }
      })
          .state('app.paquete_detalle', {
            url: '/paquete/detalle/:id',
            views: {
              'menuContent': {
                templateUrl: 'templates/app/agencias/detalle_paquete.html',
                controller: 'PaqueteDetalleCtrl'
              }
            }
          })
      .state('app.detalle_itinerario', {
        url: '/paquete/itinerario/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/agencias/detalle_itinerario.html',
            controller: 'ItinerarioCtrl'
          }
        }
      })
      .state('app.transportes', {
        url: '/transportes',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/menu/transportes.html',
            controller: 'TransportesCtrl'
          }
        }
      })
      .state('app.transporte', {
        url: '/transporte/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/transportes/transporte.html',
            controller: 'TransporteCtrl'
          }
        }
      })


      .state('app.emergencias', {
        url: '/emergencias',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/menu/emergencias.html'
          }
        }
      })
      .state('app.acerca', {
        url: '/acerca',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/menu/acerca.html'
          }
        }
      })
      .state('app.offline', {
        url: '/offline',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/menu/offline.html'
          }
        }
      })

      //=============================================================================================

      .state('app.mapa', {
        url: '/mapa/:lat/:long/:name',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/mapa.html',
            controller: 'MapaCtrl'
          }
        }
      })
      .state('app.galeria', {
        url: '/galeria',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/galeria/galeria.html',
            controller: 'GaleriaCtrl'
          }
        }
      })
      .state('app.imagenes', {
        url: '/imagenes/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/imagenes.html',
            controller: 'ImagenCtrl'
          }
        }
      })
      .state('app.videos', {
        url: '/videos/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/videos.html',
            controller: 'VideoCtrl'
          }
        }
      })
      .state('app.valoracion', {
        url: '/valoracion',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/valoracion/valoracion.html',
            controller: 'ValoracionCtrl'
          }
        }
      })
      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/app/login.html',
            controller: 'LoginCtrl'

          }
        }
      })
    ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  })
;
