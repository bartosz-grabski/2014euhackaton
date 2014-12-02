directives.directive('ngTwitter', function($location,$document) {

	function link(scope,element,attrs) {
 		
 		
		(function(d,s,id){
			var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
			if(!d.getElementById(id)){
				js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";
				fjs.parentNode.insertBefore(js,fjs);
			}
			element.on('$destroy',function() {
				js.remove();
				
			});
		})(document,"script","twitter-wjs");



	}

	return {
		link:link
	}

});
