'use strict';
var GuaApp = angular.module('GuaApp', [
	'ionic','google-maps','angular-carousel', 'LocalStorageModule']);

var lat, lng;
/**
 * Routing table including associated controllers.
 */
GuaApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('menu', {url: "/map", abstract: true, templateUrl: "view/menu.html"})
		.state('menu.home', {url: '/home', views: {'menuContent': {templateUrl: 'view/gpsView.html', controller: 'GpsCtrl'} }  })
		.state('menu.area', {url: '/area', views: {'menuContent': {templateUrl: 'view/areaView.html', controller: 'AreaCtrl'} }  })
		.state('menu.info', {url: '/info', views: {'menuContent': {templateUrl: 'view/infoView.html', controller: 'InfoCtrl'} }  })
		.state('menu.search', {url: '/search', views: {'menuContent': {templateUrl: 'view/searchView.html', controller: 'SearchCtrl'} }  })

		.state('menu.tentang', {url: '/info/tentang', views: {'menuContent': {templateUrl: 'view/tentangGua.html', controller: 'TentangCtrl'} }  })

		.state('menu.jenis', {url: '/info/jenis', views: {'menuContent': {templateUrl: 'view/jenisGua.html', controller: 'JenisCtrl'} }  })
		.state('menu.descJenis', {url: '/info/jenis/:id', views: {'menuContent': {templateUrl: 'view/descJenis.html', controller: 'descJenisCtrl'} }  })

		.state('menu.alat', {url: '/info/alat', views: {'menuContent': {templateUrl: 'view/alatView.html', controller: 'AlatCtrl'} }  })
		.state('menu.descAlat', {url: '/info/alat/:id', views: {'menuContent': {templateUrl: 'view/descAlat.html', controller: 'descAlatCtrl'} }  })

		.state('menu.tingkat', {url: '/info/tingkat', views: {'menuContent': {templateUrl: 'view/tingkatView.html', controller: 'TingkatCtrl'} }  })

		.state('menu.biota', {url: '/info/biota', views: {'menuContent': {templateUrl: 'view/biotaView.html', controller: 'BiotaCtrl'} }  })
		.state('menu.biotaView', {url:'/info/biota/:id', views:{'menuContent':{templateUrl: 'view/fullBiotaView.html', controller:'FullBiotaCtrl'} } })

		.state('menu.perarea', {url: '/area/:id', views: {'menuContent': {templateUrl: 'view/GuaView.html', controller: 'GuaCtrl'} }  })

		.state('menu.showsearch', {url: '/search/:id', views: {'menuContent': {templateUrl: 'view/GuaView_.html', controller: 'GuaViewCtrl'} }  })
		.state('menu.showlocation', {url: '/home/:id', views: {'menuContent': {templateUrl: 'view/GuaView_.html', controller: 'GuaViewCtrl'} }  })

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/map/home');
}]);


/**
 * HEADER - handle menu toggle
 */
GuaApp.controller('HeaderCtrl', function($scope) {
	// Main app controller, empty for the example
	$scope.leftButtons = [
		{ 
		type: 'button-clear',
		content: '<i class="icon ion-navicon"></i>',
		tap: function(e) {
			$scope.sideMenuController.toggleLeft();
			}
		}
	];
});


/**
 * MAIN CONTROLLER - handle inapp browser
 */
GuaApp.controller('MainCtrl', function($scope, $ionicActionSheet){
    document.addEventListener("menubutton", onPressMenu, false);

    function onPressMenu(){
        $scope.showMenu();
    }
	
	$scope.showMenu = function(){
		var action = $ionicActionSheet.show({
			buttons: [
				{ text: '<b>Share</b> This'},
				{ text: 'Move'}
			],
			destrunctiveText: 'Delete',
			titleText: 'Modify your album',
			cancelText: 'Cancel',
			buttonClicked: function(index){
				return true;
			}
		});
	};
});

/**
 * MAIN CONTROLLER - handle inapp browser
 */
