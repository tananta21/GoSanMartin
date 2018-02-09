var dominio = "http://voydeviaje.info";
var dominio_img = "voydeviaje.info";
var api = dominio+"/api/";

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

  .controller('AtractivosCtrl', function ($scope, $ionicLoading, $cordovaNetwork, $rootScope, $state, $ionicPopup, Atractivos, Prueba) {
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Cargando datos!',
    });
    $.ajax({
      type: 'GET',
      url: api+"atractivos",
      dataType: 'JSON',
      error: function () {
        alert("hay un error");
      },
      success: function (data) {
        //console.log(data)
      }
    });
    //var ref = firebase.database().ref("data/atractivos");
    //ref.on("value", function (snapshot) {
    //  var atractivos = snapshot.val();
    //  var array = [];
    //  for (var prop in atractivos) {
    //    array.push(atractivos[prop]);
    //  }
    //  $ionicLoading.hide();
    //  $scope.atractivos = array;
    //}, function (error) {
    //  $ionicLoading.hide();
    //  console.log("Error: " + error.code);
    //});

    $scope.atractivos = Prueba.getAtractivos();
    $scope.dominio_img = dominio_img;
    $scope.prueba = Atractivos.getAtractivos();

    $ionicLoading.hide();

  })

  .controller('AtractivoCtrl', function ($http, $scope, $stateParams, $cordovaSocialSharing, $ionicModal) {
    var atractivoId = $stateParams.id;
    var ref = firebase.database().ref("data/atractivos").orderByChild("id").equalTo(atractivoId);
    ref.on("value", function (snapshot) {
      var atractivo = snapshot.val();
      var array = [];
      for (var prop in atractivo) {
        array.push(atractivo[prop]);
      }
      $scope.atractivo = array[0];
    }, function (error) {
      console.log("Error: " + error.code);
    });

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
    var message ='Descubre lo maravilloso de San martín, conozca '+ $scope.atractivo.nombre+'descarga la aplicación en el siguiente enlace'

    $scope.shareAnywhere = function() {
      $cordovaSocialSharing.share(
        message,
        'Subject string', null,
        'https://firebasestorage.googleapis.com/v0/b/tour-san-martin.appspot.com/o/atractivos%2Fatractivo0%2Fimg%2F1.jpg?alt=media&token=c6d8b422-7283-4aaf-b1c9-fa286b2885f6');
    }
    $scope.shareFacebook = function() {
      $cordovaSocialSharing.shareViaFacebook(
        'Message via Facebook', null /* img */,
        null /* url */,
        function() {console.log('share ok')}, function(errormsg){alert(errormsg)})
    }

    $ionicModal.fromTemplateUrl('templates/app/util/modal_share.html', {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
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
        content: "Punto del Atractivo!"
      });

      infoWindow.open($scope.map, marker);

      $ionicLoading.hide();

      //google.maps.event.addListener(marker, 'click', function () {
      //  infoWindow.open($scope.map, marker);
      //
      //});
    });


    //}
    //  , function(error){
    //  alert("no se pudo acceder");
    //});
  })

  .controller('ImagenCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate) {
    var atractivoId = $stateParams.id;
    var ref = firebase.database().ref("data/atractivos").orderByChild("id").equalTo(atractivoId);
    ref.on("value", function (snapshot) {
      var atractivo = snapshot.val();
      var array = [];
      for (var prop in atractivo) {
        array.push(atractivo[prop]);
      }
      $scope.atractivo = array[0];
    }, function (error) {
      console.log("Error: " + error.code);
    });
    $scope.slideVisible = function (index) {
      if (index < $ionicSlideBoxDelegate.currentIndex() - 1
        || index > $ionicSlideBoxDelegate.currentIndex() + 1) {
        return false;
      }
      return true;
    }
  }
)
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
