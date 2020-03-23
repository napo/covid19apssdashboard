require(['jquery', 'vector-map', 'vector-map-trentino'], function(){
    $(document).ready(function(){
        var markers = []
        var dataformap = {};
    	var indicatore = "contagi ogni 1.000 abitanti";
    	if (choosemapindicator == "assoluto") {
    		indicatore = "totale contagi";
    	}
        $.each(tablecodicicomuni, function( index, row ) {
            if (index !=0) {
                dataformap[row[0]] = 0;
            }
        });

        $.each(tablesituazionecomuni, function( index, row ) {
            if (index !=0) {
                nomecomune = row[0];
                v = parseInt(row[1]);
                if (codicicomuni.hasOwnProperty(nomecomune)) {
                    v1 = each1000people(codicicomuni[nomecomune],v);
                    showdata = v;
                    if (choosemapindicator == "relativo") {
                        showdata = v1;
                        $("#mapindicator").text(labelrelativo);
                    }
                    dataformap[codicicomuni[nomecomune]]= showdata;
                    m = {latLng: [row[2], row[3]], name: nomecomune};
                    markers.push(m);
                } 
            }
        });    
        $('#map-trentino-svg').vectorMap({
            map: 'comuni_trentini',
            zoomButtons : true,
            zoomOnScroll: true,
            panOnDrag: true,
            backgroundColor: 'transparent',
            onRegionTipShow: function(event, label, index, f){
                label.html(label.html() + (dataformap[index] ? '<br/>'+ indicatore +':<br/>' + dataformap[index].toString().replace(".",",")+'' : ''));
            },
            series: {
                regions: [{
                    values: dataformap,
                    scale: ['#EFF3F6', tabler.colors.orange],
                    normalizeFunction: 'polynomial', //lineaer
                    /*
                    legend: {
                      horizontal: true,
                      cssClass: 'jvectormap-legend-icons'
                    }*/
                }]
            },
            regionStyle: {
                initial: {
                    fill: '#F4F4F4',
                    stroke: "bfbfbf"
                }
            }
        });
    });
});
