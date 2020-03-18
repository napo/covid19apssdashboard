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

function parseStatoclinico(indata) {
	idxtoday = indata[0].length - 1;
	oggi = indata[0][idxtoday];
	var oggi = 0;
	var domicilio = 0;
	var infettive = 0;
	var intesita = 0;
	var intensiva = 0;
	var deceduti = 0;
	var dimessi = 0;
	if(typeof(indata[0]) === 'undefined') {
        return null;
    } else {
		$.each(indata, function( index, row ) {
			v = row[idxtoday];
			if ( v=="") { v = 0}
			switch(index) {
	        case 0:
	        	oggi = v;
	        	break;
	        case 1:
	        	domicilio = v;
	        	break;
	        case 2:
	        	infettive = v;
	        	break;
	        case 3:
	        	intesita = v;
	        	break;
	        case 4:
	        	intensiva = v;
	        	break;
	        case 5:
	        	deceduti = v;
	        	break;
	        case 6:
	        	dimessi = v;
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
   totale = parseInt(domicilio) + parseInt(infettive) + parseInt(intensiva) + parseInt(intesita) + parseInt(deceduti) + parseInt(dimessi);
   $("#totale").text(totale);

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
		async: false,
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
	});
});

