$(document).ready(function() {
    $("#siteHeader").load("../header.html", function() {
        $("#pageTitle").html("Starting With a Kit <small>View</small>");
    });
    $("#sideMenu").load("../menu.html");

    $('#menuToggleButton').on('click', function () {
        $('#sideMenu').toggleClass('active');
    });
});
