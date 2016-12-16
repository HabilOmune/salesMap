

var survivalequip = angular.module('survivalequip', ['ui.bootstrap', 'backand','uiGmapgoogle-maps']);
  survivalequip.config(function (BackandProvider,uiGmapGoogleMapApiProvider) {
      BackandProvider.setAppName('salesmap');
      BackandProvider.setSignUpToken('2c6b888d-8ed7-4d1a-a6a7-5862f18d8650');
      BackandProvider.setAnonymousToken('97499c88-a25a-442a-8981-f0786f342e9d');

    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyA5TZNVFH4tm0GXFaJBtHgwQ4U0EvDsN3w',
        libraries: 'weather,geometry,visualization'
    });
  })

survivalequip.controller('productsCtrl', function ($scope, $http, $rootScope, $timeout,Backand,uiGmapGoogleMapApi) {

$scope.map = { 
    center: {
         latitude:-1.292066,
         longitude: 36.821946
         },
          zoom: 15
         };


$rootScope.poly = [
            {
                id: 1,
               path: [],
                stroke: {
                    color: '#6060FB',
                    weight: 3
                },
                editable: true,
                draggable: true,
                geodesic: true,
                visible: true,
                icons: [{
                    icon: {
                        path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                    },
                    offset: '25px',
                    repeat: '50px'
                }]
            }
        ];






 $scope.polylines = [
            {
                id: 1,
                path: [
                    {
                        latitude: -1.292686,
                        longitude: 36.820963
                    },
                    {
                        latitude: -1.292140,
                        longitude: 36.822599
                    },
                    {
                        latitude: -1.291442,
                        longitude: 36.823457
                    }
                ],
                stroke: {
                    color: '#6060FB',
                    weight: 3
                },
                editable: true,
                draggable: true,
                geodesic: true,
                visible: true,
                icons: [{
                    icon: {
                        path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                    },
                    offset: '25px',
                    repeat: '50px'
                }]
            }
        ];



console.log($scope.polylines)

 $scope.users = [];
 $http ({
  method: 'GET',
  url: Backand.getApiUrl() + '/1/objects/users',
})
  .then(function(res){
      $scope.users = res.data.data;
    //  console.log(res.data.data);
  })
  .catch(function(err){
      
  });

$scope.changedDate = function(){   
    var longDate = $scope.selectedDate;
    var shortDate = longDate.toLocaleDateString();
    var cleanDate = moment(shortDate).format("YYYY-MM-DD")
    $rootScope.cleanDate = cleanDate;
}

$scope.userSelected = function(person){

    var date = $rootScope.cleanDate;
    var uid = person.id;

 $http ({
  method: 'GET',
  url: Backand.getApiUrl() + '/1/query/data/getByUidAndDate',
  params: {
    parameters: {
      date: date,
      user_id: uid
    }
  }
})
.then(function(res){

$rootScope.poly[0].path = [];
var data = res.data;
var length = res.data.length;
for(x=0 ;x<length ;x++)
{

$rootScope.poly[0].path.push(data[x]);
}


console.log($rootScope.poly)

});


}


})