GuaApp.controller('TentangCtrl', function($scope, $http, $ionicLoading, $timeout){
	$scope.showLoading = function(){
		$scope.loadingIndicator = $ionicLoading.show({
			content: "Loading",
			animation: "fade-in",
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 100
		});
	};

	$http({
		url:"http://gua.antonwibisono.com/api/public/aboutus/",
		apiToken: "434refce",
		dataType: "json",
		method:'POST'		
	}).success(function(data){
		$scope.about = data.data;
		$timeout(function(){
			$scope.loadingIndicator.hide();
		}, 100);		
	});
});

/**
 * MAIN CONTROLLER - handle inapp browser
 */
GuaApp.controller('JenisCtrl', function($scope, $http, $ionicLoading, $timeout){
	$scope.showLoading = function(){
		$scope.loadingIndicator = $ionicLoading.show({
			content: "Loading",
			animation: "fade-in",
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 100
		});
	};

	$http({
		url:"http://gua.antonwibisono.com/api/public/getcavetype/",
		apiToken: "434refce",
		dataType: "json",
		method:'POST'
	}).success(function(data){
		$scope.jeniss = data.data;
		$timeout(function(){
			$scope.loadingIndicator.hide();
		}, 100);
	});
});

GuaApp.controller('descJenisCtrl', function($scope, $stateParams, $http, $ionicLoading, $timeout){
	
	$scope.showLoading = function(){
		$scope.loadingIndicator = $ionicLoading.show({
			content: "Loading",
			animation: "fade-in",
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 100
		});
	};

	var id = $stateParams.id;
	$http({
		url:"http://gua.antonwibisono.com/api/public/getcavetype/",
		apiToken: "434refce",
		dataType: "json",
		method:'POST'
	}).success(function(data){
		var temp = data.data;
		for(var x = 0, length = temp.length; x < length; x++){
			if(temp[x].id == id){
				$scope.jenisDescs = temp[x];
			}
		}
		$timeout(function(){
			$scope.loadingIndicator.hide();
		}, 100);
	});
});

/**
 * MAIN CONTROLLER - handle inapp browser
 */
GuaApp.controller('AlatCtrl', function($scope, $http, $ionicLoading, $timeout){
	
	// if(localStorageService.isSupported){
	// 	if(!localStorageService.get("alat")){
	// 		$http({
	// 			url:"http://gua.antonwibisono.com/api/public/getgearstype/",
	// 			apiToken: "434refce",
	// 			dataType: "json",
	// 			method:'POST'
	// 		}).success(function(data){
	// 			localStorageService.set('alat', data);
	// 			$scope.alats = localStorageService.get('alat');
	// 		});
	// 	} else{
	// 		var tempAlat = localStorageService.get('alat');
	// 		var now = new Date().getTime();
	// 		console.log(now);
	// 		console.log(tempAlat.lastmodified);
	// 		$scope.alats = localStorageService.get('alat');
	// 	}
	// }else{
	// 	$http({
	// 		url:"http://gua.antonwibisono.com/api/public/getgearstype/",
	// 		apiToken: "434refce",
	// 		dataType: "json",
	// 		method:'POST'
	// 	}).success(function(data){
	// 		$scope.alats = data.data;
	// 	})
	// }

	$scope.showLoading = function(){
		$scope.loadingIndicator = $ionicLoading.show({
			content: "Loading",
			animation: "fade-in",
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 100
		});
	};

	$http({
		url:"http://gua.antonwibisono.com/api/public/getgearstype/",
		apiToken: "434refce",
		dataType: "json",
		method:'POST'
	}).success(function(data){
		$scope.alats = data.data;
		$timeout(function(){
			$scope.loadingIndicator.hide();
		}, 100);
	});
	
});

