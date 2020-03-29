
/* csv */ 
var urlcodicicomuni = 'data/codici_comuni.csv'
var urlsituazionecomuni = 'data/stato_comuni_td.csv'
var urlstatoclinico = 'data/stato_clinico_td.csv'

var tablestatoclinico = "";
var tablecodicicomuni = "";
var tablesituazionecomuni = "";
var datacomuni = "";
var downloadandamentocasi;
var codicicomuni = {};
var abitanticomuni = {};
var datasituazionecomuni = {};
var labelassoluto = ""
var labelrelativo = "";//L'indice mostra il numero di contagi ogni 1.000 persone"
var tablecentricomunitavalle = "";

function updatesituazionecomuni(tablestatocomuni) {
  $.each(tablestatocomuni, function(index,row) {
    if (index >0) {
        data = {};
        data['codice'] = row[0];
        data["nomecomune"]= row[1];
        data["contagi"] = parseInt(row[2]);
        data["guariti"] = parseInt(row[3]);
        data["decessi"] = parseInt(row[4]);
        data["contagiogni1000"] = each1000people(row[0],parseInt(row[2]));
        data["latitude"] = row[6];
        data["longitude"] = row[7];
        data["abitanti"] = abitanticomuni[row[0]];
        data["lastupdate"] = row[5];
        percontagi = ((data["contagi"]/ data["abitanti"] ) * 100).toPrecision(2); 
        data["percontagi"] = percontagi;
        datasituazionecomuni[row[0]] = data; 
    }
  });
}

function each1000people(idc,m) {
    c = 1000;
    p = abitanticomuni[idc] 
    n =(m*c)/p
    /*n= Math.round(n * 10) / 10;*/
    n = n.toPrecision(3) //.toString().replace(".",",");
    return(n)
}

function indicatori(label,ieri,oggi) {
  ieri = parseInt(ieri);
  oggi = parseInt(oggi);
  iddiv = "#ieri"+ label;
  iddivf = "#fieri" + label;      
  if (oggi > ieri) {
    $(iddivf).addClass("fe fe-arrow-up");
    $(iddiv).text("+ " + (oggi - ieri).toString());
  } 
  if (oggi < ieri) {
    $(iddiv).text("" + (oggi - ieri).toString());
    $(iddivf).addClass("fe fe-arrow-down");
  }
  if (oggi == ieri) {
    $(iddiv).text("0");
    $(iddivf).addClass("fe fe-arrow-down");   
  }
  return(true)
}

