

var mydiv = document.getElementById("headingdiv");
var mydiv2 = document.getElementById("headingdiv2");
var menucat = document.getElementById("shopslide");
var unitMapping = {
  'milli liter': 'ml',
  'Kg': 'kg',
  'gram': 'g',
  ' liter': 'L'
};
function getcategorydynamically(){
  $("#loadinggif1").css("display","block");
  $.ajax({
    url: "./php/getcategorydynamic.php",
    type: "get",
    success: function (response) {
      var obj = JSON.parse(response);
        //console.log(obj);
        //var uniqueId = [];
      /*$(obj).each(function(index,value) {
        console.log(value.category);
        // uniqueId.push(value.uniqueId);
        // });
        //console.log(obj);
      })*/
      printheading(obj);
    },
    error: function (error) {
        console.log(error);
    }
});
}


async function printheading(obj){



  var categoryfirst= obj[0].category;
  var objlen = obj.length;

  var numColumns = 1; // Default to 1 column
  if (objlen > 1) {
    numColumns = objlen;
  }
  var columnWidth = 100 / numColumns + "%";
  var headcate = "";
  headcate += "<div id='mydiv' class='cate-heading owl-carousel owl-theme'>";
  headcate += "<div class='item'>";
  headcate += "<span class='btn active'>";
  headcate += "<img class='headingimg' src='./assets/images/"+obj[0].category+"active.png'>";
  headcate += "<p>";
  headcate += obj[0].category;
  headcate += "</p>";
  headcate += "</span>";
  headcate += "</div>";
  
  for (i = 1; i < objlen; i++) {
      headcate += "<div class='item'>";
      headcate += "<span class='btn'>";
      headcate += "<img class='headingimg' src='./assets/images/"+obj[i].category+".png'>";
      headcate += "<p>";
      headcate += obj[i].category;
      headcate += "</p>";
      headcate += "</span>";
      headcate += "</div>";
  }
  
  headcate += "</div>";
  await sleep(1000);
  $("#loadinggif1").css("display","none");
  $("#headingdiv").html(headcate);

  
  // Initialize Owl Carousel
  $(".owl-carousel").owlCarousel({
      loop: false,
      margin: 10,
      dots:false,
     
      responsive: {
          0: {
            dots:true,
            nav: false,
              items: 3,
              rewind: true
          },
          500: {
            dots:true,
            nav: true,
              items: 4,
              rewind: true
          },
          600: {
            dots:true,
            nav: true,
              items: 5,
              rewind: false
          },
          775:{
            dots:true,
            nav: true,
            items: 5,
            rewind: false
          },
          1000: {
            dots:true,
              items: 5,
              rewind: false
          }
      }
  });
  

  var headcate2 = "";
  headcate2 += "<div id='mydiv2' class='cate-heading2 owl-carousel owl-theme'>";
  headcate2 += "<div class='item'>";
  headcate2 += "<span class='cateheadings active2'>";
  headcate2 += "<img class='headingimg' src='./assets/images/" + obj[0].category + "active.png'>";
  headcate2 += obj[0].category;
  headcate2 += "</span>";
  headcate2 += "</div>";
  
  for (var i = 1; i < objlen; i++) {
      headcate2 += "<div class='item'>";
      headcate2 += "<span class='cateheadings'>";
      headcate2 += "<img class='headingimg' src='./assets/images/" + obj[i].category + ".png'>";
      headcate2 += obj[i].category;
      headcate2 += "</span>";
      headcate2 += "</div>";
  }
  
  headcate2 += "</div>";
  $("#headingdiv2").html(headcate2);
  
  // Initialize Owl Carousel
  $(".cate-heading2 .owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      dots:false,
      nav: true,
      responsive: {
          0: {
              items: 2
          },
          600: {
              items: 3
          },
          1000: {
              items: 5
          }
      }
  });
  

  var headcate3 = "";
  headcate3 += "<li class='comonclas'>";
  headcate3 += "<img src='./assets/images/" + obj[0].category + ".png' class='menuimg'>";
  headcate3 +="<span class='spancls'>";
  headcate3 += obj[0].category;
  headcate3 +="</span>";
  headcate3 += "</li>";
  for(i=1;i<objlen;i++){
    headcate3 += "<li class='comonclas'>";
    headcate3 += "<img src='./assets/images/" + obj[i].category + ".png' class='menuimg'>";
    headcate3 += "<span class='spancls'>";
    headcate3 += obj[i].category;
    headcate3 += "</span>";
    headcate3 += "</li>";
  }
  $("#shopslide").html(headcate3);

  getproductname(categoryfirst);
  categload();
 
  
}


var productBuy ="";

 
  
  

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

function popup(imgsrc,mgs,content,btn){
  var popup="";
  popup +='<div class="fullpopup">';
  popup +='<div class="popupcontent">';
  popup +='<div>';
  popup +='<img id="mgsimg" src="'+imgsrc+'">';
  popup +='</div>';
  popup +='<div>';
  popup +='<p id="mgscontent">';
  popup +=mgs;
  popup +='</p>';
  popup +='<p id="mgsinnercontent">';
  popup +=content;
  popup +='</p>';
  popup +='</div>';
  popup +='</div>';
  popup +='<div id="cancelbtn">';
  popup += btn;
  popup +='</div>';

  $("#popup").css("display","block");
  
  $("#popup").html(popup);

  $("#cancelbtn").click(function(){
    document.getElementById("popup").style.display="none";
   
  });
}


//start index page

