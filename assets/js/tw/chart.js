require(['c3', 'jquery'], function(c3, $) {
  var nuovi = []
  var totali = []
  var labels = []
  nuovi.push("nuovi")
  totali.push("totali")

/*
  if (typeof(tablestatoclinico === 'undefined')) {
    nuovi.push(0);
    totali.push(0);
    labels.push("");
  } else {
  */

  for (var i = 0; i < tablestatoclinico.length; i++) {
    data = tablestatoclinico[i];
    labels.push(data[0].replace("/2020",""));
    nuovi.push(parseInt(data[12]));
    totali.push(parseInt(data[7]));
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
            // name of each serie
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

  $("#spinandamentolog").removeClass("spinner-border");

  $(document).ready(function(){
    var chart = c3.generate({
      bindto: '#chart-log', 
      data: {
        columns: [
            data_log     
        ],
        type: 'spline', 
        groups: [
          [ 'totali']
        ],
        colors: {
          'totali': tabler.colors["orange"]
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
          label: 'numero giorni trascorsi'
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
        show: false
    }
    });
  });
/*
  var chart = c3.generate({
        bindto: '#logaritmico',
        data: {
            columns: [
                data_log
            ]
        },
        type: 'area',
        colors: {
          'totali': tabler.colors['red']
        },

        legend: {
            show: false
        }
    });
  */
  });