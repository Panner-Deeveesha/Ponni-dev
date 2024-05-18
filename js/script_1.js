

document.getElementById('searchInput').addEventListener('input', function () {
  const searchTerm = this.value;
  const tolen = searchTerm.length;
  if(tolen == 3){
    displayProducts(searchTerm);
  }

});

function displayProducts(searchTerm) {
var obj;
	$.ajax({
      url: "./php/getAllProducts.php",
      type: "get",
      success: function (response) {
      obj = JSON.parse(response);
      //var uniqueId = [];
      // $( obj ).each(function(index,value  ) {
      //console.log(value.uniqueId);
      // uniqueId.push(value.uniqueId);
      // });
      getPrice(obj,searchTerm);
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function getPrice(obj, searchTerm) {
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
        getvalfn(obj,searchTerm);
      },
      error: function (error) {
          console.log(error);
      }
  });
}

function getvalfn(obj,searchTerm){
  var num = obj.length;

  for(i=0;i<num;i++){
    var prodname = obj[i].name;
    var prodprice = obj[i].price;
    if(prodname.includes(searchTerm) == true){
      var ulit = document.getElementById("productList");
      var liiiit= document.createElement("li");
      liiiit.classList.add("acting");
      liiiit.innerHTML = prodname + "<br><span> Price: &#x20B9</span>" + prodprice + "<hr>";
      ulit.appendChild(liiiit);
    }
  }
}

function summaonu(getname){
  console.log(getname);
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
  $(document).on("click",".acting",function(){
    var getname = $(this).html();
    summaonu(getname);
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


