var app=angular.module('sample',[])
app.controller('FormController',['$scope','$http',function($scope,$http){
    $scope.init=function(){
        $scope.first=1
        $http.get("http://localhost:3000/getData")
            .then(function(response) {
                $scope.first = response.data.first_value;
                $scope.second = response.data.second_value;
                $scope.result = response.data.result;
            });
    }
    $scope.handleMultiplication=function(){
       $scope.result= $scope.first * $scope.second;
        var body={
            first_value:$scope.first,
            second_value:$scope.second,
            result:$scope.result,
        }
        $http.post('http://localhost:3000/saveData',body,{headers:{'Content-Type': 'application/json'}}).then(result=>{
            console.log('success')
        })
    }

}])
app.directive('formValidator', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, control) {
            function myValidation(value) {
                if (value >=0) {
                    control.$setValidity('charE', true);
                } else {
                    control.$setValidity('charE', false);
                }
                return value;
            }
            control.$parsers.push(myValidation);
        }
    };
});