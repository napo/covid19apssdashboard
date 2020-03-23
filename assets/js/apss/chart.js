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
      s = row[0] + " totali: " + row[2];
      labels.push(s); //row[0]);
      nuovi.push(parseInt(row[1]));
      totali.push(parseInt(row[2])-parseInt(row[1]));
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
  });