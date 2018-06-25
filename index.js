$(document).ready(function() {
    $("#siteHeader").load("header.html");
    $("#sideMenu").load("menu.html");

    $('#menuToggleButton').on('click', function () {
        $('#sideMenu').toggleClass('active');
    });
});
