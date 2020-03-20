require(['jquery', 'vector-map', 'vector-map-trentino'], function(){
    $(document).ready(function(){
        var markers = []
        var dataformap = {};

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
        //work around perche' carano si e' fuso con Ville di Fiemem

        //dataformap["254"] = dataformap["254"] + addcarano;
        //console.log(dataformap);
        $('#map-trentino-svg').vectorMap({
            map: 'comuni_trentini',
            zoomButtons : false,
            zoomOnScroll: false,
            panOnDrag: false,
            backgroundColor: 'transparent',
            onRegionTipShow: function(e, el, code, f){
                el.html(el.html() + (dataformap[code] ? ':' + dataformap[code]+'' : ''));
            },
            series: {
                regions: [{
                    values: dataformap,
                    scale: ['#EFF3F6', tabler.colors.orange],
                    normalizeFunction: 'polynomial',
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
            },
            onRegionTipShow: function(event, label, index){
                label.html(
                  '<b>'+label[index]+'</b><br/>'+
                  '<b>contagi: </b>'+label[index].r+'</br>'
            )},
        });
    });
});