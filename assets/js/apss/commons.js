var urlelencocomuni = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSoP79r_KG6CSuIF6Woik3c8o54B_K8EPDYgI_zpPehuYydjNztNzLAPqGwpAoHn6uGLE2_J7zy1Lwa/pub?gid=1484863998&single=true&output=csv';
var dataelencocomuni;
var urlandamentocasi = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQdZ7yQhx38EsaR05DRprb0YkaRf5eK6cfrrOGMfFnDKq-P-g8q-HMRv76UnTkoRYvCMrgkQkX-xJOE/pub?gid=0&single=true&output=csv';
var dataandamentocasi;
var urlstatoclinico = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQdZ7yQhx38EsaR05DRprb0YkaRf5eK6cfrrOGMfFnDKq-P-g8q-HMRv76UnTkoRYvCMrgkQkX-xJOE/pub?gid=1231542924&single=true&output=csv';
var tablestatoclinico = "";
var urlcodicicomuni = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQdZ7yQhx38EsaR05DRprb0YkaRf5eK6cfrrOGMfFnDKq-P-g8q-HMRv76UnTkoRYvCMrgkQkX-xJOE/pub?gid=1576237135&single=true&output=csv"; 
var tablecodicicomuni = "";
var urlsituazionecomuni = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSoP79r_KG6CSuIF6Woik3c8o54B_K8EPDYgI_zpPehuYydjNztNzLAPqGwpAoHn6uGLE2_J7zy1Lwa/pub?gid=1484863998&single=true&output=csv';
var tablesituazionecomuni = "";
var downloadandamentocasi;

function parseStatoclinico(indata) {
	idxtoday = indata[0].length - 1;
	oggi = indata[0][idxtoday];
  var totale = "n/d"
  var totale_ieri = 0;
	var oggi = -1;
	var domicilio = -1;
  var domicilio_ieri = 0;
	var infettive = -1;
  var infettive_ieri = -1;
	var intesita = -1;
  var intesita_ieri = -1;
	var intensiva = -1;
  var intensiva_ieri = -1;
	var deceduti = -1;
  var deceduti_ieri = -1;
	var dimessi = -1;
  var dimessi_ieri = -1;

	if(typeof(indata[0]) === 'undefined') {
        return null;
    } else {
		$.each(indata, function( index, row ) {
			v = row[idxtoday];
      if (idxtoday > 0) {
        vi = row[idxtoday-1];
      } 

			if ( v=="") { v = 0}
			switch(index) {
	        case 0:
	        	oggi = v;
	        	break;
	        case 1:
	        	domicilio = v;
            domicilio_ieri = parseInt(vi);
            if (domicilio == -1) {
              domicilio = 'n/d'
            } 
	        	break;
	        case 2:
	        	infettive = v;
            infettive_ieri = parseInt(vi);
            if (infettive == -1) {
              infettive = 'n/d'
            }
	        	break;
	        case 3:
	        	intesita = v;
            intesita_ieri = parseInt(vi);
            if (intesita == -1) {
              intesita = 'n/d'
            } 
	        	break;
	        case 4:
	        	intensiva = v;
            intensiva_ieri = parseInt(vi);
            if (intensiva == -1) {
              intensiva = 'n/d'
            }
	        	break;
	        case 5:
	        	deceduti = v;
            deceduti_ieri = parseInt(vi);
            if (deceduti == -1) {
              deceduti = 'n/d'
            } 
	        	break;
	        case 6:
	        	dimessi = v;
            dimessi_ieri = parseInt(vi)
            if (dimessi == -1) {
              dimessi = 'n/d'
            } 
	        	break;
			} 
		})
    }
   $("#oggi").text(oggi);
   $("#domicilio").text(domicilio);
   $("#infettive").text(infettive);
   $("#intesita").text(intesita);
   $("#intensiva").text(intensiva);
   $("#deceduti").text(deceduti);
   $("#dimessi").text(dimessi);
   if (domicilio != "n/d") {
      totale = parseInt(domicilio) + parseInt(infettive) + parseInt(intensiva) + parseInt(intesita) + parseInt(deceduti) + parseInt(dimessi);
    } 
  totale_ieri = domicilio_ieri + infettive_ieri + intesita_ieri + intensiva_ieri + deceduti_ieri + dimessi_ieri;
   $("#totale").text(totale);
   var difftotale = 0;;

   difftotale = totale - totale_ieri;
   if (totale > totale_ieri) {
      $("#variazionecasi").removeClass("h1 text-right text-red").addClass("h1 text-right text-gray");
      $("#difftotaletext").text(difftotale);
      $("#iconavariazionecasi").removeClass("fe").addClass("fe fe-arrow-up-right");
   } 
   if (totale < totale_ieri) {
      $("#variazionecasi").removeClass("h1 text-right text-green").addClass("h1 text-right text-gray");
      $("#difftotaletext").text(difftotale);
      $("#iconavariazionecasi").removeClass("fe").addClass("fe fe-arrow-down-left");
   }

}