function getproductname(categoryfirst){
var cateproname=categoryfirst;
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
           // console.log(obj);
              getPrice(obj);
             
          }else{
              //console.log("Error");
              document.getElementById("samplework").style.display="none";
              document.getElementById("noneproducts").style.display="block";
              document.getElementById("noneproducts").innerHTML="Products not found";
              var imgsrc="./assets/icons/error.png"
              var mgs="Error";
              var content="No Product Found";
              var btn="Continue";
              popup(imgsrc,mgs,content,btn);
             
          }   
  
      },
      error: function (error) {
          console.log(error);
      }
  });
}



function getPrice(obj) {
  var objects=obj;
 // console.log(objects);
  $.ajax({
      url: "./php/pricebyunique.php",
      type: "post",
      data:{objects:objects},
      success: function (response) {
          var obj2 = JSON.parse(response);
        //  console.log(response);
           //console.log(obj2);
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
         // console.log(obj);
          displaycategories(obj);
      },
      error: function (error) {
          console.log(error);
      }
  });
}

function displaycategories(obj){
  
    
  $("#noneproducts").css("display","none");

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
      t +=" Rs."+uniqueObjects[i].offerPrice;
      t +='</span>';
      t +='</p>';
      
      t +='</div>';
      
      //document.getElementById("samplework").innerHTML=t;
      $("#samplework").html(t);
    }
    const count = uniqueObjects.length;

  // Determine number of columns dynamically
  let columns = count >= 4 ? 4 : count; // Adjust to a maximum of 4 columns or as needed
  
  // Set grid-template-columns dynamically
  if ($(window).width() > 1200) {
  $(".sweets-images").css({
    "grid-template-columns": "repeat(" + columns + ", auto)",
    "grid-gap": "40px"
});
  
  // Adjust justification based on number of items
  if (count < 4) {
    $(".sweets-images").css("justify-content", "center");
  } else {
    $(".sweets-images ").css("justify-content", "center");
  }
}
if (count === 5) {
  $(".sweets-images").css({
      "grid-template-columns": "repeat(4, auto)",
      "grid-auto-rows": "auto" // Ensure rows adjust dynamically based on content
  });

  // Move the 5th item to the second row
  $(".sampleitem:nth-child(5)").css({
      "grid-column": "1 / span 4", // Span all 4 columns
      "grid-row": "2" // Place in the second row
  });
}

    /*var header = document.getElementById("headingdiv");
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
    }*/
      var header = document.getElementById("headingdiv");
      if (header) {
        var btns = header.getElementsByClassName("btn");
        for (var i = 0; i < btns.length; i++) {
          btns[i].addEventListener("click", function() {
            // Remove 'active' class from previously active button
            var currentActive = header.querySelector(".btn.active");
            if (currentActive) {
              currentActive.classList.remove("active");
              // Reset previous active button's image src
              var prevImg = currentActive.getElementsByClassName("headingimg")[0];
              var prevCategoryName = currentActive.getElementsByTagName("p")[0].innerText;
              prevImg.src = "./assets/images/" + prevCategoryName + ".png";
            }
            
            // Add 'active' class to the clicked button
            this.classList.add("active");
            
            // Update clicked button's image src
            var imgElement = this.getElementsByClassName("headingimg")[0];
            var newCategoryName = this.getElementsByTagName("p")[0].innerText;
            imgElement.src = "./assets/images/" + newCategoryName + "active.png";
          });
        }
      }
      var header2 = document.getElementById("headingdiv");
      if (header2) {
        var btns2 = header2.getElementsByClassName("btn");
        for (var i = 0; i < btns2.length; i++) {
          btns2[i].addEventListener("click", function() {
            // Remove 'active' class from previously active button
            var currentActive = header2.querySelector(".btn.active");
            if (currentActive) {
              currentActive.classList.remove("active");
              // Reset previous active button's image src
              var prevImg = currentActive.getElementsByClassName("headingimg")[0];
              var prevCategoryName = currentActive.getElementsByTagName("p")[0].innerText;
              prevImg.src = "./assets/images/" + prevCategoryName + ".png";
            }
            
            // Add 'active' class to the clicked button
            this.classList.add("active");
            
            // Update clicked button's image src
            var imgElement = this.getElementsByClassName("headingimg")[0];
            var newCategoryName = this.getElementsByTagName("p")[0].innerText;
            imgElement.src = "./assets/images/" + newCategoryName + "active.png";
          });
        }
      }
      
}

//finish index page

$(document).on("click", ".headingimg", function() {
  var innerText = $(this).closest('.btn').find("p").text();
  getproductname(innerText);
});

