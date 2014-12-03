directives.directive('ngChart', function($location,$document,$window) {

	function link(scope,element,attrs) {
 		
 		
		$(function () {
    $(element[0]).highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,//null,
            plotShadow: false
        },
        title: {
            text: 'Party line'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Votes',
            data: [
                { name :'Disobedient', color:'red', y:5.0},
                { name :'In line', color:'green',y: 95.0 }
            ]
        }]
    });
});

	}

	return {
		link:link
	}

});
