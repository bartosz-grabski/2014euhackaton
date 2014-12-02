services.factory('memberService', function ($http,$location,$window,$rootScope) {

	var service = {};

	service.getMembers = function(onSuccess, onFailure) {
		$http.get("/members")
			.success(onSuccess)
			.error(onFailure)
	}

	service.getMember = function(id, onSuccess, onFailure) {
		$http.get('/member/'+id)
			.success(onSuccess)
			.error(onFailure)
	}

	return service;
});
