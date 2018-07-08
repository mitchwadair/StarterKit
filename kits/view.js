$(document).ready(function() {
    $("#siteHeader").load("../header.html", function() {
        $("#pageTitle").html("Starting With a Kit <small>View</small>");
    });
    $("#sideMenu").load("../menu.html");

    $('#menuToggleButton').on("click", function() {
        $('#sideMenu').toggleClass('active');
    });

    $("#kitUpvote").on("click", upvoteKit);

    $("#kitDownvote").on("click", downvoteKit);

    $("#kitPurchase").on("click", purchaseKit);

    loadKitInfo();
});

var loadKitInfo = function(kitName) {
    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "GET",
        "../dbtest",
        true
    );
    xhttp.onload = function() {
        var response = xhttp.response;
        if (xhttp.readyState === 4) {
            if (xhttp.status == 200){
                //alert(response);
                var kit = JSON.parse(response).Item;
                $("#kitName").html(kit.KitName.S + " <small id='kitTotalPrice'>$1337</small>");
                $("#kitDescription").html(kit.KitDescription.S);
                var s = "<div class='row'>";
                for (var i = 0; i < kit.Items.L.length; i++) {
                    s += "</div></div><div class='col-xs-12'><br></div>";
                    s += "<div class='col-xs-12' onclick='window.open(\"" + kit.Items.L[i].L[2].S + "\");' style='cursor: pointer; background: lightgrey'><div class='row'>";
                    s += "<div class='col-sm-6'>";
                    s += "<h4>" + kit.Items.L[i].L[0].S + " <small>$1337</small></h4>"
                    s += "<p>" + kit.Items.L[i].L[1].S + "</p>";
                    s += "</div>";
                    s += "<div class='col-sm-6'>";
                    s += "<img src='" + kit.Items.L[i].L[3].S + "' class='img-responsive img-rounded' alt='" + kit.Items.L[i].L[0].S + "' style='max-height: 200px; margin: auto'/>";
                    s += "</div>";
                }
                s += "</div>";
                $("#kitItems").html(s);
            } else {
                alert(response);
            }
        }
    }
    xhttp.send();
}

var upvoteKit = function() {
    alert("This will increase the rating of the kit");
}

var downvoteKit = function() {
    alert("This will decrease the rating of the kit");
}

var purchaseKit = function() {
    alert("This will purchase the kit");
}
