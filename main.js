const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", baseURL + type + "/");                      /* the "type" parameter ends up here */
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function writeToDocument(type) {
    var el = document.getElementById('data');
    el.innerHTML = '';
    getData(type, function(data) {
        data = data.results;                                   /* results --> name of the array */

        data.forEach(function(item) {
            document.getElementById("data").innerHTML += "<p>" + item.name + "</p>";
        })
    });
}   