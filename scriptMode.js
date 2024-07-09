var light = true;

function switchmode() {
    light = !light;
    localStorage.setItem("theme", light ? "light" : "dark");
    $("body").toggleClass("dark");
    document.getElementById('darkmode-toggle').checked = !light;
}

$(document).ready(function() {
    light = localStorage.getItem("theme") == "light";
    if (localStorage.getItem("theme") == "dark") {
        $("body").addClass("dark");
        document.getElementById('darkmode-toggle').checked = true;
    } else {
        $("body").removeClass("dark");
        document.getElementById('darkmode-toggle').checked = false;
    }
});
