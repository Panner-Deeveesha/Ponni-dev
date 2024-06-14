
var mydiv = document.getElementById("headingdiv");
var mydiv2 = document.getElementById("headingdiv2");
var menucat = document.getElementById("shopslide");
function getcategorydynamically(){
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


function printheading(obj){
  
  var categoryfirst= obj[0].category;
  var objlen = obj.length;

  var numColumns = 1; // Default to 1 column
  if (objlen > 1) {
    numColumns = objlen;
  }
  var columnWidth = 100 / numColumns + "%";
  var headcate = "";
  headcate += "<div id='mydiv' class='cate-heading'>";
  headcate += "<span class='btn active'>";
  headcate += obj[0].category;
  headcate += "</span>";
  for(i=1;i<objlen;i++){
    headcate += "<span class='btn'>";
    headcate += obj[i].category;
    headcate += "</span>";
  }
  headcate += "</div>";
  $("#headingdiv").html(headcate);


  var headcate2 = "";
  headcate2 += "<div id='mydiv2' class='cate-heading2'>";
  headcate2 += "<div class='cateheadings active2'>";
  headcate2 +="<p>";
  headcate2 += obj[0].category;
  headcate2 +="</p>";
  headcate2 += "</div>";
  for(i=1;i<objlen;i++){
    headcate2 += "<div class='cateheadings'>";
    headcate2 +="<p>";
    headcate2 += obj[i].category;
    headcate2 +="</p>";
    headcate2 += "</div>";
  }
  headcate2 += "</div>";
  $("#headingdiv2").html(headcate2);

  var headcate3 = "";
  headcate3 += "<li class='comonclas'>";
  headcate3 += "<img src='https://cdn.shopify.com/s/files/1/0604/7832/4995/files/Sweets_ed49cdae-7994-4fe9-9bea-59efe99ae09b.png?v=1706003297' class='menuimg'>";
  headcate3 +="<span class='spancls'>";
  headcate3 += obj[0].category;
  headcate3 +="</span>";
  headcate3 += "</li>";
  for(i=1;i<objlen;i++){
    headcate3 += "<li class='comonclas'>";
    headcate3 += "<img src='https://cdn.shopify.com/s/files/1/0604/7832/4995/files/Sweets_ed49cdae-7994-4fe9-9bea-59efe99ae09b.png?v=1706003297' class='menuimg'>";
    headcate3 += "<span class='spancls'>";
    headcate3 += obj[i].category;
    headcate3 += "</span>";
    headcate3 += "</li>";
  }
  $("#shopslide").html(headcate3);

  getproductname(categoryfirst);
  categload();
  var header = document.getElementById("headingdiv");
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

function popup(imgsrc,mgs,content){
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
  popup += 'Continue';
  popup +='</div>';
  document.getElementById("popup").style.display="block";
  document.getElementById("popup").innerHTML=popup;
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
              //console.log(obj);
              getPrice(obj);
             
          }else{
              //console.log("Error");
              document.getElementById("samplework").style.display="none";
              document.getElementById("noneproducts").style.display="block";
              document.getElementById("noneproducts").innerHTML="Products not found";
              var imgsrc="./assets/icons/error.png"
              var mgs="Error";
              var content="No Product Found";
              popup(imgsrc,mgs,content);
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
         
          displaycategories(obj);
      },
      error: function (error) {
          console.log(error);
      }
  });
}

function displaycategories(obj){
  document.getElementById("samplework").style.display="grid";
  document.getElementById("noneproducts").style.display="none";
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
function getorderlist(getusertoken){
  var data = {
    "userid": getusertoken    
}
$.ajax({
  url: "./php/getorderlist.php",
  type: "post",
  data: data,
  success: function (response) {
    var boo = isJsonString(response);
    
    if(boo==true){
        var obj = JSON.parse(response);
        console.log(obj);
      getorderproduct(obj);
       
    }else{
        console.log("Error");
    }   

},
  error: function (error) {
      console.log(error);
  }
});
}
function getorderproduct(obj){
 console.log(obj);
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
   console.log(obj,product);
   getpriceorder(obj,product);

    }
   
   },
   error: function (error) {
     console.log(error);
   }
 });

}
function getpriceorder(delicontent,obj){
  $.ajax({
    url: "./php/getPrice.php",
    type: "get",
    
    success: function (response) {
        var obj2 = JSON.parse(response);
        //console.log(response);
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
        console.log(delicontent,obj);
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

console.log(delicontent);
  console.log(obj);
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
       console.log(getuserid);
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
  console.log(fullobj);
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
           console.log(response);
        }else { 
          
          displayproduct(fullobj,response);     
          console.log(response);
        }
      },
      error: function (error) {
          console.log(">>"+error);
      }
  });


}

