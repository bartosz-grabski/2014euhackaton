controllers.controller('DashboardController', function ($window,$document,$scope, $rootScope, $location, $routeParams, memberService) {

	$scope.mep = { mepinfo : {} };
	$scope.loaded = {
		appearances : false,
	};

	function onMemberLoaded(data) {
    	$scope.mep = data
    }

    function onMemberLoadingError(error) {
    	console.log("error loading " + error);
    }

	memberService.getMember($routeParams.id,onMemberLoaded,onMemberLoadingError);


	
});
