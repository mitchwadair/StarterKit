$(document).ready(function() {
    $("#siteHeader").load("header.html", function() {
        $("#pageTitle").html("Starting With a Kit <small>Home</small>");
    });
    $("#sideMenu").load("menu.html");

    $('#menuToggleButton').on("click", function () {
        $('#sideMenu').toggleClass('active');
    });

    loadKits(3);
});

var viewKit = function() {
    window.location.href = "./kits/view.html?id=test";
}

var loadKits = function(numKits) {
    var s = "";
    for (var i = 0; i < numKits; i++) {
        s += "<div id='kitPreview" + i + "' class='container-fluid' style='padding: 5px'></div>"
    }
    $("#sampleKitsContainer").html(s);

    var kit = readFromDB();
    //alert(JSON.stringify(kit));

    for (var i = 0; i < numKits; i++) {
        var preview = $("#kitPreview" + i);
        preview.load("kits/kitpreview.html", function() {
            alert(preview);
            preview.find("#kitName").html(kit.KitName.S);
            preview.find("#kitDesc").html(kit.KitDescription.S);
            var numItemsInKit = kit.Items.L.length;
            var images = "<table><tr>";
            for (var j = 0; j < numItemsInKit; j++) {
                //alert(kit.Items.L[i].L[0].S);
                images += "<td>";
                images += "<img src='" + kit.Items.L[j].L[3].S + "' class='img-thumbnail rounded' alt='Item Image'/>";
                images += "</td>";
            }
            s += "</tr></table>"
            preview.find("#kitPics").html(images);
        });
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
        //alert(s);
    } else {
        alert(response);
    }
    return JSON.parse(response).Item;
}
