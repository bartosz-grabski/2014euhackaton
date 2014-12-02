controllers.controller('HomeController', function ($scope, $rootScope, $location, memberService) {

    $scope.meps = [];


    $scope.showMepDashboard = function(id){
    	$location.path('/dashboard/'+id);
    }

    function onMembersLoaded(data) {
    	$scope.meps = data
    }

    function onMembersLoadingError(error) {
    	console.log("error loading " + error);
    }

    memberService.getMembers(onMembersLoaded,onMembersLoadingError);

});