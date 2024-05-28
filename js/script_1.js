var ulit = document.getElementById("productList");

document.getElementById('searchInput').addEventListener('input', function () {
  const searchTerm = this.value;
  const tolen = searchTerm.length;
  ulit.innerHTML = " ";
  //console.log(tolen);
  var replacedString = searchTerm.replace(/ /g, "_");
  if(tolen >= 3){
    displayProducts(replacedString);
  }
});

function displayProducts(replacedString) {
  var name = replacedString.replace(/_/g, " ");
  var data = {
      "name": name
  }
	$.ajax({
    url: "./php/getprodbyname.php",
    type: "post",
    data: data,
    success: function (response) {
      var boo = isJsonString(response);
      if(boo==true){
          var obj = JSON.parse(response);
          Pricecheck(obj);
      }else{
          console.log("Error");
      }   
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function Pricecheck(obj) {
  var objects = obj;
  //console.log(jsonObjects);
  $.ajax({
      url: "./php/pricebyunique.php",
      type: "post",
      data: { objects: objects },
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
            //showNewLanches(obj);
        });

        //console.log(obj);
        getvalfn(obj);
      },
      error: function (error) {
        console.log(error);
      }
    });

}

function getvalfn(obj){
  //console.log(obj);
  var num = obj.length;
  /*const uniqueMap = new Map();
  obj.forEach((item) => {
    uniqueMap.set(item.name,item);
  });
  const uniqueObj =  Array.from(uniqueMap.values());*/
  for(i=0;i<num;i++){
    var t = "";
    var prodname = obj[i].productName;
    var produnit = obj[i].unit;
    var prodvol = obj[i].volume;
    var prodcat = obj[i].category;
    var prodimg = obj[i].imgPath_1;
    var listcreate= document.createElement("li");
    listcreate.classList.add("acting");
    t += "<img src="+ prodimg+" class='searimg'>";
    t += "<div class='flecls'>"
    t += "<div class='titlesear'>";
    t += prodname;
    t += "</div>";
    t += "<span id='prodcat'>";
    t += prodvol + produnit;
    t += "</span>";
    t += "</div>"
    //t += "<del id='delval'> ";
    //t += prodprice;
    //t += "</del>";
    //t += " <span id='offpriceid'>";
    //t += offprice;
    //t += "</span>";
    listcreate.innerHTML = t;
    //listcreate.innerHTML = "<img src=https://gramiyum.in/wp-content/uploads/2022/12/Coldpressed-Sesame-Oil.jpg class='searimg'>" + "<div id='titlesear'>" + prodname + "</div>" + "<del id='delval'> " + prodprice + "</del>" + " <span id='offpriceid'>" + offprice + "</span>";
    ulit.appendChild(listcreate);
  }
  
}

function getprod(getname) {
  var name = getname;
  var data = {
      "name": name
  }
  $.ajax({
    url: "./php/getbyproductname.php",
    type: "post",
    data: data,
    success: function (response) {
      var boo = isJsonString(response);
      if(boo==true){
          var obj = JSON.parse(response);
          //console.log(obj);
          getAvail(obj);
      }else{
          console.log("Error");
      }   
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

function getAvail(obj){
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
        getPrice2(obj);
    },
    error: function (error) {
        console.log(error);
    }
});
}

function getPrice2(obj) {
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
              //showNewLanches(obj);
          });
        navigatepage(obj);
      },
      error: function (error) {
          console.log(error);
      }
  });
}

function navigatepage(obj){
  var wholeobj = obj;
  const serializedObject = encodeURIComponent(JSON.stringify(wholeobj));
  const url = `ponniproductpage.html?data=${serializedObject}`;
  window.location.href = url;
}

