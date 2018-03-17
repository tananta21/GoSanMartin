angular.module('starter.services', [])

//PETICIONES  ATRACTIVOS
  .factory('Atractivos', function ($ionicLoading, $ionicPopup, HostConnect) {
    return {
      getAtractivos: function () {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url: HostConnect.getDomainApi()+"atractivos",
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;

      },
      getAtractivo: function (atractivo_id) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!'
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url:HostConnect.getDomainApi()+"atractivo/by_id",
          data:{
            id :atractivo_id
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;
      },
      getImgByAtractivo: function (id) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        var atractivo_id = id;
        $.ajax({
          type: 'GET',
          url: HostConnect.getDomainApi()+"atractivo/imagen/by_id",
          data:{
            id :atractivo_id
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;
      },
      getActividadesByAtractivo: function (id) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url:HostConnect.getDomainApi()+"actividades/atractivo/by_id",
          data:{
            id :id
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;
      },
      getConsejosByAtractivo: function (id) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url: HostConnect.getDomainApi()+"consejos/atractivo/by_id",
          data:{
            id :id
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;
      },
      getGastosByAtractivo: function (id) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url:HostConnect.getDomainApi()+"gastos/atractivo/by_id",
          data:{
            id :id
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;
      },
      getRutasByAtractivo: function (id) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url:HostConnect.getDomainApi()+"rutas/atractivo/by_id",
          data:{
            id :id
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;
      },
      getTopTenAtractivo: function () {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url: HostConnect.getDomainApi()+"atractivos/top_ten",
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;

      },
      getAtractivosByUbigeo: function (numubigeo) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!'
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url:HostConnect.getDomainApi()+"atractivos/by_ubigeo_id",
          data:{
            numubigeo :numubigeo
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;
      },
    }

  })

  .factory('Paquete', function ($ionicLoading, $ionicPopup, HostConnect) {
    return {
      getAllPaquetes: function () {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url:HostConnect.getDomainApi()+"paquetes_turisticos",
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;

      },
      getPaqueteById: function (id) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url:HostConnect.getDomainApi()+"paquete/by_id",
          data:{
            id :id
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;

      },
      getPaquetesByAtractivo: function (atractivo) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url:HostConnect.getDomainApi()+"paquetes/by_atractivo_id",
          data:{
            id :atractivo
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;

      },
      getPaquetesByAgencia: function (agencia) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url:HostConnect.getDomainApi()+"paquetes/by_agencia_id",
          data:{
            id :agencia
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;

      },
      getImgPaqueteById: function (id) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url:HostConnect.getDomainApi()+"paquete/img/by_id",
          data:{
            id :id
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;

      },
      getItinerarioPaqueteById: function (id) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url:HostConnect.getDomainApi()+"paquete/itinerario/by_id",
          data:{
            id :id
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;

      },
      getItinerarioById: function (id) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url:HostConnect.getDomainApi()+"itinerario/by_id",
          data:{
            id :id
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;

      },
      getLugarItinerarioById: function (id) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url:HostConnect.getDomainApi()+"itinerario/lugar/by_id",
          data:{
            id :id
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;

      },
      getPrecioPaqueteById: function (id) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url: HostConnect.getDomainApi() + "paquete/precio/by_id",
          data:{
            id :id
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;

      },
      getTopPaqueteByAtractivo: function (atractivo_id) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url: HostConnect.getDomainApi() + "paquetes_turisticos/by_atractivo",
          data:{
            id :atractivo_id
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;

      },
      getTopPaqueteByAgencia: function (agencia_id) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url: HostConnect.getDomainApi() + "paquetes_turisticos/by_agencia",
          data:{
            id :agencia_id
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;

      },
    }

  })

  .factory('Galeria', function ($ionicLoading, $ionicPopup, HostConnect) {
    return {
      getGaleria: function () {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url: HostConnect.getDomainApi() + "galeria",
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;

      },
    }

  })

  .factory('Agencias', function ($ionicLoading, $ionicPopup,HostConnect ) {
    return {
      getAgencias: function () {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url: HostConnect.getDomainApi() + "agencias",
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;
      },
      getAgencia: function (id) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!'
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url: HostConnect.getDomainApi() + "agencia/by_id",
          data:{
            id :id
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;
      },
      getRedesByAgencia: function (id) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Cargando datos!'
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url: HostConnect.getDomainApi() + "redes/by_agencia",
          data:{
            id :id
          },
          dataType: 'JSON',
          error: function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Upps!!',
              template: 'Hubo un error, inténtelo más tarde!'
            });
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;
      },
    }
  })

  .factory('Transportes', function () {
    return {
      getTransportes: function () {
        return transportes;
      },
      getTransporte: function (id) {
        return transportes[id];
      },
    }
  })

  .factory('LoginUser', function ($ionicLoading, $ionicPopup, sessionService, HostConnect) {
    return {
      getLoginUser: function (email, password) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Validando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url: HostConnect.getDomainApi() + "usuario/loguear",
          data:{
            email :email,
            password :password
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
          }
        });
        return data;

      },

      postCreateUser: function (name, surname, email, password) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>Validando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url: HostConnect.getDomainApi() + "usuario/create",
          data:{
            name :name,
            surname :surname,
            email :email,
            password :password
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
          }
        });
        return data;

      },
    }
  })

  .service('LoginService', function($q, sessionService) {
    return {
      loginUser: function(name, pw) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        if (name == 'user' && pw == '88') {
          var token = "12345";
          var apellido = "tananta del aguila";
          sessionService.set("apellido", apellido);
          sessionService.set("user_token", token);
          deferred.resolve('Welcome ' + name + '!');

        } else {
          deferred.reject('Wrong credentials.');
        }
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }
    }
  })

  .factory('sessionService', ['$http', function($http) {
    return {
      set: function(key, value) {
        return localStorage.setItem(key, JSON.stringify(value));
      },
      get: function(key) {
        return JSON.parse(localStorage.getItem(key));
      },
      destroy: function(key) {
        return localStorage.removeItem(key);
      },
    };
  }])

  .factory('sessionStatus', ['$http', 'sessionService', '$location', function($http, sessionService, $location) {
    return {
      auth: function() {
        var token= sessionService.get("user_token");
        if ((token == "") || (token == null)) {
          return
          $location.path('/inicio');
        } else {
          return true;
        }
      },
    };
  }])

  .service("HostConnect", function () {
    return{
      getDomain : function() {
        return "voydeviaje.ml";
      },
      getDomainHttp: function () {
        return "http://voydeviaje.ml";
      },
      getDomainApi: function () {
        return "http://voydeviaje.ml/api/";
      }
    }
  })



