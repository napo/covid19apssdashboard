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
    var ogni1000 = []
    if(typeof(dataelencocomuni[0]) === 'undefined') {
        return null;
    } else {
        $.each(dataelencocomuni, function( index, row ) {
          if(index > 0) {
            var casi = -1
            var nomecomune = "";
            cc = [];
            k = 0;
            $.each(row, function( index, colData ) {
                k = 0;
                nomecomune = row[0];
                ok = codicicomuni.hasOwnProperty(nomecomune);
                if (ok) {
                    if (index==1) {
                        console.log("songhe qui");
                        allcomuni.push(nomecomune);
                        casi = parseInt(colData)
                        allcasi.push(casi)
                        total = total + casi
                        v1000 = each1000people(codicicomuni[nomecomune],casi);
                        ogni1000.push(v1000);
                        //cc = [nomecomune,casi,v1000];
                        data4table.push([nomecomune,casi,v1000]);
                        //cc.push([allcomuni,allcasi,ogni1000])
                    }
                }
                /*
                if (index = dataelencocomuni[0].length -1) {
                    data4table.push(cc)
                }*/
                console.log(index);
                k++;
                console.log("----")
            });
          }
        });
    }
    updateTable(data4table);
}

function updateTable(indata) {
    var sizecolumns = [{ "width": "60px", "targets": 0 },
                   {"width": "40px", "targets": 1 }];
    
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
            }, {
            "columnDefs": sizecolumns
            }
        ).order([1,'desc']).draw();
    });
    $('data-table').attr('width', '10px;');
}

require(['datatables','jquery'], function(datatables, $) {
    preparedatatable(dataelencocomuni)
});
