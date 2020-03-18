var total = 0;
function showtotal() {
    span = document.getElementById("totale");
    txt = document.createTextNode(total);
    span.appendChild(txt);
}

function preparedatatable() {
    var allcasi = []
    var allcomuni = []
    data4table = []
    if(typeof(dataelencocomuni[0]) === 'undefined') {
        return null;
    } else {
        $.each(dataelencocomuni, function( index, row ) {
          if(index > 0) {
            var casi = -1
            var comune = ""
            $.each(row, function( index, colData ) {
                switch(index) {
                case 0:
                    if (colData!="") {
                        comune = colData;
                        allcomuni.push(comune);
                    }
                    break;
                case 1:
                    if (comune != "") {
                        casi = parseInt(colData)
                        allcasi.push(casi)
                        total = total + casi
                    }
                    break;
                case 3:
                    if (comune != "") {
                        cc = [comune,casi]
                        data4table.push(cc)
                    }
                    break;
                } 
            });
          }
        });
    }
    updateTable(data4table)
}

function updateTable(indata) {
    /*showtotal();*/
    $("a.datadownload").attr("href", urlelencocomuni);
    $(document).ready( function () {
    $('#data-table').DataTable({
            "language":
            {
                    "sEmptyTable":     "Nessun dato presente nella tabella",
                    "sInfo":           "Vista da _START_ a _END_ di _TOTAL_ elementi",
                    "sInfoEmpty":      "Vista da 0 a 0 di 0 elementi",
                    "sInfoFiltered":   "(filtrati da _MAX_ elementi totali)",
                    "sInfoPostFix":    "",
                    "sInfoThousands":  ".",
                    "sLengthMenu":     "Visualizza _MENU_ elementi",
                    "sLoadingRecords": "Caricamento...",
                    "sProcessing":     "Elaborazione...",
                    "sSearch":         "Cerca:",
                    "sZeroRecords":    "La ricerca non ha portato alcun risultato.",
                    "oPaginate": {
                        "sFirst":      "Inizio",
                        "sPrevious":   "Precedente",
                        "sNext":       "Successivo",
                        "sLast":       "Fine"
                    },
                    "oAria": {
                        "sSortAscending":  ": attiva per ordinare la colonna in ordine crescente",
                        "sSortDescending": ": attiva per ordinare la colonna in ordine decrescente"
                    }
            },
            "data": indata
            }
        );
    });
}

require(['datatables','jquery'], function(datatables, $) {
    preparedatatable(dataelencocomuni)
});
