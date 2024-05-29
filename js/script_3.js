$("#footer-plus1").click(function () {
  $(".footer-main3 .footer-contact").slideDown("slow");
  $("#footer-minus1").css("display", "block");
  $("#footer-plus1").css("display", "none");
});
$("#footer-minus1").click(function () {
  $(".footer-main3 .footer-contact").slideUp("slow");
  $("#footer-minus1").css("display", "none");
  $("#footer-plus1").css("display", "block");
});
$("#footer-plus2").click(function () {
  $(".footer-main3 .footer-linklist").slideDown("slow");
  $("#footer-minus2").css("display", "block");
  $("#footer-plus2").css("display", "none");
});
$("#footer-minus2").click(function () {
  $(".footer-main3 .footer-linklist").slideUp("slow");
  $("#footer-minus2").css("display", "none");
  $("#footer-plus2").css("display", "block");
});
$("#footer-plus3").click(function () {
  $(".footer-main3 .footer-dutieslist").slideDown("slow");
  $("#footer-minus3").css("display", "block");
  $("#footer-plus3").css("display", "none");
});
$("#footer-minus3").click(function () {
  $(".footer-main3 .footer-dutieslist").slideUp("slow");
  $("#footer-minus3").css("display", "none");
  $("#footer-plus3").css("display", "block");
});
$("#footer-plus4").click(function () {
  $(".footer-main3 .footer-lastsectioncontent").slideDown("slow");
  $("#footer-minus4").css("display", "block");
  $("#footer-plus4").css("display", "none");
});
$("#footer-minus4").click(function () {
  $(".footer-main3 .footer-lastsectioncontent").slideUp("slow");
  $("#footer-minus4").css("display", "none");
  $("#footer-plus4").css("display", "block");
});

function Checkout(){
  document.getElementById("modal").style.display="block";
}

function cancelpayment(){
  document.getElementById("modal").style.display="none";
}
function continuenxt(){
  document.getElementById("payementphone1").style.display="none";
  document.getElementById("payment-adress").style.display="block";
  document.getElementById("paycontinue2").style.display="block"; 
}
function continuenxt2(){
  document.getElementById("payment-adress").style.display="none";
  document.getElementById("paycontinue2").style.display="none"; 
  document.getElementById("paymentwalletid").style.display="block"; 
}
function payuparrow(){
  document.getElementById("paydownarrow").style.display="block";
  document.getElementById("payuparrow").style.display="none";
  document.getElementById("cart-paymentproductid").style.display="none";


}
function paydownarrow(){
  document.getElementById("paydownarrow").style.display="none";
  document.getElementById("payuparrow").style.display="block";
  document.getElementById("cart-paymentproductid").style.display="block";


}
document.getElementById("paymobile").onclick = function() {
  document.getElementById("payment-adress").style.display="none";
  document.getElementById("payementphone1").style.display="block";
  document.getElementById("paycontinue2").style.display="none"; 
  document.getElementById("paymentwalletid").style.display="none"; 
};



$(document).ready(function() {
  var userId = 1;
  $.ajax({
    type: "POST",
    url: "./php/cartdetail.php",
    dataType: "json",
    data: {
      userid: userId
    },
    success: function(products) {
      console.log(products);
     
      cartByproductid(products);
     
    },
    error: function(xhr, status, error) {
      console.error("Error:", error);
    }
  });
});





    
function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

function  cartByproductid(products) {

  
  console.log(products);
 var obj=products;
 

  $.ajax({
      url: "./php/findbyproductId.php",
      type: "get",
 
      
        
      
      success: function (response) {
        var obj2 = JSON.parse(response);
        
          $(obj).each(function (index, value) {
              //console.log(value);
              $(obj2).each(function (index2, value2) {
                  if (value.productId == value2.productId) {
                      //console.log(value.uniqueId+":"+value2.id  );
                      value.productId = value2.productId;
                      value.productName = value2.productName;
                      value.volume=value2.volume;
                      value.imgPath_1=value2.imgPath_1;
                      //console.log(value);
                  }
              });
              
          });
          console.log(obj);
          getcartPrice(obj);
    },
      error: function (error) {
          console.log(error);
      }
  });
  
}



