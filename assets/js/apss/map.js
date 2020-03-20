require(['jquery', 'vector-map', 'vector-map-trentino'], function(){
    $(document).ready(function(){
        var markers = []
        var dataformap = {};
        codicicomuni = {};
        abitanticomuni = {};
        function each1000people(idc,m) {
            c = 1000;
            p = abitanticomuni[idc] 
            n =(m*c)/p
            return(n)
        }

        $.each(tablecodicicomuni, function( index, row ) {
            if (index !=0) {
                codicicomuni[row[1].toUpperCase()] = row[0];
                abitanticomuni[row[0]]=parseInt(row[2]);
                dataformap[row[0]] = 0;
            }
        });

        $.each(tablesituazionecomuni, function( index, row ) {
            if (index !=0) {
                nomecomune = row[0];
                v = parseInt(row[1]);
                if (codicicomuni.hasOwnProperty(nomecomune)) {
                    v1 = each1000people(codicicomuni[nomecomune],v);
                    v1= Math.round(v1 * 10) / 10;
                    dataformap[codicicomuni[nomecomune]]=v1;
                    console.log(v1);
                    m = {latLng: [row[2], row[3]], name: nomecomune};
                    markers.push(m);
                } 
            }
        });
        //work around perche' carano si e' fuso con Ville di Fiemem

        //dataformap["254"] = dataformap["254"] + addcarano;
        //console.log(dataformap);
        $('#map-trentino-svg').vectorMap({
            map: 'comuni_trentini',
            legend: {
              horizontal: true,
              cssClass: 'jvectormap-legend-icons',
              title: 'Business type'
            },
            zoomButtons : false,
            zoomOnScroll: false,
            panOnDrag: false,
            backgroundColor: 'transparent',
            /*markers: markers,*/
            markerStyle: {
                initial: {
                    fill: tabler.colors.orange,
                    stroke: '#fff',
                    "stroke-width": 2,
                    r: 5
                },
            },
            onRegionTipShow: function(e, el, code, f){
                el.html(el.html() + (dataformap[code] ? ':' + dataformap[code]+'' : ''));
            },
            series: {
                regions: [{
                    values: dataformap,
                    scale: ['#EFF3F6', tabler.colors.orange],
                    normalizeFunction: 'polynomial'
                }]
            },
            regionStyle: {
                initial: {
                    fill: '#F4F4F4'
                }
            }
        });
    });
});