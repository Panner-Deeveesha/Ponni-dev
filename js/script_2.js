
var c= "rice";
var productBuy ="";
function indexfunc(){
  getproductname(c);
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
}
$(document).ready(function () {
  
  /*$("#btn-sweets").click(function () {
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
  });*/
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




//start index page

function getproductname(c){
var cateproname=c;
  getBycategory(cateproname);
}

function getBycategory(innerHTML) {
  var categroy =innerHTML;
  var data = {
      "categroy": categroy
  }
  $.ajax({
      url: "./php/getProductByCategory.php",
      type: "post",
      data: data,
      success: function (response) {
          var boo = isJsonString(response);
         
          if(boo==true){
              var obj = JSON.parse(response);
              console.log(obj);
              getPrice(obj);
             
          }else{
              console.log("Error");
          }   
  
      },
      error: function (error) {
          console.log(error);
      }
  });
}



function getPrice(obj) {
  
  $.ajax({
      url: "./php/getPrice.php",
      type: "get",
      
      success: function (response) {
          var obj2 = JSON.parse(response);
          //console.log(response);
           console.log(obj2);
          $(obj).each(function (index, value) {
              //console.log(value);
              $(obj2).each(function (index2, value2) {
                  if (value.productId == value2.productId) {
                      //console.log(value.uniqueId+":"+value2.id  );
                      value.price = value2.price;
                      value.offerPrice = value2.offerPrice;
                      //console.log(value);
                  }
              });
              
          });
          //showNewLanches(obj);
         
          displaycategories(obj);
      },
      error: function (error) {
          console.log(error);
      }
  });
}

function displaycategories(obj){
  const uniqueMap = new Map();
  
  obj.forEach((item) => {
    
    uniqueMap.set(item.productName, item);
  });
  const uniqueObjects = Array.from(uniqueMap.values());

   var t = "";
    for(let i=0;i<uniqueObjects.length;i++){
      
      t +='<div class="sampleitem">';
      t +='<p class="first-image">';
      t += '<img src="' + uniqueObjects[i].imgPath_1 + '" onmouseover="this.src=\'' + uniqueObjects[i].imgPath_2 + '\'" onmouseout="this.src=\'' + uniqueObjects[i].imgPath_1 + '\'">';
      t +='</p>';
      t +='<p class="item-product">';
      t +=uniqueObjects[i].productName;
      t +='</p>';
      t +='<p>';
      t +='<del>';
      t +="Rs."+uniqueObjects[i].price;
      t +='</del>';
      t +='<span>';
      t +="From Rs."+uniqueObjects[i].offerPrice;
      t +='</span>';
      t +='</p>';
      
      t +='</div>';
      
      document.getElementById("samplework").innerHTML=t;
      
    }

}

//finish index page

$(document).on("click", ".btn", function() {
  var innerHTML = $(this).html();
  getproductname(innerHTML);
 
});

$(document).on("click", ".cateheadings", function() {
  var innerHTML2 = $(this).find("p").text();
  getproductname(innerHTML2);
 
});

$(document).on("click", ".comanclas", function() {
  var meanuname =  $(this).html();
  getproductname(meanuname);
});

$(document).on("click", ".sampleitem", function() {
  
  var temp= $(this).find(".item-product").text();


  window.location.href = "./ponniproductpage.html?innerHTML="+temp;

 
});
productpage();
function productpage(){
  const searchParams = new URLSearchParams(window.location.search);
  if(searchParams.has('innerHTML')){
      getByproductname(searchParams.get('innerHTML')); 
  }

}
function getByproductname(innerHTML2) {
  var productName =innerHTML2;
  var data = {
      "name": productName
  }
  $.ajax({
      url: "./php/getbyproductname.php",
      type: "post",
      data: data,
      success: function (response) {
        var boo = isJsonString(response);
        
        if(boo==true){
            var obj = JSON.parse(response);
            
         
           getAvailability(obj);
           
        }else{
            console.log("Error");
        }   

    },
      error: function (error) {
          console.log(error);
      }
  });
  
}
function getAvailability(obj){

 
    $.ajax({
      url: "./php/getAllavailability.php",
      type: "get",
      success: function (response) {
          var obj2 = JSON.parse(response);
          
          $(obj).each(function (index, value) {
             
              $(obj2).each(function (index2, value2) {
                  if (value.productId == value2.productId) {
                      //console.log(value.uniqueId+":"+value2.id  );
                      value.availability = value2.availability;
                     
                    
                  }
              });
              
          });
          //showNewLanches(obj);
         console.log(obj);
       
         productpagegetPrice(obj);
          
      
      },
      error: function (error) {
          console.log(error);
      }
  });
  
}
function productpagegetPrice(obj) {
  $.ajax({
      url: "./php/getPrice.php",
      type: "get",
      success: function (response) {
          var obj2 = JSON.parse(response);
          //console.log(response);
          // console.log(obj);
          $(obj).each(function (index, value) {
              //console.log(value);
              $(obj2).each(function (index2, value2) {
                  if (value.productId == value2.productId) {
                      //console.log(value.uniqueId+":"+value2.id  );
                      value.price = value2.price;
                      value.offerPrice = value2.offerPrice;
                      //console.log(value);
                  }
              });
              
          });
          //showNewLanches(obj);
       displayproduct(obj);
       
         
      
      },
      error: function (error) {
          console.log(error);
      }
  });
}

function displayproduct(input){
console.log(input);
  var s = "";
  var s2 ="";
  var s3="";
  s +='<div class="product-details">';
   
  s +='<h3 id="productname">';
  s +=input[0].productName;
  s +='</h3>';
  s +='<p>';
  s +='<del id="pricedetails">';
  s +="Rs."+input[0].price;
  s +='</del>';
  s +='<span id="offerpricedetails">';
  s +="From Rs."+input[0].offerPrice;
  s +='</span>';
  s +='</p>';
  s +='<p id="quantityvalue">';
  s +="QUANTITY : "+input[0].volume+input[0].unit;
  s +='</p>';
  s +='<div class="cate-grambutton">';
  for(var i=0;i<input.length;i++){
    var dynamiid='dynamic-id'+(i+1);
    if(i==0){
    
      s +='<button type="button" id="'+dynamiid+'" class="btnnormal highlightbtn" onclick="highlightbtn(this.id)">';
      
      s +=input[i].volume+" "+input[i].unit;
      s +='</button>';
    }
    else{
      s +='<button type="button" id="'+dynamiid+'" class="btnnormal" onclick="highlightbtn(this.id)">';
     s +=input[i].volume+" "+input[i].unit;
      s +='</button>';
    
    }
 
  }
  s +='</div>';

  document.getElementById("product-content").innerHTML=s;

  s2 +='<div class="carousel-item active" id="firstscrollimg" style="width:80%;height:80%;">';
  s2 +='<img src="' +input[0].imgPath_3+'" width="100%" height="100%">'
  s2 +='</div>';
  s2 +='<div class="carousel-item" id="secondscrollimg" style="width:80%;height:80%;">';
  s2 +='<img src="' +input[0].imgPath_4+'" width="100%" height="100%">'
  s2 +='</div>';
  s2 +='<div class="carousel-item" id="thirdscrollimg" style="width:80%;height:80%;">';
  s2 +='<img src="' +input[0].imgPath_5+'" width="100%" height="100%">'
  s2 +='</div>';
  s2 +='<div class="carousel-item" id="fourthscrollimg" style="width:80%;height:80%;">';
  s2 +='<img src="' +input[0].imgPath_6+'" width="100%" height="100%">'
  s2 +='</div>';

  document.getElementById("slidecarouselimg").innerHTML=s2;

  s3 +='<button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active">';
  s3 +='<img id="scroll1" src="' +input[0].imgPath_3+'">'
  s3 +='</button>';
  s3 +='<button type="button" data-bs-target="#demo" data-bs-slide-to="1">';
  s3 +='<img id="scroll2" src="' +input[0].imgPath_4+'">'
  s3 +='</button>';
  s3 +='<button type="button" data-bs-target="#demo" data-bs-slide-to="2">';
  s3 +='<img id="scroll3" src="' +input[0].imgPath_5+'">'
  s3 +='</button>';
  s3 +='<button type="button" data-bs-target="#demo" data-bs-slide-to="3">';
  s3 +='<img id="scroll4" src="' +input[0].imgPath_6+'">'
  s3 +='</button>';
  document.getElementById("slideindicatorsimg").innerHTML=s3;
  
  const inputnum = document.getElementById("getvalue");
inputnum.setAttribute("max", input[0].availability);
console.log(input[0].availability);

  $(document).on("click", ".btnnormal", function() {
    var buttons = $(".btnnormal"); // Get all buttons with the class "btnnormal"
    var index = buttons.index($(this));
    //console.log("Button clicked at index: " + index);
    document.getElementById("pricedetails").innerHTML="Rs. "+input[index].price;
    document.getElementById("quantityvalue").innerHTML="QUANTITY : "+input[index].volume+input[index].unit;
    document.getElementById("offerpricedetails").innerHTML="From Rs. "+input[index].offerPrice;
    const inputnum = document.getElementById("getvalue");
inputnum.setAttribute("max", input[index].availability);
// add to cart function


  });

  
$(document).on("click", "#productaddbutton", function() {

  var userid=1;
 var isActive=1;
  var normalbtn=document.getElementsByClassName("btnnormal");
var clickedposition;
  for(let i=0;i<normalbtn.length;i++){
  if(normalbtn[i].classList.contains("highlightbtn"))
    {
      clickedposition=i;
    }

  }
  productId=input[clickedposition].productId;
  
   var productcount=document.getElementById("getvalue").value;
   console.log(productcount);

  
  $.ajax({
      url: "./php/addtocart.php",
      type: "post",
      data: {
        productId:productId,
        productcount:productcount,
        userid:userid,
        isActive:isActive,
      },
      success:function(response){
        console.log("sucess");
      },
      error:function(xhr,status,error){
        console.log(error);
      }
  });
  
});

}

$(document).on("click", "#productaddbutton", function() {
 
  window.location.href = "./cart.html";
 
});
  
function highlightbtn(clickedid){
  var byid=document.getElementById(clickedid);
  
    $('.btnnormal').removeClass('highlightbtn');
    var innervalue=byid.innerHTML;
   
     
      byid.classList.add('highlightbtn');
   
     // console.log(input);
    //$(".pricedetails del").innerHTML=input[0].price;
}
 
function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

function incrementbtn(){
  const passwordInput = document.getElementById("getvalue");
  const maxLength = passwordInput.max;
	var getvalue=document.getElementById("getvalue").value;
	var increevalue=++getvalue;
  if(increevalue>=maxLength){
    increevalue=maxLength;
  }
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
//registerpage

function clickregbutton(){
  var inputvalues=document.querySelectorAll(".wholeregisterpage input");
  for(let i=0;i<inputvalues.length;i++){
    if(inputvalues.value=" "){
      document.getElementById("reg-emptyvalue").innerHTML="* All input filed must be filled";
    }
  }
 var passvalue=document.getElementById("reg-pwd").value;
 var fname=document.getElementById("regi-fname").value;
 var lname=document.getElementById("regi-lname").value;
 var emailvalue=document.getElementById("regi-email").value;
 var contactno=document.getElementById("regi-number").value;
 var fullname=fname+lname;
 
  if(passvalue.length<5){
    document.getElementById("reg-commend").innerHTML="* Password must be more than five letters";
    
 }
 else if(contactno.length != 10){
   document.getElementById("reg-emptyvalue").innerHTML="* Invalid contact number"
 }
 else{
  document.getElementById("reg-emptyvalue").style.display="none";
  document.getElementById("reg-commend").style.display="none";
  $.ajax({
    url: "./php/userRegister.php",
    type: "post",
    data: {
      name:fullname,
      emailvalue:emailvalue,
      passvalue:passvalue,
      contactno:contactno,
    },
    success:function(response){
      
      alert("Sucessfully Register");
      window.location.href = "./login.html";
    },
    error:function(xhr,status,error){
      console.log(error);
    }
  });
 }
}
function signincheck(){
  var loginemail=document.getElementById("email").value;
  var loginpass=document.getElementById("pwd").value;
  var data = {
      "email": loginemail,
      "password":loginpass
  }
  $.ajax({
      url: "./php/checkloginpage.php",
      type: "post",
      data: data,
      success: function (response) {
          var boo = isJsonString(response);
         
          if(boo==true){
              var obj = JSON.parse(response);
              console.log(obj);
              localStorage.setItem('token', obj.token);
              window.location.href = "./index.html";
             
          }else{
              console.log("Error");
              document.getElementById("login-commend").innerHTML="* Invalid Password and email";
          }   
  
      },
      error: function (error) {
          console.log(error);
      }
  });
}
// Check mouse movement every 1 second (adjust as needed)

setInterval(checkMouseMovement, 120000);

// Variable to store the last recorded position of the mouse
let lastMousePosition = {
  x: null,
  y: null
};

// Function to handle mouse movement
function handleMouseMove(event) {
  // Update the last recorded mouse position
  lastMousePosition.x = event.pageX;
  lastMousePosition.y = event.pageY;

}

// Event listener for mousemove event
document.addEventListener('mousemove', handleMouseMove);

// Function to check if the mouse is moving
function isMouseMoving() {
  // Check if the last recorded position is different from the current position
  return lastMousePosition.x !== null && lastMousePosition.y !== null &&
         (lastMousePosition.x !== event.pageX || lastMousePosition.y !== event.pageY);
}

// Function to periodically check if the mouse is moving
function checkMouseMovement() {
  if (isMouseMoving()) {
      console.log('Mouse is moving.');
  } else {
    window.location.href = "./login.html";
             
      console.log('Mouse is not moving.');
  }
}


//category page

function categload(){
  $(document).ready(function() {
      function getURLParameter(name) {
          var urlParams = new URLSearchParams(window.location.search);
          return urlParams.get(name);
      }
      // Get the value of the 'value' parameter from the URL
      var passvalEncoded = getURLParameter('value');
      
      // Decode the encoded value
      var passval = decodeURIComponent(passvalEncoded);
      
      // Iterate over each button
      $("#mydiv div .btn").each(function() {
          var buttonText = $(this).text(); // Get the text of the button
          if (buttonText === passval) {
            $(this).addClass("active");
            categorypagepass(passval);
          }
      });
  });
}
  
function categorypagepass(passval){
  var cateproname=passval;
  indexfunc();
  getBycategory(cateproname);
};




