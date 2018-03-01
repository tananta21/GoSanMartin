//SERVIDOR ==================================
// var dominio = "http://voydeviaje.tk";
// var dominio_img = "voydeviaje.tk";

//LOCALMENTE ================================
var ip = "192.168.1.42";
var dominio = "http://" + ip;
var dominio_img = ip;

var api = dominio + "/api/";

angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicLoading, $cordovaNetwork, $rootScope, $state, $ionicHistory, $window, $timeout, $ionicPopup, sessionService) {
    document.addEventListener("deviceready", function () {
      $scope.network = $cordovaNetwork.getNetwork();
      $scope.isOnline = $cordovaNetwork.isOnline();
      $scope.$apply();
      $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
        $scope.isOnline = true;
        //redirect after check connection internet ONLINE
        $state.go('app.home');
        $scope.$apply();
      })

      // listen for Offline event
      $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
        console.log("got offline");
        $scope.isOnline = false;
        $scope.network = $cordovaNetwork.getNetwork();
        //redirect after check connection OFFLINE
        $state.go('app.offline');
        $ionicPopup.alert({
          title: "Sin conexión a Internet",
          content: "Su dispositivo no se encuentra conectado a internet"
        }).then(function (res) {
        });
        $scope.$apply();
      })
    }, false)

    $scope.$on('$stateChangeSuccess',
      function () {
        var key = "user_token";
        var surname = "surname";
        $scope.token = sessionService.get(key);
        $scope.surname = sessionService.get(surname);
      }
    );
    $scope.iniciarSesion = function () {
      $state.go('app.login');
    }
    $scope.cerrarSesion = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Cerrar Sesión',
        template: '¿Está seguro que desea cerrar Sesión?'
      });
      confirmPopup.then(function (res) {
        if (res) {
          $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br/>Cerrando Sesión',
          });
          $timeout(function () {
            $window.location.reload();
          }, 2000);
          var key = "user_token";
          var surname = "surname";
          sessionService.destroy(key);
          sessionService.destroy(surname);
          $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
          });
          // $state.go('app.logout');
        } else {
          console.log('You are not sure');
        }
      });
    }
  })

  .controller('HomeCtrl', function ($scope, $window, $ionicSlideBoxDelegate, Atractivos) {
    $scope.topAtractivos = Atractivos.getTopTenAtractivo();
    $scope.dominio_img = dominio_img;

    $scope.nextSlide = function () {
      $ionicSlideBoxDelegate.next();
    }
  })

  .controller('AtractivosCtrl', function ($scope, $window, Atractivos) {
    $scope.dominio_img = dominio_img;
    $scope.atractivos = Atractivos.getAtractivos();
  })

  .controller('AtractivoCtrl', function ($http, $scope, $stateParams, $cordovaSocialSharing, $ionicModal, Atractivos, Paquete) {
    var atractivoId = $stateParams.id;
    $scope.atractivo = Atractivos.getAtractivo(atractivoId);
    $scope.paquetes = Paquete.getTopPaqueteByAtractivo(atractivoId);
    $scope.dominio_img = dominio_img;

    $scope.informacion = function () {
      $('.informacion').addClass("activo");
      $('.descripcion').removeClass("activo");
      $('.content-descripcion').css("display", "none");
      $('.content-informacion').css("display", "block");
    };
    $scope.descripcion = function () {
      $('.descripcion').addClass("activo");
      $('.informacion').removeClass("activo");
      $('.content-descripcion').css("display", "block");
      $('.content-informacion').css("display", "none");
    };

    var pelota = 'http://tusimagenesde.com/wp-content/uploads/2017/02/pelota-1.png'
    var message = 'Descubre lo maravilloso de San martín, conozca ' + $scope.atractivo.nombre + 'descarga la aplicación en el siguiente enlace'

    $scope.shareAnywhere = function () {
      $cordovaSocialSharing.share(
        message,
        'Subject string', null,
        'https://firebasestorage.googleapis.com/v0/b/tour-san-martin.appspot.com/o/atractivos%2Fatractivo0%2Fimg%2F1.jpg?alt=media&token=c6d8b422-7283-4aaf-b1c9-fa286b2885f6');
    }
    $scope.shareFacebook = function () {
      $cordovaSocialSharing.shareViaFacebook(
        'Message via Facebook', null /* img */,
        null /* url */,
        function () {
          console.log('share ok')
        }, function (errormsg) {
          alert(errormsg)
        })
    }

    $ionicModal.fromTemplateUrl('templates/app/util/modal_share.html', {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
      // Execute action
    });
  })

  .controller('AtractivoDetalleCtrl', function ($http, $scope, $stateParams, Atractivos) {
    var atractivoId = $stateParams.id;
    $scope.atractivo = Atractivos.getAtractivo(atractivoId);
    $scope.actividades = Atractivos.getActividadesByAtractivo(atractivoId);
    $scope.rutas = Atractivos.getRutasByAtractivo(atractivoId);
    $scope.dominio_img = dominio_img;
  })

  .controller('AgenciasCtrl', function ($scope, Agencias) {
    $scope.agencias = Agencias.getAgencias();
    $scope.dominio_img = dominio_img;
  })

  .controller('AgenciaCtrl', function ($scope, $stateParams, Agencias, Paquete) {
    var AgenciaId = $stateParams.id;
    $scope.agencia = Agencias.getAgencia(AgenciaId);
    $scope.redes = Agencias.getRedesByAgencia(AgenciaId);
    $scope.paquetes = Paquete.getTopPaqueteByAgencia(AgenciaId);
    $scope.dominio_img = dominio_img;

    $scope.open_link = function (event) {
      var href = event.target.href;
      var browserRef = window.open("fb://pages/" + href, '_system', 'location=no');
      // var browserRef = window.open(href, '_system', 'location=no,clearsessioncache=no,clearcache=no');
      event.preventDefault();
    }

  })

  .controller('PaqueteCtrl', function ($scope, Paquete) {
    $scope.paquetes = Paquete.getAllPaquetes();
    $scope.dominio_img = dominio_img;
  })

  .controller('PaqueteDetalleCtrl', function ($scope, $stateParams, Paquete, sessionStatus, $state, $ionicModal, $ionicPopup) {
    var paqueteId = $stateParams.id;
    $scope.paquete = Paquete.getPaqueteById(paqueteId);
    $scope.galeria = Paquete.getImgPaqueteById(paqueteId);
    $scope.precios = Paquete.getPrecioPaqueteById(paqueteId);
    $scope.itinerario = Paquete.getItinerarioPaqueteById(paqueteId);
    $scope.dominio_img = dominio_img;

    $scope.reserve = function (number_person, precio) {
      if (sessionStatus.auth()) {
        $ionicModal.fromTemplateUrl('templates/app/util/modal_reserva.html', {
          scope: $scope
        }).then(function (modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      }
      else {
        var alertPopup = $ionicPopup.alert({
          title: 'Inicio de Sesión',
          template: 'Para poder continuar, primero deberás iniciar sesión'
        });
        $state.go('app.login');
      }
    }

  })

  .controller('ItinerarioCtrl', function ($scope, $stateParams, Paquete) {
    var itinerarioId = $stateParams.id;
    $scope.itinerario = Paquete.getItinerarioById(itinerarioId);
    $scope.lugar = Paquete.getLugarItinerarioById(itinerarioId);
  })

  .controller('TransportesCtrl', function ($scope, Transportes) {
    $scope.transportes = Transportes.getTransportes();
  })

  .controller('TransporteCtrl', function ($scope, $stateParams, Transportes) {
    var TransporteId = $stateParams.id;
    $scope.agencia = Transportes.getTransporte(TransporteId);
  })

  .controller('MapaCtrl', function ($scope, $state, $cordovaGeolocation, $ionicLoading, $stateParams) {
    var lat = $stateParams.lat;
    var long = $stateParams.long;
    var nombre = $stateParams.name;

    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Cargando Ubicacion!'
    });

    var options = {timeout: 10000, enableHighAccuracy: true};
    var image = "img/ionic.png"

    //$cordovaGeolocation.getCurrentPosition(options).then(function(position){

    //var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var latLng = new google.maps.LatLng(lat, long);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    google.maps.event.addListenerOnce($scope.map, 'idle', function () {

      var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng,
        title: 'Hello World!'
      });

      var infoWindow = new google.maps.InfoWindow({
        content: nombre + "!!"
      });

      infoWindow.open($scope.map, marker);

      $ionicLoading.hide();

      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open($scope.map, marker);

      });
    });


    //}
    //  , function(error){
    //  alert("no se pudo acceder");
    //});
  })

  .controller('GaleriaCtrl', function ($scope, $ionicModal, Galeria) {

    $scope.galeria = Galeria.getGaleria();
    $scope.dominio_img = dominio_img;

    $scope.open_link = function (event) {
      var href = event.target.href;
      var browserRef = window.open(href, '_system', 'location=no,clearsessioncache=no,clearcache=no');
      event.preventDefault();
    }

    $ionicModal.fromTemplateUrl('templates/app/util/modal_galeria.html', {
      scope: $scope,
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function (url_imagen, descripcion) {
      $scope.url_imagen = url_imagen;
      $scope.descripcion = descripcion;

      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
      // Execute action
    });

  })

  .controller('ValoracionCtrl', function ($scope) {

  })

  .controller('ImagenCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, Atractivos) {
    var atractivoId = $stateParams.id;
    $scope.dominio_img = dominio_img;

    $scope.data = {};
    $scope.data.currentPage = 0;

    var setupSlider = function () {
      //some options to pass to our slider
      $scope.data.sliderOptions = {
        initialSlide: 0,
        direction: 'horizontal', //or vertical
        speed: 300 //0.3s transition
      };

      //create delegate reference to link with slider
      $scope.data.sliderDelegate = null;

      //watch our sliderDelegate reference, and use it when it becomes available
      $scope.$watch('data.sliderDelegate', function (newVal, oldVal) {
        if (newVal != null) {
          $scope.data.sliderDelegate.on('slideChangeEnd', function () {
            $scope.data.currentPage = $scope.data.sliderDelegate.activeIndex;
            //use $scope.$apply() to refresh any content external to the slider
            $scope.$apply();
          });
        }
      });
    };
    setupSlider();

    $scope.atractivo = Atractivos.getImgByAtractivo(atractivoId);
  })

  .controller('VideoCtrl', function ($scope, $stateParams, $ionicLoading, Atractivos) {
    var AtractivoId = $stateParams.id;
    $scope.atractivo = Atractivos.getAtractivo(AtractivoId);
    //console.log($scope.videos);
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Cargando videos!',
      duration: 2500
    });
  })

  .controller('LoginCtrl', function ($scope, $stateParams, $ionicPopup, $ionicLoading, sessionService, $ionicHistory, sessionStatus, $state) {
    $scope.loginData = {};
    $scope.doLogin = function () {
      if (($("#username").val()) == '' || ($("#password").val()) == '') {
        var alertPopup = $ionicPopup.alert({
          template: 'Los campos no deben estar vacios!'
        });
      }
      else {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Validando sus datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url: api + "usuario/loguear",
          data: {
            email: $scope.loginData.username,
            password: $scope.loginData.password
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Error en inicio de Sesion!',
              template: 'Por favor, verificar si sus datos son correctos!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            var id_user = response[0]['id'];
            var name = response[0]['name'];
            var surname = response[0]['surname'];
            var email = response[0]['email'];
            var token = "eyJhbG";
            sessionService.set("user_token", token);
            sessionService.set("id_user", id_user);
            sessionService.set("name", name);
            sessionService.set("surname", surname);
            sessionService.set("email", email);
            data.push(response);
            $ionicLoading.hide();
            $state.go('app.reload');
          }
        });

        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
      }
    }

  })

  .controller('ReloadCtrl', function ($scope, $ionicPopup, $ionicHistory, sessionStatus, $state, $window) {
    if (sessionStatus.auth()) {
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      $state.go('app.home');
    }
    else {
      $window.location.reload();
    }

  })

  .controller('LogoutCtrl', function ($scope, $ionicPopup, $ionicLoading, $ionicHistory, sessionService, $state, $timeout) {

    $ionicLoading.show({
      template: '<ion-spinner icon="ios"></ion-spinner><br/>Cerrando Sesión',
    });
    $timeout(function () {
      var key = "user_token";
      var surname = "surname";
      sessionService.destroy(key);
      sessionService.destroy(surname);
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      $state.go('app.home');
    }, 1500);

  })

;
