var myApp = angular.module('myApp', []);


myApp.controller('mainCtrl', ['$scope', function($scope){
	$scope.hoho = 'yohanison';

	$scope.store_open = 9;
	$scope.store_close = 23;

	//ENTIRE SCHEDUlE TIME LINE CALCULATION
	// 오픈 시간 에 맞춰서 시간별로 총 몇시간 일하는 지를 꼐산
	$scope.total_hour = $scope.store_close - $scope.store_open ;
	$scope.getNumber = function(num) {
	    return new Array(num);   
	}	

	$scope.schedule = {
		monday:[
			{ name: 'Kass', start_time: 15, end_time:23, right:0, height:0, top:0},
			{ name: 'Yohan', start_time: 11, end_time:16, right:0, height:0, top:0},
			{ name: 'Babo', start_time: 11, end_time:16, right:0, height:0, top:0},
			{ name: 'Kgass', start_time: 19, end_time:23, right:0, height:0, top:0},
			{ name: 'Hul', start_time: 16, end_time:19, right:0, height:0, top:0}	,	
			{ name: 'Hannah', start_time: 11, end_time:14, right:0, height:0, top:0},
			{ name: 'Dani', start_time: 14, end_time:16, right:0, height:0, top:0},
			{ name: 'Dadni', start_time: 14, end_time:16, right:0, height:0, top:0},

		],
		tuesday:[
			{ name: 'Dani', start_time: '14am', end_time:'4pm',right:10, height:0  },
			{ name: 'Kass', start_time: '3pm', end_time:'4pm',right:10, height:0  }
		]
	};

	$scope.new_schedule = [];
	var total = $scope.schedule.monday.length;


	// WORK on the RIGHT POSITION + HEIGHT
	for(i = 0; i < total; i++){
		var right = 60 * i;
		$scope.schedule.monday[i].right = 50 + right; // GIVE RIGHT POSITION

		//Height Start
		var height = $scope.schedule.monday[i].end_time - $scope.schedule.monday[i].start_time;
		height = height * 15;		
		$scope.schedule.monday[i].height = height; //Height End

		//TOP Position
		var top = $scope.schedule.monday[i].start_time - $scope.store_open;
		top = top * 15;		
		$scope.schedule.monday[i].top = top; //Height End		
		//TOP END

//		$scope.schedule.monday[i].right = $scope.schedule.monday[i].right - minus_right; // GIVE RIGHT POSITION
		// CROSSING END

		$scope.new_schedule.push($scope.schedule.monday[i]);		
	
	}


}]);


