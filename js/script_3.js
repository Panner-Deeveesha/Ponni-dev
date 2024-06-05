




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



 
function cartdetails() {
  var token = localStorage.getItem('token');
  console.log(token);
  
  if (token) {
      console.log('Token:', token);
      $.ajax({
          url: './php/checkuser.php',
          type: 'POST',
          data: {
              token: token
          },
          success: function(response) {
              console.log(response);
              var product1 = JSON.parse(response);
              console.log(typeof(product1));
              findUserId(product1);
          },
          error: function(xhr, status, error) {
              console.error('Error:', error);
          }
      });
  } else {
      console.log('Token not found in local storage');
      var ipAddress = localStorage.getItem('Local_IP');
      if (ipAddress) {
          console.log('IP Address:', ipAddress);
          unregisterUser(ipAddress);
      } else {
          console.log('IP Address not found in local storage');
      }
  }
}

function findUserId(product1) {
  console.log(product1);
  var userCart = product1[0].Id;
  $.ajax({
      url: './php/finduserid.php',
      type: 'POST',
      data: {
          id: userCart
      },
      success: function(response) {
          console.log(response);
          var product1 = JSON.parse(response);
          // Assuming cartByProductId is defined elsewhere
         cartByproductid(product1)
      },
      error: function(xhr, status, error) {
          console.error('Error:', error);
      }
  });
}

function unregisterUser(ip) {
  console.log(ip);

 var ip= ip;
 
  $.ajax({
      url: './php/unregisteruser.php',
      type: 'POST',
      data: {
          ip: ip
      },
      success: function(response) {
          console.log(response);
          var product = JSON.parse(response);
          // Assuming cartByProductId is defined elsewhere
          cartByproductid(product);
      },
      error: function(xhr, status, error) {
          console.error('Error:', error);
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

function cartByproductid(products) {
  console.log(typeof(products));

  // Object to store product counts
  var productCounts = {};

  // Accumulate counts for each product
  products.forEach(function(product) {
    var productId = product.productId;
    var count = parseInt(product.count);

    if (productId in productCounts) {
      productCounts[productId] += count;
    } else {
      productCounts[productId] = count;
    }
  });

  $.ajax({
    url: "./php/findbyproductId.php",
    type: "post",
    data: {
      products: products
    },
    success: function (response) {
      var boo = isJsonString(response);

      if (boo == true) {
        var obj = JSON.parse(response);
        console.log(obj);

        // Merge count information from productCounts into obj
        obj.forEach(function(objProduct) {
          var productId = objProduct.productId;
          if (productId in productCounts) {
            objProduct.count = productCounts[productId];
          }
        });

        getcartPrice(obj);

      } else {
        console.log("Error");
      }

    },
    error: function (error) {
      console.log(error);
    }
  });
}





function getcartPrice(uniqueObj) {
  console.log(uniqueObj);
  
  $.ajax({
      url: "./php/getPrice.php",
      type: "get",
      success: function (response) {
          var obj2 = JSON.parse(response);
          //console.log(response);
          // console.log(obj);
          $(uniqueObj).each(function (index, value) {
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
         
         console.log(uniqueObj);
       displaycartdetails(uniqueObj);
      },
      error: function (error) {
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
         cartDiv +='<div class="cart-all">';
          cartDiv += '<div class="cart-description1">';
          cartDiv += `<img class='imagenav'src='${uniqueObj[i].imgPath_1}' width="120px" height="120px">`;
          cartDiv += '<div  class="cart-product1">';
          cartDiv += '<p class="cart-productname" >';
          cartDiv += uniqueObj[i].productName;
          cartDiv += '</p>';
          cartDiv += '<p>';
          cartDiv += 'Quantatity:'+" "+uniqueObj[i].volume+"  "+uniqueObj[i].unit;
          cartDiv += '</p>';
          cartDiv += `<img src="./assets/icons/icons8-delete-20.png" class="delete-item" data-index="${i}">`;
          cartDiv += '</div>';
          cartDiv += '</div>';
          cartDiv += '<div class="cart-price">';
          cartDiv += '<del>';
          cartDiv += '</del>';
          cartDiv += '<span class="product-price" id="cart-price1">';
          cartDiv += 'Rs:'+" "+uniqueObj[i].offerPrice;
          cartDiv += '</span>';
          cartDiv += '</div>';
          cartDiv += '<div class="cartinputavailability">';
          cartDiv += `<button onclick="updateTotal(${i}, 'decrement')">-</button>`
    
          cartDiv += `<input id='cartincrement${i}' type="number" class="product-quantity" value='${uniqueObj[i].count}'>`;
          cartDiv += `<button onclick="updateTotal(${i}, 'increment')">+</button>`;
  
          cartDiv += '</div>';
          cartDiv += '<div class="cart-totalvalue">';
          cartDiv += `<p class="total-value">Rs: ${productValue}</p>`;
          cartDiv += '</div>';
          cartDiv += '</div>';
          cartDiv+='</div>';
          
    }
      $("#cart-descriptionid").html(cartDiv);
      $('#wholecarttotal').html("Rs."+totalSum);
    

      $(".delete-item").click(function() {
        var productId = uniqueObj[$(this).data("index")].productId; 
         console.log(productId);
         var index = $(this).data("index"); 
         uniqueObj.splice(index, 1); 
        $.ajax({
            type: "POST",
            url: "./php/deleteitem.php", 
            data: {
              action: "delete",
              productId: productId 
            },
            success: function(response) {
                console.log(response);
                displaycartdetails(uniqueObj);
            },
            error: function(xhr, status, error) {
                
                console.error(xhr.responseText);
            }
        });
    });

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
    carticoncount(uniqueObj);
  
    }
    $(document).on("click", ".cart-productname", function() {
  
      var temp1= $(this).text();
    
    
      window.location.href = "./ponniproductpage.html?innerHTML="+temp1;
    
     
    });
    $(document).on("click", ".imagenav", function() {
  
      var productName = $(this).closest('.cart-all').find('.cart-productname').text()
    
      window.location.href = "./ponniproductpage.html?innerHTML="+ productName;
    
     
    });

  function carticoncount(countobj){
    var cartCounts = document.getElementById('cartCount');
    cartCounts.forEach(function(element) {
        element.innerText = countobj.length;
    });
  }
  
   
