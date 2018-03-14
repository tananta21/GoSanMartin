//LOCALMENTE ================================
var ip = "192.168.43.133";
var dominio = "http://" + ip;
var dominio_img = ip;

var api = dominio + "/api/";

angular.module('starter.atractivos_controllers', [])

  .controller('PaquetesByAtractivoCtrl', function ($scope, $stateParams, Paquete, Atractivos) {
    var atractivoId = $stateParams.id;
    $scope.atractivo = Atractivos.getAtractivo(atractivoId);
    $scope.paquetes = Paquete.getPaquetesByAtractivo(atractivoId);
    console.log($scope.paquetes);
    $scope.dominio_img = dominio_img;

  })
