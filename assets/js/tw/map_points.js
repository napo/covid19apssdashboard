require(['jquery', 'vector-map', 'vector-map-comunita-valli-trentino'], function(){
    $(document).ready(function(){
        var markersValue = [];
        var vv = [];

        $.each(datasituazionecomuni, function( index, row ) {
            data = datasituazionecomuni[index]
            if (index !=0) {
                nomecomune = data.nomecomune;
                contagi = parseInt(data.contagi);
                guariti = parseInt(data.guariti);
                decessi = parseInt(data.decessi);
                contagiogni1000 = parseInt(data.contagiogni1000);
                abitanti = parseInt(data.abitanti);
                m = {
                        "latLng": [data.latitude, data.longitude], 
                        "name": nomecomune,
                        "contagi":contagi,
                        "guariti": guariti,
                        "decessi": decessi,
                        "contagiogni1000": contagiogni1000,
                        "abitanti": abitanti
                    };
                markersValue.push(m);
                vv.push(contagiogni1000);
            }
        });    

        $('#map-trentino-svg-points').vectorMap({
            map: 'comunita_valle',
            zoomButtons : true,
            zoomOnScroll: false,
            panOnDrag: true,
            backgroundColor: 'transparent',
            scaleColors: ['#fd9644', '#653c1b'],
            normalizeFunction: 'linear',
            hoverOpacity: 0.7,
            hoverColor: false,
            regionStyle: {
                initial: {
                    "fill": '#f8f9f9',
                    "fill-opacity": 1,
                    "stroke": '#000000',
                    "stroke-width": 0.7,
                    "stroke-opacity": 0.5
                }
            },
            markerLabelStyle: {
                initial: {
                    'font-family': 'Source Sans Pro',
                }
            },
            markerStyle: {
              initial: {
                    "fill": tabler.colors.orange, //'#ef5d68',
                    "stroke": '#fd9644',
                    "fill-opacity": 0.8,
                    "stroke-width": 1,
                    "stroke-opacity": 1,
                  },
                hover: {
                    stroke: '#653c1b',
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
                    scale: [2, 15],
                    values: vv
                }]
            },
            onMarkerTipShow: function(event, label, index){
                label.html(
                    '<b>'+markersValue[index].name+'</b><br/><br/>'+
                    '<b>contagi: </b>'+markersValue[index].contagi+'</br>' +
                    '<b>guariti: </b>'+markersValue[index].guariti+'</br>' +
                    '<b>decessi: </b>'+markersValue[index].decessi+'</br><br/><br/>' +
                    '<b>' + markersValue[index].contagiogni1000 + ' contagiati ogni 1.000 abitanti </b>'
                );
            },
            onRegionTipShow: function(e, el, code){
                e.preventDefault();
            }, 
            regionLabelStyle: {
                initial: {
                    'font-family': 'Source Sans Pro',
                    'fill': '#000000',
                    'font-weight': 'normal',
                    'font-size': '9'
                },
                hover: {
                    'fill': '#90E32'
                }
            },
            labels: {
                regions: {
                    render: function(code) {
                        v = "";
                        code = parseInt(code);
                        comunita_valle = {
                            1: "Val di Fiemme",
                            2: "Primiero",
                            3: "Bassa Valsugana",
                            4: "Alta Valsugana",
                            5: "Val di Cembra",
                            6: "Val di Non",
                            7: "Val di Sole",
                            8: "Valli Giudicarie",
                            9: "Alto Garda",
                            10: "Vallagarina",
                            11: "Val di Fassa",
                            12: "Altipiani Cimbri",
                            13: "Piana Rotaliana",
                            14: "Paganella",
                            15: "Trento",
                            16: "Valle dei Laghi"
                        }
                        v = comunita_valle[code];
                    return(v);
                    }
                }
            }
        });
    });
});