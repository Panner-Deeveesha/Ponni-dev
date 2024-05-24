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
function cartadding(){
    var productName =document.getElementsByClassName("cate-productlist").innerHTML;
    var productPrice = document.querySelector('.cate-amount span'); ;
       var productcount=document.getElementById("getvalue").value;
	   
    // Send product details to server using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "cart.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log("Product added to cart successfully");
        }
    };
    var data = "productName=" + encodeURIComponent(productName) + "&productPrice=" + encodeURIComponent(productPrice)+"&productcount=" + encodeURIComponent(productcount);
   console.log(data);



   xhr.send(data);
	
}

$(document).ready(function() {
 
  $.ajax({
      type: "POST",
      url: "./php/cartdetail.php",
      dataType: "json",
      success: function(products) {
        cartByproductid (products);
       
          var cartDiv = "";
          products.forEach(function(product) {
              cartDiv += '<div class="cart-description1">';
              cartDiv += '<img src="https://cdn.shopify.com/s/files/1/0604/7832/4995/files/TirunelveliHalwa2.jpg?v=1695623373&width=120">';
              cartDiv += '<div class="cart-product1">';
              cartDiv += '<p id="cart-productname">';
              cartDiv += product.productName;
              cartDiv += '</p>';
              cartDiv += '<p>';
              cartDiv += product.Quantity;
              cartDiv += '</p>';
              cartDiv += '<p>';
              cartDiv += '<img src="./assets/icons/icons8-delete-20.png">';
              cartDiv += '</p>';
              cartDiv += '</div>';
              cartDiv += '</div>';
              cartDiv += '<div class="cart-price">';
              cartDiv += '<del>';
              cartDiv += 'Rs. 189.00';
              cartDiv += '</del>';
              cartDiv += '<span class="product-price" id="cart-price1">';
              cartDiv += product.productprice;
              cartDiv += '</span>';
              cartDiv += '</div>';
              cartDiv += '<div class="cartinputavailability">';
              cartDiv += '<button onclick="updateTotal(this, -1)">';
              cartDiv += '-';
              cartDiv += '</button>';
              cartDiv += `<input id="cartgetvalue" type="number" class="product-quantity" value='${product.count}'>`;
              cartDiv += '<button onclick="updateTotal(this, 1)">';
              cartDiv += '+';
              cartDiv += '</button>';
              cartDiv += '</div>';
              cartDiv += '<div class="cart-totalvalue">';
              cartDiv += '<p class="total-value">' + product.totsl + '</p>';
              cartDiv += '</div>';
              cartDiv += '</div>';
          });
          $("#cart-descriptionid").html(cartDiv);
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

function  cartByproductid(sampleid) {
 var sampleid=JSON.stringify(sampleid);
  
  $.ajax({
      url: "./php/findbyproductId.php",
      type: "post",
      data: {
        objects:sampleid
      },
      success: function (response) {
        var boo = isJsonString(response);
       
        if(boo==true){
            var obj = JSON.parse(response);
            
         
         console.log(obj);
           
        }else{
            console.log("Error");
        }   

    },
      error: function (error) {
          console.log(error);
      }
  });
  
}
function incrementbtn1(){
	var getvalue=document.getElementById("cartgetvalue").value;
	var increevalue=++getvalue;
	document.getElementById("cartgetvalue").value=increevalue;
}
function decrementbtn1(){
	var leastvalue=document.getElementById("cartgetvalue").value;
	var degreevalue=--leastvalue;
	if(degreevalue==0){
		degreevalue=1;
	}
	document.getElementById("cartgetvalue").value=degreevalue;
}