

var survivalequip = angular.module('survivalequip', ['ui.bootstrap', 'backand', 'uiGmapgoogle-maps']);
survivalequip.config(function (BackandProvider, uiGmapGoogleMapApiProvider) {
    BackandProvider.setAppName('salesmap');
    BackandProvider.setSignUpToken('2c6b888d-8ed7-4d1a-a6a7-5862f18d8650');
    BackandProvider.setAnonymousToken('97499c88-a25a-442a-8981-f0786f342e9d');

    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyA5TZNVFH4tm0GXFaJBtHgwQ4U0EvDsN3w',
        libraries: 'weather,geometry,visualization'
    });
})

survivalequip.controller('productsCtrl', function ($scope, $http, $rootScope, $timeout, Backand, uiGmapGoogleMapApi) {


    $rootScope.marker = [];



    $rootScope.map = {
        center: {
            latitude: -1.292066,
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
            editable: false,
            draggable: false,
            geodesic: true,
            visible: true,
        }
    ];






    $scope.users = [];
    $http({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/objects/users',
    })
        .then(function (res) {
            $scope.users = res.data.data;
            //  console.log(res.data.data);
        })
        .catch(function (err) {
        });

    $scope.changedDate = function () {
        var longDate = $scope.selectedDate;
        var shortDate = longDate.toLocaleDateString();
        var cleanDate = moment(shortDate).format("YYYY-MM-DD")
        $rootScope.cleanDate = cleanDate;
    }

    $scope.userSelected = function (person) {

        var date = $rootScope.cleanDate;
        var uid = person.id;
        $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/query/data/getByUidAndDate',
            params: {
                parameters: {
                    date: date,
                    user_id: uid
                }
            }
        })
            .then(function (res) {

         $rootScope.marker = [];
        $rootScope.poly[0].path = [];
                        
                var data = res.data;
                var length = res.data.length;

                for (x = 0; x < length; x++) {

                    $rootScope.poly[0].path.push(data[x]);
                    $rootScope.marker.push(data[x])
                
                    var newCenter = $rootScope.poly[0].path[1];
                    var s = JSON.stringify(newCenter);
                    sessionStorage.setItem("center", s);
                }

                var cent = sessionStorage.getItem("center");
                var cleanCen = JSON.parse(cent);
                //console.log(cleanCen);

                $rootScope.map.center = null;
                $rootScope.map.center = cleanCen;
            });


    }






})