var transportes = [
  {
    nombre: 'Turismo Selva',
    lema: 'Confianza, Seguridad y Puntualidad',
    direccion: '	Jr. Alfonso Ugarte Cdra. 11',
    horario: 'Todo el día',
    telefono: '042-530100',
    celular: '942414214',
    correo: "selva@turismoselva.com",
    img: "img/transporte/turismo_selva.jpg",
    descripcion: 'La Empresa de transporte y servicios turisticos TURISMO SELVA S.A. es una empresa con amplia trayectoria en el rubro del transporte terrestre de pasajeros y envío de encomiendas en la Región San Martín, Loreto y Amazonas, y tiene por objetivo principal el satisfacer las necesidades de los clientes brindando un servicio de calidad, seguridad, comodidad y puntualidad.',
  },
  {
    nombre: 'Turismo Cajamarca',
    lema: 'Tu transporte seguro',
    direccion: '	Jr. Alfonso Ugarte N° 1438',
    horario: 'Todo el día',
    telefono: '042 529122',
    celular: '942436249',
    correo: "info@transportescajamarca.com",
    img: "img/transporte/turismo_cajamarca.jpg",
    descripcion: 'La empresa de Transportes y Turismo Cajamarca S.A. es una empresa con muchos años de experiencia, ya que la conformamos choferes guías de pasajeros rurales y turistas acreditados, con la meta de ofrecer un servicio de transporte terrestre integral de calidad en todos los ámbitos. Contamos con automóviles de lujo, con capacidad desde 5 a más pasajeros, que ofrecen el servicio dentro y fuera de la región San Martín. Nuestra empresa está certificada por el sistema de gestión de calidad del Ministerio de Transportes y Comunicaciones del país; es por esto que podemos garantizarle que nuestro servicio es de una alta calidad y usted quedara totalmente satisfecho.',
  },

]

