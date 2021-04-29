function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url);                       // the "url" parameter ends up here 
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`); // Extracts keys from obj, which is "data[0]" below (luke skywalker aka first object in the array "results")
    })

    return `<tr>${tableHeaders}</tr>`; // all the table cells (<td></td>) from above are put in line to form the tableHeaders
}

function generatePaginationButtons(next, prev) {  // since data.next or previous are urls, this triggers writeToDocument the prev or next page of data for the same type 
    if (next && prev) {
        return `<button onclick = "writeToDocument('${prev}')">Previous</button>
                <button onclick = "writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick = "writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick = "writeToDocument('${prev}')">Previous</button>`;
    }
};

function writeToDocument(url) {
    var tableRows = [];
    var el = document.getElementById('data');
    el.innerHTML = '';

    getData(url, function(data) {  // cb --> data (which is JSONparse textResponde from above: is the argument for the parameter "data")

        var pagination;
        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous);
        };

        data = data.results;  // results --> name of the array we want to target from this.responseText (aka cb aka data) 
        let tableHeaders = getTableHeaders(data[0]); // data[0] is the first object contained within the "result" object --> luke skywalker, of which we extract only the keys with the function getTableHeaders
                               
        data.forEach(function(item) {  // item: single object within the data.results array 
            var dataRow = [];

            Object.values(item).forEach(function(value) {  // this is the equiv of Object.keys(item).forEach(function(key) {var rowData = item[key].toString();}
                var rowData = value.toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });

            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, '');
    });
}   