$(document).on("click", ".cateheadings", function() {
  var innerHTML2 = $(this).html();
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

$(document).on("click", ".item-name", function() {
  
  var ordertemp=  $(this).html();



  window.location.href = "./ponniproductpage.html?innerHTML="+ordertemp;

 
});
$(document).on("click", "#orderdetails", function() {
  window.location.href = "./order.html";



 
});


function gettokenfororder(){
  var getusertoken;
  const token = localStorage.getItem('token');
 if(token){
  var data = {
    "token": token
    
}
  $.ajax({
    url: "./php/getuserId.php",
    type: "post",
    data: data,
    success: function (response) {
     
      var boo = isJsonString(response);
      
      if(boo==true){
          var obj = JSON.parse(response);
         
          getusertoken=obj[0].id;
        //console.log(getuserid);
        getorderlist(getusertoken);
         
      }else{
          console.log("Error");
      }   

  },
    error: function (error) {
        console.log(error);
    }
});
 }
 else{
  document.getElementById("noproductdisplay").style.display="block";
 }
    
}
function getorderlist(getusertoken){
  var data = {
    "userid": getusertoken    
}
$.ajax({
  url: "./php/getorderlist.php",
  type: "post",
  data: data,
  success: function (response) {
   // console.log(response);
    var boo = isJsonString(response);
    
    if(boo==true){
        var obj = JSON.parse(response);
       // console.log(obj);
      getorderproduct(obj);
       
    }else{
      document.getElementById("noproductdisplay").style.display="block";
    }   

},
  error: function (error) {
      console.log(error);
  }
});
}
function getorderproduct(obj){
 //console.log(obj);
 var products=obj;

 $.ajax({
   url: "./php/findbyproductId.php",
   type: "post",
   data: {
     products: products
   },
   success: function (response) {
    
     var boo=isJsonString(response);
    if(boo==true){
   var product=JSON.parse(response);
   //console.log(obj,product);
   getpriceorder(obj,product);

    }
   
   },
   error: function (error) {
     console.log(error);
   }
 });

}
function getpriceorder(delicontent,obj){
  var objects=obj;
 // console.log(objects);
  $.ajax({
      url: "./php/pricebyunique.php",
      type: "post",
      data:{objects:objects},
      success: function (response) {
          var obj2 = JSON.parse(response);
         // console.log(response);
           //console.log(obj2);
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
         // console.log(delicontent,obj);
        displayorderproducts(delicontent,obj);
    
      },
      error: function (error) {
          console.log(error);
      }
  });
 
}
function displayorderproducts(delicontent,obj){
   var orderdetail="";
   delicontent.sort((a, b) => {
    // Extracting the product numbers
    let productIdA = parseInt(a.productId.slice(3));
    let productIdB = parseInt(b.productId.slice(3));

    // Comparing product numbers
    return productIdA - productIdB;
});

//console.log(delicontent);
  //console.log(obj);
for(let i=0;i<obj.length;i++){
  orderdetail +="<div class='displaygridorders'>";
  orderdetail +="<div class='orderinnerimg'>";
  orderdetail +="<p class='first-image'>";
  orderdetail +="<img src="+obj[i].imgPath_1+">";
  orderdetail +="</p>";
  orderdetail +=" </div>";
  orderdetail +=" <div class='orderproductname'>";
  orderdetail +="<p>";
  orderdetail +="<b class='item-name'>";
  orderdetail +=obj[i].productName;
  orderdetail +="</b>";
  orderdetail +="</p>";
  orderdetail +="<p>";
  orderdetail +="orderId:12";
  orderdetail +="</p>";
  orderdetail +="<p>";
  orderdetail +="orderdate: "+delicontent[i].orderedDate;
  orderdetail +="</p>";
  orderdetail +="</div>";
  orderdetail +="<div class='pricefororders'>";
  orderdetail +="<p>";
  orderdetail +="<del>";
  orderdetail += "Rs : "+obj[i].price;
  orderdetail +="</del>";
  orderdetail +="<span>";
  orderdetail += "Rs : "+obj[i].offerPrice;
  orderdetail +="</span>";
  orderdetail +="</p>";
  orderdetail +="</div>";
  orderdetail +="<div class='ratetheproduct'>";
if((delicontent[i].delivered) =="no"){
  orderdetail +="<p>";
  orderdetail +="Track Order";
  orderdetail +="</p>";
  orderdetail +="<p class='colorrate'>";
  orderdetail +="Delivery by "+ delicontent[i].estimatedDeliveryDate;
  orderdetail +="</p>";
}
 else{
  orderdetail +="<p class='colorrate'>";
  orderdetail +="Deliverd on "+ delicontent[i].DeliveredDate;
  orderdetail +="</p>";
 }
  
  orderdetail +="</div>";
  orderdetail +="</div>";
 
}
document.getElementById("getdynamicorder").innerHTML=orderdetail;

}
$(document).on("click", ".orderinnerimg", function() {
  var itemName = $(this).closest('.displaygridorders').find('.item-name').text();
  console.log(itemName); // Display the inner text of the .item-name class

 

  window.location.href = "./ponniproductpage.html?innerHTML="+itemName;

 
});

function productpage(){
  const searchParams = new URLSearchParams(window.location.search);
  const token = localStorage.getItem('token');

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
            
            console.log(obj);
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
       //  console.log(obj);
       
         productpagegetPrice(obj);
          
      
      },
      error: function (error) {
          console.log(error);
      }
  });
  
}

function productpagegetPrice(obj) {

  var objects=obj;
 // console.log(objects);
  $.ajax({
      url: "./php/pricebyunique.php",
      type: "post",
      data:{objects:objects},
      success: function (response) {
          var obj2 = JSON.parse(response);
        //  console.log(response);
           //console.log(obj2);
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
          getuseridforlike(obj);
    
      },
      error: function (error) {
          console.log(error);
      }
  });
 

}
function getuseridforlike(fullobj){

  var token=localStorage.getItem('token');

if(token){
  var data = {
    "token": token  
}
 $.ajax({
   url: "./php/getuserId.php",
   type: "post",
   data: data,
   success: function (response) {
     var boo = isJsonString(response);
     
     if(boo==true){
         var obj = JSON.parse(response);
        
        var getuserid=obj[0].id;
       //console.log(getuserid);
      checkwishlistproduct(getuserid,fullobj);
        
     }else{
         console.log("Error");
     }   

 },
   error: function (error) {
       console.log(error);
   }
});
}
else{
  var response=0;
  displayproduct(fullobj,response);
}
 
}

function checkwishlistproduct(getuserid,fullobj){
 // console.log(fullobj);
  var productname=fullobj[0].productName;
  var data = {
      "userid": getuserid,
      "productname":productname
  }
  
  $.ajax({
      url: "./php/checkwishproduct.php",
      type: "post",
      data: data,
      success: function (response) {   
            
         if (response === "1") {
         
          displayproduct(fullobj,response);
           //console.log(response);
        }else { 
          
          displayproduct(fullobj,response);     
          //console.log(response);
        }
      },
      error: function (error) {
          console.log(">>"+error);
      }
  });


}