function parseStatoclinico(indata) {
  var totale = 0
  var totale_ieri = 0;
  var totale_attuali = 0;
  var totale_attuali_ieri = 0;
  var oggi = "n/d";
  var domicilio = 0;
  var domicilio_ieri = 0;
  var infettive = 0
  var infettive_ieri = 0;
  var intesita = 0;
  var intesita_ieri = 0;
  var intensiva = 0;
  var intensiva_ieri = 0;
  var deceduti = 0;
  var deceduti_ieri = 0;
  var dimessi = 0;
  var dimessi_ieri = 0;
	if(typeof(indata) === 'undefined') {
    return null;
  } else {
    idxtoday = indata.length - 1;
    todaydata = indata[idxtoday];
    yesterdaydata = indata[idxtoday-1];
    totale = parseInt(todaydata[7]);
    totale_ieri = parseInt(yesterdaydata[7]);
    totale_attuali = parseInt(todaydata[9]);
    totale_attuali_ieri = parseInt(yesterdaydata[9]);
    oggi = todaydata[0];
    domicilio = parseInt(todaydata[1]);
    domicilio_ieri = parseInt(yesterdaydata[1]);
    rsa = parseInt(todaydata[10]);
    rsa_ieri = parseInt(yesterdaydata[10]);
    infettive = parseInt(todaydata[2]);
    infettive_ieri = parseInt(yesterdaydata[2]);
    intesita = parseInt(todaydata[3]);
    intesita_ieri = parseInt(yesterdaydata[3]);
    intensiva = parseInt(todaydata[4]);
    intensiva_ieri = parseInt(yesterdaydata[4]);
    deceduti = parseInt(todaydata[6]);
    deceduti_ieri = parseInt(yesterdaydata[6]);
    dimessi = parseInt(todaydata[5]);
    dimessi_ieri = parseInt(yesterdaydata[5]);
	}

  $("#totale").removeClass("spinner-border");
  $("#positiviattuali").removeClass("spinner-border");
  $("#oggi").removeClass("spinner-border");
  $("#domicilio").removeClass("spinner-border");
  $("#infettive").removeClass("spinner-border");
  $("#intesita").removeClass("spinner-border");
  $("#intensiva").removeClass("spinner-border");
  $("#deceduti").removeClass("spinner-border");
  $("#dimessi").removeClass("spinner-border");
  $("#rsa").removeClass("spinner-border");

  $("#oggi").text(oggi);
  $("#domicilio").text(domicilio);
  $("#infettive").text(infettive);
  $("#intesita").text(intesita);
  $("#intensiva").text(intensiva);
  $("#deceduti").text(deceduti);
  $("#dimessi").text(dimessi);
  $("#rsa").text(rsa);
  $("#positiviattuali").text(totale_attuali);

  /*
  if (domicilio != "n/d") {
    totale = parseInt(domicilio) + parseInt(infettive) + parseInt(intensiva) + parseInt(intesita) + parseInt(deceduti) + parseInt(dimessi);
  } 
  totale_ieri = domicilio_ieri + infettive_ieri + intesita_ieri + intensiva_ieri + deceduti_ieri + dimessi_ieri;
  */
  $("#totale").text(totale);
  var difftotale = 0;;
  difftotale = totale - totale_ieri;
  if (totale > totale_ieri) {
    $("#variazionecasi").removeClass("h1 text-right text-red").addClass("h1 text-left text-red");
    $("#difftotaletext").text("+ " + difftotale.toString());
    $("#iconavariazionecasi").removeClass("fe").addClass("fe fe-arrow-up");
  } 
  if (totale < totale_ieri) {
    $("#variazionecasi").removeClass("h1 text-right text-green").addClass("h1 text-left text-green");
    $("#difftotaletext").text(difftotale);
    $("#iconavariazionecasi").removeClass("fe").addClass("fe fe-arrow-down");
  }
  indicatori("domicilio",domicilio_ieri,domicilio);
  indicatori("infettive",infettive_ieri,infettive);
  indicatori("intensita",intesita_ieri,intesita);
  indicatori("intensiva",intensiva_ieri,intensiva);
  indicatori("deceduti",deceduti_ieri,deceduti);
  indicatori("dimessi",dimessi_ieri,dimessi);
  indicatori("rsa",rsa_ieri,rsa);
  indicatori("positiviattuali",totale_attuali_ieri,totale_attuali);

}

require(['csv','jquery'], function(csv,$) {
  $(document).ready(function() {
    $.ajax({
    	async: false, //false,
        type: "GET",  
        url: urlstatoclinico,
        dataType: "text",       
        success: function(response) {
            tablestatoclinico = $.csv.toArrays(response);
            parseStatoclinico(tablestatoclinico);
            }
        });

    $.ajax({
 async: false,
      type: "GET",  
      url: urlcodicicomuni,
      dataType: "text",       
      success: function(response) {
        tablecodicicomuni = $.csv.toArrays(response);
        $.each(tablecodicicomuni, function(index,row) {
          if (index !=0) {
            codicicomuni[row[1].toUpperCase()] = row[0];
            abitanticomuni[row[0]]=parseInt(row[2]);
          }
        });
      }
    });

    $.ajax({
		async: false,
        type: "GET",  
        url: urlsituazionecomuni,
        dataType: "text",       
        success: function(response) {
            tablesituazionecomuni = $.csv.toArrays(response);
            $("#spinmap").removeClass("spinner-border");
            $("#spinmappoints").removeClass("spinner-border");
            $("#spintable").removeClass("spinner-border");
            updatesituazionecomuni(tablesituazionecomuni);
            }
        }); 
	});
});