GuaApp.controller('descAlatCtrl', function($http, $scope, $stateParams, $ionicLoading, $timeout){
	$scope.showLoading = function(){
		$scope.loadingIndicator = $ionicLoading.show({
			content: "Loading",
			animation: "fade-in",
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 100
		});
	};

	var id = $stateParams.id;
	$http({
		url:"http://gua.antonwibisono.com/api/public/getgearstype/",
		apiToken: "434refce",
		dataType: "json",
		method:'POST'
	}).success(function(data){
		var temp = data.data;
		for(var x = 0, length = temp.length; x < length; x++){
			if(temp[x].id == id){
				$scope.alats = temp[x];
			}
		}
		$timeout(function(){
			$scope.loadingIndicator.hide();
		}, 100);
	});

});

/**
 * MAIN CONTROLLER - handle inapp browser
 */
GuaApp.controller('TingkatCtrl', function($scope, $http){
	$scope.tingkats = [];

	$http({
		url:"http://gua.antonwibisono.com/api/public/getdificultytype/",
		apiToken: "434refce",
		dataType: "json",
		method:'POST'
	}).success(function(data){
		$scope.tingkats = data.data;
	});
});

/**
 * MAIN CONTROLLER - handle inapp browser
 */
GuaApp.controller('BiotaCtrl', function($scope, $http, $ionicLoading, $timeout){
	$scope.showLoading = function(){
		$scope.loadingIndicator = $ionicLoading.show({
			content: "Loading",
			animation: "fade-in",
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 100
		});
	};

	$http({
		url:"http://gua.antonwibisono.com/api/public/getbiotatype/",
		apiToken: "434refce",
		dataType: "json",
		method:'POST'
	}).success(function(data){
		$scope.biotas = data.data;
		$timeout(function(){
			$scope.loadingIndicator.hide();
		}, 100);
	});
});

GuaApp.controller('FullBiotaCtrl', function($scope, $http, $stateParams, $ionicLoading, $timeout){
	$scope.showLoading = function(){
		$scope.loadingIndicator = $ionicLoading.show({
			content: "Loading",
			animation: "fade-in",
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 100
		});
	};

	var id = $stateParams.id;

	$http({
		url:"http://gua.antonwibisono.com/api/public/getbiotatype/",
		apiToken: "434refce",
		dataType: "json",
		method:'POST'
	}).success(function(data){
		var temp = data.data;

		for(var x = 0, length = temp.length; x < length; x++){
			if(temp[x].id == id){
				$scope.biotas = temp[x];
			}
		}
		$timeout(function(){
			$scope.loadingIndicator.hide();
		}, 100);
	});
});

/**
 * MAIN CONTROLLER - handle inapp browser
 */

GuaApp.controller('DummyCtrl', function($scope){
	$scope.dummy = "Dummy Controller";
});

/**
 * A google map / GPS controller.
 */
