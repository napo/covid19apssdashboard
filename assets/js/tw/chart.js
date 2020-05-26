require(['c3', 'jquery'], function(c3, $) {
  var chart_e = [];

  chart_e[0] = "giorno"; 
  chart_labels[0] =tablestatoclinico[0][0];
  chart_ltotale[0] = "totale"
  chart_nuovi[0] = "nuovi";
  chart_totali[0] = "totali";
  chart_deceduti[0] = "deceduti";
  chart_dimessi[0] = 'dimessi';
  for (var i = 1; i < tablestatoclinico.length; i++) {
    data = tablestatoclinico[i];
    chart_e.push(data[0]);
    chart_labels.push(data[0]); //.replace("/2020",""));
    chart_ltotale.push(data[7]);
    chart_nuovi.push(parseInt(data[11]));
    chart_totali.push(parseInt(data[7]-data[11]));
    chart_deceduti.push(parseInt(data[6]));
    chart_dimessi.push(parseInt(data[16]));
  }

  $("#spinandamento").removeClass("spinner-border");
  chart_data_log_nuovi[0] = chart_nuovi[0];
  for(var i=1; i<chart_nuovi.length; i++){
      if (chart_nuovi[i] == 0) {
          chart_data_log_nuovi[i]= 0 ;
      } else {
        chart_data_log_nuovi[i] = Math.log(chart_nuovi[i]) / Math.LN10;
      }
    }

  chart_data_log[0] = chart_totali[0];
  for(var i=1; i<chart_totali.length; i++){
      if (chart_totali[i] == 0) {
          chart_data_log[i]= 0 ;
      } else {
        chart_data_log[i] = Math.log(chart_totali[i]+chart_nuovi[i]) / Math.LN10;
      }
    }

  chart_data_log_deceduti[0] = chart_deceduti[0];
  for(var i=1; i<chart_totali.length; i++){
      if (chart_deceduti[i] == 0) {
          chart_data_log_deceduti[i]= 0 ;
      } else {
        if (chart_data_log_deceduti[i] == 0) {
          chart_data_log_deceduti[i] = 0;
        } else {
          chart_data_log_deceduti[i] = Math.log(chart_deceduti[i]) / Math.LN10;
        }
      }
    }

  chart_data_log_dimessi[0] = chart_dimessi[0];
  for(var i=1; i<chart_totali.length; i++){
      if (chart_dimessi[i] == 0) {
          chart_data_log_dimessi[i]= 0 ;
      } else {
        if (chart_data_log_dimessi[i] = 0) {
          chart_data_log_dimessi[i] = 0;
        } else {
          chart_data_log_dimessi[i] = Math.log(chart_dimessi[i]) / Math.LN10;
        }
      }
    }

  chart_data_log_totale[0] = chart_ltotale[0];
  for(var i=1; i<chart_totali.length; i++){
      if (chart_ltotale[i] == 0) {
          chart_data_log_totale[i]= 0 ;
      } else {
        if (chart_data_log_totale[i] = 0) {
          chart_data_log_totale[i] = 0;
        } else {
          chart_data_log_totale[i] = Math.log(chart_ltotale[i]) / Math.LN10;
        }
      }
    }

  $("#spinandamentolog").removeClass("spinner-border");
  var whereiam = "";
  $(document).ready(function(){
    chartlog = c3.generate({
      bindto: '#chart-log', 
      data: {
        x: 'giorno',
        xFormat: '%d/%m/%Y',
        columns: [
            chart_e,
            chart_deceduti,
            chart_dimessi 
            //chart_data_log_deceduti,
            //chart_data_log_dimessi  
        ],
        type: 'spline', 
        groups: [
          ['deceduti'],
          ['dimessi']
        ],
        colors: {
          'deceduti': tabler.colors["red"],
          'dimessi': tabler.colors["green"]
        }
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
                whereiam = d;
              return chart_labels[d]; },
              value: function (value, ratio, id) {
                  if (id == 'dimessi') {
                    v = chart_dimessi[whereiam]
                  }
                  if (id == 'deceduti') {
                    v = chart_deceduti[whereiam]
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
          /*'nuovi': tabler.colors['red'],
          'totali': tabler.colors["orange"]*/
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
          chart_nuovi //chart_data_log_nuovi //
        ],
        type: 'area-spline', // default type of chart
        colors: {
          'nuovi': tabler.colors["orange"]
        },
        names: {
          'nuovi': 'numero contagi',
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
      grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }
      },
      legend: {
          show: false, //hide legend
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
                  if (id == 'nuovi') {
                    v = chart_nuovi[whereiamcont]
                  }
                  return v;
              }
          }
      }
    });

  });
