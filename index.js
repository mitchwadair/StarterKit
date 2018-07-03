$(document).ready(function() {
    $("#siteHeader").load("header.html");
    $("#sideMenu").load("menu.html");

    $('#menuToggleButton').on('click', function () {
        $('#sideMenu').toggleClass('active');
    });

    loadKits(3);
});

var loadKits = function(numKits) {
    var s = "";
    for (var i = 0; i < numKits; i++) {
        s += "<div id='kitPreview" + i + "' class='container-fluid' style='padding: 5px'></div>"
    }
    $("#sampleKitsContainer").html(s);

    for (var i = 0; i < numKits; i++) {
        $("#kitPreview"+i).load("kits/kitpreview.html");
    }
}

var readFromDB = function() {
    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "GET",
        "dbtest",
        false
    );
    xhttp.send();
    var response = xhttp.response;
    if (xhttp.status == 200){
        var item = JSON.parse(response).Item;
        var s = "You've just read from the database!\n";
        s += "Kit name: " + item.KitName.S + "\n";
        s += "Kit description: " + item.KitDescription.S;
        alert(s);
    } else {
        alert(response);
    }
}
