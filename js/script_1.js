var ulit = document.getElementById("productList");

document.getElementById('searchInput').addEventListener('input', function () {
  const searchTerm = this.value;
  const tolen = searchTerm.length;
  ulit.innerHTML = " ";
  if(tolen >= 3){
    displayProducts(searchTerm);
  }
});

function displayProducts(searchTerm) {
  var name = searchTerm;
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
  for(i=0;i<obj.length;i++){
    var name = obj[i].uniqueId;
    var data = {
      "name": name
    }
  }
    $.ajax({
      url: "./php/pricebyunique.php",
      type: "post",
      data: data,
      success: function (response) {
        var obj2 = JSON.parse(response);
        //console.log(response);
        console.log(obj);
        $(obj).each(function (index, value) {
          //console.log(value);
            $(obj2).each(function (index2, value2) {
              if (value.uniqueId == value2.id) {
                //console.log(value.uniqueId+":"+value2.id  );
                value.price = value2.price;
                value.offerPrice = value2.offerPrice;
                //console.log(value);
              }
            });
            //showNewLanches(obj);
        });
        console.log(obj);
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
    var prodname = obj[i].name;
    var prodprice = obj[i].price;
    var offprice = obj[i].offerPrice;
    var listcreate= document.createElement("li");
    listcreate.id = "acting";
    listcreate.innerHTML ="<div id='titlesear'>" + prodname + "</div>" + "<del id='delval'> " + prodprice + "</del>" + " <span id='offpriceid'>" + offprice + "</span>";
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
          getPrice2(obj);
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
                  if (value.uniqueId == value2.id) {
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
  console.log(converttoobj);
  var hecticinsert = "";
  hecticinsert +='<div class="product-details">';  
  hecticinsert +='<h3>';
  hecticinsert +=converttoobj[0].name;
  hecticinsert +='</h3>';
  hecticinsert +='<p>';
  hecticinsert +='<del>';
  hecticinsert +="Rs."+converttoobj[0].price;
  hecticinsert +='</del>';
  hecticinsert +='<span>';
  hecticinsert +="From Rs."+converttoobj[0].offerPrice;
  hecticinsert +='</span>';
  hecticinsert +='</p>';
  hecticinsert +='<p>';
  hecticinsert +="QUANTITY : "+converttoobj[0].volume+converttoobj[0].unit;
  hecticinsert +='</p>';
  hecticinsert +='<div class="cate-grambutton">'; 
  for(let i=0;i<converttoobj.length;i++){
    hecticinsert += '<button class="btn-highlight">';
    hecticinsert += converttoobj[i].volume + " " + converttoobj[i].unit;
    hecticinsert += '</button>'
  }
  hecticinsert +='</div>';
  hecticinsert +='</div>';
  document.getElementById("product-content").innerHTML= hecticinsert;
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
  if (screenWidth > 600) {
    document.getElementById("contentsear").style.width = "45%"; 
  } else {
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
  });
  $(".blackscreen").click(function () {
    $(".blackscreen").css("display", "none");
  });

  $(document).click(function (event) {
    if (!$(event.target).closest("#searchInput").length) {
      $("#productList").css("display", "none");
    }
    else {
      $("#productList").css("display", "block");
    }
  });

  $("#searchInput2").focus(function () {
    $("#totalstart").css("display", "none");
  });

  $("#plussym").click(function () {
    $(".contentmenuslide #shopslide").slideDown("slow");
    $("#shopslide").css("display", "flex");
    $("#minussym").css("display", "block");
    $("#plussym").css("display", "none");
  });
  $("#minussym").click(function () {
    $(".contentmenuslide #shopslide").slideUp("slow");
    $("#minussym").css("display", "none");
    $("#plussym").css("display", "block");
  });
  $(document).on("click","#titlesear",function(){
    var getname = $(this).text();
    getprod(getname);
  })
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


