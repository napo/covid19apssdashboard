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
  data_log = ['totali'];
  for(var i=1; i<totali.length; i++){
      if (totali[i] == 0) {
          data_log[i]= 0 ;
      } else {
        data_log[i] = Math.log(totali[i]) / Math.LN10;
      }
    }
  }

var chart_log = c3.generate({
    bindto: '#chart-log', 
    size: {
        height: 240,
        width: 480
    },
    data: {
        type:"bar",
      columns: [
        data_log
      ],
      labels : {show:true,
          format: {
              data1 : function(d,id){(id, Math.pow(10,d));return Math.pow(10,d).toFixed(0);}
          }
      }
    },
    axis : {
        y : {
            show:false,
            tick: {
               format: function (d) { return Math.pow(10,d).toFixed(0); }
            }
        }
    },
});



});