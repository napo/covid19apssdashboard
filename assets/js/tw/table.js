var total = 0;
function showtotal() {
    span = document.getElementById("totale");
    txt = document.createTextNode(total);
    span.appendChild(txt);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function addSymbolDiff(ic) {
    if (ic > 0) {
        ic = '+' + ic.toString()
    } else {
        ic = ic.toString()
    }
    return(ic)
}

function preparedatatable() {
    data4table = []
    $.each(datasituazionecomuni, function( index, row ) {
        if (row.contagi > 0) {
            codice = row.codice;
            //ieridimessi = dataysituazionecomuni[codice].dimessi;
            ieridimessi = dataysituazionecomuni[codice].guariti;
            ieridecessi = dataysituazionecomuni[codice].decessi;
            iericontagi = dataysituazionecomuni[codice].contagi;
            ic = addSymbolDiff(row.contagi - iericontagi); //occhio
            ig = addSymbolDiff(row.guariti - ieridimessi);
            id = addSymbolDiff(row.decessi - ieridecessi);

            data4table.push([
                row.nomecomune,
                row.contagi,
                //leva22 ic,
                row.abitanti,
                row.percontagi,
                //row.dimessi,
                row.guariti,
                //leva22 ig,
                row.decessi,
                //leva22 id,
                row.lastupdate
                ]);
        }
    });
    updateTable(data4table);
}

function updateTable(indata) {
    $(document).ready( function () {
        $('#data-table').DataTable({
            "language": {
                "sEmptyTable":     "Nessun dato presente nella tabella",
                "sInfo":           "Vista da _START_ a _END_ di _TOTAL_ elementi",
                "sInfoEmpty":      "Vista da 0 a 0 di 0 elementi",
                "sInfoFiltered":   "(filtrati da _MAX_ elementi totali)",
                "sInfoPostFix":    "",
                "sInfoThousands":  ".",
                "sLengthMenu": "Visualizza _MENU_ elementi",
                "sLoadingRecords": "Caricamento...",
                "sProcessing":     "Elaborazione...",
                "sSearch":         "Cerca:",
                "sZeroRecords":    "La ricerca non ha portato alcun risultato.",
                "oPaginate": {
                    "sFirst": "Inizio",
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
        ).order([1,'desc']).draw();
    });
    $('data-table').attr('width', '10px;');
}

require(['datatables','jquery'], function(datatables, $) {
    preparedatatable();
});
