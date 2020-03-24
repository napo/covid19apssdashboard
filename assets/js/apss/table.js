var total = 0;
function showtotal() {
    span = document.getElementById("totale");
    txt = document.createTextNode(total);
    span.appendChild(txt);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
                        allcomuni.push(nomecomune);
                        casi = parseInt(colData)
                        allcasi.push(casi)
                        total = total + casi
                        v1000 = each1000people(codicicomuni[nomecomune],casi);
                        people = parseInt(abitanticomuni[codicicomuni[nomecomune]]);
                        percontagi = ((casi / people) * 100).toPrecision(2); 
                        percontagi = percontagi + '%'
                        ogni1000.push(v1000);
                        //cc = [nomecomune,casi,v1000];
                        //people = numberWithCommas(people);
                        data4table.push([nomecomune,casi,people,percontagi]);
                        //cc.push([allcomuni,allcasi,ogni1000])
                    }
                }
            });
          }
        });
    }
    updateTable(data4table);
}

function updateTable(indata) {
    var sizecolumns = [
                        { width: 20, targets: 0 },
                        { width: 5, targets: 1 },
                        { width: 5, targets: 2 },                        
                        { width: 5, targets: 3 }
                    ];

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
            },{
                "fixedColumns": true
            }
        ).order([1,'desc']).draw();
    });
    $('data-table').attr('width', '10px;');
}

require(['datatables','jquery'], function(datatables, $) {
    preparedatatable(dataelencocomuni)
});
