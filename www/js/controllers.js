//SERVIDOR ==================================
// var dominio = "http://voydeviaje.tk";
// var dominio_img = "voydeviaje.tk";

//LOCALMENTE ================================
var dominio = "http://voydeviaje.info";
var dominio_img = "voydeviaje.info";

var api = dominio + "/api/";

angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicLoading, $cordovaNetwork, $rootScope, $state, $ionicPopup) {
    document.addEventListener("deviceready", function () {
      $scope.network = $cordovaNetwork.getNetwork();
      $scope.isOnline = $cordovaNetwork.isOnline();
      $scope.$apply();
      $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
        $scope.isOnline = true;
        $ionicLoading.show({
          template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Cargando datos!',
        });
        var ref = firebase.database().ref("data/atractivos");
        ref.on("value", function (snapshot) {
          var atractivos = snapshot.val();
          var array = [];
          for (var prop in atractivos) {
            array.push(atractivos[prop]);
          }
          $ionicLoading.hide();
          $scope.atractivos = array;
          console.log($scope.atractivos)
        }, function (error) {
          $ionicLoading.hide();
          console.log("Error: " + error.code);
        });
        //redirect after check connection internet ONLINE
        $state.go('app.atractivos');
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
  })

  .controller('HomeCtrl', function ($scope, $window, $ionicSlideBoxDelegate) {
    $scope.nextSlide = function () {
      $ionicSlideBoxDelegate.next();
    },

      $scope.images = [
        "img/prueba/cultural.jpg",
        "img/prueba/arqueologico.jpg",
        "img/prueba/arqueologico2.jpg",
        "img/prueba/gastronomia.jpg",
        "img/prueba/vivencial.jpg",
        "img/prueba/ecoturismo.jpg"
      ];
  })

  .controller('AtractivosCtrl', function ($scope, Atractivos) {
    $scope.dominio_img = dominio_img;
    $scope.atractivos = Atractivos.getAtractivos();

  })

  .controller('AtractivoCtrl', function ($http, $scope, $stateParams, $cordovaSocialSharing, $ionicModal, Atractivos) {
    var atractivoId = $stateParams.id;
    $scope.atractivo = Atractivos.getAtractivo(atractivoId);
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
  })


  .controller('AgenciasCtrl', function ($scope, Agencias) {
    $scope.agencias = Agencias.getAgencias();
  })

  .controller('AgenciaCtrl', function ($scope, $stateParams, Agencias) {
    var AgenciaId = $stateParams.id;
    $scope.agencia = Agencias.getAgencia(AgenciaId);
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

  .controller('GaleriaCtrl', function ($scope, $ionicModal) {

    $ionicModal.fromTemplateUrl('templates/app/util/modal_galeria.html', {
      scope: $scope,
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function (url_imagen) {
      $scope.url_imagen = url_imagen;
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

  .controller('LoginCtrl', function ($scope, $stateParams, $ionicLoading, $ionicPopup) {

    $scope.loginData = {};
    $scope.doLogin = function () {
      if (($("#username").val()) == '' || ($("#password").val()) == '') {
        var alertPopup = $ionicPopup.alert({
          template: 'Los campos no deben estar vacios!'
        });
      }
      else {
        var data = $scope.loginData;
        $ionicLoading.show({
          template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Cargando!',
          duration: 1000
        });

      }
    }
  })



//.controller('CategoriasCtrl',function($http, $scope, $stateParams){
//
//    var tipoId = $stateParams.TipoId;
//
//    $http.get("http://"+dominio+"/categoria/"+tipoId)
//       .success(function(data){
//        $scope.tipo = data[0][0];
//        $scope.categorias = data[1];
//    })
//      .error(function(error){
//        debugger;
//      })
//  })

;
