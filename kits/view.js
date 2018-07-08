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
                for (int i = 0; i < kit.Items.L.length; i++) {

                }
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