function displayproduct(input,response){
console.log(input);
//console.log(response);
var br="";

 var br = "<p>";
 br += '<a href="index.html">';
 br += "Home / ";
 br += "</a>";
 br += '<a class="cate-bread">';
 br += input[0].category;
 br += "</a>";
 br += "<a>";
 br += " / "+input[0].productName;
 br += "</a>";
 
$("#dynamicbread").html(br);

var unitAbbreviation = unitMapping[input[0].unit] || input[0].unit;
  var token=localStorage.getItem('token');
  var s = "";
  var s2 ="";
  var s3="";
  s +='<div class="product-details">';
   
  s +='<h3 id="productname">';
  s +=input[0].productName;
  if(token){
    if(response==0){
      s +='<img id="heartimg" src="./assets/icons/heart.png">';
    }
    else{
      s +='<img id="heartimg" src="./assets/icons/colorheart.png">'; 
    }
   
  }
 
  s +='</h3>';
 
  s +='<p>';
  
  s +='<del id="pricedetails">';
  s +="Rs."+input[0].price;
  s +='</del>';
  s +='<span id="offerpricedetails">';
  s +=" Rs."+input[0].offerPrice;
  s +='</span>';
  s +='</p>';
  s +='<p id="quantityvalue">';
  s +="Quantity : ";
  s +="<span>";
  s += input[0].volume+ unitAbbreviation;
  s +="</span>";
  s +='</p>';
  s +='<div class="cate-grambutton">';
  for(var i=0;i<input.length;i++){
    var unitAbbreviate = unitMapping[input[i].unit] || input[i].unit;
    var dynamiid='dynamic-id'+(i+1);
    if(i==0){
      s +='<button type="button" id="'+dynamiid+'" class="btnnormal highlightbtn" onclick="highlightbtn(this.id)">';
      
      s +=input[i].volume+" "+unitAbbreviate;
      s +='</button>';
    }
    else{
      s +='<button type="button" id="'+dynamiid+'" class="btnnormal" onclick="highlightbtn(this.id)">';
     s +=input[i].volume+" "+unitAbbreviate;
      s +='</button>';
    
    }
 
  }
  s +='</div>';

  document.getElementById("product-content").innerHTML=s;
  var dyul="";
  dyul +='<ul>';
  dyul +='<li>';
  dyul +=input[0].Highlight1;

  dyul +='</li>';
  dyul +='<li>';
  dyul +=input[0].Highlight2;

  dyul +='</li>';
  dyul +='<li>';
  dyul +=input[0].Highlight3;

  dyul +='</li>';
  dyul +='<li>';
  dyul +=input[0].Highlight4;

  dyul +='</li>';
  
  dyul +='</ul>';
  document.getElementById("cate-des").innerHTML=dyul;


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

  var prodes="";

  prodes +='<p>';
  prodes +=input[0].productDescription;
  prodes +='</p>';
  document.getElementById("dynamic-descr").innerHTML=prodes;

  var prodes2="";

  prodes2 +='<p>';
  prodes2 +='<b>';
  prodes2 +='Ingredients - ';

  prodes2 +='</b>';
  prodes2 +=input[0].ingredients;
  prodes2 +='</p>';

  prodes2 +='<p>';
  prodes2 +='<b>';
  prodes2 +='shelfLife - ';

  prodes2 +='</b>';
  prodes2 +=input[0].shelfLife;
  prodes2 +='</p>';

  prodes2 +='<p>';
  prodes2 +='<b>';
  prodes2 +='packing - ';

  prodes2 +='</b>';
  prodes2 +=input[0].packing;
  prodes2 +='</p>';

  prodes2 +='<p>';
  prodes2 +='<b>';
  prodes2 +='sourcedFrom - ';

  prodes2 +='</b>';
  prodes2 +=input[0].sourcedFrom;
  prodes2 +='</p>';

  document.getElementById("dynamic-descr2").innerHTML=prodes2;



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
//console.log(input[0].availability);

  $(document).on("click", ".btnnormal", function() {
    var buttons = $(".btnnormal"); // Get all buttons with the class "btnnormal"
    var index = buttons.index($(this));
    var unitAbbreviate = unitMapping[input[index].unit.toLowerCase()] || input[index].unit;
    //console.log("Button clicked at index: " + index);
    document.getElementById("pricedetails").innerHTML="Rs. "+input[index].price;
    document.getElementById("quantityvalue").innerHTML="QUANTITY : "+input[index].volume+unitAbbreviate;
    document.getElementById("offerpricedetails").innerHTML=" Rs. "+input[index].offerPrice;
    const inputnum = document.getElementById("getvalue");
inputnum.setAttribute("max", input[index].availability);
// add to cart function


  });

 
$(document).on("click", "#productaddbutton", function() {
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
   //console.log(productcount);

  var getusertoken;
  const token = localStorage.getItem('token');
  if (token) {
    var data = {
      "token": token
      
  }
    $.ajax({
      url: "./php/getuserId.php",
      type: "post",
      data: data,
      success: function (response) {
        var boo = isJsonString(response);
        
        if(boo==true){
            var obj = JSON.parse(response);
           
            getusertoken=obj[0].id;
          //console.log(getuserid);
          setcarttable(getusertoken,productId,productcount)
           
        }else{
            console.log("Error");
        }   

    },
      error: function (error) {
          console.log(error);
      }
  });
   
} 
else {
    var ipAddress=localStorage.getItem('Local_IP');
    //console.log(ipAddress);
    setcartaddress(ipAddress,productId,productcount);
}  
});
var myImage = document.getElementById('heartimg');




var imageSources = ["./assets/icons/heart.png", "./assets/icons/colorheart.png"];

var imageSources2 = ["/assets/icons/heart.png", "/assets/icons/colorheart.png"];

// Initialize a flag to keep track of the current image
var currentImageIndex = 0;

// Attach an event listener for the click event
if(myImage){
  myImage.addEventListener('click', function() {
    var src = this.src; // Retrieve src attribute of clicked image
              console.log(src); 
              console.log(currentImageIndex);
  
              for(let i=0;i<imageSources2.length;i++){
                var currentsrc=imageSources2[i];
              
                var foundIndex = src.indexOf(currentsrc);
                if (foundIndex !== -1) {
                   currentImageIndex=i;
                  
                } 
              }
             
  
  
  
    //console.log(currentImageIndex);
      // Toggle the current image index
      currentImageIndex = (currentImageIndex + 1) % imageSources.length;
     // console.log(currentImageIndex);
     if(currentImageIndex == 1){
      myImage.src = imageSources[currentImageIndex];
      listproductdetails (input);
      
     }
    else{
      myImage.src = imageSources[currentImageIndex];
      removehighlighticon(input);
    }
    
  });

}




// Attach an event listener for the click event

checkTime(input);

}
$(document).on("click", ".cate-bread", function() {
  var passval = $(this).text();
  window.location.href = "./categories.html?value=" + passval;
});
function removehighlighticon(input){
  var wishproduct=input[0].productName;
  
  var token=localStorage.getItem('token');
  deletelike(token,wishproduct);
}
function listproductdetails (input){
  console.log(input[0].productName);
  var wishproduct=input[0].productName;
  
      var token=localStorage.getItem('token');
      getuserid(token,wishproduct);
  
  }