function getcartPrice(obj) {
  
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
         
         console.log(obj);
        getcartcount(obj);
      },
      error: function (error) {
          console.log(error);
      }
  });
}


function getcartcount(obj) {
  $.ajax({
    url: "./php/connectcount.php",
    type: "get",
    success: function(response) {
      var obj2 = JSON.parse(response);
      var productCounts = {};
      obj2.forEach(function(product) {
        var productId = product.productId;
        var count = parseInt(product.count);

        if (productId in productCounts) {
          productCounts[productId] += count;
        } else {
          productCounts[productId] = count;
        }
      });

      console.log(productCounts);

      $(obj).each(function(index, value) {
        var productId = value.productId;
        var count = productCounts[productId];
        if (count !== undefined) {
          value.count = count;
        }
      });

    
      var uniqueProducts = {};
      var uniqueObj = [];
      $(obj).each(function(index, value) {
        if (!(value.productId in uniqueProducts)) {
          uniqueProducts[value.productId] = true;
          uniqueObj.push(value);
        }
      });

      console.log(uniqueObj);

      displaycartdetails(uniqueObj);
    },
    error: function(error) {
      console.log(error);
    }
  });
}


function displaycartdetails(obj){
  var cartItems = {};

  var totalSum = 0; 
   var cartDiv = "";
    for(let i=0;i<obj.length;i++){
      var cartincrement='';
      var productValue = obj[i].offerPrice * obj[i].count; 
      totalSum += productValue;
         
          cartDiv += '<div class="cart-description1">';
          cartDiv += `<img src='${obj[i].imgPath_1}' width="100px" height="100px">`;
          cartDiv += '<div  class="cart-product1">';
          cartDiv += '<p class="cart-productname" >';
          cartDiv += obj[i].productName;
          cartDiv += '</p>';
          cartDiv += '<p>';
          cartDiv += obj[i].volume;
          cartDiv += '</p>';
          cartDiv += '<p>';
          cartDiv += '<img src="./assets/icons/icons8-delete-20.png">';
          cartDiv += '</p>';
          cartDiv += '</div>';
          cartDiv += '</div>';
          cartDiv += '<div class="cart-price">';
          cartDiv += '<del>';
          cartDiv += 'Rs:'+obj[i].price;
          cartDiv += '</del>';
          cartDiv += '<span class="product-price" id="cart-price1">';
          cartDiv += 'Rs:'+obj[i].offerPrice;
          cartDiv += '</span>';
          cartDiv += '</div>';
          cartDiv += '<div class="cartinputavailability">';
          cartDiv += `<button onclick="updateTotal(${i}, 'decrement')">-</button>`
    
          cartDiv += `<input id='cartincrement${i}' type="number" class="product-quantity" value='${obj[i].count}'>`;
          cartDiv += `<button onclick="updateTotal(${i}, 'increment')">+</button>`;
  
          cartDiv += '</div>';
          cartDiv += '<div class="cart-totalvalue">';
          cartDiv += `<p class="total-value">Rs:${productValue}</p>`;
          cartDiv += '</div>';
          cartDiv += '</div>';
          
          
    }
      $("#cart-descriptionid").html(cartDiv);
      $('#wholecarttotal').html("Rs."+totalSum);
     
  
    }
    function updateTotal(index, action) {
   
      var currentCount = parseInt($("#cartincrement" + index).val());
      
      
      if (action === 'increment') {
          currentCount++;
      } else if (action === 'decrement') {
          if (currentCount > 1) {
              currentCount--;
          }
      }
      
     
      $("#cartincrement" + index).val(currentCount);
  
      var newProductValue = obj[index].offerPrice * currentCount;
      
     
      $(".total-value").eq(index).text("Rs:" + newProductValue);
      
     
      var newTotalSum = 0;
      for (let i = 0; i < obj.length; i++) {
          newTotalSum += obj[i].offerPrice * parseInt($("#cartincrement" + i).val());
      }
    
      $('#wholecarttotal').html("Rs." + newTotalSum);
  }
  