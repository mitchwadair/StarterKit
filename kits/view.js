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
});

var upvoteKit = function() {
    alert("This will increase the rating of the kit");
}

var downvoteKit = function() {
    alert("This will decrease the rating of the kit");
}

var purchaseKit = function() {
    alert("This will purchase the kit");
}
