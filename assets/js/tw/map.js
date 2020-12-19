require(['jquery', 'vector-map', 'vector-map-trentino'], function(){
    $(document).ready(function(){
        var markers = []
        dataformap = {}
    	var indicatore = ""; 
        $("#mapindicator").text(indicatore);
        $.each(tablecodicicomuni, function(index,row) {
            if (index > 0) {
                m = {latLng: [row[6], row[7]], name: row[1]};
                markers.push(m); 
                codice = row[0];
                try {
   					dataformap[codice]=datasituazionecomuni[codice]['percontagiattuale'];
                } catch(e) {
                    //console.log(row);
                }
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
            contagi_attuali = contagi - guariti - decessi;
            vpercontagiattuale = data["percontagiattuale"];
            abitanti = data["abitanti"];   
            if (contagi_attuali == 0) {
                //message = "<strong>" + nomecomune + "</strong><br/><br/>";
                message += "<br/><br/>attualmente nessun caso positivo<br/><br/>";
                message += "contagi totali: " + contagi + "<br/>";
                message += "decessi totali: " + decessi + "<br/>";
                message += "guariti totali: " + guariti + "<br/><br/>";
                message += "popolazione residente: " + abitanti + "<br/>";
                message += "</strong>";
            } else {
                message = "<br/><br/>";
                vpercontagiattuale = vpercontagiattuale.toString().replace(".",",");
                message += "percentuale attualmente positivi: " + vpercontagiattuale + "%<br/><br/>"
                message += "totale attualmente positivi: " + contagi_attuali + "<br/><br/>"
                message += "contagi totali: " + contagi + "<br/>"
                message += "decessi totali: " + decessi + "<br/>"
                message += "guariti totali: " + guariti + "<br/><br/>"
                message += "popolazione residente: " + abitanti + "<br/>"
                message += "</strong>"
            }
            label.html(
                label.html() + message
            );
        },
        legend: {
            vertical: true,
            //cssClass: 'maplegend',
            title: 'percentuale contagi attuale sui residenti'
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
                "fill": '#f1c40f',
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
