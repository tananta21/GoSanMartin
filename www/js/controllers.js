
angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicLoading, $cordovaNetwork, $rootScope, $state, $ionicHistory, $window, $timeout, $ionicPopup, sessionService, $cordovaOauth, $location, $http, HostConnect) {
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
        var name = "name";
        var surname = "surname";
        var email = "email";
        var facebook = "facebook";

        if(sessionService.get(facebook) != null) {
          $http.get("https://graph.facebook.com/v2.2/me", {
            params: {
              access_token: $window.localStorage.accessToken,
              fields: "id,name,first_name,last_name,email,age_range,gender,picture",
              format: "json"
            }
          }).then(function (result) {
            sessionService.set("facebook_user_id", result.data.id);
            sessionService.set("name", result.data.first_name);
            sessionService.set("surname", result.data.last_name);
            sessionService.set("email", result.data.email);
            $scope.token = sessionService.get(key);
            $scope.nombre = sessionService.get(name);
            $scope.apellido = sessionService.get(surname);
            $scope.img_perfil = result.data.picture.data.url;
            if(sessionService.get('verified_user') === "true"){
              $.ajax({
                type: 'GET',
                url:HostConnect.getDomainApi()+"usuario/verifyUserFacebook",
                data: {
                  facebook_user_id: sessionService.get('facebook_user_id'),
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
                  if(response === 0){
                    sessionService.set("register_user", "true");
                  }
                  else{
                    sessionService.set("register_user", "false");
                  }
                }
              });

              sessionService.set("verified_user", "false");
            }
            if(sessionService.get('register_user') === "true"){
              $.ajax({
                type: 'GET',
                url: HostConnect.getDomainApi()+"usuario/create/facebook",
                data: {
                  name: sessionService.get(name),
                  surname: sessionService.get(surname),
                  email: sessionService.get(email),
                  password: sessionService.get(surname),
                  facebook_user_id: sessionService.get('facebook_user_id')
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
                }
              });
              sessionService.set("register_user", "false");
            }

          }, function (error) {
            alert("Hubo un problema.");
            console.log(JSON.stringify(error));
          });
        }
        else{
          $scope.token = sessionService.get(key);
          $scope.nombre = sessionService.get(name);
          $scope.apellido = sessionService.get(surname);
          $scope.img_perfil = 'img/avatar5.png';
        }
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
          var key = "user_token";
          var name = "name";
          var surname = "surname";
          var facebook = "facebook";
          var verified_user = "verified_user";
          var register_user = "register_user";
          $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br/>Cerrando Sesión',
          });
          $timeout(function () {
            if($window.localStorage.hasOwnProperty("accessToken") === true) {
              sessionService.destroy(facebook);
            }
            sessionService.destroy(key);
            sessionService.destroy(name);
            sessionService.destroy(surname);
            sessionService.destroy(facebook);
            sessionService.destroy(verified_user);
            sessionService.destroy(register_user);
            $state.go('app.login');
            $ionicLoading.hide();
          }, 2000);
        } else {
          console.log('You are not sure');
        }
      });
    }
  })

  .controller('HomeCtrl', function ($scope, $window, $ionicSlideBoxDelegate, Atractivos, HostConnect) {
    $scope.topAtractivos = Atractivos.getTopTenAtractivo();
    $scope.dominio_img = HostConnect.getDomain();
    $scope.nextSlide = function () {
      $ionicSlideBoxDelegate.next();
    }
  })

  .controller('AtractivosCtrl', function ($scope, $window, Atractivos, $ionicPopup, $ionicLoading, $ionicModal, HostConnect) {
    $scope.dominio_img =HostConnect.getDomain();
    $scope.atractivos = Atractivos.getAtractivos();

    $ionicModal.fromTemplateUrl('templates/app/util/modal_filter_provincias.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.closeModal = function () {
      $scope.modal.hide();
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

    $scope.btnFilter = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Buscar por:',
        templateUrl: 'templates/app/util/select_filter.html',
      });
      confirmPopup.then(function (res) {
        if (res) {
          var choice = $('input[name=choice]:checked').val();
          if(choice == 'provincia'){
            $scope.modal.show();
          }
          else{
            var alertPopup = $ionicPopup.alert({
              title: 'Atención!',
              template: 'Por favor, debe seleccionar una opción!'
            });
          }

        } else {
          console.log('You are not sure');
        }
      });
    }

    $scope.doFilterProvince = function () {
      var provincia = $('input[name=province]:checked').val();
      if (provincia!=undefined){
        $scope.name_filter = "Provincia";
        $scope.name_option_filter = $('input[name=province]:checked').parent('label').text();
        $scope.modal.hide();
        $scope.atractivos = Atractivos.getAtractivosByUbigeo(provincia);
      }
      else{
        $scope.error_msg = 'Por favor, seleccione una opción !!';
      }
    }

    $scope.doRefreshFilter = function () {
      document.getElementById('formProvinces').reset();
      $scope.atractivos = Atractivos.getAtractivos();
      $scope.$broadcast('scroll.refreshComplete');
      $scope.name_filter = null;
      $scope.error_msg = null;
    }

    $scope.doRefresh = function () {
      $scope.atractivos = Atractivos.getAtractivos();
      $scope.$broadcast('scroll.refreshComplete');
    }


  })

  .controller('AtractivoCtrl', function ($http, $scope, $stateParams, $cordovaSocialSharing, $ionicModal, Atractivos, Paquete, HostConnect) {
    var atractivoId = $stateParams.id;
    $scope.atractivo = Atractivos.getAtractivo(atractivoId);
    $scope.paquetes = Paquete.getTopPaqueteByAtractivo(atractivoId);
    $scope.dominio_img = HostConnect.getDomain();

    $scope.url_download = 'https://play.google.com/store/apps/developer?id=TripAdvisor&hl=es';

    $scope.shareFacebook = function(atractivo) {
      var msg = 'Descubre "' + atractivo + '" , ¿Qué esperas?, descarga la aplicación de Play Store en el siguiente enlace y conoce muchos lugares más en tu visita a Tarapoto!!';
      $cordovaSocialSharing.shareViaFacebookWithPasteMessageHint(
        msg,
        null /* img */,
        $scope.url_download /* url */,
        'Pega el contenido del mensaje!',
        function () {
          console.log('share ok')
        }, function (errormsg) {
          alert(errormsg)
        })
    }
    $scope.shareWhatsApp = function(atractivo) {
      var msg = 'Descubre "' + atractivo + '" , ¿Qué esperas?, descarga la aplicación de Play Store en el siguiente enlace y conoce muchos lugares más en tu visita a Tarapoto!!';
      $cordovaSocialSharing.shareViaWhatsApp(
        msg,
        null /* img */,
        $scope.url_download /* url */,
        function() {console.log('share ok')}, function(errormsg){alert(errormsg)})
    }

    $scope.shareMessenger = function(atractivo) {
      var msg = 'Descubre "' + atractivo + '" , ¿Qué esperas?, descarga la aplicación de Play Store en el siguiente enlace y conoce muchos lugares más en tu visita a Tarapoto!!';
      $cordovaSocialSharing.shareVia('com.facebook.orca',
        msg,
        null,
        null,
        $scope.url_download,
        function () { console.log('share ok') }, function (errormsg) { alert(errormsg) })
    }

    $scope.shareInstagram = function(atractivo) {
      var msg = 'Descubre "' + atractivo + '" , ¿Qué esperas?, descarga la aplicación de Play Store en el siguiente enlace y conoce muchos lugares más en tu visita a Tarapoto!!';
      $cordovaSocialSharing.shareVia('com.instagram.android',
        msg,
        null,
        null,
        $scope.url_download,
        function () { console.log('share ok') }, function (errormsg) { alert(errormsg) })
    }



    $ionicModal.fromTemplateUrl('templates/app/util/modal_share.html', {
      scope: $scope,
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

  .controller('AtractivoDetalleCtrl', function ($http, $scope, $stateParams, Atractivos, HostConnect) {
    var atractivoId = $stateParams.id;
    $scope.atractivo = Atractivos.getAtractivo(atractivoId);
    $scope.actividades = Atractivos.getActividadesByAtractivo(atractivoId);
    $scope.rutas = Atractivos.getRutasByAtractivo(atractivoId);
    $scope.dominio_img = HostConnect.getDomain();
  })

  .controller('RecomendacionCtrl', function ($http, $scope, $stateParams, Atractivos) {
    var atractivoId = $stateParams.id;
    $scope.atractivo = Atractivos.getAtractivo(atractivoId);
    $scope.consejos = Atractivos.getConsejosByAtractivo(atractivoId);
    $scope.gastos = Atractivos.getGastosByAtractivo(atractivoId);
  })

  .controller('AgenciasCtrl', function ($scope, Agencias, HostConnect) {
    $scope.agencias = Agencias.getAgencias();
    $scope.dominio_img = HostConnect.getDomain();
  })

  .controller('AgenciaCtrl', function ($scope, $stateParams, Agencias, Paquete, HostConnect) {
    var AgenciaId = $stateParams.id;
    $scope.agencia = Agencias.getAgencia(AgenciaId);
    $scope.redes = Agencias.getRedesByAgencia(AgenciaId);
    $scope.paquetes = Paquete.getTopPaqueteByAgencia(AgenciaId);
    $scope.dominio_img = HostConnect.getDomain();

    $scope.open_link = function (event) {
      var linkHref = $("#linkFb").attr('href');
      // var href = event.target.href;
      var browserRef = window.open(linkHref, '_system', 'location=no');
      // var browserRef = window.open(href, '_system', 'location=no,clearsessioncache=no,clearcache=no');
      event.preventDefault();
    }

  })

  .controller('PaqueteCtrl', function ($scope, Paquete, HostConnect) {
    $scope.paquetes = Paquete.getAllPaquetes();
    $scope.dominio_img = HostConnect.getDomain();
  })

  .controller('PaqueteDetalleCtrl', function ($scope, $stateParams, Paquete, sessionStatus, $state, $ionicModal, $ionicPopup, sessionService, $ionicLoading, $timeout, $window, $ionicHistory, HostConnect) {
    var paqueteId = $stateParams.id;
    $scope.paquete = Paquete.getPaqueteById(paqueteId);
    $scope.galeria = Paquete.getImgPaqueteById(paqueteId);
    $scope.precios = Paquete.getPrecioPaqueteById(paqueteId);
    $scope.itinerario = Paquete.getItinerarioPaqueteById(paqueteId);
    $scope.dominio_img = HostConnect.getDomain();

    $scope.reserve = function (id, name, number_person, precio) {
      $scope.RegisterData = {};
      $scope.RegisterData.paquete_id = id;
      $scope.RegisterData.name_paquete = name;
      $scope.RegisterData.number_person = number_person;
      $scope.RegisterData.precio = precio;
      $scope.RegisterData.name = sessionService.get('name');
      $scope.RegisterData.surname = sessionService.get('surname');
      $scope.RegisterData.email = sessionService.get('email');
      if (sessionStatus.auth()) {
        $ionicModal.fromTemplateUrl('templates/app/util/modal_reserva.html', {
          scope: $scope
        }).then(function (modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
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

        $scope.doRegisterReserve = function () {
          var confirmPopup = $ionicPopup.confirm({
            title: 'Confirmar Solicitud de reserva',
            template: 'La agencia a cargo del paquete turístico se pondrá en contacto con usted para establecer la forma de pago y la confirmación de la reserva.'
          });
          confirmPopup.then(function (res) {
            if (res) {
              $ionicLoading.show({
                template: '<ion-spinner icon="ios"></ion-spinner><br/>Guardando y enviando solicitud de reserva!',
              });
              var data = [];
              $.ajax({
                type: 'GET',
                url: HostConnect.getDomainApi()+"reservar/paquete",
                data: {
                  user_id:  sessionService.get('id_user'),
                  paquete_id: $scope.RegisterData.paquete_id,
                  number_person: $scope.RegisterData.number_person,
                  precio: $scope.RegisterData.precio,
                  fecha: $scope.RegisterData.fecha,
                  documento: $scope.RegisterData.documento,
                  name: $scope.RegisterData.name,
                  surname: $scope.RegisterData.surname,
                  email: $scope.RegisterData.email,
                  celular: $scope.RegisterData.celular
                },
                dataType: 'JSON',
                error: function () {
                  var alertPopup = $ionicPopup.alert({
                    title: 'Upps!!',
                    template: 'Hubo un error, por favor inténtelo más tarde'
                  });
                  $ionicLoading.hide();
                },
                success: function (response) {
                  $window.location.reload();
                }
              });

            } else {
              console.log('You are not sure');
            }
          });
        }
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

  .controller('PaquetesByAtractivoCtrl', function ($scope, $stateParams, Paquete, Atractivos, HostConnect) {
    var atractivoId = $stateParams.id;
    $scope.atractivo = Atractivos.getAtractivo(atractivoId);
    $scope.paquetes = Paquete.getPaquetesByAtractivo(atractivoId);
    $scope.dominio_img = HostConnect.getDomain();

  })

  .controller('PaquetesByAgenciaCtrl', function ($scope, $stateParams, Paquete, Agencias, HostConnect) {
    var agenciaId = $stateParams.id;
    $scope.agencia = Agencias.getAgencia(agenciaId)
    $scope.paquetes = Paquete.getPaquetesByAgencia(agenciaId);
    $scope.dominio_img = HostConnect.getDomain();

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

  .controller('GaleriaCtrl', function ($scope, $ionicModal, Galeria, HostConnect) {

    $scope.galeria = Galeria.getGaleria();
    $scope.dominio_img = HostConnect.getDomain();

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
    $scope.openModal = function (url_imagen, descripcion,nombre) {
      $scope.url_imagen = url_imagen;
      $scope.descripcion = descripcion;
      $scope.nombre = nombre;
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

  .controller('ImagenCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, Atractivos, HostConnect) {
    var atractivoId = $stateParams.id;
    $scope.dominio_img = HostConnect.getDomain();

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

  .controller('LoginCtrl', function ($scope, $stateParams, $ionicPopup, $ionicLoading, sessionService, $ionicHistory, sessionStatus, $state, $cordovaOauth, $window, $location, HostConnect) {
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
          url: HostConnect.getDomainApi()+ "usuario/loguear",
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
            // $state.go('app.reload');
            $location.path('/reload');
          }
        });
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true,
          historyRoot: false
        });
      }
    }
    $scope.facebookLogin = function() {
      $cordovaOauth.facebook("1604162166327409", ["email"], {"auth_type": "rerequest"}).then(function(result) {
        var token = "eyJhbG";
        var facebook_token = "token2";
        $window.localStorage.accessToken = result.access_token;
        sessionService.set("facebook", facebook_token);
        sessionService.set("user_token", token);
        sessionService.set("verified_user", "true");
        $location.path('/reload');
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true,
          historyRoot: false
        });
      }, function(error) {
        console.log(JSON.stringify(error));
      });
    }
  })

  .controller('RegisterCtrl', function ($scope, $stateParams, $ionicPopup, $ionicLoading, sessionService, $ionicHistory, sessionStatus, $state, HostConnect) {
    $scope.RegisterData = {};
    $scope.doRegister = function () {
      $ionicLoading.show({
        template: '<ion-spinner icon="ios"></ion-spinner><br/>Validando sus datos!',
      });
      var data = [];
      $.ajax({
        type: 'GET',
        url:HostConnect.getDomainApi()+ "usuario/create",
        data: {
          name: $scope.RegisterData.name,
          surname: $scope.RegisterData.surname,
          email: $scope.RegisterData.email,
          password: $scope.RegisterData.password
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
          var id_user = response['id'];
          var name = response['name'];
          var surname = response['surname'];
          var email = response['email'];
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

    }

  })

  .controller('ReloadCtrl', function ($scope, $ionicHistory, sessionStatus, $state, $ionicLoading, $window, $timeout) {
    $ionicLoading.show({
      template: '<ion-spinner icon="ios"></ion-spinner><br/>Inicio de Sesión',
    });
    $timeout(function () {
      if(sessionStatus.auth()) {
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true,
          historyRoot: false
        });
        $state.go('app.home');
      }
      $ionicLoading.hide();
    }, 2000);

    //
    // if(sessionStatus.auth()) {
    //   $ionicHistory.nextViewOptions({
    //     disableAnimate: true,
    //     disableBack: true
    //   });
    //   $state.go('app.home');
    // }
    // else {
    //   $window.location.reload();
    // }
  })
