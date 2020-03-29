require(['c3', 'jquery'], function(c3, $) {
  var nuovi = [];
  var totali = [];
  var labels = [];
  var deceduti = [];
  var guariti = [];
  nuovi.push("nuovi");
  totali.push("totali");
  guariti.push("guariti");
  deceduti.push("deceduti");


  for (var i = 0; i < tablestatoclinico.length; i++) {
    data = tablestatoclinico[i];
    labels.push(data[0].replace("/2020",""));
    nuovi.push(parseInt(data[12]));
    totali.push(parseInt(data[7]));
    deceduti.push(parseInt(data[6]));
    guariti.push(parseInt(data[5]))
  }
  
  var chart = c3.generate({
      bindto: '#chart-bar-stacked', 
      data: {
        columns: [
          nuovi,
          totali
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
      axis: {
        x: {
          type: 'category',
          categories: labels
        },
      },
      /*
      bar: {
        width: 16
      },*/
      legend: {
          show: false, //hide legend
      },
      /*
      padding: {
        bottom: 0,
        top: 0
      },*/
    });

  $("#spinandamento").removeClass("spinner-border");

  data_log = ['totali'];
  for(var i=1; i<totali.length; i++){
      if (totali[i] == 0) {
          data_log[i]= 0 ;
      } else {
        data_log[i] = Math.log(totali[i]) / Math.LN10;
      }
    }

  data_log_deceduti = ['deceduti'];
  for(var i=1; i<totali.length; i++){
      if (deceduti[i] == 0) {
          data_log_deceduti[i]= 0 ;
      } else {
        if (data_log_deceduti[i] == 0) {
          data_log_deceduti[i] = 0;
        } else {
          data_log_deceduti[i] = Math.log(deceduti[i]) / Math.LN10;
        }
      }
    }

  data_log_guariti = ['guariti'];
  for(var i=1; i<totali.length; i++){
      if (guariti[i] == 0) {
          data_log_guariti[i]= 0 ;
      } else {
        if (data_log_guariti[i] = 0) {
          data_log_guariti[i] = 0;
        } else {
          data_log_guariti[i] = Math.log(guariti[i]) / Math.LN10;
        }
      }
    }

  $("#spinandamentolog").removeClass("spinner-border");
  var whereiam = "";
  $(document).ready(function(){
    var chart = c3.generate({
      bindto: '#chart-log', 
      data: {
        columns: [
            data_log,
            data_log_deceduti,
            data_log_guariti  
        ],
        type: 'spline', 
        groups: [
          ['totali'],
          ['deceduti'],
          ['guariti']
        ],
        colors: {
          'totali': tabler.colors["orange"],
          'deceduti': tabler.colors["red"],
          'guariti': tabler.colors["green"]
        },
        names: {
          'totali': 'contagi'
        }
      },
      axis: {
        y: {
          padding: {
            bottom: 0,
          },
          show: false,
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
          categories: labels
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
      tooltip: {
          format: {
              title: function (d) { 
                whereiam = d;
                return labels[d] + "/2020"; },
              value: function (value, ratio, id) {
                  v = ""
                  if (id == 'totali') {
                    v = totali[whereiam]
                  }
                  if (id == 'guariti') {
                    v = guariti[whereiam]
                  }
                  if (id == 'deceduti') {
                    v = deceduti[whereiam]
                  }
                  return v;
              }
          }
    }
    });
  });
  });