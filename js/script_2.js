
$(document).ready(function () {
  $("#btn-sweets").click(function () {
    $(".selectimages2").css("display", "none");
    $(".selectimages1").fadeIn("slow");
    $(".selectimages3").css("display", "none");
    $(".selectimages4").css("display", "none");
    $(".selectimages5").css("display", "none");
    $(".selectimages6").css("display", "none");
  });
  $("#btn-savouries").click(function () {
    $(".selectimages2").fadeIn("slow");

    $(".selectimages1").css("display", "none");
    $(".selectimages3").css("display", "none");
    $(".selectimages4").css("display", "none");
    $(".selectimages5").css("display", "none");
    $(".selectimages6").css("display", "none");
  });

  $("#btn-pickels").click(function () {
    $(".selectimages3").fadeIn("slow");
    $(".selectimages2").css("display", "none");
    $(".selectimages1").css("display", "none");

    $(".selectimages4").css("display", "none");
    $(".selectimages5").css("display", "none");
    $(".selectimages6").css("display", "none");
  });
  $("#btn-honey").click(function () {
    $(".selectimages3").css("display", "none");
    $(".selectimages2").css("display", "none");
    $(".selectimages1").css("display", "none");

    $(".selectimages4").fadeIn("slow");
    $(".selectimages5").css("display", "none");
    $(".selectimages6").css("display", "none");
  });
  $("#btn-masalas").click(function () {
    $(".selectimages3").css("display", "none");
    $(".selectimages2").css("display", "none");
    $(".selectimages1").css("display", "none");

    $(".selectimages4").css("display", "none");
    $(".selectimages5").fadeIn("slow");
    $(".selectimages6").css("display", "none");
  });
  $("#btn-podi").click(function () {
    $(".selectimages3").css("display", "none");
    $(".selectimages2").css("display", "none");
    $(".selectimages1").css("display", "none");

    $(".selectimages4").css("display", "none");
    $(".selectimages5").css("display", "none");
    $(".selectimages6").fadeIn("slow");
  });
});
var header = document.getElementById("mydiv");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
