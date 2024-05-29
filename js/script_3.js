
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


    console.log("Initial products:", products);
    var obj=products;

    $.ajax({
        url: "./php/findbyproductId.php",
        type: "get",
        success: function (response) {
            console.log("Response from AJAX:", response);
            var obj2 = JSON.parse(response);
            console.log("Parsed response:", obj2);

            if (!obj2 || obj2.length === 0) {
                console.log("Error: obj2 is empty or undefined.");
                return;
            }

            if (!Array.isArray(obj) || obj.length === 0) {
                console.log("Error: products array is empty or undefined.");
                return;
            }

           
            for (var i = 0; i < obj.length; i++) {
                var value = obj[i];
                if (!value || typeof value !== 'object') {
                    console.log("Error: Invalid product found in products array at index", i);
                    continue;
                }

              
                var found = false;
                for (var j = 0; j < obj2.length; j++) {
                    var value2 = obj2[j];
                    if (value.productId === value2.productId) {
                       
                        value.productId = value2.productId;
                        value.productName = value2.productName;
                        value.volume = value2.volume;
                        value.imgPath_1 = value2.imgPath_1;
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    console.log("Warning: No matching product found for productId:", value.productId);
                }
            }

            console.log("Updated products:",obj);
            getcartPrice(obj);
        },
        error: function (error) {
            console.log("Error in AJAX request:", error);
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


function displaycartdetails(uniqueObj){
  var cartItems = {};

  var totalSum = 0; 
   var cartDiv = "";
    for(let i=0;i<uniqueObj.length;i++){
      var cartincrement='';
      var productValue = uniqueObj[i].offerPrice * uniqueObj[i].count; 
      totalSum += productValue;
         
          cartDiv += '<div class="cart-description1">';
          cartDiv += `<img src='${uniqueObj[i].imgPath_1}' width="100px" height="100px">`;
          cartDiv += '<div  class="cart-product1">';
          cartDiv += '<p class="cart-productname" >';
          cartDiv += uniqueObj[i].productName;
          cartDiv += '</p>';
          cartDiv += '<p>';
          cartDiv += uniqueObj[i].volume;
          cartDiv += '</p>';
          cartDiv += '<p>';
          cartDiv += '<img src="./assets/icons/icons8-delete-20.png">';
          cartDiv += '</p>';
          cartDiv += '</div>';
          cartDiv += '</div>';
          cartDiv += '<div class="cart-price">';
          cartDiv += '<del>';
          cartDiv += 'Rs:'+uniqueObj[i].price;
          cartDiv += '</del>';
          cartDiv += '<span class="product-price" id="cart-price1">';
          cartDiv += 'Rs:'+uniqueObj[i].offerPrice;
          cartDiv += '</span>';
          cartDiv += '</div>';
          cartDiv += '<div class="cartinputavailability">';
          cartDiv += `<button onclick="updateTotal(${i}, 'decrement')">-</button>`
    
          cartDiv += `<input id='cartincrement${i}' type="number" class="product-quantity" value='${uniqueObj[i].count}'>`;
          cartDiv += `<button onclick="updateTotal(${i}, 'increment')">+</button>`;
  
          cartDiv += '</div>';
          cartDiv += '<div class="cart-totalvalue">';
          cartDiv += `<p class="total-value">Rs:${productValue}</p>`;
          cartDiv += '</div>';
          cartDiv += '</div>';
          
          
    }
      $("#cart-descriptionid").html(cartDiv);
      $('#wholecarttotal').html("Rs."+totalSum);


      window.updateTotal = function(index, action) {

        var quantityInput = $(`#cartincrement${index}`);
        var currentValue = parseInt(quantityInput.val());
        if (action === 'increment') {
          quantityInput.val(currentValue + 1);
        } else if (action === 'decrement' && currentValue > 0) {
          quantityInput.val(currentValue - 1);
        }
  
        updateTotalSum();
      };
    
    
      function updateTotalSum() {
        totalSum = 0;
        for (let i = 0; i < uniqueObj.length; i++) {
          var productValue = uniqueObj[i].offerPrice * parseInt($(`#cartincrement${i}`).val());
          totalSum += productValue;
          $(`.total-value:eq(${i})`).text(`Rs:${productValue}`);
        }
        $('#wholecarttotal').html("Rs." + totalSum);
      }
     
  
    }
    $(document).on("click", ".cart-productname", function() {
  
      var temp1= $(this).text();
      var temp2=$("product-quantity").text();
    
      window.location.href = "./ponniproductpage.html?innerHTML="+temp1+temp2;
    
     
    });
  
  
  