function deletelike(token,wishproduct){
    var data = {
      "token": token
     
  }
  $.ajax({
      url: "./php/getuserId.php",
      type: "post",
      data: data,
      success: function (response) {
          var boo = isJsonString(response);
         
          if(boo==true){
              var obj = JSON.parse(response);
              deletedetails(obj,wishproduct);   
          }else{
              console.log("Error");
              
          }   
  
      },
      error: function (error) {
          console.log(error);
      }
  });
  
  }
  function deletedetails(obj,wishproduct){
    var id=obj[0].id;

    $.ajax({
      url: "./php/deletewishproducts.php",
      type: "post",
      data: {
        userid:id,
        wishproduct:wishproduct 
      },
      success:function(response){
        var imgsrc="./assets/icons/success.png";
        var mgs="Success";
        var content="The product is Removed From WishList";
        var btn="Continue";
       popup(imgsrc,mgs,content,btn);
        
      },
      error:function(xhr,status,error){
        console.log(error);
      }
  });

  }
function setcartaddress(ipAddress,productId,productcount){

  $.ajax({
    url: "./php/cartbyipaddress.php",
    type: "post",
    data: {
      productId:productId,
      productcount:productcount,
        ipAddress:ipAddress,
     
    },
    success:function(response){
      //console.log("sucess");
    },
    error:function(xhr,status,error){
      console.log(error);
    }
});
}
function setcarttable(userid,productId,productcount){
 
  $.ajax({
    url: "./php/addtocart.php",
    type: "post",
    data: {
      productId:productId,
      productcount:productcount,
      userid:userid,
     
    },
    success:function(response){
      //console.log("sucess");
    },
    error:function(xhr,status,error){
      console.log(error);
    }
});
}

$(document).on("click", "#productaddbutton", function() {
 


  var imgsrc="./assets/icons/success.png";
  var mgs="Success";
  var content="Product Added to Cart";
  var btn="Continue";
  popup(imgsrc,mgs,content,btn);

 
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

function setphonenum(){
 
  var contactno = document.getElementById("regi-number").value;
  
  // Encode contactno to ensure it's URL-safe
  var encodedContactno = encodeURIComponent(contactno);
  
  // Redirect to register.html with contactno as a query parameter
  window.location.href = "./register.html?contactno=" + encodedContactno;
 
}
function getQueryParam(param) {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
function setContactNumber() {
  var contactno = getQueryParam('contactno');
  if (contactno) {
    document.getElementById('regi-number1').value = contactno;
  }
}
document.addEventListener('keydown', function(event) {
  // Check if Enter key (keyCode 13) was pressed
  if (event.keyCode === 13) {
      // Check if all input fields are filled
      if (areAllInputsFilled()) {
          // Call your function here
          clickregbutton();
      }
  }
});
let password=document.getElementById("pwd");
if(password){
  document.getElementById("pwd").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        signincheck();
    }
  });
}

