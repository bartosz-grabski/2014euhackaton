controllers.controller('HomeController', function ($scope, $rootScope, $location, memberService) {

    var meps = [];
    $scope.meps = [];
    $scope.loaded = false;
    $scope.input = "";

    $scope.filter = function() {
        var temp = [];
        var input = $scope.input;
        for (var i in meps) {
            if (meps[i].mepinfo) {
                var m = meps[i];
                var country = m.mepinfo.country || "";
                var group = m.mepinfo.group || "";
                var fullname = m.mepinfo.fullname || "";

                if (fullname.indexOf(input) > -1 || country.indexOf(input) > -1 || group.indexOf(input) > -1)
                    temp.push(meps[i])
                }
        }
        console.log(temp);
        $scope.meps = temp;
    }

    $scope.showMepDashboard = function(id){
    	$location.path('/dashboard/'+id);
    }

    $scope.calcShow = function(mep) {
        if (!mep || !mep.mepinfo || !mep.mepinfo.fullname || !mep.mepinfo.country
            || !mep.mepinfo.group) return false;
        if (mep.mepinfo.fullname === "") return false;
        return true;
    }

    function onMembersLoaded(data) {
    	meps = data;
        $scope.meps = meps;
        $scope.loaded = true;
    }

    function onMembersLoadingError(error) {
    	console.log("error loading " + error);
    }

    memberService.getMembers(onMembersLoaded,onMembersLoadingError);

});