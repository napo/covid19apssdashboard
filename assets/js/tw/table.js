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
    return (ic)
}

function preparedatatable() {
    data4table = []
    $.each(datasituazionecomuni, function(index, row) {
        if (row.contagi > 0) {
            codice = row.codice;
            ieridimessi = dataysituazionecomuni[codice].guariti;
            ieridecessi = dataysituazionecomuni[codice].decessi;
            iericontagi = dataysituazionecomuni[codice].contagi;
            ic = addSymbolDiff(row.contagi - iericontagi);
            ig = addSymbolDiff(row.guariti - ieridimessi);
            id = addSymbolDiff(row.decessi - ieridecessi);

            data4table.push([
                row.nomecomune,
                row.contagi,
                ic,
                row.abitanti,
                row.percontagi,
                row.contagi_attuali,
                row.percontagiattuale,
                row.guariti,
                ig,
                /*
                row.decessi,
                id,
                */
                row.lastupdate
            ]);
        }
    });
    updateTable(data4table);
}

function addtooltip() {
    $('#data-table th').each(function(index) {
        var title = "nome"
        switch (index) {
            case 0:
                title = "Nome del comune del Trentino"
                break;
            case 1:
                title = "Totale persone risultate positive dal 03/03/2020"
                break;
            case 2:
                title = "Differenza di contagi rispetto al giorno precedente"
                break;
            case 3:
                title = "Totale della popolazione residente a novembre 2019"
                break;
            case 4:
                title = "Percentuale della popolazione che è stata contagiata dal 03/03/2020"
                break;
            case 5:
                title = 'Numero di persone attualmente contagiate'
            case 6:
                title = "Percentuale della popolazione attualmente contagiata"
                break;
            case 7:
                title = "Totale delle persone guarite"
                break;
            case 8:
                title = "Differenza del numero di persone guarite rispetto al giorno precedente"
                break;
            case 9:
                title = "Totale di decessi avvenuti dal 03/03/2020"
                break;
            case 10:
                title = "Differenza dei decessi rispetto al giorno precedente"
                break;
            case 11:
                title = "Data dell'aggiornamento dei dati presentati"
                break;
            default:
                title = ""
        }
        this.setAttribute('title', title);
    });

    /* Apply the tooltips */
    $('#data-table th[title]').tooltip({
        "delay": 0,
        "track": true,
        "fade": 250
    });
}

function updateTable(indata) {
    $(document).ready(function() {
        $('#data-table').DataTable({
            "language": {
                "sEmptyTable": "Nessun dato presente nella tabella",
                "sInfo": "Vista da _START_ a _END_ di _TOTAL_ elementi",
                "sInfoEmpty": "Vista da 0 a 0 di 0 elementi",
                "sInfoFiltered": "(filtrati da _MAX_ elementi totali)",
                "sInfoPostFix": "",
                "sInfoThousands": ".",
                "sLengthMenu": "Visualizza _MENU_ elementi",
                "sLoadingRecords": "Caricamento...",
                "sProcessing": "Elaborazione...",
                "sSearch": "Cerca:",
                "sZeroRecords": "La ricerca non ha portato alcun risultato.",
                "oPaginate": {
                    "sFirst": "Inizio",
                    "sPrevious": "Precedente",
                    "sNext": "Successivo",
                    "sLast": "Fine"
                },
                "oAria": {
                    "sSortAscending": ": attiva per ordinare la colonna in ordine crescente",
                    "sSortDescending": ": attiva per ordinare la colonna in ordine decrescente"
                }
            },
            "data": indata
        }).order([1, 'desc']).draw();
    });
    $('data-table').attr('width', '10px;');
}

require(['datatables', 'jquery'], function(datatables, $) {
    preparedatatable();
    addtooltip();
});