function areAllInputsFilled() {
  var inputValues = document.querySelectorAll(".register-innerdiv input");
  for (let i = 0; i < inputValues.length; i++) {
      if (inputValues[i].value.trim() === "") {
          return false; // Return false if any input field is empty
      }
  }
  return true; // Return true if all input fields are filled
}
function clickregbutton(){
  var inputValues = document.querySelectorAll(".wholeregisterpage input");
  var isEmpty = false;
  
  for (let i = 0; i < inputValues.length; i++) {
      console.log(inputValues[i].value.trim()); // Use trim() to remove leading/trailing whitespace
  
      if (inputValues[i].value.trim() === "") {
          isEmpty = true;
          if (isEmpty) {
            document.getElementById("reg-emptyvalue").innerHTML = "* All input fields must be filled";
        } else {
            document.getElementById("reg-emptyvalue").innerHTML = ""; // Clear error message if all fields are filled
        }
      }
      
  }
  
  
 var passvalue=document.getElementById("reg-pwd").value;
 var confirmpass=document.getElementById("confirmreg-pwd").value;
 var fname=document.getElementById("regi-fname").value;

 var emailvalue=document.getElementById("regi-email").value;
 var contactno=document.getElementById("regi-number1").value;
 var fullname=fname;
 if(isEmpty == false){
  document.getElementById("reg-emptyvalue").style.display="none";
     if(passvalue.length<5){
   
    document.getElementById("reg-commend").innerHTML="* Password must be more than five letters";
    
 }
 else if(passvalue != confirmpass){
  document.getElementById("reg-commend").innerHTML="* Password and confirm password must be same";
 }
 else if(contactno.length != 10){
   document.getElementById("reg-commend2").innerHTML="* Invalid contact number";
 }
 else{
  document.getElementById("reg-commend2").style.display="none";
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
      var imgsrc="./assets/icons/success.png";
      var mgs="Registration Successful";
      var content="Thank You! You have successfully registered on our website. You can now proceed to the payment process.";
      var btn="Continue";
      popup(imgsrc,mgs,content,btn);
     
     setInterval(openlogin,1200);
    },
    error:function(xhr,status,error){
      console.log(error);
    }
  });
 }
 }

}
function openlogin(){
  window.location.href = "./login.html"
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
              posttoken(obj);
              localStorage.setItem('token', obj.token);   
             
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
function posttoken(obj){
 
  var loginid=JSON.parse(obj[0].id);
  var logintoken=obj.token;
  var data = {
    "id": loginid,
    "token":logintoken
}
$.ajax({
    url: "./php/tokenpost.php",
    type: "post",
    data: data,
    success: function () {
      
window.location.href = "./index.html";
    },
    error: function (error) {
        console.log(error);
    }
});
}

function removetoken(){
  
  const token = localStorage.getItem('token');
  var data = {
    
    "token":token
}
  $.ajax({
    url: "./php/removeToken.php",
    type: "post",
    data: data,
    success: function () {
      localStorage.removeItem('token');
     
    },
    error: function (error) {
        console.log(error);
    }
});
}



function categload() {
  $(document).ready(function() {
    function getURLParameter(name) {
      var urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    }
    
    // Get the value of the 'value' parameter from the URL
    var passvalEncoded = getURLParameter('value');
    // Decode the encoded value
    var passval = decodeURIComponent(passvalEncoded);
   

    const screenWidth = window.innerWidth;
    var selector = (screenWidth > 730) ? "#mydiv .btn" : "#mydiv .btn";

    // Event listener for button clicks using event delegation
    $(document).on("click", selector, function() {
      // Remove 'active' class from all buttons
      $(selector).removeClass("active");

      // Add 'active' class to the clicked button
      $(this).addClass("active");

      // Update all button images to inactive state
      $(selector).each(function() {
        var imgElement = $(this).find(".headingimg")[0];
        var categoryName = $(this).find("p").text().trim();
        imgElement.src = "./assets/images/" + categoryName + ".png";
      });

      // Update clicked button's image src to active state
      var imgElement = $(this).find(".headingimg")[0];
      var newCategoryName = $(this).find("p").text().trim();
      imgElement.src = "./assets/images/" + newCategoryName + "active.png";

      // Call categorypagepass with the text content of the clicked button
      categorypagepass(newCategoryName);
    });

    // Initial highlighting based on URL parameter
    $(selector).each(function() {
      var buttonText = $(this).find("p").text().trim();
      if (buttonText === passval) {
        // Remove 'active' class from all buttons
        $(selector).removeClass("active");

        // Add 'active' class to the matched button
        $(this).addClass("active");

        // Update all button images to inactive state
        $(selector).each(function() {
          var imgElement = $(this).find(".headingimg")[0];
          var categoryName = $(this).find("p").text().trim();
          imgElement.src = "./assets/images/" + categoryName + ".png";
        });

        // Update matched button's image src to active state
        var imgElement = $(this).find(".headingimg")[0];
        imgElement.src = "./assets/images/" + buttonText + "active.png";

        // Call categorypagepass with the text content of the matched button
        categorypagepass(buttonText);
      }
    });
  });
}




function categorypagepass(passval){
  var cateproname=passval;
  getBycategory(cateproname);
};



function getuserid(token,wishproduct){
  var data = {
    "token": token
   
}
$.ajax({
    url: "./php/getuserId.php",
    type: "post",
    data: data,
    success: function (response) {
        var boo = isJsonString(response);
       
        if(boo==true){
            var obj = JSON.parse(response);
           
            setproductswish(obj,wishproduct);
           
        }else{
            console.log("Error");
            
        }   

    },
    error: function (error) {
        console.log(error);
    }
});

}
function setproductswish(obj,wishproduct){
  var id=obj[0].id;

  $.ajax({
    url: "./php/setwishproducts.php",
    type: "post",
    data: {
      userid:id,
      wishproduct:wishproduct 
    },
    success:function(response){
      var imgsrc="./assets/icons/success.png";
      var mgs="Success";
      var content="The product is Added To WishList";
      var btn="Continue";
      popup(imgsrc,mgs,content,btn);
   
     
    },
    error:function(xhr,status,error){
      console.log(error);
    }
});
}

let mouseMoved = false;
let keyPressed = false;

// Function to handle mousemove event
function handleMouseMove(event) {
    mouseMoved = true;
}

// Function to handle keydown event
function handleKeyDown(event) {
    keyPressed = true;
}

// Event listener for mousemove
document.addEventListener('mousemove', handleMouseMove);

// Event listener for keydown
document.addEventListener('keydown', handleKeyDown);

// Function to check activity every 2 minutes
function checkActivity() {
    if (mouseMoved || keyPressed) {
        console.log('User was active in the last 2 minutes');
        // Reset flags
        mouseMoved = false;
        keyPressed = false;
    } else {
        console.log('User was inactive in the last 2 minutes');
        var imgsrc="./assets/icons/warning.png";
        var mgs="Warning";
        var content="Your Session will be expired in 10 Seconds";
        var btn="Cancel";
        popup(imgsrc,mgs,content,btn);
      
       setInterval(checktoopenlogin,10 * 1000);
       
      
    }
}
function checktoopenlogin(){
  if(!mouseMoved && !keyPressed){
   openlogin();
  }
}

setInterval( tokenpresentcheckactivity,  170 * 1000);

function tokenpresentcheckactivity(){
  let token=localStorage.getItem("token");
  if(token){
    checkActivity();
  }
  else{
    console.log("token not present");
  }
}

 // 2 minutes in milliseconds
 
setInterval( tokenforcheck,  30 * 1000);


 function tokenforcheck(){
  
  const token = localStorage.getItem('token');
 if(token){
  var data = {
    "token": token
    
}
  $.ajax({
    url: "./php/gettoken.php",
    type: "post",
    data: data,
    success: function (response) {
     
      var boo = isJsonString(response);
      
      if(boo==true){
          var obj = JSON.parse(response);
         
         
        console.log(obj.status);
        var tokenstatus =obj.status;
        if(tokenstatus == "error"){
          var imgsrc="./assets/icons/warning.png";
          var mgs="Warning";
          var content="Your Account Logged in another device";
          var btn="Continue";
          popup(imgsrc,mgs,content,btn);
       
         
         setInterval( openlogin,  3 * 1000);  
        }
        
      
         
      }else{
          console.log("Error");
      }   

  },
    error: function (error) {
        console.log(error);
    }
});
 }
 else{
  console.log("no token found");
 }
    
}
$(document).ready(function(){
  $(document).on('change','#photo',function(){
    $("#img-size").css("display","none");
  
  });
});
function changeimg(){

 
    var getuserid;
    const token = localStorage.getItem('token');
   if(token){
    var data = {
      "token": token
      
  }
    $.ajax({
      url: "./php/getuserId.php",
      type: "post",
      data: data,
      success: function (response) {
       
        var boo = isJsonString(response);
        console.log(response);
        if(boo==true){
            var obj = JSON.parse(response);
           
            getuserid=obj[0].id;
         
            uploadimg(getuserid);
           
        }else{
            console.log("Error");
        }   
  
    },
      error: function (error) {
          console.log(error);
      }
  });
   }
  }
   function uploadimg(getuserid){
    var property = document.getElementById('photo').files[0];
  var image_name = property.name;
  var image_extension = image_name.split('.').pop().toLowerCase();
  console.log(getuserid);
  if(jQuery.inArray(image_extension,['jpg','jpeg','png']) == -1){
   
    var imgsrc="./assets/icons/error.png";
    var mgs="Error";
    var content="Invalid image file";
    var btn="Cancel";
    popup(imgsrc,mgs,content,btn);
    $('#photo').val(''); // Clear the file input field
  }
else{
  var form_data = new FormData();

  form_data.append("file", property);
form_data.append("userid", getuserid);

  $.ajax({
    url:'./php/upload.php',
    method:'POST',
    data: form_data,
    contentType:false,
    cache:false,
    processData:false,
    beforeSend:function(){
      $('#msg').html('Loading......');
    },
    success:function(data){
      console.log(data);
      if(data=="eror"){
        $("#img-size").css("display","block");
        $('#photo').val(''); // Clear the file input field
       
      }
     else{
      var imgsrc="./assets/icons/success.png";
      var mgs="Success";
      var content="Your Profile Image is Changed";
      var btn="Continue";
      popup(imgsrc,mgs,content,btn);
      $('#photo').val(''); // Clear the file input field
      console.log(data);
    
    let newPath = data.replace("..", ".");
       console.log(newPath);
       updateprofileimg(newPath,getuserid);
     }
    }
  });
}
 

}
function updateprofileimg(newPath,getuserid){
 
  $.ajax({
    url: "./php/updateimage.php",
    type: "post",
    data: {
      path:newPath,
      userid:getuserid,
     
    },
    success:function(response){
      console.log("sucess");
    },
    error:function(xhr,status,error){
      console.log(error);
    }
});



}
    
function opennewitem(){
  window.location.href = "./newitem.html";
 
}
var newheader = document.getElementById("newheadingdiv");
if (newheader) {
    var newbtns = newheader.getElementsByClassName("newbtn");
    for (var i = 0; i < newbtns.length; i++) {
        newbtns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("newactive");
            if (current.length > 0) {
                current[0].classList.remove("newactive");
            }
            this.classList.add("newactive");
        });
    }
}
function getnewitems(){
  $("#nonepro").css("display","none");
  $.ajax({
    url: "./php/newitemget.php",
    type: "get",
    
    success: function (response) {
   
        var obj = JSON.parse(response);
        //console.log(obj);
        //var uniqueId = [];
      /*$(obj).each(function(index,value) {
        console.log(value.category);
        // uniqueId.push(value.uniqueId);
        // });
        //console.log(obj);
      })*/
        console.log(obj);
        if(obj !="null"){
          getPricefornewitems(obj);
        }
      
      
     else{
      $("#nonepro").css("display","none");
      $("#nonepro1").css("display","block");
      $("#nonepro1").text("No New Products");
     }
    }, 
    error: function (error) {
        console.log(error);
    }
  
});
}
function getPricefornewitems(obj) {
  var objects=obj;
 // console.log(objects);
  $.ajax({
      url: "./php/pricebyunique.php",
      type: "post",
      data:{objects:objects},
      success: function (response) {
          var obj2 = JSON.parse(response);
        //  console.log(response);
           //console.log(obj2);
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
         // console.log(obj);
         displaynewitems(obj);
      },
      error: function (error) {
          console.log(error);
      }
  });
}
function displaynewitems(obj){
  $("#newwork").css("display","grid");
    
  $("#nonepro1").css("display","none");

  const uniqueMap = new Map();
  console.log(obj);
  obj.forEach((item) => {
    
    uniqueMap.set(item.productName, item);
  });
  const uniqueObjects = Array.from(uniqueMap.values());
console.log(uniqueObjects);
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
      t +=" Rs."+uniqueObjects[i].offerPrice;
      t +='</span>';
      t +='</p>';
      
      t +='</div>';
      
      //document.getElementById("samplework").innerHTML=t;
     
    }
    $("#newwork").html(t);
}
function getsellproduct(){
  $("#nonepro1").css("display","none");
  $("#newwork").css("display","none");
   
  $.ajax({
    url: "./php/deliveryproduct.php",
    type: "get",                                                                                                                                                                                                          
    success: function (response) {
      if(response != "null"){
        var obj = JSON.parse(response);
        //console.log(obj);
        //var uniqueId = [];
      /*$(obj).each(function(index,value) {
        console.log(value.category);
        // uniqueId.push(value.uniqueId);
        // });
        //console.log(obj);
      })*/
        console.log(obj);
        getsellprodcutname(obj);
      }
     else{
      $("#nonepro1").css("display","none");
      $("#nonepro").css("display","block");
      $("#nonepro").text("No Products in Most Selling");
     }
       
    },
    error: function (error) {
        console.log(error);
    }
});
}