GuaApp.controller('GpsCtrl', function($scope, $window, $http){
	$scope.markers = [];

	//ambil data marker dari api, parsing data nya di gpsview.html
	$http({
		url:"http://gua.antonwibisono.com/api/public/caves_simplify/",
		apiToken: "434refce",
		dataType: "json",
		method:'POST'
	}).success(function(data){
		var mark = data.data;
		for(var i = 0, length = mark.length; i < length; i++){
			if(mark[i].difficulty == "Grade 1"){
				$scope.markers.push({id:mark[i].id, name:mark[i].name, latitude:mark[i].latitude, longitude:mark[i].longitude, icon:"img/marker/dif-1.png", showWindow: false});
			}
			else if(mark[i].difficulty == "Grade 2"){
				$scope.markers.push({id:mark[i].id, name:mark[i].name, latitude:mark[i].latitude, longitude:mark[i].longitude, icon:"img/marker/dif-2.png", showWindow: false});
			}
			else if(mark[i].difficulty == "Grade 3"){
				$scope.markers.push({id:mark[i].id, name:mark[i].name, latitude:mark[i].latitude, longitude:mark[i].longitude, icon:"img/marker/dif-3.png", showWindow: false});
			}
			else if(mark[i].difficulty == "Grade 4"){
				$scope.markers.push({id:mark[i].id, name:mark[i].name, latitude:mark[i].latitude, longitude:mark[i].longitude, icon:"img/marker/dif-4.png", showWindow: false});
			}
			else if(mark[i].difficulty == "Grade 5"){
				$scope.markers.push({id:mark[i].id, name:mark[i].name, latitude:mark[i].latitude, longitude:mark[i].longitude, icon:"img/marker/dif-5.png", showWindow: false});
			}
			else{
				$scope.markers.push({id:mark[i].id, name:mark[i].name, latitude:mark[i].latitude, longitude:mark[i].longitude, icon:"img/marker/default.png", showWindow: false});
			}
		}
	});	

	$scope.markerOption = {
		options : {
          boxClass: 'custom-info-window',
          pixelOffset: new google.maps.Size(-50,-20),
          alignBottom: true
        }
	};

	$scope.onMarkerClicked = function(marker) {
		_.each($scope.markers, function(mker) {
			mker.showWindow = false;
		});
		marker.showWindow = true;
	};

	//untuk map
	$scope.map = {
    	center: {
        	latitude: "-7.801389",
        	longitude: "110.364444"
    	},
    	zoom: 10
	};

	$scope.center = [];

	//untuk circle
	$scope.stroke = {
	    "opacity":0.4,
	    "color": "#4ACFDD",
	    "weight":2
	}
	//untuk fill circle
	$scope.fill = {
		"opacity": 0.2,
		"color": "#4ACFDD"
	}

	var onSuccess = function(position) {
	    $scope.center = {
	    	icon: 'img/marker/home.png',
	        latitude: position.coords.latitude,
	        longitude: position.coords.longitude
	    };

	   	$scope.map = {
	    	center: {
	        	latitude: position.coords.latitude,
	        	longitude: position.coords.longitude
    		},
    	zoom: 10
		};
	    $scope.$apply();

	    //default location for jarak
	    $window.lat = position.coords.latitude;
	    $window.lng = position.coords.longitude;

	}

	function onError(error) {
	    console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
	    alert(error.message);
	}
	navigator.geolocation.getCurrentPosition(onSuccess, onError);

});

/**
 * MAIN CONTROLLER - handle inapp browser
 */
GuaApp.controller('InfoCtrl', ['$scope', function($scope) {
  // do something
}]);



GuaApp.controller('AreaCtrl', function($scope, $http, $ionicLoading, $timeout){
 
	$scope.showLoading = function(){
		$scope.loadingIndicator = $ionicLoading.show({
			content: "Loading",
			animation: "fade-in",
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 100
		});
	};
  
  	
	$http({
		url:"http://gua.antonwibisono.com/api/public/getprovince/",
		apiToken: "434refce",
		dataType: "json",
		method:'POST'
	}).success(function(data){
		$scope.listareas = data.data;
		$timeout(function(){
			$scope.loadingIndicator.hide();
		}, 100);
	}).error(function(){
		console.log("gagal");
	});

});

//Filter untuk nl2br 
GuaApp.filter('nl2br', function($sce){
	return function(msg,is_xhtml) {
		var is_xhtml = is_xhtml || true;
		var breakTag = (is_xhtml) ? '<br />' : '<br>';
		var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
		return $sce.trustAsHtml(msg);
	}
});

