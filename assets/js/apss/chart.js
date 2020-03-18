require(['c3', 'jquery'], function(c3, $) {
  var nuovi = []
  var totali = []
  var labels = []
  nuovi.push("nuovi")
  totali.push("totali")
  if(typeof(dataandamentocasi[0]) === 'undefined') {
      return null;
  } else {
    $.each(dataandamentocasi, function( index, row ) {
    if(index > 0) {
      idx = 0;
      $.each(row, function( index, colData ) {
        switch(index) {
        case 0:
          if (colData!="") { labels.push(colData);}
          break;
        case 1:
          if (colData != "") {
            v = parseInt(colData)
            nuovi.push(v);
            idx++;
          }
          break;
        case 2:
          if (colData != "") {
            v = parseInt(colData)
            totali.push(v - nuovi[idx]);
          }
        break;
        }  
      });
    }
  });
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
          'totali': 'Totali'
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
  });