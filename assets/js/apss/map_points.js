require(['jquery', 'vector-map', 'vector-map-trentino'], function(){
    $(document).ready(function(){
        var dataformap = {};
        var markersValue = []
        var vv = []
        $.each(tablecodicicomuni, function( index, row ) {
            if (index !=0) {
               // codicicomuni[row[1].toUpperCase()] = row[0];
               // abitanticomuni[row[0]]=parseInt(row[2]);
                dataformap[row[0]] = 0;
            }
        });

        $.each(tablesituazionecomuni, function( index, row ) {
            if (index !=0) {
                nomecomune = row[0];
                v = parseInt(row[1]);
                if (codicicomuni.hasOwnProperty(nomecomune)) {
                    v1 = each1000people(codicicomuni[nomecomune],v);
                    dataformap[codicicomuni[nomecomune]]=v; //v1;
                    lats = row[2].split('.');
                    lons = row[3].split('.');
                    var lat = ""
                    for (var i = 0; i < lats.length; i++) {
                        if (i == 1) {
                            lat = lat + "." + lats[i];
                        } else {
                            lat = lat + lats[i];
                        }
                    }
                    var lon = ""
                    for (var i = 0; i < lons.length; i++) {
                        if (i == 1) {
                            lon = lon + "." + lons[i];
                        } else {
                            lon = lon + lons[i];
                        }
                    }      
                    m = {latLng: [lat, lon], name: nomecomune}; //, r:v};
                    markersValue.push(m);
                    vv.push(v);
                } 
            }
        });
        console.log(markersValue.latLng);
        $('#map-trentino-svg-points').vectorMap({
            map: 'comuni_trentini',
            zoomButtons : false,
            zoomOnScroll: false,
            panOnDrag: false,
            backgroundColor: 'transparent',
            scaleColors: ['#C8EEFF', '#0071A4'],
            normalizeFunction: 'polynomial',
            hoverOpacity: 0.7,
            hoverColor: false,
            regionStyle: {
                initial: {
                    fill: '#F4F4F4'
                }
            },
            markerStyle: {
              initial: {
                    fill: '#01a04e',
                    stroke: '#01a04e',
                    "fill-opacity": 0.6,
                    "stroke-width": 1,
                    "stroke-opacity": 1,
                  },
                hover: {
                    stroke: '#01a04e',
                    "stroke-width": 2,
                    cursor: 'pointer'
                  }
            },
            markers: markersValue, 
            series: {
                markers: [{
                    attribute: 'fill',
                },{
                    attribute: 'r',
                    //scale: [5, 15],
                    values: vv //markersValue
                }]
            },
        });
    });
});