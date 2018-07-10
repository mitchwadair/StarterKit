$(document).ready(function() {
    $("#siteHeader").load("header.html", function() {
        $("#pageTitle").html("Starting With a Kit <small>Home</small>");
    });
    $("#sideMenu").load("menu.html");

    $('#menuToggleButton').on("click", function () {
        $('#sideMenu').toggleClass('active');
    });

    loadKits(2);
});

var loadKits = function(numKits) {
    var s = "";
    for (var i = 0; i < numKits; i++) {
        s += "<div id='kitPreview" + i + "' class='container-fluid' style='padding: 5px'></div>"
    }
    $("#sampleKitsContainer").html(s);

    var kits = scanDB();

    //alert(JSON.stringify(kit));

    for (var i = 0; i < numKits; i++) {
        (function(){ //due to JS being dumb af, I have to wrap this dynamic html loading stuff inside a function.....
            //alert("Kit name: " + kits.Items[i].KitName.S);
            var kit = readFromDB(kits.Items[i].KitName.S);
            var preview = $("#kitPreview" + i);
            preview.load("kits/kitpreview.html", function() {
                preview.find("#kitContainer").click(function() { //this function gets called on load, so must have a dumb wrapper function to prevent instant redirect
                    viewKit(kit.KitName.S);
                });
                preview.find("#kitName").html(kit.KitName.S);
                preview.find("#kitDesc").html(kit.KitDescription.S);
                var numItemsInKit = kit.Items.L.length;
                var images = "<table style='margin: auto'><tr>";
                for (var j = 0; j < (numItemsInKit <= 4 ? numItemsInKit : 4); j++) {
                    //alert(kit.Items.L[i].L[0].S);
                    images += "<td style='padding: 2px'>";
                    images += "<img src='" + kit.Items.L[j].L[3].S + "' class='img-thumbnail rounded' alt='Item Image' style='max-height: 150px'/>";
                    images += "</td>";
                }
                s += "</tr></table>"
                preview.find("#kitPics").html(images);
            });
        })();
    }
}

var viewKit = function(name) {
    window.location.href = "./kits/view.html?id=" + name;
}

var scanDB = function(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "GET",
        "dbscan",
        false
    );
    xhttp.send();
    var response = xhttp.response;
    if (xhttp.status == 200){
        //alert(response);
        return JSON.parse(response);
    } else {
        alert(response);
    }
};

var numKits = function() {
    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "GET",
        "dbgetnumberofkits",
        false
    );
    xhttp.send();
    var response = xhttp.response;
    if (xhttp.status == 200){
        //alert(response);
        return response;
    } else {
        alert(response);
    }
};

var readFromDB = function(kitName) {
    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "GET",
        "../dbgetitem?kit=" + kitName,
        false
    );
    xhttp.send();
    var response = xhttp.response;
    if (xhttp.status == 200){
        var item = JSON.parse(response).Item;
        var s = "You've just read from the database!\n";
        s += "Kit name: " + item.KitName.S + "\n";
        s += "Kit description: " + item.KitDescription.S;
        //alert(s);
    } else {
        alert("read issue: " + response);
    }
    return JSON.parse(response).Item;
}
