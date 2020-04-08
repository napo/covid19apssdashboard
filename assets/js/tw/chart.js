require(['c3', 'jquery'], function(c3, $) {
  chart_nuovi.push("nuovi");
  chart_totali.push("totali");
  chart_guariti.push("guariti");
  chart_deceduti.push("deceduti");
  chart_incremento.push("incremento");

  for (var i = 0; i < tablestatoclinico.length; i++) {
    data = tablestatoclinico[i];
    chart_labels.push("giorno " + data[0].replace("/2020","") + " - totale: " + data[7]);
    chart_nuovi.push(parseInt(data[12]));
    chart_totali.push(parseInt(data[7]-data[12]));
    chart_deceduti.push(parseInt(data[6]));
    chart_guariti.push(parseInt(data[5]));
  }
  $("#spinandamento").removeClass("spinner-border");
  chart_data_log_nuovi = ['nuovi'];
  for(var i=1; i<chart_nuovi.length; i++){
      if (chart_nuovi[i] == 0) {
          chart_data_log_nuovi[i]= 0 ;
      } else {
        chart_data_log_nuovi[i] = Math.log(chart_nuovi[i]) / Math.LN10;
      }
    }

  chart_data_log = ['totali'];
  for(var i=1; i<chart_totali.length; i++){
      if (chart_totali[i] == 0) {
          chart_data_log[i]= 0 ;
      } else {
        chart_data_log[i] = Math.log(chart_totali[i]+chart_nuovi[i]) / Math.LN10;
      }
    }

  chart_data_log_deceduti = ['deceduti'];
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

  chart_data_log_guariti = ['guariti'];
  for(var i=1; i<chart_totali.length; i++){
      if (chart_guariti[i] == 0) {
          chart_data_log_guariti[i]= 0 ;
      } else {
        if (chart_data_log_guariti[i] = 0) {
          chart_data_log_guariti[i] = 0;
        } else {
          chart_data_log_guariti[i] = Math.log(chart_guariti[i]) / Math.LN10;
        }
      }
    }

  $("#spinandamentolog").removeClass("spinner-border");
  var whereiam = "";
  $(document).ready(function(){
    chartlog = c3.generate({
      bindto: '#chart-log', 
      data: {
        columns: [
          //  data_log,
            chart_data_log_nuovi,
            chart_data_log_deceduti,
            chart_data_log_guariti  
        ],
        type: 'spline', 
        groups: [
          //['totali'],
          ['nuovi'],
          ['deceduti'],
          ['guariti']
        ],
        colors: {
          //'totali': tabler.colors["yellow"],
          'nuovi': tabler.colors['orange'],
          'deceduti': tabler.colors["red"],
          'guariti': tabler.colors["green"]
        },
        names: {
          //'totali': 'contagi',
          'nuovi': 'contagi',
          'guariti': 'dimessi'
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
          type: 'category',
          categories: chart_labels
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
      zoom: {
        enabled: true
      },
      tooltip: {
          format: {
              title: function (d) { 
                whereiam = d;
                return chart_labels[d] + "/20"; },
              value: function (value, ratio, id) {
                  v = ""
              //    if (id == 'totali') {
              //      v = (totali[whereiam+1]+nuovi[whereiam+1]);
              //    }
                  if (id == 'guariti') {
                    v = chart_guariti[whereiam+1]
                  }
                  if (id == 'deceduti') {
                    v = chart_deceduti[whereiam+1]
                  }
                  if (id == 'nuovi') {
                    v = chart_nuovi[whereiam+1]
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
        columns: [
          chart_nuovi, //data_log_nuovi, //nuovi,
          chart_totali //data_log //totali
        ],
        type: 'bar', // default type of chart
        groups: [
          [ 'nuovi', 'totali']
        ],
        colors: {
          'nuovi': tabler.colors['red'],
          'totali': tabler.colors["orange"]
        },
        names: {
          'nuovi': 'Nuovi',
          'totali': 'Precedenti'
        }
      },
      zoom: {
        enabled: true
      },
      axis: {
        x: {
          type: 'category',
          categories: chart_labels
        },
      },
      legend: {
          show: false, //hide legend
      },
      tooltip: {
        format: {
          title: function (d) { 
            whereiambar = d;
                return chart_labels[d]; },
              value: function (value, ratio, id) {
                  v = ""
                  if (id == 'nuovi') {
                    v = chart_nuovi[whereiambar+1]
                  }
                  if (id == 'totali') {
                    v = chart_totali[whereiambar+1]
                  }
                  return v;
              }
          }
      }
    });

  });