GuaApp.controller('GuaCtrl', function($scope, $stateParams, $http, $window, $ionicLoading, $timeout){

	$scope.showLoading = function(){
		$scope.loadingIndicator = $ionicLoading.show({
			content: "Loading",
			animation: "fade-in",
			showBackdrop: false,
			maxWidth: 200,
			showDelay: 100
		});
	};
	var id = $stateParams.id;

	var tempUrl = [];

	var lat = $window.lat, lng = $window.lng;
	var currentLocation = new google.maps.LatLng(lat, lng);

	$scope.title = "Gua View";

	$http({
		url:"http://gua.antonwibisono.com/api/public/caves/province/?id="+id,
		apiToken: "434refce",
		dataType: "json",
		method:'POST'
	}).success(function(data){
		$scope.perprovinces = data.data;
		var idGua = $scope.perprovinces[0].id;
		//console.log(idGua);
		$http({
			url:"http://gua.antonwibisono.com/api/public/cave/?id="+idGua,
			apiToken: "434refce",
			dataType: "json",
			method:'POST'			
		}).success(function(gua){
			$scope.guaviews = gua.data;
			$scope.title = $scope.guaviews[0].name;
			$scope.active = $scope.guaviews[0].id;

			tempUrl = $scope.guaviews[0].images;
			$scope.file = tempUrl[0].file;

			$timeout(function(){
				$scope.loadingIndicator.hide();
			},100);
		});

	}).error(function(){
		console.log("gagal");
	});

	$scope.jarak = function(a,b){
		var areaLocation = new google.maps.LatLng(a, b);
		return (google.maps.geometry.spherical.computeDistanceBetween(currentLocation, areaLocation) / 1000).toFixed(1);
	};

	$scope.loadGua = function(idgua){
		$scope.loadingIndicator = $ionicLoading.show({
			content: "Loading",
			animation: "fade-in",
			showBackdrop: false,
			maxWidth: 200,
			showDelay: 100
		});
		$scope.select = "";
		$http({	
			url:"http://gua.antonwibisono.com/api/public/cave/?id="+idgua,
			apiToken: "434refce",
			dataType: "json",
			method:'POST'
		}).success(function(data){
			$scope.guaviews = data.data;
			$scope.title = $scope.guaviews[0].name;
			$scope.active = $scope.guaviews[0].id;
			if($scope.guaviews[0].images == 0){
				$scope.file = [];
			}else{
				tempUrl = $scope.guaviews[0].images;
				$scope.file = tempUrl[0].file;
			}
			$timeout(function(){
				$scope.loadingIndicator.hide();
			}, 100);
		}).error(function(){
			console.log("gagal");
		});
	};

	$scope.isActive = function (category) {
		//Check if category of a given <li> is equal to the current category
		return $scope.active === category;
	}

});

GuaApp.controller('GuaViewCtrl', function($scope,$http, $stateParams, $ionicLoading, $timeout){
	$scope.showLoading = function(){
		$scope.loadingIndicator = $ionicLoading.show({
			content: "Loading",
			animation: "fade-in",
			showBackdrop: false,
			maxWidth: 200,
			showDelay: 100
		});
	};

	$scope.guas = [];
	var id = $stateParams.id;

	var tempUrl = [];

	$http({
		url:"http://gua.antonwibisono.com/api/public/cave/?id="+id,
		apiToken: "434refce",
		dataType: "json",
		method:'POST'
	}).success(function(data){
		$scope.guas = data.data;

		if($scope.guas[0].images == 0){
			$scope.file = [];
		}else{
			tempUrl = $scope.guas[0].images;

			$scope.file = tempUrl[0].file;
		}

		$timeout(function(){
			$scope.loadingIndicator.hide();
		}, 100);
	}).error(function(){
		console.log("gagal");
	});
});

GuaApp.controller('SearchCtrl', function($scope, $http, $ionicLoading, $timeout){
	$scope.showLoading = function(){
		$scope.loadingIndicator = $ionicLoading.show({
			content: "Loading",
			animation: "fade-in",
			showBackdrop: false,
			maxWidth: 200,
			showDelay: 100
		});
	};
	$scope.searches = [];

	$http({
		url:"http://gua.antonwibisono.com/api/public/caves/",
		apiToken: "434refce",
		dataType: "json",
		method:'POST'
	}, { cache: true}).success(function(data){
		$scope.searches = data.data;
		$timeout(function(){
			$scope.loadingIndicator.hide();
		}, 100);
	});

});


/**
 * Menu item click directive - intercept, hide menu and go to new location
 */
GuaApp.directive('clickMenulink', function() {
    return {
        link: function(scope, element, attrs) {
            element.on('click', function() {
                scope.sideMenuController.toggleLeft();
            });
        }
    }
})