function getsellprodcutname(obj){
 

 
  $.ajax({
    url: "./php/findbyproductId.php",
    type: "post",
    data: {
      products: obj
    },
    success: function (response) {
      var boo = isJsonString(response);

      if (boo == true) {
        var obj = JSON.parse(response);
      

   

        console.log(obj);
        sellproductprice(obj);

      } else {
        console.log("Error");
      }

    },
    error: function (error) {
      console.log(error);
    }
  });
}
function sellproductprice(obj){
  var objects=obj;
  // console.log(objects);
   $.ajax({
       url: "./php/pricebyunique.php",
       type: "post",
       data:{objects:objects},
       success: function (response) {
           var obj2 = JSON.parse(response);
         //  console.log(response);
            //console.log(obj2);
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
          console.log(obj);
          displaymostsell(obj);
       },
       error: function (error) {
           console.log(error);
       }
   });
}
function displaymostsell(obj){
  $("#newwork2").css("display","grid");
    
  $("#nonepro").css("display","none");

  const uniqueMap = new Map();
  console.log(obj);
  obj.forEach((item) => {
    
    uniqueMap.set(item.productName, item);
  });
  const uniqueObjects = Array.from(uniqueMap.values());
console.log(uniqueObjects);
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
      t +=" Rs."+uniqueObjects[i].offerPrice;
      t +='</span>';
      t +='</p>';
      
      t +='</div>';
      
      //document.getElementById("samplework").innerHTML=t;
     
    }
    $("#newwork2").html(t);

}

