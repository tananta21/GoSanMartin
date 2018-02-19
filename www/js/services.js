//SERVIDOR ==================================
// var dominio = "voydeviaje.tk";

//LOCALMENTE ================================
var dominio = "voydeviaje.info";
var api = "http://" + dominio + "/api/";

angular.module('starter.services', [])

//PETICIONES  ATRACTIVOS
  .factory('Atractivos', function ($ionicLoading) {
    return {
      getAtractivos: function () {
        $ionicLoading.show({
          template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        $.ajax({
          type: 'GET',
          url: api + "atractivos",
          dataType: 'JSON',
          error: function () {
            alert("Upps!! Hubo un error, intentelo más tarde");
            $ionicLoading.hide();
          },
          success: function (response) {
            data.push(response);
            $ionicLoading.hide();
          }
        });
        return data;

      },

      getAtractivo: function (id) {
        $ionicLoading.show({
          template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        var atractivo_id = id;
        $.ajax({
          type: 'GET',
          url: api + "atractivo/by_id",
          data:{
            id :atractivo_id
          },
          dataType: 'JSON',
          error: function () {
            alert("Upps!! Hubo un error, intentelo más tarde");
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
          template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Cargando datos!',
        });
        var data = [];
        var atractivo_id = id;
        $.ajax({
          type: 'GET',
          url: api + "atractivo/imagen/by_id",
          data:{
            id :atractivo_id
          },
          dataType: 'JSON',
          error: function () {
            alert("Upps!! Hubo un error, intentelo más tarde");
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

  .factory('Agencias', function () {
    return {
      getAgencias: function () {
        return agencias;
      },
      getAgencia: function (id) {
        return agencias[id];
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

var agencias = [
  {
    nombre: 'Tarapoto Tours',
    lema: 'Agencia de Turismo',
    direccion: 'tarapoto',
    horario: '9am - 6pm',
    telefono: '21211',
    celular: '992 664 675',
    correo: "tarapototours@gmail.com",
    img: "img/agencias/tarapoto_tours.jpg",
    descripcion: 'Tarapoto Tours es una Agencia de turismo que tiene su sede central en Lima. Nos encontramos en Calle 27 Mz K2 lote 44 Urb. El Pinar, Comas. Nuestros años de experiencia en el sector turístico nos avalan para afirmar que nuestros paquetes turísticos y excursiones ocupan también una posición central entre las agencias del sector de vacaciones. A través de nosotros conocerá los más bellos lugares de la Región de San Martín como Tarapoto, Sauce, Lamas, Moyobamba, Rioja, etc. Organizamos viajes y tours, a la Laguna Azul, Lamas, Alto Mayo, Cataratas de Ahuashiyacu, Cascadas de Pishurayacu, Cataratas de Huacamaillo, Cascadas de Pucayaquillo, varias excursiones de canotaje y aventura por el Río Mayo. Además, dentro de nuestros servicios como agencia de turismo también le gestionamos la búsqueda de hotel y alojamiento para que usted solo se tenga que preocupar de disfrutar durante su estancia de sus vacaciones en Tarapoto. Para nosotros, lo más importante es la satisfacción de nuestros clientes. Somos conscientes que en el sector turístico se trata con las ilusiones y los sueños de la gente por tener unas lindas vacaciones. Éstas son escasas y por ello, cuando un cliente contrata un tour o un paquete turístico quiere que sea perfecto. Ésta es también nuestra mentalidad y por eso cuando organizamos cada uno de los tours lo hacemos con el cariño y dedicación como si realmente se tratase de nuestro propio viaje. En la construcción de un sueño cada detalle es fundamental y así configuramos nuestros paquetes turísticos. Desde el momento del inicio del tour en Tarapoto a cualquier destino que usted elija disfrutar, hasta el momento en que regrese a su hotel a descansar, usted va a tener solventada cualquier eventualidad que pueda surgir durante la excursión, para que usted simplemente pueda relajarse y disfrutar de las vacaciones que se merece.',
  },
  {
    nombre: 'Tingana Tours',
    lema: 'Agencia de Turismo',
    direccion: 'Jr. Moyobamba 173',
    horario: '9am - 8pm',
    telefono: '21211',
    celular: '943 901 598',
    correo: "reservas@tinganatours.com",
    img: "img/agencias/tingana.jpg",
    descripcion: 'Agencia de Turismo Tingana Tours S.A.C RUC: 20600746261. Somos una empresa dedicada al Turismo especializada en tours y paquetes turisticos en Tarapoto y en toda la Región de San Martin. Contamos con Guías, Movilidad y Hospedaje Propio, somos mayoristas de paquetes turísticos en nuestra región.',
  },

]

var atractivos = [
  {
    nombre: 'CATARATA DE AHUASHIYACU',
    lat: '-6.4555687',
    long: ' -76.3088519',
    departamento: 'SAN MARTIN',
    provincia: 'SAN MARTIN',
    distrito: 'LA BANDA DE SHILCAYO',
    categoria: 'SITIOS NATURALES',
    tipo: 'Caidas de agua',
    subtipo: 'Cataratas/Cascadas',
    horario: 'Todo el Año, Mañanas',
    ingreso: 'Previa presentación de boleto o ticket. El costo de ingreso es de S/. 2.00 para (adultos y niños)',
    estado: 'Bueno, cuenta con señalización, tachos de basura, pequeños puentes de madera con tambo de crisnejas, hacía el camino. ',
    imagenes: [
      "img/ahuashiyacu/1.jpg",
      "img/ahuashiyacu/2.jpg",
      "img/ahuashiyacu/3.jpg",
      "img/ahuashiyacu/4.jpg",
      "img/ahuashiyacu/5.jpg",
      "img/ahuashiyacu/6.jpg",
      "img/ahuashiyacu/7.jpg",
    ],
    videos: [],
    rutas: [
      {
        tramo: "De Tarapoto al km. 15 carretera a Yurimaguas",
        acceso: "Terrestre",
        medio: "Automóvil Particular",
        via: "Carretera asfaltada 9 km. Carretra afirmada 6 km.",
        tiempo: "15Km /35 minutos",
      },
      {
        tramo: "De la carretera a la catarata",
        acceso: "Terrestre",
        medio: "A pie",
        via: "Sendero acondicionado",
        tiempo: "300 mts /15 minutos",
      },

    ],
    actividades: [
      {
        actividad: "Natación",
        icono: "ion ion-waterdrop",
      },
      {
        actividad: "Observación de aves",
        icono: "ion ion-social-twitter",
      },
      {
        actividad: "Observación de flora",
        icono: "ion ion-leaf",
      },
      {
        actividad: "Toma de fotografías y filmaciones",
        icono: "ion ion-camera",
      },
      {
        actividad: "Observación de fauna",
        icono: "ion ion-ios-paw",
      },

    ],
    descripcion: 'Formidable caída de agua ubicada a la vera del camino de Tarapoto a Yurimaguas . Las aguas de la catarata descienden tempestuosamente por la cordillera, bañanado a su paso helechos y orquídeas y brindando un espectáculo natural impresionante. Está ubicada en la zona de amortiguamiento del Área de Conservación Regional "Cordillera Escalera" (D.S. 045-205, del 25 de diciembre del 2005) a 465 m.s.n.m. Cuenta con dos 02 caídas , la primera de 60 m, aún no explotada y sin acceso y la segunda de 40 m de altura que discurre sobre la roca terminando en una poza de aproximadamente 12m de diámetro y con profundidades que van desde 30 cm hasta 2.5m, en su parte central; lo que permite la natación. Nace por la confluencia de nacientes de agua que forman la quebrada de Ahuashiyacu que deviene de los vocablos quechuas ahuashi = cantar y yacu = agua, es decir se traduciría como "agua cantarina" o "agua que se ríe", que se halla enclavada de una leyenda lo que anteriormente fuera territorio de los motilones. Según cuenta la leyenda el agua que corre cristalina y juguetona no es otra cosa más que los retozos juveniles de la más bella y codiciada hija de un antiguo cacique, quien celoso de la belleza de la joven AHUSI y sospechnado que sus jóvenes súbditos codiciaban a la bella muchacha para desposarla, decidió pedir a uno de los brujos de la tribu que conjurara el peligro "convertiéndola en agua". Hasta la catarata se asciende desde la carretera por un bello sendero plagado de árboles de gran altura asi como pequeños arbustos que forman una vegetación tupida . Se observan variedades de pájaros como paucares, loros, shanshos, gallitos de las rocas (visible en época de apareamiento) y variedades de mariposas de colores e insectos.Durante el camino hacía la catarata, se encuentran significante mariposas grandes del genero Morpohosp de color azul.',
  },
  {
    nombre: 'LAGO SAUCE (LAGUNA AZUL)',
    lat: '-6.7143339',
    long: ' -76.2393579',
    departamento: 'SAN MARTIN',
    provincia: 'SAN MARTIN',
    distrito: 'SAUCE',
    categoria: 'SITIOS NATURALES',
    tipo: 'Cuerpo de Agua',
    subtipo: 'Laguna',
    horario: 'Todo el Año 8:00 am / 4:00 pm',
    ingreso: 'Libre',
    estado: 'El estado actual es regular, por que presenta problemas de contaminación de agroquimicas de cultivos de arroz aledaños a la laguna.',
    imagenes: [
      "img/laguna_azul/1.jpg",
      "img/laguna_azul/2.jpg",
      "img/laguna_azul/3.jpg",
      "img/laguna_azul/4.jpg",
      "img/laguna_azul/5.jpg",
      "img/laguna_azul/6.jpg",
      "img/laguna_azul/7.jpg",
    ],
    videos: [],
    rutas: [
      {
        tramo: "Tarapoto / Puerto López",
        acceso: "Terrestre",
        medio: "Automóvil Particular",
        via: "afirmado asfaltado",
        tiempo: "35 Km / 45´",
      },
      {
        tramo: "Puerto López / Cruce río Huallaga",
        acceso: "Lacustre / Fluvial",
        medio: "Balsa",
        via: "rio huallaga",
        tiempo: "200 m / 15´",
      },
      {
        tramo: "Cruce al río Huallaga / Sauce",
        acceso: "Terrestre",
        medio: "Automóvil Particular ",
        via: "Afirmado",
        tiempo: "Automóvil Particular",
      },
    ],
    actividades: [
      {
        actividad: "Natación",
        icono: "ion ion-waterdrop",
      },
      {
        actividad: "Observación de aves",
        icono: "ion ion-social-twitter",
      },
      {
        actividad: "Observación de flora",
        icono: "ion ion-leaf",
      },
      {
        actividad: "Observación de fauna",
        icono: "ion ion-ios-paw",
      },
      {
        actividad: "Toma de fotografías y filmaciones",
        icono: "ion ion-camera",
      },
    ],

    descripcion: 'El Lago Sauce, llamado también Laguna Azul, es un bello espejo de agua de 350 hectáreas ubicado a las orillas del pueblo del mismo nombre siendo actualmente el destino turístico más visitado de San Martín. Su primer nombre fue Laguna de Saucicocha, en razón de los arboles de Sauce, planta medicinal que abundaba y ahora ha desaparecido.La agradable temperatura del agua oscila entre los 25º C (77º F) a 28º C (82,4º F) y las hermosas tonalidades verduscas y azuladas que ésta toma por el reflejo del cielo y la abundante vegetación que la circunda , hacen de ella un lugar paradisiaco.Sus características son: Superficie 4´308,000 m2, Longitud máxima: 5,000 m. Profundidad: 37.5 m, Volumen Total: 79´806,147 m3 y situado a una altura de 700 m.s.n.m.Pintorescos albergues y alojamientos se ubican adyacentes a sus riberas lo que permite al visitante disfrutar de los bellos amaneceres a orillas del lago. El Caserío Dos de Mayo en una de sus orillas es también un paraje natural de mucho encanto. La laguna es hábitat de Fauna silvestre, aves: garzas, martín pescador, sachapatos, águilas, pescadoras, anfibios, reptiles, etc. y de Fauna acuática: peces (bujurcos, carachama, bagres y mojarras), crustáceos (camarón cangrejo); moluscos (churos, caracol de agua dulce y almejas). Además, se encuentran anfibios y reptiles. Está rodeado de pastizales y centros turísticos, así como el mismo centro poblado de Sauce, Caserío Dos de Mayo y también las instalaciones del Centro Piscícola Sauce del Ministerio de Pesquería. La laguna es hábitat de Fauna silvestre, aves: garzas, martín pescador, sachapatos, águilas, pescadoras, anfibios, reptiles, etc. y de Fauna acuática: peces (bujurcos, carachama, bagres y mojarras), crustáceos (camarón cangrejo); moluscos (churos, caracol de agua dulce y almejas). Además, se encuentran anfibios y reptiles. En su entorno se realiza actividades agrícolas: maíz, fríjol, plátano, yuca, árboles frutales como cítricos y últimamente arroz bajo riego, producción pecuaria como crianza de ganados vacuno, ovino, caballos y aves de corral (gallinas, patos, etc). La riquísima flora de este lugar es una de sus características, abundando variedades como la uña de gato o garabato bachuja, ajo sacha, ayahuasca, cola de caballo, chuchuhuasha, malva y paico. Esta laguna también es muy visitada porque en su lecho se encuentran las reconocidas perlas rosadas. Finalmente tiene uso como transporte vía lacustre, los pobladores utilizan desde canoas hasta botes a remo. Deslizadores de aluminio con motores fuera de borda (transporte de personas y carga). Para el embarque y desembarque existen puertos artesanales, con plataformas de madera con techos construidos de palma.La Laguna es propicia para la practica de la pesca, el sky, la navegación en bote motor, natación y vela, o simplemente balancearse en una hamaca al borde de este paraíso liquido circundado por una espesa jungla, hacen que esta laguna sea una tentación irresistible.',
  },
  {
    nombre: 'CASCADAS DE TUNUNTUNUMBA',
    lat: '-6.572887',
    long: ' -76.139926',
    departamento: 'SAN MARTIN',
    provincia: 'SAN MARTIN',
    distrito: 'CHAZUTA',
    categoria: 'SITIOS NATURALES',
    tipo: 'Caidas de agua',
    subtipo: 'Cataratas/Cascadas',
    horario: 'Todo el Año, de 8:00 am a 4:00pm',
    ingreso: 'Libre',
    estado: 'Regular ',
    imagenes: [
      "img/tununtunumba/1.jpg",
      "img/tununtunumba/3.jpg",
    ],
    videos: [],
    rutas: [
      {
        tramo: "Desde Tarapoto / Chazuta",
        acceso: "Terrestre",
        medio: "Automóvil Particular",
        via: "Asfaltado - Afirmado",
        tiempo: "40 Km / 2 horas",
      },
      {
        tramo: "Desde Chazuta / Catarata de Tununtunumba",
        acceso: "Terrestre",
        medio: "A pie",
        via: "Camino de herradura",
        tiempo: "9 km / 2 horas",
      },

    ],
    actividades: [
      {
        actividad: "Observación de flora",
        icono: "ion ion-leaf",
      },
      {
        actividad: "Observación de fauna",
        icono: "ion ion-ios-paw",
      },
      {
        actividad: "Toma de fotografías y filmaciones",
        icono: "ion ion-camera",
      },
      {
        actividad: "Natación",
        icono: "ion ion-waterdrop",
      },

    ],

    descripcion: 'De las alturas de las últimas montañas de la Cordillera Escalera la cascada está ubicada sobre la margen izquierda del río Huallaga, con una caída de agua espumeante y cristalina de más de 40 m de alto con 3 saltos de agua que se ubica a 280 msnm. En su base, el torrente de agua alcanza los 6 m de ancho y tiene una profundidad de 5 m, provocando un fuerte ruido que se p rcibe mucho antes de llegar a la catarata donde lleva un gran volumen de agua y es realmente impresionante, de está singularidad deriva el nombre. En la parte baja de la catarata, el agua forma algunos remansos. El paisaje es un ambiente característico de la selva baja, de exuberante vegetación de flora alimenticia y medicinal. La fauna es abundante en especies de aves, mariposas, insectos y algunos mamíferos pequeños. El clima es cálido.',
  },
  {
    nombre: 'CASCADAS DEL TAMUSHAL',
    lat: '-6.4394793',
    long: ' -76.3445508',
    departamento: 'SAN MARTIN',
    provincia: 'SAN MARTIN',
    distrito: 'TARAPOTO',
    categoria: 'SITIOS NATURALES',
    tipo: 'Caidas de agua',
    subtipo: 'Cataratas/Cascadas',
    horario: 'Todo el Año, Mañanas',
    ingreso: 'Costo de Entrada S/. 3.00, pero previo aviso a la Asociación de Flora y Fauna del Alto Shilcayo.',
    estado: 'Bueno ',
    imagenes: [
      "img/tamushal/1.jpg",
      "img/tamushal/2.jpg",
      "img/tamushal/3.jpg",
      "img/tamushal/4.jpg",
      "img/tamushal/5.jpg",
    ],
    videos: [],
    rutas: [
      {
        tramo: "Tarapoto/Cascadas de Tamushal",
        acceso: "Terrestre",
        medio: "A pie",
        via: "Camino de herradura",
        tiempo: "8.5 km / 2 horas y 30 minutos",
      },
    ],
    actividades: [
      {
        actividad: "Observación de aves",
        icono: "ion ion-social-twitter",
      },
      {
        actividad: "Observación de flora",
        icono: "ion ion-leaf",
      },
      {
        actividad: "Toma de fotografías y filmaciones",
        icono: "ion ion-camera",
      },
      {
        actividad: "Natación",
        icono: "ion ion-waterdrop",
      },

    ],

    descripcion: 'De formidables caídas de agua que desciende tempestuosamente por la Cordillera Escalera, estas aguas están rodeadas de naturaleza con árboles frondosos, brindando una escena natural espectacular. Está ubicada en el Área de Conservación Regional Cordillera Escalera. Presenta dos caídas de agua, la primera caída tiene una altura de 85 m con una poza de de 2 m de profundidad y la segunda caída se encuentra a una distancia de 100 m , tiene una altura de 40 m con una poza de 2.5m de profundidad que permite bañarse. Estás aguas nacen de las montañas del cerro escalera. Alrededor de ambas caídas se observan árboles, en el camino variedad de aves, mariposas, ranas y diversidad de flora. Las cataratas son conservadas por la Asociación de Conservacion de Flora y Fauna del Alto Shilcayo.',
  },
  {
    nombre: 'CASCADAS DE CARPISHUYACU',
    lat: '-6.572887',
    long: ' -76.139926',
    departamento: 'SAN MARTIN',
    provincia: 'SAN MARTIN',
    distrito: 'LA BANDA DE SHILCAYO',
    categoria: 'SITIOS NATURALES',
    tipo: 'Caidas de agua',
    subtipo: 'Cataratas/Cascadas',
    horario: 'Todo el Año 8.00 am - 5.00 p.m.',
    ingreso: 'Previo permiso, se debe coordinar con la Asoc.Ecológica Valles del Tiraco, Sector San José - Sr. Linder Tafur Cel. 950607125 - Pago directo S/. 5.00',
    estado: 'Regular, falta mejorar el acceso.',
    imagenes: [
      "img/carpishuyacu/1.jpg",
      "img/carpishuyacu/2.jpg",
      "img/carpishuyacu/3.jpg",
      "img/carpishuyacu/4.jpg",
    ],
    videos: [],
    rutas: [
      {
        tramo: "Tarapoto- Sector San José",
        acceso: "Terrestre",
        medio: "Automóvil Particular",
        via: "Asfaltado",
        tiempo: "35 KM - 60 minutos",
      },
      {
        tramo: "San José - Ingreso Cascadas de Carpishuyacu",
        acceso: "Terrestre",
        medio: "Automóvil Particular",
        via: "Asfaltado",
        tiempo: "2.5 KM - 10 minutos",
      },

    ],
    actividades: [
      {
        actividad: "Caminata o Treking",
        icono: "ion ion-android-walk",
      },
      {
        actividad: "Natación",
        icono: "ion ion-waterdrop",
      },
      {
        actividad: "Observación de aves",
        icono: "ion ion-social-twitter",
      },
      {
        actividad: "Observación de flora",
        icono: "ion ion-leaf",
      },
      {
        actividad: "Observación de fauna",
        icono: "ion ion-ios-paw",
      },
      {
        actividad: "Toma de fotografías y filmaciones",
        icono: "ion ion-camera",
      },
    ],

    descripcion: 'Las cascadas se encuentran dentro del Área de Conservación Regional Cordillera Escalera. Este hermoso recurso turístico, se ubica sobre un paisaje natural, rodeado de una extensa vegetación y árboles frondosos. Las cascadas de Carpishuyacu se encuentran compuestas por dos caídas de 6 metros cada una aproximadamente, la misma que forma una poza cuya profundidad es de 4 metros, lugar adecuado para bañarse y descansar ',
  },
  {
    nombre: 'CATARATAS DE PUCAYAQUILLO',
    lat: '-6.572887',
    long: ' -76.139926',
    departamento: 'SAN MARTIN',
    provincia: 'SAN MARTIN',
    distrito: 'SHAPAJA',
    categoria: 'SITIOS NATURALES',
    tipo: 'Caidas de agua',
    subtipo: 'Cataratas/Cascadas',
    horario: 'Todo el Año 8:00 am / 4:00 pm',
    ingreso: 'Libre',
    estado: 'Bueno',
    imagenes: [
      "img/pucayaquillo/1.jpg",
      "img/pucayaquillo/2.jpg",
      "img/pucayaquillo/3.jpg",
      "img/pucayaquillo/4.jpg",
      "img/pucayaquillo/5.jpg",
    ],
    videos: [],
    rutas: [
      {
        tramo: "plaza de tarapoto shapaja",
        acceso: "Terrestre",
        medio: "Automóvil Particular",
        via: "afirmado asfaltado",
        tiempo: "22 km / 30min.",
      },
      {
        tramo: "Pumarinrry - cataratas de pucayaquillo.",
        acceso: "Lacustre / Fluvial",
        medio: "Deslizador",
        via: "rio huallaga",
        tiempo: "10 km / 30 min.",
      },
      {
        tramo: "carretera shapaja/ cataratas pucayaquillo.",
        acceso: "Terrestre",
        medio: "A pie",
        via: "trocha corrosable",
        tiempo: "1 km / 45 min.",
      },


    ],
    actividades: [
      {
        actividad: "Caminata o Treking",
        icono: "ion ion-android-walk",
      },
      {
        actividad: "Observación de aves",
        icono: "ion ion-social-twitter",
      },
      {
        actividad: "Observación de flora",
        icono: "ion ion-leaf",
      },
      {
        actividad: "Observación de fauna",
        icono: "ion ion-ios-paw",
      },
      {
        actividad: "Toma de fotografías y filmaciones",
        icono: "ion ion-camera",
      },
    ],

    descripcion: 'Ubicada en Shapaja,y fue descubierto por los pobladores de la zona en el año 2000, se aprecia al fondo una fascinante vista de la naturaleza, en donde por el camino se aprecia dos afluencias de rios que son el rio mayo y el huallaga, es de singular caida de agua muy cristalina que discurren por una tupida vegetacion.tiene una altura de 330ms.n.m. y esta en la parte sur, y 975 metros. Se llega caminando por un plano de un monte secundario en lo cual hay muchos arboles tales tornillo ,cedro, ishpingo, capirona, pashaca, lianas, copal ,aceite de copaiva ,etc.Existen tambien hormigas como la izula venenosas, termitas , casas de avispas venenosas,hormigas laboriosas. la cataratas cuenta con una caida de 20 m. de altura y con una poza de 1 m.',
  },
  {
    nombre: 'CATARATA DE HUACAMAILLO',
    lat: '-6.4379578',
    long: ' -76.4249308',
    departamento: 'SAN MARTIN',
    provincia: 'SAN MARTIN',
    distrito: 'SAN ANTONIO',
    categoria: 'SITIOS NATURALES',
    tipo: 'Caidas de agua',
    subtipo: 'Cataratas/Cascadas',
    horario: 'Todo el Año, Mañanas',
    ingreso: 'Previa presentación de boleto o ticket. El costo de ingreso es de S/. 2.00 para (adultos y niños)',
    estado: 'Bueno',
    imagenes: [
      "img/huacamaillo/1.jpg",
      "img/huacamaillo/2.jpg",
      "img/huacamaillo/3.jpg",
      "img/huacamaillo/4.jpg",
      "img/huacamaillo/5.jpg",
      "img/huacamaillo/6.jpg",
    ],
    videos: [
      '<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fnomadasdelperu%2Fvideos%2F1804420476439426%2F&show_text=0&width=560" width="560" height="315" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>'
    ],
    rutas: [
      {
        tramo: "Desde el distrito de Tarapoto - San Antonio",
        acceso: "Terrestre",
        medio: "Automóvil Particular",
        via: "Afirmado",
        tiempo: "12 km / 25 minutos",
      },
      {
        tramo: "Distrito de San Antonio - Cataratas",
        acceso: "Terrestre",
        medio: "A pie",
        via: "Camino de herradura",
        tiempo: "4 km / 1 hora",
      },

    ],
    actividades: [
      {
        actividad: "Natación",
        icono: "ion ion-waterdrop",
      },
      {
        actividad: "Observación de aves",
        icono: "ion ion-social-twitter",
      },
      {
        actividad: "Observación de flora",
        icono: "ion ion-leaf",
      },
      {
        actividad: "Observación de fauna",
        icono: "ion ion-ios-paw",
      },
      {
        actividad: "Toma de fotografías y filmaciones",
        icono: "ion ion-camera",
      },
    ],

    descripcion: 'Ubicada al fondo de una fascinante quebrada que alimenta al río Cumbaza, uno de los tributarios del río Mayo. Es de singular caída de agua muy cristalina que discurre entre una tupida vegetación. Se llega caminando por el cauce de una pequeña quebrada del río Cumbaza, atravesando hasta 3 veces el río, y al llegar en la parte más alta se encuentra la catarata, cuenta con una caída de 20 m de altura que termina en un pozo cuya profundidad es 2 m. La vegetación existente es exuberante y típica de los bosques tropicales húmedos con variedad de helechos y orquídeas. Fácilmente pueden observarse variedad de aves y mariposas. Tiene una leyenda que alude a su nombre los lugareños cuentan que antiguamente este lugar se encontraba habitado por gran cantidad de guacamayos uno de los cuales fue muerto y al caer formó la catarata.En algunas ocasiones,cerca a las cataratas muy temprano se puede oir a las aves del guacamayo.',
  },
  {
    nombre: 'BAÑOS TERMALES DE PONGO ISLA',
    lat: '-6.415916',
    long: '-75.767285',
    departamento: 'SAN MARTIN',
    provincia: 'SAN MARTIN',
    distrito: 'HUIMBAYOC',
    categoria: 'SITIOS NATURALES',
    tipo: 'Aguas Minero Medicinales',
    subtipo: 'Aguas Termales',
    horario: 'Todo el Año 8 Am - 4 Pm',
    ingreso: 'Libre',
    estado: 'Regular. Se recomienda utilizar los servicios de un guía.',
    imagenes: [
      "img/pongo_isla/1.jpg",

    ],
    videos: [],
    rutas: [
      {
        tramo: "Distrito de Tarapoto / Distrito de Chazuta",
        acceso: "Terrestre",
        medio: "Automóvil Particular",
        via: "Asfaltado - Afirmado",
        tiempo: "40 km / 2 horas",
      },
      {
        tramo: "Distrito de Chzuta / Pueblo Achinamiza",
        acceso: "Lacustre / Fluvial",
        medio: "Otro (especificar el tipo)",
        via: "A bote motor por el río Huallaga",
        tiempo: "45 km / 1 hora y 30 minutos",
      },
      {
        tramo: "Pueblo Achinamiza / Baños Termales Achinamiza",
        acceso: "Terrestre",
        medio: "A pie",
        via: "Camino de herradura",
        tiempo: "50 m / 30 minutos",
      },


    ],
    actividades: [
      {
        actividad: "Observación de aves",
        icono: "ion ion-social-twitter",
      },
      {
        actividad: "Observación de flora",
        icono: "Observación de flora",
      },
      {
        actividad: "Toma de fotografías y filmaciones",
        icono: "ion ion-camera",
      },
    ],

    descripcion: 'Nace en la parte medio de un cerro rocoso y se desliza diseminándose en un área de 100 m2. El agua mineralizada (nitrato ferroso y azufre) brota del subsuelo en varios puntos de afloramiento con una temperatura que alcanza los 40° C; la caída es de 2m. apto para bañarse y discurre por el río Huallaga; a demás aguas calientes y aguas frías en medio de pequeñas y espaciadas formaciones colinosas que se derivan de la Cordillera Escalera. El paisaje flanquea este paraje de tupida vegetación; flora alimenticia sustento de la población y flora medicinal de fácil acopio. El ambiente característico de la selva baja, clima cálido temperatura promedio de 27º C. Y está rodeada de vegetación y montañas vírgenes, donde se puede observar aves, mamíferos, insectos y mariposas, que nos acompañan la permanencia en el lugar.Es puerta de entrada a la llanura amazonica.Ubicado a 41 Km. al sur de la ciudad de Tarapoto, se encuentra a 260 msnm, a 6°36¿15¿ de latitud sur y 76°10¿30¿ longitud oeste. Reconocida con Resolución de Alcaldía N° 031-2012-A/MDH, de fecha 23.07.2012.',
  },
  {
    nombre: 'BAÑOS TERMALES DE SAN JOSÉ',
    lat: '-6.415916',
    long: '-75.767285',
    departamento: 'SAN MARTIN',
    provincia: 'SAN MARTIN',
    distrito: 'LA BANDA DE SHILCAYO',
    categoria: 'SITIOS NATURALES',
    tipo: 'Aguas Minero Medicinales',
    subtipo: 'Aguas Termales',
    horario: 'Todo el Año 9am-4pm',
    ingreso: 'Libre',
    estado: 'Bueno',
    imagenes: [
      "img/san_jose/1.jpg",
    ],
    videos: [],
    rutas: [
      {
        tramo: "Tarapoto/ Caserio San José",
        acceso: "Terrestre",
        medio: "Automóvil Particular",
        via: "Carretera asfaltado",
        tiempo: "35 km / 60min",
      },
      {
        tramo: "Caserio San José/Aguas Termales de San José",
        acceso: "Terrestre",
        medio: "Combi",
        via: "Carretera asfaltada",
        tiempo: "2.5 km/ 10 min",
      },
      {
        tramo: "Entrada Aguas Termales de San José",
        acceso: "Terrestre",
        medio: "A pie",
        via: "Trocha",
        tiempo: "3km /15 min",
      },


    ],
    actividades: [
      {
        actividad: "Observación de aves",
        icono: "ion ion-social-twitter",
      },
      {
        actividad: "Observación de flora",
        icono: "ion ion-leaf",
      },
      {
        actividad: "Observación de fauna",
        icono: "ion ion-ios-paw",
      },
      {
        actividad: "Toma de fotografías y filmaciones",
        icono: "ion ion-camera",
      },
    ],

    descripcion: 'En el kilómetro 34 de la carretera Tarapoto - Yurimaguas se encuentra el Caserío de San José, desde allí se inicia un recorrido, por la misma carretera hasta llegar a la entrada que lleva al recurso turístico: Aguas Termales de San José, desde la entrada se realiza una caminata cuesta abajo hasta llegar al río Caynarachi, allí se encuentra las Aguas Termales de San José, que es un chorro de agua de 45ºC, de color anaranjada y olor a azufre, sus aguas nacen de entre las rocas de los cerros adyacentes y discurren en el río Caynarachi, en donde tambien se puede observar una poza de aguas cristalinas, además el lugar es habitad de diferentes especies de flora y fauna tales como: ranas, mariposas, orquídeas, osos perezosos, aves, plantas maderables entre otros.Aparte de tener el chorro de agua termal, también tiene una poza de aguas cristalinas en donde se puede tomar un refrescante baño.El recurso presenta alrededores diversidad de árboles, y también en el chorro del cerro se encuentra una construcción de una poza pequeña, por el borde del recurso. Y las aguas son comprobadamente medicinales,  especialmente para enfermedades reumáticas. Reconocido con Resolución Gerencial de Alcaldía N° 433-2012-MDBSH, de fecha 23.11.12.',
  },
  {
    nombre: 'BAÑOS TERMALES Y SULFUROSOS DE CHAZUTAYACU',
    lat: '-6.572887',
    long: ' -76.139926',
    departamento: 'SAN MARTIN',
    provincia: 'SAN MARTIN',
    distrito: 'CHAZUTA',
    categoria: 'SITIOS NATURALES',
    tipo: 'Aguas Minero Medicinales',
    subtipo: 'Aguas Termales',
    horario: 'Todo el Año Todo el día',
    ingreso: 'Libre',
    estado: 'Bueno, se recomienda servicio de guía.',
    imagenes: [
      "img/chazutayacu/1.jpg",
    ],
    videos: [],
    rutas: [
      {
        tramo: "Tarapoto / Chazuta",
        acceso: "Terrestre",
        medio: "Automóvil Particular",
        via: "Asfaltado / Afirmado",
        tiempo: "42 km / 1.5 horas",
      },
      {
        tramo: "Chazuta / Baños de Chazutayacu",
        acceso: "Lacustre / Fluvial",
        medio: "Bote",
        via: "Camino de herradura",
        tiempo: "2 km / 2 horas",
      },
    ],
    actividades: [
      {
        actividad: "Observación de flora",
        icono: "ion ion-leaf",
      },
      {
        actividad: "Observación de fauna",
        icono: "ion ion-ios-paw",
      },
      {
        actividad: "Toma de fotografías y filmaciones",
        icono: "ion ion-camera",
      },
    ],

    descripcion: 'Brote de agua subterránea que aflora en un cerro de pendiente abrupta. El flujo de aguas se da en forma de pequeñas cascadas dentro de un área de 400 m2, las cuales, al final de su recorrido, confluyen en una poza de 16 m2 y tiene una profundidad de 5 m. La temperatura de sus aguas alcanza los 40 ºc. Y su aspecto es turbio lechoso con un alto contenido de azufre. Los lugareños utilizan estas aguas como relajantes y para aliviar males en los huesos. El lugar se encuentra rodeado de una profusa vegetación típica de selva alta. Ubicado a 41 Km. al sur de la ciudad de Tarapoto, se encuentra a 260 msnm, a 6 grados 36 minutos 15 segundos de latitud sur y 76 grados 10 minutos 30 segundos longitud oeste.',
  },
  {
    nombre: 'CASCADA DE JULIAN PAMPA',
    lat: '-6.572887',
    long: ' -76.139926',
    departamento: 'SAN MARTIN',
    provincia: 'SAN MARTIN',
    distrito: 'TARAPOTO',
    categoria: 'SITIOS NATURALES',
    tipo: 'Caidas de agua',
    subtipo: 'Cataratas/Cascadas',
    horario: 'Todo el Año, Mañanas',
    ingreso: 'Previa presentación de boleto o ticket Entrada es de S/. 3.00',
    estado: 'Bueno ',
    imagenes: [
      "img/chazutayacu/1.jpg",
    ],
    videos: [],
    rutas: [
      {
        tramo: "Tarapoto/ Tambo Tamushal",
        acceso: "Terrestre",
        medio: "A pie",
        via: "Camino de Herradura",
        tiempo: "8.5 km /2 horas y 30 minutos",
      },
      {
        tramo: "Tambo Tamushal / Tambo Julian Pampa",
        acceso: "Terrestre",
        medio: "A pie",
        via: "Camino de Herradura",
        tiempo: "4 km / 1 hora",
      },
      {
        tramo: "Tambo Julian Pampa",
        acceso: "Terrestre",
        medio: "A pie",
        via: "Camino de Herradura",
        tiempo: "Tambo Julian Pampa",
      },
    ],
    actividades: [
      {
        actividad: "Natación",
        icono: "ion ion-waterdrop",
      },

    ],

    descripcion: 'Está ubicado en la zona de amortiguamiento del área de conservación Regional Cordillera Escalera en plena belleza natural de arboles gigantes, helechos y orquídeas. Cuenta con una caída de agua de 50 m de altura aprox. La base rocosa por dónde cae el agua, se forma como un espejo de agua pequeña de 1 m de profundidad. Está agua nace de las montañas del cerro escalera. En el camino hacía el recurso se puede observar variedad de aves, flora y fauna. La cascada está protegida y conservada por la Asociación de Flora y fauna.',
  },
  {
    nombre: 'CASCADA DEL VINOYACU',
    lat: '-6.572887',
    long: ' -76.139926',
    departamento: 'SAN MARTIN',
    provincia: 'SAN MARTIN',
    distrito: 'LA BANDA DE SHILCAYO',
    categoria: 'SITIOS NATURALES',
    tipo: 'Caidas de agua',
    subtipo: 'Cataratas/Cascadas',
    horario: 'Todo el Año, Mañanas',
    ingreso: 'Previa presentación de boleto o ticket Entrada es de S/. 3.00',
    estado: 'Bueno ',
    imagenes: [
      "img/vinoyacu/1.jpg",
    ],
    videos: [],
    rutas: [
      {
        tramo: "Tarapoto/Cascada Vinoyacu",
        acceso: "Terrestre",
        medio: "Automóvil Particular",
        via: "Camino de Herradura",
        tiempo: "18 km / 6 horas",
      },

    ],
    actividades: [
      {
        actividad: "Natación",
        icono: "ion ion-waterdrop",
      },

    ],

    descripcion: 'En el centro del bosque se encuentran la Cascada del Vinoyacu, que vienen de las altas montañas; la coloración se produce por la mezcla de antocianina (sustancia contenida en las plantas que allí se encuentran) con el material ferruginoso que se desprende de las aguas, el cual irradian el color tinto del agua. La altura de la caída de agua es de 45m y tiene una poza 1m profundidad dónde se puede bañar. Las aguas caen de un pequeño cerro que tiene una forma de media luna. El lugar dónde se encuentra está cascada es un ambiente de poca luz debido a los árboles frondosos que se encuentran alrededor de la cascada. Durante el camino hacia la cascada se puede observar la belleza paisajística de selva alta, donde se pueden observar la variedad de contrastes. está ubicada a 18 km. de la selva nororiental peruana, a 06°31¿30¿¿ de latitud sur y 76°21¿50¿¿ de longitud oeste. Se asienta en la ladera occidental del cerro Escalera, en la cordillera Azul. Se recomienda la visita con un guia local. Reconocida con Resolución Gerencial de Alcaldía N° 433-2012-MDBSH, de fecha 23.11.12.',
  },
  {
    nombre: 'CASCADA LÁGRIMAS DE LA NOVIA',
    lat: '-6.572887',
    long: ' -76.139926',
    departamento: 'SAN MARTIN',
    provincia: 'SAN MARTIN',
    distrito: 'LA BANDA DE SHILCAYO',
    categoria: 'SITIOS NATURALES',
    tipo: 'Caidas de agua',
    subtipo: 'Cataratas/Cascadas',
    horario: 'Todo el Año, de 8:00 am a 4:00pm',
    ingreso: 'Libre',
    estado: 'Bueno ',
    imagenes: [
      "img/lagrima_novia/1.jpg",
    ],
    videos: [],
    rutas: [
      {
        tramo: "Tarapoto/ Entrada a la Cascada",
        acceso: "Terrestre",
        medio: "Automóvil Particular",
        via: "Asfaltado",
        tiempo: "30 km / 40 minutos",
      },
      {
        tramo: "Entrada la cascada / Cascada Lagrimas de la Novia",
        acceso: "Terrestre",
        medio: "Automóvil Particular",
        via: "Camino de herradura",
        tiempo: "100 m/ 05 minutos",
      },
      {
        tramo: "Entrada a la Cascada-Cascada Lagrimas de la Novia",
        acceso: "Terrestre",
        medio: "A pie",
        via: "Camino de herradura",
        tiempo: "100m/10 minutos",
      },
    ],
    actividades: [
      {
        actividad: "Natación",
        icono: "ion ion-waterdrop",
      },

    ],

    descripcion: 'El lugar de partida para el recorrido al Caserío de San José, se inicia con una caminata de 5 min. Al ascenso del alrededor del encañado de la cascada Lágrimas de la novia, presenta una cadena de 4 caídas de agua. Tiene una altura de 5 metros de longitud y cuenta con una poza de agua y una profundidad de 1.5 m. sus aguas son de color oscuras por el color de las piedras, también podrá acogerse bajo la sombra de los frondosos árboles que allí se encuentran. Un Espejo de agua apta para disfrutar de un buen baño refrescante. Se encuentra con una altura de 303 m.s.n.m. El recurso tiene bosque tropical, con bastante vegetación, y la alta humedad acumulada en el suelo ha creado un microclima que favorece el crecimiento de musgos y helechos entre las ramas de los arbustos. El recurso tiene bosque tropical, con bastante vegetación, y la alta humedad acumulada en el suelo ha creado un microclima que favorece el crecimiento de musgos y helechos entre las ramas de los arbustos.',
  },
  {
    nombre: 'CATARATA TRES MARÍAS',
    lat: '-6.572887',
    long: ' -76.139926',
    departamento: 'SAN MARTIN',
    provincia: 'SAN MARTIN',
    distrito: 'TARAPOTO',
    categoria: 'SITIOS NATURALES',
    tipo: 'Caidas de agua',
    subtipo: 'Cataratas/Cascadas',
    horario: 'Todo el Año, Mañanas',
    ingreso: 'Previa presentación de boleto o ticket. Costo de entrada S/. 3.00',
    estado: 'Bueno',
    imagenes: [
      "img/tres_marias/1.jpg",
    ],
    videos: [],
    rutas: [
      {
        tramo: "Tarapoto/ Catarata Tres Marías",
        acceso: "Terrestre",
        medio: "Automóvil Particular",
        via: "Camino de Herradura",
        tiempo: "15 km/ 30 min",
      },


    ],
    actividades: [
      {
        actividad: "Natación",
        icono: "ion ion-waterdrop",
      },
      {
        actividad: "Observación de aves",
        icono: "ion ion-social-twitter",
      },
      {
        actividad: "Observación de flora",
        icono: "ion ion-leaf",
      },
      {
        actividad: "Observación de fauna",
        icono: "ion ion-ios-paw",
      },
      {
        actividad: "Toma de fotografías y filmaciones",
        icono: "ion ion-camera",
      },
    ],

    descripcion: 'Desde la parte alta de las montañas se encuentra está impresionante catarata de 3 caídas de agua, la primera caída solo se le puede observar desde lo alto cuenta con una altura de 60 m, luego va cayendo estas mismas agua para formar la segunda caída, que cae sobre las piedras que se encuentran en forma plana, pero que no forma poza para bañar, sino las aguas caen como si fuera una ducha. Y está misma agua discurre para forma la tercera caída de una altura de 45 m, que cuenta con un pozo pequeño de 1 m de profundidad.Está catarata está bajo el cuidado de la Asociación Flora y Fauna.',
  },
  {
    nombre: 'MIRADOR NATURAL CORDILLERA ESCALERA',
    lat: '-6.4033622',
    long: '-76.3035644',
    departamento: 'SAN MARTIN',
    provincia: 'SAN MARTIN',
    distrito: 'TARAPOTO',
    categoria: 'SITIOS NATURALES',
    tipo: 'Lugares Pintorescos',
    subtipo: 'Mirador Natural',
    horario: 'Todo el Año, Mañanas',
    ingreso: 'Previa presentación de boleto o ticket. Costo de entrada S/. 3.00',
    estado: 'Regular, actualmente, se encuentra fuertemente amenazada por procesos de deforestación que a la fecha la región San Martín presenta un área deforestada anual de 57 521 hectáreas.',
    imagenes: [
      "img/mirador_cordillera/1.jpg",
      "img/mirador_cordillera/2.jpg",
      "img/mirador_cordillera/3.jpg",
    ],
    videos: [],
    rutas: [
      {
        tramo: "Tarapoto/ Mirador Natural",
        acceso: "Terrestre",
        medio: "A pie",
        via: "Camino de Herradura",
        tiempo: "30 km / 8 horas",
      },

    ],
    actividades: [
      {
        actividad: "Caminata o Treking",
        icono: "ion ion-android-walk",
      },
      {
        actividad: "Natación",
        icono: "ion ion-waterdrop",
      },
      {
        actividad: "Observación de aves",
        icono: "ion ion-social-twitter",
      },
      {
        actividad: "Observación de flora",
        icono: "ion ion-leaf",
      },
      {
        actividad: "Observación de fauna",
        icono: "ion ion-ios-paw",
      },
      {
        actividad: "Toma de fotografías y filmaciones",
        icono: "ion ion-camera",
      },
    ],

    descripcion: 'Las cascadas se encuentran dentro del Área de Conservación Regional Cordillera Escalera. Este hermoso recurso turístico, se ubica sobre un paisaje natural, rodeado de una extensa vegetación y árboles frondosos. Las cascadas de Carpishuyacu se encuentran compuestas por dos caídas de 6 metros cada una aproximadamente, la misma que forma una poza cuya profundidad es de 4 metros, lugar adecuado para bañarse y descansar ',
  },
  {
    nombre: 'URNAS FUNERARIA DE CHAZUTA',
    lat: '-6.5734908',
    long: ' -76.1349668',
    departamento: 'SAN MARTIN',
    provincia: 'SAN MARTIN',
    distrito: 'CHAZUTA',
    categoria: 'MANIFESTACIONES CULTURALES',
    tipo: 'Museo y otros (Pinacoteca)',
    subtipo: 'Museo y Otros (Pinacoteca)',
    horario: 'Todo el Año Todo el dia',
    ingreso: 'Previa presentación de boleto o ticket. Los tickets se emiten en la Municipalidad de Chazuta S/. 3.00',
    estado: 'Se encuentra en buen estado, ya que cuenta con infraestructura el cual permite su conservación.',
    imagenes: [
      "img/urnas_chazuta/1.jpg",
      "img/urnas_chazuta/2.jpg",
      "img/urnas_chazuta/3.jpg",
      "img/urnas_chazuta/4.jpg",
    ],
    videos: [],
    rutas: [
      {
        tramo: "Tarapoto/ Chazuta",
        acceso: "Terrestre",
        medio: "Automóvil Particular",
        via: "Afirmado",
        tiempo: "a 42 km/ 1.5 horas",
      },
      {
        tramo: "desde la plaza de Chazuta/urnas Funerarias",
        acceso: "Terrestre",
        medio: "A pie",
        via: "Afirmado",
        tiempo: "100mts/5min.",
      },


    ],
    actividades: [
      {
        actividad: "Caminata o Treking",
        icono: "ion ion-android-walk",
      },
      {
        actividad: "Natación",
        icono: "ion ion-waterdrop",
      },
      {
        actividad: "Observación de aves",
        icono: "ion ion-social-twitter",
      },
      {
        actividad: "Observación de flora",
        icono: "ion ion-leaf",
      },
      {
        actividad: "Observación de fauna",
        icono: "ion ion-ios-paw",
      },
      {
        actividad: "Toma de fotografías y filmaciones",
        icono: "ion ion-camera",
      },
    ],

    descripcion: 'Las cascadas se encuentran dentro del Área de Conservación Regional Cordillera Escalera. Este hermoso recurso turístico, se ubica sobre un paisaje natural, rodeado de una extensa vegetación y árboles frondosos. Las cascadas de Carpishuyacu se encuentran compuestas por dos caídas de 6 metros cada una aproximadamente, la misma que forma una poza cuya profundidad es de 4 metros, lugar adecuado para bañarse y descansar ',
  },
];


