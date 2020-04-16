require(['jquery', 'vector-map', 'vector-map-trentino'], function(){
    $(document).ready(function(){
        var markers = []
        dataformap = {}
    	var indicatore = ""; //"contagi ogni 1.000 abitanti";
        $("#mapindicator").text(indicatore);
        $.each(tablecodicicomuni, function(index,row) {
            if (index > 0) {
                m = {latLng: [row[6], row[7]], name: row[1]};
                markers.push(m); 
                codice = row[0];
                dataformap[codice]=datasituazionecomuni[codice]['contagiogni1000'];
            }
        });

    $('#map-trentino-svg').vectorMap({
        map: 'comuni_trentini',
        zoomButtons : true,
        zoomOnScroll: true,
        panOnDrag: true,
        backgroundColor: 'transparent',
        onRegionTipShow: function (event, label, index){
            message = "";
            data = datasituazionecomuni[index];
            contagi = data['contagi'];
            nomecomune = data["nomecomune"];
            guariti = data["guariti"];
            decessi = data["decessi"];
            contagiogni1000 = data["contagiogni1000"];
            abitanti = data["abitanti"];   
            if (contagi == 0) {
                message = "<strong>" + nomecomune + "</strong>:<br/>"
                message += "nessun contagio";
            } else {
                message = "<br/><br/>"
                message += contagiogni1000 + " <strong>contagi ogni 1.000 abitanti<br/><br/>"
                message += "contagi: " + contagi + "<br/>"
                message += "decessi: " + decessi + "<br/>"
                message += "guariti: " + guariti + "<br/><br/>"
                message += "abitanti: " + abitanti + "<br/>"
                message += "</strong>"
            }
            label.html(
                label.html() + message
            );
        },
        legend: {
            vertical: true,
            //cssClass: 'maplegend',
            title: 'contagi ogni 1000 abitanti'
        }, 
        series: {
            regions: [{
                values: dataformap,
                scale: ['#EFF3F6', tabler.colors.orange],
                normalizeFunction: 'linear'
                }]
            },
        markerLabelStyle: {
            initial: {
                'font-family': 'Source Sans Pro',
            }
        },
        regionStyle: {
            initial: {
                "fill": '#f8f9f9',
                "fill-opacity": 1,
                "stroke": '#f6f6f6',
                "stroke-width": 0.7,
                "stroke-opacity": 0.5
            },  
            hover: {
                "fill-opacity": 0.8,
                "fill": '#df5015',
            },
            selected: {
                fill: 'yellow'
            }
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
                        50: "Val di Fiemme",
                        115: "Primiero",
                        188: "Bassa Valsugana",
                        216: "Alta Valsugana",
                        172: "Val di Cembra",
                        62: "Val di Non",
                       114: "Val di Sole",
                       244: "Valli Giudicarie",
                        191: "Alto Garda",
                        161: "Vallagarina",
                        118: "Val di Fassa",
                        102: "Altipiani Cimbri",
                        180: "Piana Rotaliana",
                        120: "Paganella",
                        205: "Trento",
                        243: "Valle dei Laghi"
                        }
                        v = comunita_valle[code];
                    return(v);
                    }
                }
            }
    });
    });
});