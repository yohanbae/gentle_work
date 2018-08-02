var myApp = angular.module('myApp', []);


myApp.controller('mainCtrl', ['$scope', function($scope){
	//SETUP//
	// DB EMP Data
	$scope.emp = [
		{ name: 'Kass', salary: 14},
		{ name: 'Dani', salary: 14},
		{ name: 'Yohan', salary: 14},
		{ name: 'Gisella', salary: 14},
		{ name: 'Aidan', salary: 14},
		{ name: 'Jeay', salary: 14},
		{ name: 'Tra', salary: 14},
		{ name: 'Daine', salary: 14}				
	];

	// DB EMP DATA DONE


	//DB Schedule
	$scope.schedule = {
		monday:[
			{ name: 'Kass', start_time: 15, end_time:23, right:0, height:0, top:0},
			{ name: 'Yohan', start_time: 11, end_time:16, right:0, height:0, top:0},
			{ name: 'Gisella', start_time: 11, end_time:16, right:0, height:0, top:0},
			{ name: 'Tra', start_time: 19, end_time:23, right:0, height:0, top:0},
		],
		tue:[
			{ name: 'Dani', start_time: 14, end_time:19,right:10, height:0  },
			{ name: 'Daine', start_time: 11, end_time:20,right:10, height:0  }
		],
		wed:[
			{ name: 'Kass', start_time: 11, end_time:23, right:0, height:0, top:0},
			{ name: 'Yohan', start_time: 10, end_time:16, right:0, height:0, top:0},
			{ name: 'Tra', start_time: 19, end_time:23, right:0, height:0, top:0},
		],		
		thu:[
			{ name: 'Aidan', start_time: 15, end_time:23, right:0, height:0, top:0},
			{ name: 'Yohan', start_time: 11, end_time:16, right:0, height:0, top:0},
			{ name: 'Gisella', start_time: 11, end_time:16, right:0, height:0, top:0},
			{ name: 'Tra', start_time: 19, end_time:23, right:0, height:0, top:0},
		],				
		fri:[
			{ name: 'Kass', start_time: 15, end_time:23, right:0, height:0, top:0},
			{ name: 'Gisella', start_time: 11, end_time:16, right:0, height:0, top:0},
			{ name: 'Tra', start_time: 19, end_time:23, right:0, height:0, top:0},
		],		
		sat:[
			{ name: 'Kass', start_time: 15, end_time:23, right:0, height:0, top:0},
			{ name: 'Gisella', start_time: 11, end_time:16, right:0, height:0, top:0},
			{ name: 'Tra', start_time: 19, end_time:23, right:0, height:0, top:0},
		],		
		sun:[
			{ name: 'Kass', start_time: 15, end_time:23, right:0, height:0, top:0},
			{ name: 'Yohan', start_time: 11, end_time:16, right:0, height:0, top:0},
			{ name: 'Gisella', start_time: 11, end_time:16, right:0, height:0, top:0},
			{ name: 'Tra', start_time: 19, end_time:23, right:0, height:0, top:0},
		],		
	};
	//DB DATA DONE




	//BASIC SETUP + STORE HOURS
	$scope.store_open = 9;
	$scope.store_close = 23;
	$scope.the_height = ($scope.store_close - $scope.store_open) * 30 + 80;
	console.log($scope.the_height);
	$scope.pickedIdx = "";
	$scope.pickedDay ="";
	$scope.seletedTime =$scope.store_open;
	$scope.myBoxOn = false;
	$scope.addBoxOn = false;
	//MAKE TIME RANGE for SELECT BOX
	$scope.timeRange = [];
	for(h = $scope.store_open; h < $scope.store_close; h++){
		$scope.timeRange.push(h);
	}
	console.log($scope.timeRange);
	//TIME RANGE DONE
	// NAME LIST FOR SELECT BOX
	$scope.empRange = [];
	for(h=0; h<$scope.emp.length; h++){
		$scope.empRange.push($scope.emp[h].name);
	}// MAKE SURE PUT EMPLOYEE who dont work at that time

	//ENTIRE SCHEDUlE TIME LINE CALCULATION
	$scope.total_hour = $scope.store_close - $scope.store_open ;
	$scope.getNumber = function(num) {
	    return new Array(num);   
	}	

	$scope.mon_schedule = [];
	$scope.tue_schedule = [];	
	$scope.wed_schedule = [];
	$scope.thu_schedule = [];
	$scope.fri_schedule = [];	
	$scope.sat_schedule = [];
	$scope.sun_schedule = [];

	$scope.daybox_width = 0;
	design();//RENDERING SCHEDULE START



	// EVENT: USER CLICK EMPLOYEE'S SCHEDULE BOX
	$scope.sclick = function(names, stime, etime, idx, day, event){
		if($scope.addBoxOn){
			$scope.addBoxOn = false;
			$('.addbox').css({'display':'none'});							
		}

		$("#ename").val("string:"+names);
		$("#stime").val("number:"+stime);
		$("#etime").val("number:"+etime);
		$scope.pickedIdx = idx;
		$scope.pickedDay = day;

		var x =event.clientX;
		var y =event.clientY;
		$('.mybox').css({'display':'block', 'top':y, 'left':x});
		$scope.myBoxOn = true;
	}

	// EVENT: USER CLICK ANYWHERE IN SCHEDULE
	$scope.addClick = function(day){
		if($scope.myBoxOn){
			$scope.myBoxOn = false;
			$('.mybox').css({'display':'none'});							
		}else{
			if($scope.addBoxOn){
					$('.addbox').css({'display':'none'});										
					$scope.addBoxOn = false;
				}else{
					$scope.pickedDay = day;
					var x =event.clientX;
					var y =event.clientY;
					$('.addbox').css({'display':'block', 'top':y, 'left':x});		
					$scope.addBoxOn = true;			
				}			
		}
	}





	// CHANGE SCHEDULE INFO
	$scope.handleSubmit = function(){
		var validation = getValidation();
		var day = getDay();
		if(validation){
			var e =	document.getElementById('stime');
			var sTime = e.options[e.selectedIndex].text;
			var f =	document.getElementById('etime');
			var eTime = f.options[f.selectedIndex].text;
			sTime = parseInt(sTime); eTime = parseInt(eTime);			

			var g =	document.getElementById('ename');
			var eName = g.options[g.selectedIndex].text;

			day[$scope.pickedIdx].name = eName;
			day[$scope.pickedIdx].start_time =	sTime;
			day[$scope.pickedIdx].end_time = eTime;

			$scope.mon_schedule = [];
			$scope.tue_schedule = [];	
			$scope.wed_schedule = [];
			$scope.thu_schedule = [];
			$scope.fri_schedule = [];	
			$scope.sat_schedule = [];
			$scope.sun_schedule = [];
			design();		
			$('.mybox').css({'display':'none'});			
		}else{
			alert("Please enter correct TIME");
		}

	}


	// ADD NEW SCHEDULE
	$scope.handleAdd = function(){
		var validation = getValidation();
		var day = getDay();

		if(validation){
			var e =	document.getElementById('stime');
			var sTime = e.options[e.selectedIndex].text;
			var f =	document.getElementById('etime');
			var eTime = f.options[f.selectedIndex].text;
			sTime = parseInt(sTime); eTime = parseInt(eTime);			

			var g =	document.getElementById('ename');
			var eName = g.options[g.selectedIndex].text;

			var newnew = { name: eName, start_time: sTime, end_time:eTime, right:0, height:0, top:0}
			day.push(newnew);
			$scope.mon_schedule = [];
			$scope.tue_schedule = [];	
			$scope.wed_schedule = [];
			$scope.thu_schedule = [];
			$scope.fri_schedule = [];	
			$scope.sat_schedule = [];
			$scope.sun_schedule = [];
			design();		
			$('.addbox').css({'display':'none'});						
		}else{
			alert("Please enter correct TIME");
		}
	}

	// REMOVE SCHEDULE
	$scope.handleDelete = function(){
		var day = getDay();		
		day.splice($scope.pickedIdx, 1);

			$scope.mon_schedule = [];
			$scope.tue_schedule = [];	
			$scope.wed_schedule = [];
			$scope.thu_schedule = [];
			$scope.fri_schedule = [];	
			$scope.sat_schedule = [];
			$scope.sun_schedule = [];

		design();				
		$('.mybox').css({'display':'none'});			
	}


	// VALIDATION FOR USER INPUT
	function getValidation(){
		var e =	document.getElementById('stime');
		var sTime = e.options[e.selectedIndex].text;
		var f =	document.getElementById('etime');
		var eTime = f.options[f.selectedIndex].text;

		sTime = parseInt(sTime); eTime = parseInt(eTime);

		if(sTime >= $scope.store_open && eTime < $scope.store_close){
			if(sTime < eTime){
				return true;
			}else if(sTime == eTime){
				return false;
			}else{
				return false;
			}			
		}else{
			return false;
		}
	}


	function getDay(){
		if($scope.pickedDay == "mon"){ var day = $scope.schedule.monday; }
		if($scope.pickedDay == "tue"){ var day = $scope.schedule.tue; }
		if($scope.pickedDay == "wed"){ var day = $scope.schedule.wed; }
		if($scope.pickedDay == "thu"){ var day = $scope.schedule.thu; }
		if($scope.pickedDay == "fri"){ var day = $scope.schedule.fri; }
		if($scope.pickedDay == "sat"){ var day = $scope.schedule.sat; }
		if($scope.pickedDay == "sun"){ var day = $scope.schedule.sun; }
		return day;
	}




	function design(){ // SCHEDULE RENDERING
		var total_mon = $scope.schedule.monday.length;		
		var total_tue = $scope.schedule.tue.length;		
		var total_wed = $scope.schedule.wed.length;		
		var total_thu = $scope.schedule.thu.length;		
		var total_fri = $scope.schedule.fri.length;		
		var total_sat = $scope.schedule.sat.length;		
		var total_sun = $scope.schedule.sun.length;		

		//Width for Daybox;
		$scope.mon_width = total_mon * 60;
		$scope.tue_width = total_tue * 60;
		$scope.wed_width = total_wed * 60;
		$scope.thu_width = total_thu * 60;
		$scope.fri_width = total_fri * 60;
		$scope.sat_width = total_sat * 60;
		$scope.sun_width = total_sun * 60;

		//MONDAY WORK on the RIGHT POSITION + HEIGHT
		for(i = 0; i < total_mon; i++){
			var right = 60 * i;
			$scope.schedule.monday[i].right =right; // GIVE RIGHT POSITION
			//Height Start
			var height = $scope.schedule.monday[i].end_time - $scope.schedule.monday[i].start_time;
			height = height * 30;		
			$scope.schedule.monday[i].height = height; //Height End
			//TOP Position
			var top = $scope.schedule.monday[i].start_time - $scope.store_open;
			top = top * 30;		
			$scope.schedule.monday[i].top = top; //Height End		
			//TOP END
			$scope.mon_schedule.push($scope.schedule.monday[i]);		
		}//MONDAY END

		//TUE WORK on the RIGHT POSITION + HEIGHT
		for(i = 0; i < total_tue; i++){
			var right = 60 * i;
			$scope.schedule.tue[i].right =right; // GIVE RIGHT POSITION
			//Height Start
			var height = $scope.schedule.tue[i].end_time - $scope.schedule.tue[i].start_time;
			height = height * 30;		
			$scope.schedule.tue[i].height = height; //Height End
			//TOP Position
			var top = $scope.schedule.tue[i].start_time - $scope.store_open;
			top = top * 30;		
			$scope.schedule.tue[i].top = top; //Height End		
			//TOP END
			$scope.tue_schedule.push($scope.schedule.tue[i]);		
		}//TUESDAY END

		//WED WORK on the RIGHT POSITION + HEIGHT
		for(i = 0; i < total_wed; i++){
			var right = 60 * i;
			$scope.schedule.wed[i].right =right; // GIVE RIGHT POSITION
			//Height Start
			var height = $scope.schedule.wed[i].end_time - $scope.schedule.wed[i].start_time;
			height = height * 30;		
			$scope.schedule.wed[i].height = height; //Height End
			//TOP Position
			var top = $scope.schedule.wed[i].start_time - $scope.store_open;
			top = top * 30;		
			$scope.schedule.wed[i].top = top; //Height End		
			//TOP END
			$scope.wed_schedule.push($scope.schedule.wed[i]);		
		}//WED END

		//THURS WORK on the RIGHT POSITION + HEIGHT
		for(i = 0; i < total_thu; i++){
			var right = 60 * i;
			$scope.schedule.thu[i].right =right; // GIVE RIGHT POSITION
			//Height Start
			var height = $scope.schedule.thu[i].end_time - $scope.schedule.thu[i].start_time;
			height = height * 30;		
			$scope.schedule.thu[i].height = height; //Height End
			//TOP Position
			var top = $scope.schedule.thu[i].start_time - $scope.store_open;
			top = top * 30;		
			$scope.schedule.thu[i].top = top; //Height End		
			//TOP END
			$scope.thu_schedule.push($scope.schedule.thu[i]);		
		}//THURS END

		//FRIDAY WORK on the RIGHT POSITION + HEIGHT
		for(i = 0; i < total_fri; i++){
			var right = 60 * i;
			$scope.schedule.fri[i].right =right; // GIVE RIGHT POSITION
			//Height Start
			var height = $scope.schedule.fri[i].end_time - $scope.schedule.fri[i].start_time;
			height = height * 30;		
			$scope.schedule.fri[i].height = height; //Height End
			//TOP Position
			var top = $scope.schedule.fri[i].start_time - $scope.store_open;
			top = top * 30;		
			$scope.schedule.fri[i].top = top; //Height End		
			//TOP END
			$scope.fri_schedule.push($scope.schedule.fri[i]);		
		}//FRIDAY END

		//SATURDAY WORK on the RIGHT POSITION + HEIGHT
		for(i = 0; i < total_sat; i++){
			var right = 60 * i;
			$scope.schedule.sat[i].right =right; // GIVE RIGHT POSITION
			//Height Start
			var height = $scope.schedule.sat[i].end_time - $scope.schedule.sat[i].start_time;
			height = height * 30;		
			$scope.schedule.sat[i].height = height; //Height End
			//TOP Position
			var top = $scope.schedule.sat[i].start_time - $scope.store_open;
			top = top * 30;		
			$scope.schedule.sat[i].top = top; //Height End		
			//TOP END
			$scope.sat_schedule.push($scope.schedule.sat[i]);		
		}//SATURDAY END

		//SUNDAY WORK on the RIGHT POSITION + HEIGHT
		for(i = 0; i < total_sun; i++){
			var right = 60 * i;
			$scope.schedule.sun[i].right =right; // GIVE RIGHT POSITION
			//Height Start
			var height = $scope.schedule.sun[i].end_time - $scope.schedule.sun[i].start_time;
			height = height * 30;		
			$scope.schedule.sun[i].height = height; //Height End
			//TOP Position
			var top = $scope.schedule.sun[i].start_time - $scope.store_open;
			top = top * 30;		
			$scope.schedule.sun[i].top = top; //Height End		
			//TOP END
			$scope.sun_schedule.push($scope.schedule.sun[i]);		
		}//SUNDAY END



	}

}]);


