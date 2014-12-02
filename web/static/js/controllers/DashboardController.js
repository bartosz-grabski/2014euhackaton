controllers.controller('DashboardController', function ($scope, $rootScope, $location, $routeParams, memberService) {

	$scope.mep = { mepinfo : {} };
	$scope.loaded = {
		appearances : false
	};

	function onMemberLoaded(data) {
    	$scope.mep = data
    }
	function onVotesLoaded(data) {
    	$scope.votes = data.value.votes
    }

    function onLoadingError(error) {
    	console.log("error loading " + error);
    }

	memberService.getMember($routeParams.id,onMemberLoaded,onLoadingError);
	memberService.getVotes($routeParams.id,onVotesLoaded,onLoadingError);
});