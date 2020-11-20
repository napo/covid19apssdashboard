require(['c3', 'jquery'], function(c3, $) {
  $("#spinandamento").removeClass("spinner-border");

  var chart_e = [];
  chart_e[0] = "giorno"; 
  chart_labels[0] =tablestatoclinico[0][0];
  chart_ltotale[0] = "totale"
  chart_nuovi[0] = "contagi";
  chart_totali[0] = "totali";
  chart_deceduti[0] = "decessi";
  chart_dimessi[0] = 'dimessi';
  chart_infettive[0] = 'malattie infettive';
  chart_alta_intensita[0] = 'alta intensità';
  chart_terapia_intensiva[0] = 'terapia intensiva';
  chart_sma = [];
  for (var i = 1; i < tablestatoclinico.length; i++) {
    data = tablestatoclinico[i];
    chart_e.push(data[0]);
    chart_labels.push(data[0]); //.replace("/2020",""));
    chart_ltotale.push(data[7]);
    chart_nuovi.push(parseInt(data[11]));
    chart_sma.push(parseInt(data[11]));
    chart_totali.push(parseInt(data[7]-data[11]));
    chart_deceduti.push(parseInt(data[6]));
    chart_dimessi.push(parseInt(data[16]));
    chart_infettive.push(parseInt(data[2]));
    chart_alta_intensita.push(parseInt(data[3]));
    chart_terapia_intensiva.push(parseInt(data[4]));
  }
  calc_sma = movingAverage(chart_sma,7);
  calc_sma.unshift("media");
	
  $("#spinricoveri").removeClass("spinner-border");
  var whereiamricoveri = "";
  $(document).ready(function(){
    chartlog = c3.generate({
      bindto: '#chart-bar-stacked-ricoveri', 
      data: {
        x: 'giorno',
        xFormat: '%d/%m/%Y',
        columns: [
            chart_e,
            chart_infettive,
            chart_alta_intensita,
            chart_terapia_intensiva
        ],
        type: 'area-spline', //bar', 
        groups: [
          [
          'malattie infettive',
          'terapia intensiva',
          'alta intensità'
          ]
        ],
        colors: {
          'malattie infettive': tabler.colors["yellow"],
          'terapia intensiva': tabler.colors["orange"],
          'alta intensità': tabler.colors["red"]
        }
      },
      point: {
        show: false
      },
      axis: {
        y: {
          padding: {
            bottom: 0,
          },
          show: true,
            tick: {
            outer: false
          }
        },
        x: {
            padding: {
            left: 0,
            right: 0
          },
          show: true,
          type: 'timeseries',
          tick: {
            format: '%d/%m/%Y'
          }
        }
      },
      legend: {
        position: 'inset',
        padding: 0,
        inset: {
          anchor: 'top-left',
          x: 20,
          y: 8,
          step: 10
        }
      },
      point: {
        show: true
      },
      grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }
      },
      zoom: {
        enabled: true
      },
      tooltip: {
          format: {
            title: function (d) {
                g = d.getDate();
                if (g < 10) {
                  g = "0" + g;
                }
                y =  d.getFullYear();
                m  = d.getMonth() +1;
                if (m < 10) {
                   m = "0" + m;
                } 
                s = g+"/"+m+"/"+y;
                d = chart_e.indexOf(s);
                whereiamricoveri = d;
              return chart_labels[d]; },
              value: function (value, ratio, id) {
                  if (id == 'malattie infettive') {
                    v = chart_infettive[whereiamricoveri]
                  }
                  if (id == 'alta intensità') {
                    v = chart_alta_intensita[whereiamricoveri]
                  }
                  if (id == 'terapia intensiva') {
                    v = chart_terapia_intensiva[whereiamricoveri]
                  }
                  return v;
              }
          }
      }
    });
  });
  

  
  var whereiambar = "";
  chartbar = c3.generate({
      bindto: '#chart-bar-stacked', 
      data: {
        x: 'giorno',
        xFormat: '%d/%m/%Y',
        columns: [
          chart_e,
          chart_ltotale,
          /*chart_nuovi, 
          chart_totali */
        ],
        type: 'area-spline',
        /*types: {
          'totale': 'spline'
        },
        groups: [
          [ 'nuovi', 'totali']
        ],*/
        colors: {
          'totale': tabler.colors ["yellow"]//["yellow"]
        },
        names: {
          /*'nuovi': 'Nuovi',
          'totali': 'Precedenti',*/
          'totale': 'Totale'
        }
      },
      zoom: {
        enabled: true
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%d/%m/%Y'
          }
        },
      },
      legend: {
          show: false, ///true, //hide legend
      },
      tooltip: {
        format: {
          title: function (d) {
              g = d.getDate();
              if (g < 10) {
                g = "0" + g;
              }
              y =  d.getFullYear();
              m  = d.getMonth() +1;
              if (m < 10) {
                 m = "0" + m;
              } 
              s = g+"/"+m+"/"+y;
              d = chart_e.indexOf(s);
              whereiambar = d;
              return chart_labels[d]; },
          value: function (value, ratio, id) {
                  v = ""
                  /*
                  if (id == 'nuovi') {
                    v = chart_nuovi[whereiambar]
                  }
                  if (id == 'totali') {
                    v = chart_totali[whereiambar]
                  }*/
                  if (id == 'totale') {
                    v = chart_ltotale[whereiambar]
                  }
                  return v;
              }
          }
      },
        grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }
      }
    });

  $("#spinandamentocontagi").removeClass("spinner-border");
  var whereiamcont = "";

  chartcontagi = c3.generate({
      bindto: '#chart-contagi', 
      data: {
        x: 'giorno',
        xFormat: '%d/%m/%Y',
        columns: [
          chart_e,
          chart_nuovi,
          calc_sma
        ],
        //type: 'area-spline', 
        types: {
            'contagi': 'bar', //'area-spline',
            'media ': 'line'
        },
        colors: {
          'contagi': tabler.colors["orange"],
          "media": tabler.colors["yellow-light"]
        },
        names: {
          'contagi': 'contagi',
          'media': 'media ogni 7gg'
        },
        point: {
        	show: true
    	},
      },
      zoom: {
        enabled: true
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%d/%m/%Y'
          }
        },
      },
      grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }
      },
      legend: {
          show: true
          //position: '' //hide legend
      },
      tooltip: {
        format: {
          title: function (d) {
              g = d.getDate();
              if (g < 10) {
                g = "0" + g;
              }
              y =  d.getFullYear();
              m  = d.getMonth() +1;
              if (m < 10) {
                 m = "0" + m;
              } 
              s = g+"/"+m+"/"+y;
              d = chart_e.indexOf(s);
              whereiamcont = d;
              return chart_labels[d]; },
          value: function (value, ratio, id) {
                  v = ""
                  if (id == 'contagi') {
                    v = chart_nuovi[whereiamcont]
                  }
                  if (id == 'media') {
                    v = calc_sma[whereiamcont]
                  }
                  return v;
              }
          }
      }
    });
  });
