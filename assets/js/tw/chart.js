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
  chart_smadecessi = [];
  for (var i = 1; i < tablestatoclinico.length; i++) {
    data = tablestatoclinico[i];
    chart_e.push(data[0]);
    chart_labels.push(data[0]); 
    chart_ltotale.push(data[7]);
    chart_nuovi.push(parseInt(data[10]));
    chart_sma.push(parseInt(data[10]));
    chart_totali.push(parseInt(data[7]-data[10]));
    chart_deceduti.push(parseInt(data[6]));
    chart_dimessi.push(parseInt(data[14]));
    chart_infettive.push(parseInt(data[2]));
    chart_alta_intensita.push(parseInt(data[3]));
    chart_terapia_intensiva.push(parseInt(data[4]));
  }

  chart_decessi[0] = 'decessi'; 
  chart_decessi.push(chart_deceduti[1]);
  prev_decesso = chart_deceduti[1];
  chart_smadecessi[0] = prev_decesso;
  for (var i = 2; i < chart_deceduti.length; i++) {
  	curtot = chart_deceduti[i];
  	v = curtot - prev_decesso;
  	prev_decesso = curtot;
  	chart_decessi[i] = v;
  	chart_smadecessi[i-1]=v;
  }
  calc_sma = movingAverage(chart_sma,7);
  calc_sma.unshift("media");
  calc_smadecessi = movingAverage(chart_smadecessi,7);
  calc_smadecessi.unshift("media");
  $("#spindecessi").removeClass("spinner-border");
  $(document).ready(function(){
    chartlog = c3.generate({
      bindto: '#chart-bar-stacked-decessi', 
      data: {
        x: 'giorno',
        xFormat: '%d/%m/%Y',
        columns: [
            chart_e,
            chart_decessi,
           	calc_smadecessi
        ],
        colors: {
          'decessi': tabler.colors["red"],
          'media': tabler.colors["blue-darkest"]
        },
        types: {
            'decessi': 'bar',
            'media': 'line'
        },
         names: {
          'decessi': 'decessi',
          'media': 'media ogni 7gg'
        },
      },
      point: {
        show: true
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
            left: 10,
            right: 10
          },
          show: true,
          type: 'timeseries',
          tick: {
            format: '%d/%m/%Y',
            culling: {
                max: 10 
            }
          }
        }
      },
      legend: {
        position: 'inset',
        padding: 0,
        inset: {
          anchor: 'top-left',
          x: 10,
          y: -10,
          //step: 10
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
      }
    });
  });



  $("#spinricoveri").removeClass("spinner-border");
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
        colors: {
          'malattie infettive': tabler.colors["yellow"],
          'terapia intensiva': tabler.colors["red"],
          'alta intensità': tabler.colors["orange"]
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
            left: 10,
            right: 10
          },
          show: true,
          type: 'timeseries',
          tick: {
            format: '%d/%m/%Y',
            culling: {
                max: 10 
            }
          }
        }
      },
      legend: {
        position: 'inset',
        padding: 0,
        inset: {
          anchor: 'top-left',
          x: 10,
          y: -10,
          //step: 10
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
      }
    });
  });


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
          "media": tabler.colors["blue"]
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