const regiNumberInput = document.getElementById('regi-number');
const sendOtpButton = document.getElementById('send-otp-btn');

// Add an event listener to the input field
if(regiNumberInput){
regiNumberInput.addEventListener('input', function() {
    // Get the value entered in the input field
    $("#wrongphonenum").css("display","none");
    const inputValue = regiNumberInput.value.trim(); // Trim to remove leading and trailing spaces
   
    // Check if the input value has exactly 10 digits
    if (inputValue.length === 10 && !isNaN(inputValue)) {
        // Display the Send OTP button
      
        
    } else {
        // Hide the Send OTP button if the condition is not met
        sendOtpButton.style.display = 'none';
    }
});
}



function verifyphonumber(){
  

  var phonenum=document.getElementById("regi-number").value;
 console.log(phonenum);
 var data = {
  "phonenum": phonenum
  
}
$.ajax({
  url: "./php/verifyphone.php",
  type: "post",
  data:data,
  success: function (response) {
    console.log(typeof(response));
    console.log(response);
    let response1 = response.trim();
    if (response1 == 'true') {
      var obj = JSON.parse(response);
     // $(".otpdiv").css("display","block");
      $("#send-otp-btn").css("display","block");
      $("#verifycartnumbtn").css("display","none");
        console.log(obj);
       // sendotp();

    } 
    else {
      $("#sign-inbtn").css("display","block");
      $("#verifycartnumbtn").css("display","none");
       //  $("#wrongphonenum").css("display","block");
      console.log("Error");
    }

  },
  error: function (error) {
    console.log(error);
  }
});


}


function sendotp(){

  var phonenum=document.getElementById("regi-number").value;
 console.log(phonenum);
 var data = {
  "phonenum": phonenum
  
}
  $.ajax({
    url: "./php/sendotp.php",
    type: "post",
    data:data,
    success: function (response) {
      console.log(response);
        let response1=response.trim();
        console.log(response1);
      if (response1 == "success") {
       
      
        $(".otpdiv").css("display","block");
       $("#send-otp-btn").css("display","none");
       $("#verify-otp-btn").css("display","block");

        console.log(obj);
      

      } else {
        console.log("Error");
      }

    },
    error: function (error) {
      console.log(error);
    }
  });
}


function checkotp(){
 
  var otp=document.getElementById('otpnum').value;
  var data = {
    "otp": otp
    
  }
    $.ajax({
      url: "./php/createotp.php",
      type: "post",
      data:data,
      success: function (response) {
        console.log(response);
        var boo = isJsonString(response);
       if(boo == true){
        var obj = JSON.parse(response);
        var objstatus=obj.status;
        if (objstatus == "success") {
         
          $("#wrongotp").css("display","none");
          $(".otpdiv").css("display","none");
          $("#verify-otp-btn").css("display","none");
          setphonenum();
         } 
        else {
         $("#wrongotp").css("display","block");
        }
       }
        
  
      },
      error: function (error) {
        console.log(error);
      }
    });
}