function displayproduct(input,response){
console.log(input);
console.log(response);
  var token=localStorage.getItem('token');
  var s = "";
  var s2 ="";
  var s3="";
  s +='<div class="product-details">';
   
  s +='<h3 id="productname">';
  s +=input[0].productName;
  s +='</h3>';
  if(token){
    if(response==0){
      s +='<img id="heartimg" src="./assets/icons/heart.png">';
    }
    else{
      s +='<img id="heartimg" src="./assets/icons/colorheart.png">'; 
    }
   
  }
 
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
    //console.log("Button clicked at index: " + index);
    document.getElementById("pricedetails").innerHTML="Rs. "+input[index].price;
    document.getElementById("quantityvalue").innerHTML="QUANTITY : "+input[index].volume+input[index].unit;
    document.getElementById("offerpricedetails").innerHTML="From Rs. "+input[index].offerPrice;
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




var imageSources = ["https://ponninaturals.com/assets/icons/heart.png", "https://ponninaturals.com/assets/icons/colorheart.png"];

var imageSources2 = ["./assets/icons/heart.png", "./assets/icons/colorheart.png"];

// Initialize a flag to keep track of the current image
var currentImageIndex = 0;

// Attach an event listener for the click event
myImage.addEventListener('click', function() {
  var src = this.src; // Retrieve src attribute of clicked image
            console.log(src); 
            console.log(currentImageIndex);



  

  for (var i = 0; i < imageSources.length; i++) {
    var src2 = imageSources[i];
    console.log('Comparing with image source', i, ':', src2);
    if (src2 === src) {
        console.log('Match found at index:', i);
        currentImageIndex = i;
    }
}



  console.log(currentImageIndex);
    // Toggle the current image index
    currentImageIndex = (currentImageIndex + 1) % imageSources.length;
    console.log(currentImageIndex);
   if(currentImageIndex == 1){
    myImage.src = imageSources2[currentImageIndex];
    listproductdetails (input);
    
   }
  else{
    myImage.src = imageSources2[currentImageIndex];
    removehighlighticon(input);
  }
  
});
checkTime(input);

}
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
       popup(imgsrc,mgs,content);
        
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
  popup(imgsrc,mgs,content);
 
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
 var confirmpass=document.getElementById("confirmreg-pwd").value;
 var fname=document.getElementById("regi-fname").value;
 var lname=document.getElementById("regi-lname").value;
 var emailvalue=document.getElementById("regi-email").value;
 var contactno=document.getElementById("regi-number").value;
 var fullname=fname+lname;
 
  if(passvalue.length<5){
    document.getElementById("reg-emptyvalue").style.display="none";
    document.getElementById("reg-commend").innerHTML="* Password must be more than five letters";
    
 }
 else if(passvalue != confirmpass){
  document.getElementById("reg-commend").innerHTML="* Password and confirm password must be same";
 }
 else if(contactno.length != 10){
   document.getElementById("reg-emptyvalue").innerHTML="* Invalid contact number";
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
      var imgsrc="./assets/icons/success.png";
      var mgs="Registration Successful";
      var content="Thank You! You have successfully registered on our website. You can now proceed to the payment process.";
     popup(imgsrc,mgs,content);
     setInterval(openlogin,1200);
    },
    error:function(xhr,status,error){
      console.log(error);
    }
  });
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
      var textconver = passval.toUpperCase();
      // Iterate over each button
      const screenWidth = window.innerWidth;
      if (screenWidth > 730) {
        $("#mydiv span").each(function() {
          var buttonText = this.textContent.toUpperCase(); // Get the text of the button
          if (buttonText === textconver) {
            $("#mydiv span").removeClass("active");
            $(this).addClass("active");
            categorypagepass(passval);
          }
        });
      }else{
        $("#mydiv2 div").each(function() {
          var buttonText = this.textContent.toUpperCase(); // Get the text of the button
          if (buttonText === textconver) {
            $("#mydiv2 div").removeClass("active2");
            $(this).addClass("active2");
            categorypagepass(passval);
          }
        });
      } 
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
     popup(imgsrc,mgs,content);
     
    },
    error:function(xhr,status,error){
      console.log(error);
    }
});
}