function productpageonload(){
  const urlParams = new URLSearchParams(window.location.search);
  const serializedData = urlParams.get("data");
  const deserializedObject = JSON.parse(decodeURIComponent(serializedData));
  var converttoobj = JSON.parse(serializedData);
  //console.log(converttoobj);
  var hecticinsert = "";
  var t2 = "";
  var t3 = "";
  hecticinsert +='<div class="product-details">';  
  hecticinsert +='<h3 id="productname">';
  hecticinsert +=converttoobj[0].productName;
  hecticinsert +='</h3>';
  hecticinsert +='<p>';
  hecticinsert +='<del id="pricedetails">';
  hecticinsert +="Rs."+converttoobj[0].price;
  hecticinsert +='</del>';
  hecticinsert +='<span id="offerpricedetails">';
  hecticinsert +="From Rs."+converttoobj[0].offerPrice;
  hecticinsert +='</span>';
  hecticinsert +='</p>';
  hecticinsert +='<p id="quantityvalue">';
  hecticinsert +="QUANTITY : "+converttoobj[0].volume+converttoobj[0].unit;
  hecticinsert +='</p>';
  hecticinsert +='<div class="cate-grambutton">'; 
  for(let i=0;i<converttoobj.length;i++){
    var dynamiid='dynamic-id'+(i+1);
    if(i==0){
      hecticinsert +='<button type="button" id="'+dynamiid+'" class="btnnormal highlightbtn" onclick="highlightbtn(this.id)">';
      hecticinsert +=converttoobj[i].volume + " " + converttoobj[i].unit;
      hecticinsert +='</button>';
    }
    else{
      hecticinsert +='<button type="button" id="'+dynamiid+'"class="btnnormal" onclick="highlightbtn(this.id)">';
      hecticinsert +=converttoobj[i].volume + " " + converttoobj[i].unit;
      hecticinsert +='</button>';
    }
  }
  hecticinsert +='</div>';
  hecticinsert +='</div>';
  
  document.getElementById("product-content").innerHTML= hecticinsert;

  t2 +='<div class="carousel-item active" id="firstscrollimg" style="width:80%;height:80%;">';
  t2 +='<img src="' +converttoobj[0].imgPath_3+'" width="100%" height="100%">'
  t2 +='</div>';
  t2 +='<div class="carousel-item" id="secondscrollimg" style="width:80%;height:80%;">';
  t2 +='<img src="' +converttoobj[0].imgPath_4+'" width="100%" height="100%">'
  t2 +='</div>';
  t2 +='<div class="carousel-item" id="thirdscrollimg" style="width:80%;height:80%;">';
  t2 +='<img src="' +converttoobj[0].imgPath_5+'" width="100%" height="100%">'
  t2 +='</div>';
  t2 +='<div class="carousel-item" id="fourthscrollimg" style="width:80%;height:80%;">';
  t2 +='<img src="' +converttoobj[0].imgPath_6+'" width="100%" height="100%">'
  t2 +='</div>';

  document.getElementById("slidecarouselimg").innerHTML=t2;

  t3 +='<button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active">';
  t3 +='<img id="scroll1" src="' +converttoobj[0].imgPath_3+'">'
  t3 +='</button>';
  t3 +='<button type="button" data-bs-target="#demo" data-bs-slide-to="1">';
  t3 +='<img id="scroll2" src="' +converttoobj[0].imgPath_4+'">'
  t3 +='</button>';
  t3 +='<button type="button" data-bs-target="#demo" data-bs-slide-to="2">';
  t3 +='<img id="scroll3" src="' +converttoobj[0].imgPath_5+'">'
  t3 +='</button>';
  t3 +='<button type="button" data-bs-target="#demo" data-bs-slide-to="3">';
  t3 +='<img id="scroll4" src="' +converttoobj[0].imgPath_6+'">'
  t3 +='</button>';
  document.getElementById("slideindicatorsimg").innerHTML=t3;

  $(document).on("click", ".btnnormal", function() {
    var buttons = $(".btnnormal"); // Get all buttons with the class "btnnormal"
    var index = buttons.index($(this));
    //console.log("Button clicked at index: " + index);
    document.getElementById("pricedetails").innerHTML="Rs. "+converttoobj[index].price;
    document.getElementById("quantityvalue").innerHTML="QUANTITY : "+converttoobj[index].volume+converttoobj[index].unit;
    document.getElementById("offerpricedetails").innerHTML="From Rs. "+converttoobj[index].offerPrice;
  });

  const inputnum = document.getElementById("getvalue");
  inputnum.setAttribute("max", converttoobj[0].availability);

  $(document).on("click", "#productaddbutton", function() {

    var userid=103;
    var isActive=1;
    var normalbtn=document.getElementsByClassName("btnnormal");
    var clickedposition;
    for(let i=0;i<normalbtn.length;i++){
    if(normalbtn[i].classList.contains("highlightbtn"))
      {
        clickedposition=i;
      }
  
    }
    productId=converttoobj[clickedposition].productId;
    
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
          console.log("success");
        },
        error:function(xhr,status,error){
          console.log(error);
        }
  
  
    });
  });
}

document.getElementById('searchInput2').addEventListener('input', function () {
  const searchTerm2 = this.value;
  displayProd(searchTerm2);
});

