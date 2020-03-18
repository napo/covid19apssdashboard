require(['jquery', 'vector-map', 'vector-map-trentino'], function(){
    $(document).ready(function(){
        var markers = []
        var dataformap = {};
        codicicomuni = {};
        $.each(tablecodicicomuni, function( index, row ) {
            if (index !=0) {
                codicicomuni[row[1].toUpperCase()] = row[0];
                dataformap[row[0]] = 0;
            }
        });
        var addcarano = 0;
        $.each(tablesituazionecomuni, function( index, row ) {
            if (index !=0) {
                nomecomune = row[0];
                v = parseInt(row[1]);
                //work around causa errore
                if (nomecomune!='CARANO') {
                    dataformap[codicicomuni[nomecomune]]=v;
                    m = {latLng: [row[2], row[3]], name: nomecomune};
                    markers.push(m);
                } else {
                    addcarano = parseInt(row[1]);
                }
            }
        });
        //work around perche' carano si e' fuso con Ville di Fiemem

        dataformap["254"] = dataformap["254"] + addcarano;

        $('#map-trentino-svg').vectorMap({
            map: 'comuni_trentini',
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