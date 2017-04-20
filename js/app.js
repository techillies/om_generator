var app = angular.module("myApp", ['ngclipboard']);

app.controller('mainController', function($scope, $http) {
	 $scope.formData = {};
	 $scope.showTemplates = false;
  $scope.submitForm = function() {
    console.log("test")
  		$scope.reason = $scope.formData.selectOption;
  		$scope.showTemplates = true;
        $http.get('templates/templates.json')
       .then(function(res){
          $scope.leaves = res.data;  
          console.log($scope.leaves);
          angular.forEach($scope.leaves, function(obj) {

          	angular.forEach(obj[$scope.reason], function(health_obj) {
          		var header_str =  health_obj.header;
          		var header_res = header_str.replace("<<<manager_name>>>", $scope.formData.mgr_name);
          		health_obj.header = header_res;

          		var body_str =  health_obj.body;
          		var body_res = body_str.replace("<<<from_date>>> to <<<to_date>>>", $scope.formData.from_date +" to "+ $scope.formData.to_date);
          		health_obj.body = body_res;

          		var sender_str =  health_obj.sender;
          		var sender_res = sender_str.replace("<<<sender_name>>>", $scope.formData.name);
          		health_obj.sender = sender_res;          		


          	});
          });             
        });
  }
});