function displayProd(searchTerm2) {
	$.ajax({
    url: "./php/getAllProducts.php",
    type: "get",
    success: function (response) {
      var obj = JSON.parse(response);
      //var uniqueId = [];
      // $( obj ).each(function(index,value  ) {
      //console.log(value.uniqueId);
      // uniqueId.push(value.uniqueId);
      // });
      console.log(obj);
    },
    error: function (error) {
      console.log(error);
    }
  });
   var num = obj.length;
   console.log(num);
}

function openNav() {
  document.getElementById("searchsort").style.width = "100%";
  const screenWidth = window.innerWidth;
  if (screenWidth > 990) {
    document.getElementById("searchsort").style.display = "none";
    document.getElementById("contentsear").style.display = "none"; 
  } else if(screenWidth > 775){
    document.getElementById("searchsort").style.display = "block";
    document.getElementById("contentsear").style.display = "block"; 
    document.getElementById("contentsear").style.width = "40%";
  } else{
    document.getElementById("searchsort").style.display = "block";
    document.getElementById("contentsear").style.display = "block"; 
    document.getElementById("contentsear").style.width = "80%";
  }
}

function closeNav() {
  document.getElementById("searchsort").style.width = "0%";
  document.getElementById("contentsear").style.width = "0";
}

function openmenu() {
  const screenWidth = window.innerWidth;
  if (screenWidth > 990) {
    document.getElementById("menusort").style.width = "100%";
    document.getElementById("menusear").style.left = "auto";
    document.getElementById("menusear").style.right = "0";
    document.getElementById("menusear").style.width = "25%";

  } else {
    document.getElementById("menusort").style.width = "100%";
    document.getElementById("menusear").style.left = "0";
    document.getElementById("menusear").style.right = "auto";
    document.getElementById("menusear").style.width = "70%";
  }
}

function closemenu() {
  document.getElementById("menusort").style.width = "0%";
  document.getElementById("menusear").style.width = "0";
}

const cartCountElement = document.getElementById('cartCount');
let quantityInputs = 0;

/*function updateCartCount() {
  cartItemCount = Array.from(quantityInputs).reduce(
      (total, input) => total + parseInt(input.value),
      1
  );
  cartCountElement.innerText = cartItemCount;
}
updateCartCount();*/

function addItemToCart() {
  quantityInputs++; // Increment count
  cartCountElement.textContent = quantityInputs; // Update the span content
}
addItemToCart();

$(document).ready(function () {
  $("#searchInput").focus(function () {
    $(".blackscreen").css("display", "block");
    $("#productList").css("display", "block");
  });
  $(".blackscreen").click(function () {
    $(".blackscreen").css("display", "none");
    $("#productList").css("display", "none");
  });

  /*$(document).click(function (event) {
    if ($(event.target).closest("#searchInput").length) {
      $("#productList").css("display", "none");
    }
    else {
      $("#productList").css("display", "block");
    }
  });*/

  $("#searchInput2").focus(function () {
    $("#totalstart").css("display", "none");
  });

  $("#plussym").click(function () {
    $(".contentmenuslide #shopslide").slideToggle("slow");
    $("#shopslide").css("display", "flex");
    $("#minussym").toggle();
    $("#plussym").toggle();
  });

  $("#shopnowid").click(function () {
    $(".contentmenuslide #shopslide").slideToggle("slow");
    $("#shopslide").css("display", "flex");
    $("#minussym").toggle();
    $("#plussym").toggle();
  });

  $(document).on("click",".acting",function(){
    var getname = $(this).find(".titlesear").text();
    getprod(getname);
  });

  $(document).on("click", ".comonclas", function() {
    var passval = $(this).find(".spancls").text();
    window.location.href = "./categories.html?value=" + passval;
  });
  
  /*$("#iconsearch").click(function(){
    $(".blackscreen").css("top","0");
    $(".blackscreen").css("z-index","99");
    $("#navhead").css("z-index","5");
    $(".blackscreen").css("display", "block");
    $("#searchsort").css("display","block");
    $("#searchsort").addClass("open");
  });
  $("#closeid").click(function(){
    $(".blackscreen").css("top","5");
    $("#navhead").css("z-index","10");
    $(".blackscreen").css("z-index","3");
    $(".blackscreen").css("display", "none");
    $("#searchsort").css("display","none");
    $("#searchsort").removeClass("open");
  });*/
});


