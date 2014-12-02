directives.directive('ngTagCloud', function($location,$document,$window) {

	function link(scope,element,attrs) {
 		
 		
		setCss();
		var vis = new metaaps.nebulos(element[0]);
        vis.draw();

        angular.element($window).bind('resize',function() {
        	setCss();
        	angular.element(vis.canvas).remove();
        	vis = new metaaps.nebulos(element[0]);
        	vis.draw();
        })

        function setCss() {
        	
        	var width = element.parent()[0].offsetWidth - 30;
 			var height = Math.floor(width * 0.66);

 			element.css('width',width+"px");
 			element.css('height',height+"px");
        }

	}

	return {
		link:link
	}

});