require(['csv','jquery'], function(csv,$) {
  $(document).ready(function() {
    $.ajax({
    	async: false,
        type: "GET",  
        url: urlstatoclinico,
        dataType: "text",       
        success: function(response) {
            tablestatoclinico = $.csv.toArrays(response);
            }
        });

   	parseStatoclinico(tablestatoclinico);

    $.ajax({
		async: true,
        type: "GET",  
        url: urlelencocomuni,
        dataType: "text",       
        success: function(response) {
            dataelencocomuni = $.csv.toArrays(response);
            }
        });

    $.ajax({
     	async: false,
        type: "GET",  
        url: urlandamentocasi,
        dataType: "text",       
        success: function(response) {
            dataandamentocasi = $.csv.toArrays(response);
            }
        });

    $.ajax({
		async: false,
        type: "GET",  
        url: urlcodicicomuni,
        dataType: "text",       
        success: function(response) {
            tablecodicicomuni = $.csv.toArrays(response);
            }
        });
    $.ajax({
		async: false,
        type: "GET",  
        url: urlsituazionecomuni,
        dataType: "text",       
        success: function(response) {
            tablesituazionecomuni = $.csv.toArrays(response);
            }
        }); 

      $("#downloadandamentocasi").click(function() {
          var downloadLink = document.createElement("a");
          var fname = "covid19_andamento_casi_trentino.csv";
          var csvContent = "data:text/csv;charset=utf-8,";
          dataandamentocasi.forEach(function(infoArray, index){
              dataString = infoArray.join(",");
              csvContent += dataString + "\n";
          });
          downloadandamentocasi = encodeURI(csvContent); 
          downloadLink.href = downloadandamentocasi;
          downloadLink.download = fname;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
      });

      $("#downloadstatoclinico").click(function() {
          var downloadLink = document.createElement("a");
          var fname = "covid19_stato_clinico_trentino.csv";
          var csvContent = "data:text/csv;charset=utf-8,";
          dataandamentocasi.forEach(function(infoArray, index){
              dataString = infoArray.join(",");
              csvContent += dataString + "\n";
          });
          downloadandamentocasi = encodeURI(csvContent); 
          downloadLink.href = tablestatoclinico;
          downloadLink.download = fname;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
      });

      $("#downloadstatoclinico").click(function() {
          var downloadLink = document.createElement("a");
          var fname = "covid19_stato_clinico_trentino.csv";
          var csvContent = "data:text/csv;charset=utf-8,";
          dataandamentocasi.forEach(function(infoArray, index){
              dataString = infoArray.join(",");
              csvContent += dataString + "\n";
          });
          downloadandamentocasi = encodeURI(csvContent); 
          downloadLink.href = tablestatoclinico;
          downloadLink.download = fname;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
      });


	});
});

