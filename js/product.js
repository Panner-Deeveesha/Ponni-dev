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

$(document).ready(function(){
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