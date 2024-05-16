
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
    $(".cate-heading2 #btn-sweets").click(function () {
    $(".selectimages2").css("display", "none");
    $(".selectimages1").fadeIn("slow");
    $(".selectimages3").css("display", "none");
    $(".selectimages4").css("display", "none");
    $(".selectimages5").css("display", "none");
    $(".selectimages6").css("display", "none");
  });
  $(".cate-heading2 #btn-savouries").click(function () {
    $(".selectimages2").fadeIn("slow");
    $(".selectimages1").css("display", "none");
    $(".selectimages3").css("display", "none");
    $(".selectimages4").css("display", "none");
    $(".selectimages5").css("display", "none");
    $(".selectimages6").css("display", "none");
  });

  $(".cate-heading2 #btn-pickels").click(function () {
    $(".selectimages3").fadeIn("slow");
    $(".selectimages2").css("display", "none");
    $(".selectimages1").css("display", "none");
    $(".selectimages4").css("display", "none");
    $(".selectimages5").css("display", "none");
    $(".selectimages6").css("display", "none");
  });
  $(".cate-heading2 #btn-honey").click(function () {
    $(".selectimages3").css("display", "none");
    $(".selectimages2").css("display", "none");
    $(".selectimages1").css("display", "none");
    $(".selectimages4").fadeIn("slow");
    $(".selectimages5").css("display", "none");
    $(".selectimages6").css("display", "none");
  });
  $(".cate-heading2 #btn-masalas").click(function () {
    $(".selectimages3").css("display", "none");
    $(".selectimages2").css("display", "none");
    $(".selectimages1").css("display", "none");
    $(".selectimages4").css("display", "none");
    $(".selectimages5").fadeIn("slow");
    $(".selectimages6").css("display", "none");
  });
  $(".cate-heading2 #btn-podi").click(function () {
    $(".selectimages3").css("display", "none");
    $(".selectimages2").css("display", "none");
    $(".selectimages1").css("display", "none");
    $(".selectimages4").css("display", "none");
    $(".selectimages5").css("display", "none");
    $(".selectimages6").fadeIn("slow");
  });
  $("#heading-one").click(function(){
	  $(this).addClass("borderline");
	  $("#heading-two").removeClass("borderline");
    $(".cate-para1").css("display", "block");
	 $(".cate-para2").css("display", "none");
  });
  $("#heading-two").click(function(){
	   $(this).addClass("borderline");
	   $("#heading-one").removeClass("borderline");
    $(".cate-para1").css("display", "none");
	 $(".cate-para2").css("display", "block");
  });
});
function incrementbtn(){
	var getvalue=document.getElementById("getvalue").value;
	var increevalue=++getvalue;
	document.getElementById("getvalue").value=increevalue;
}
function decrementbtn(){
	var leastvalue=document.getElementById("getvalue").value;
	var degreevalue=--leastvalue;
	if(degreevalue==0){
		degreevalue=1;
	}
	document.getElementById("getvalue").value=degreevalue;
}
var header = document.getElementById("mydiv");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
var header2 = document.getElementById("mydiv2");
var btns2 = header2.getElementsByClassName("cateheadings");
for (var i = 0; i < btns2.length; i++) {
  btns2[i].addEventListener("click", function () {
    var current2 = document.getElementsByClassName("active2");
    current2[0].className = current2[0].className.replace(" active2", "");
    this.className += " active2";
  });
}
