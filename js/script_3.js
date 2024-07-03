
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


function cancelpayment(){
  document.getElementById("modal").style.display="none";
  document.getElementById("paymentwalletid").style.display="none";
}
function continuenxt(){
 
  document.getElementById("payment-adress").style.display="none";
  document.getElementById("paymentwalletid").style.display="block"; 
}





  cartdetails();
 
function cartdetails() {
  var token = localStorage.getItem('token');
  var ipAddress = localStorage.getItem('Local_IP');
  
  
  if (!token){
  
    var ipAddress = localStorage.getItem('Local_IP');
     
      var ip= ipAddress;
 
      $.ajax({
          url: './php/unregisteruser.php',
          type: 'POST',
          data: {
              ip: ip
          },
          success: function(response) {
            if (response!="null"){
            var boo = isJsonString(response);
            if(boo==true){
            var product =JSON.parse(response);    
      
              cartByproductid(product);
            }
          }
           else{
            $('#emptycart').css('display', 'block');
            $('#loadinggif').css('display', 'none');

           } 
          },
          error: function(xhr, status, error) {
              console.error('Error:', error);
          }
      });


 
  }
  else {
  
      checkuser1();
    }
  
}



function checkuser1(){
  var token = localStorage.getItem('token');

  var ipAddress = localStorage.getItem('Local_IP');
  if(token){
    $.ajax({
      url: './php/ipaddress.php',
      type: 'POST',
      data: {
          token: token,
          ipAddress:ipAddress
      },
      success: function(response) {
        var boo = isJsonString(response);
        if(boo==true){
          var jsonResponse = JSON.parse(response); 
          var hasProducts = jsonResponse.hasProducts;
      if (hasProducts===false){
      finduser(token);   
      }
      else{
   
       mergeuser(token,ipAddress); 
      }
    }
    else{
      
    }
    },
      error: function(xhr, status, error) {
          console.error('Error:', error);
      }
  });

  }
  
  } 
 function finduser(token){
  
  $.ajax({
    url: './php/checkuser.php',
    type: 'POST',
    data: {
        token: token,
        
    },
    success: function(response) {
      
      var boo = isJsonString(response);
          
         
      if (boo == true) {
        var product1 = JSON.parse(response);
        findUserId(product1);
      }
  
       

    },
        error: function(xhr, status, error) {
          console.error('Error:', error);
      }
  });

 }
 function mergeuser(){
  var token = localStorage.getItem('token');
  var ipAddress = localStorage.getItem('Local_IP');
 
 
  $.ajax({
    url: './php/mergeuserid.php',
    type: 'POST',
    data: {
        token: token,
        ipAddress:ipAddress

    },
    success: function(response) {
   
       if(response !="null"){
      var boo = isJsonString(response);
          
         
      if (boo == true) {
        var product1 = JSON.parse(response);
     cartByproductid(product1);
      }
    }
    else{
      $('#emptycart').css('display', 'block');
      $('#loadinggif').css('display', 'none');

    }
        
       
    },
    error: function(xhr, status, error) {
        console.error('Error:', error);
    }
});

}


function findUserId(product1) {

  var userCart = product1[0].Id;
  
  $.ajax({
      url: './php/finduserid.php',
      type: 'POST',
      data: {
          id: userCart
      },
      success: function(response) {
        var boo = isJsonString(response);
        if(response !="null"){  
         
          if (boo == true) {
            var product1 = JSON.parse(response);
         cartByproductid(product1);
          }
        }
        else{
          $('#emptycart').css('display', 'block');
          $('#loadinggif').css('display', 'none');
    
        }
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
 


  var productCounts = {};

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
         
        
          cartgetAvailability(uniqueObj);
      
      },
      error: function (error) {
          console.log(error);
      }
  });
}

function cartgetAvailability(obj){

 
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
      // console.log(obj);
     
       displaycartdetails(obj);
        
    
    },
    error: function (error) {
        console.log(error);
    }
});

}

async function displaycartdetails(uniqueObj) {
  
  $('#loadinggif').css('display', 'block');
  await sleep(1000);
  if (uniqueObj.length === 0) {
      $('#emptycart').css('display', 'block');
      $('.cart-details').css('display', 'none');
      $("#cart-descriptionid").html('');
      $('#loadinggif').css('display', 'none');
  } else {
      $('#emptycart').css('display', 'none');
      $('.cart-details').css('display', 'block');
      $('#loadinggif').css('display', 'none');
      var unitMapping = {
          'milli litre': 'ml',
          'litre': 'L',
          'Kg': 'kg',
          'gram': 'g'
      };

      var totalSum = 0;
      var cartDiv = "";
      var carticoncount=uniqueObj.length;
      for (let i = 0; i < uniqueObj.length; i++) {
          var unitAbbreviation = unitMapping[uniqueObj[i].unit.toLowerCase()] || uniqueObj[i].unit;
     
          var productValue = uniqueObj[i].offerPrice * uniqueObj[i].count;
          totalSum += productValue;

          cartDiv += '<div class="cart-all">';
          cartDiv += '<div class="cart-description1">';
          cartDiv += `<img class='imagenav' src='${uniqueObj[i].imgPath_1}' width="120px" height="120px">`;
          cartDiv += '<div class="cart-product1">';
          cartDiv += '<p class="cart-productname">';
          cartDiv += uniqueObj[i].productName;
          cartDiv += '</p>';
          cartDiv += '<p>';
          cartDiv += 'Quantity: ' + uniqueObj[i].volume + ' ' + unitAbbreviation;
          cartDiv += '</p>';
          cartDiv += `<img src="./assets/icons/icons8-delete-20.png" class="delete-item" data-index="${i}">`;
          cartDiv += '</div>';
          cartDiv += '</div>';
          cartDiv += '<div class="cart-price">';
          cartDiv += '<del></del>';
          cartDiv += '<span class="product-price" id="cart-price1">';
          cartDiv += 'Rs: ' + uniqueObj[i].offerPrice;
          cartDiv += '</span>';
          cartDiv += '</div>';
          cartDiv += '<div class="cartinputavailability">';
          cartDiv += `<button onclick="updateTotal(${i}, 'decrement')">-</button>`;
          cartDiv += `<input id='cartincrement${i}' type="number" class="product-quantity" value='${uniqueObj[i].count}' max=${uniqueObj[i].availability}>`;
          cartDiv += `<button onclick="updateTotal(${i}, 'increment')">+</button>`;
          cartDiv += '</div>';
          cartDiv += '<div class="cart-totalvalue">';
          cartDiv += `<p class="total-value">Rs: ${productValue}</p>`;
          cartDiv += '</div>';
          cartDiv += '</div>';
      }





      $("#cart-descriptionid").html(cartDiv);
      $('#wholecarttotal').html("Rs."+totalSum);
    

      $(".delete-item").click(function() {
        
        var productId = uniqueObj[$(this).data("index")].productId; 
      
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
                var imgsrc="./assets/icons/success.png";
                var mgs="success";
                var content="Product Was Removed from cart";
                var btn="Continue";
                popup(imgsrc,mgs,content,btn);
            },
            error: function(xhr, status, error) {
                
                console.error(xhr.responseText);
            }
        });
    });

      window.updateTotal = function(index, action) {
        var quantityInput = $(`#cartincrement${index}`);
        var currentValue = parseInt(quantityInput.val());
        var maxQuantity = parseInt(quantityInput.attr('max'));
      
        if (action === 'increment' && currentValue < maxQuantity) {
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
          paynowdetails(uniqueObj,totalSum);
      }
      countcheckforcart(carticoncount);
      paynowdetails(uniqueObj,totalSum);
  
       } 


    }





    $(document).on("click", ".cart-productname", function() {
  
      var temp1= $(this).text();
    
    
      window.location.href = "./ponniproductpage.html?innerHTML="+temp1;
    
     
    });
    $(document).on("click", ".imagenav", function() {
  
      var productName = $(this).closest('.cart-all').find('.cart-productname').text()
    
      window.location.href = "./ponniproductpage.html?innerHTML="+ productName;
    
     
    });

    $("#emptycartshopbtn").click(function() {

      window.location.href = "./index.html";
    });


    function Checkout(){
      document.getElementById("modal").style.display="block";

      var tokenlist= localStorage.getItem('token');
    
      var ip= localStorage.getItem('Local_IP');


      if(!tokenlist){
      document.getElementById("payementphone1").style.display="block"
      

      }

      else{
        document.getElementById("payementphone1").style.display="none" 
        document.getElementById("payment-adress").style.display="block"  
        var element = document.getElementById("payaddress");
        element.classList.add("paynowactive");
        
         var element2 = document.getElementById("paypayment");
        element2.classList.remove("paynowactive");

       $("#payaddress").click(function() {
            document.getElementById("payment-adress").style.display="block";
           document.getElementById("paymentwalletid").style.display="none"; 
              var element3 = document.getElementById("payaddress");
             element3.classList.add("paynowactive");
  
            var element4 = document.getElementById("paypayment");
              element4.classList.remove("paynowactive");

            });

            $.ajax({
              type: "POST",
              url: "./php/checkuser.php", 
              data: {
                token: tokenlist,
             
              },
              success: function(response) {
                var boo = isJsonString(response);

      if (boo == true) {
        var obj = JSON.parse(response);
        console.log(obj);
       
        var userId = obj[0].Id; 
          var currentDate = new Date();
          var year = currentDate.getFullYear();
          var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
          var date = ('0' + currentDate.getDate()).slice(-2); 
          var hours = ('0' + currentDate.getHours()).slice(-2); 
          var minutes = ('0' + currentDate.getMinutes()).slice(-2); 
          var railwayTime = hours + '#' + minutes; 

          var uniqueId = userId + '#' + year + '#' + month + '#' + date + '#' + railwayTime;
          console.log( uniqueId);


      } 
        updatecartid(uniqueId,obj);
                 
              },
              error: function(xhr, status, error) {
                  
                  console.error(xhr.responseText);
              }
          });


       
      }
    

    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }



   function updatecartid(uniqueId ,obj){
    var cartid=uniqueId;
    var userId=obj[0].Id;
    console.log(userId);
    $.ajax({
      type: "POST",
      url: "./php/addCartId.php", 
      data: {
        cartid: cartid ,
        userId:userId
      },
      success: function(response) {
         console.log(response);
        
        
      },
      error: function(xhr, status, error) {
          
          console.error(xhr.responseText);
      }
  });

   }

    function paynowdetails(obj,totalSum){
      var unitMapping1 = {
        'milli litre': 'ml',
        'litre': 'L',
        'Kg': 'kg',
        'gram': 'g'
    };

   

       let paydiv="";

     
        
      paydiv+='<div class="order-summary-wrapper " id="cart-paymentproductid">';
     
      paydiv +='<div class="cart-paymentproduct">';
     paydiv +='<ul class="cartscroll">';
     for(let i=0;i<obj.length;i++){
      var unitAbbreviation1 = unitMapping1[obj[i].unit.toLowerCase()] || obj[i].unit; 
     paydiv +='<li  class="payproductdetail">';
     paydiv +='<div class="paymentproduct-img">';
     paydiv += '<img src="' + obj[i].imgPath_1 + '" width="40px" alt="thirattipal" class="">';
      paydiv+='</div>';
     paydiv+='<div class="cartproduct-details ">';
     paydiv+='<div class="title ">'+obj[i].productName+'</div>';
     paydiv+='<div class="price">'+'Price:'+obj[i].offerPrice +'</div>';
     paydiv+='<span >'+'Quantity:'+obj[i].volume+unitAbbreviation1+'</span>';
     paydiv+='</div>';  
     paydiv+='</li>';
     }
     paydiv+='</ul>';
     paydiv+='</div>';
    
   
    paydiv+='<div class="order-summary">';
    paydiv+=' <div class="order-summary-details">';
    paydiv+='<ul>';
    paydiv+='<li class="subtotal ">';
    paydiv+= '<span>'+'Subtotal'+'</span>';
    paydiv+=' <span>'+totalSum+'</span>';
    paydiv+=' </li>';  
    paydiv+='<li class="shipping ">'
    paydiv+='<span>'+'Shipping'+'</span>'; 
    paydiv+='<span>'+'To be calculated'+'</span>';
    paydiv+='</li>';
    paydiv+='<li class="to-pay">'+'<span>'+'To Pay'+'</span>';
    paydiv+= '<span>'+totalSum+'</span>';
    paydiv+='</li>';
    paydiv+='</ul>';
    paydiv+='</div>';
    paydiv+='</div> ';
    paydiv+='</div>';
    $("#order-pay").html(paydiv);

    }
    
    function checkCheckbox(){
      var errorMessage=document.getElementById("errorMessage");
        var tokenlist1= localStorage.getItem('token');
       
      var pin=  document.getElementById("pincode").value;
     var city=document.getElementById("city").value;
     var street=document.getElementById("street").value;
     var district=document.getElementById("district").value;
     var doornum=document.getElementById("doornum").value;
  
       
     errorMessage.innerHTML = ""; 
     if ( !pin || !city || !street || !district || !doornum) {
      errorMessage.innerHTML += "Please fill in all the details.";
      return; 
  }
    
     $.ajax({
      type: "POST",
      url: "./php/paynowuser.php", 
      data: {
        token: tokenlist1,
       pin:pin,
       city:city,
       doornum:doornum,
       street:street,
       district:district
      },
      success: function(response) {
        Addaddressdetail(); 
         
      },
      error: function(xhr, status, error) {
          
          console.error(xhr.responseText);
      }
  });
     }

function Addaddressdetail(){
  var tokenlist1= localStorage.getItem('token');

$.ajax({

  type: "POST",
  url: "./php/checkuserAddress.php",
  data: {
    token: tokenlist1,
  },
  success: function(response) {
   var boo = isJsonString(response)
   if(boo==true){
    var obj=JSON.parse(response);
    console.log(obj);
    mergeAddress(obj);
   }

  },
  error: function(xhr, status, error) {
      
      console.error(xhr.responseText);
  }
});


   }



   function mergeAddress(obj) {
    var id = obj[0].Id; 

    $.ajax({
        type: "POST",
        url: "./php/mergeAddress.php",
        data: {
            id: id,
        },
        success: function(response) {
            console.log(response); 

           
            var isValidJson = isJsonString(response);
            
            if (isValidJson) {
                var obj2 = JSON.parse(response); 
                
                var uniqueMap = {}; 

                obj2.forEach(function(value) {
                    var userId = value.userId;
                    if (!uniqueMap[userId]) {
                        uniqueMap[userId] = value;
                    }
                });

        
                var uniqueObj2 = Object.values(uniqueMap);

  
                $(obj).each(function(index, value) {
                   
                    $(uniqueObj2).each(function(index2, value2) {
                        
                        if (value.Id == value2.userId) {
                            value2.AddressLine_1 = value.AddressLine_1;
                            value2.AddressLine_2 = value.AddressLine_2;
                            value2.AddressLine_3 = value.AddressLine_3;
                            value2.pincode = value.pincode;
                            value.buyId = value2.buyId;
                        }
                    });
                });

                console.log(obj); 
                adddeliveryaddress(obj);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error fetching data:", error); 
        }
    });
}

function  adddeliveryaddress(obj){

  var id=obj[0].userId;
  var AddressLine_1 =obj[0].AddressLine_1 ;
  var AddressLine_2=obj[0].AddressLine_2 ;
  var  AddressLine_3= obj[0].AddressLine_3 ;
  var pincode=obj[0].pincode;
  var buyid=obj[0].buyId;

  $.ajax({
    type: "POST",
    url: "./php/updatedelivery.php", 
    data: {
      id:id,
      AddressLine_1:AddressLine_1,
      AddressLine_2:AddressLine_2,
      AddressLine_3:AddressLine_3,
      pin:pincode,
      buyid:buyid
   
    },
    success: function(response) {
        
     
    },
    
    error: function(xhr, status, error) {
        
        console.error(xhr.responseText);
    }
});



}



   function continuenxt() {

    var tokenlist1= localStorage.getItem('token');
    var errorMessage1 = document.getElementById("errorMessage");
    var checkbox = document.getElementById("cartcheck");
    var pin1 = document.getElementById("pincode").value;
    var city1 = document.getElementById("city").value;
    var street1 = document.getElementById("street").value;
    var district1 = document.getElementById("district").value;
    var doornum1 = document.getElementById("doornum").value;
  
    errorMessage1.innerHTML = "";
  
   
    if (!pin1 || !city1 || !street1 || !district1 || !doornum1) {
      errorMessage1.innerHTML = "Please fill in all the details.";
      return;
    }
    
  
    
    document.getElementById("payment-adress").style.display = "none";
    document.getElementById("paymentwalletid").style.display = "block";
  
    var element = document.getElementById("paypayment");
    element.classList.add("paynowactive");
  
    var element2 = document.getElementById("payaddress");
    element2.classList.remove("paynowactive");

    var cartcheck=document.getElementById('cartcheck');
    var errorMessage=document.getElementById("errorMessage");
    var tokenlist1= localStorage.getItem('token');
   
  var pin=  document.getElementById("pincode").value;
 var city=document.getElementById("city").value;
 var street=document.getElementById("street").value;
 var district=document.getElementById("district").value;
 var doornum=document.getElementById("doornum").value;

    if(cartcheck.checked){
    checkCheckbox();
    }
    else{
    
      var tokenlist1= localStorage.getItem('token');

   
   $.ajax({
    type: "POST",
    url: "./php/checkuser.php", 
    data: {
      token: tokenlist1
  
    },
    success: function(response) {
      var boo = isJsonString(response);

if (boo == true) {
var obj = JSON.parse(response);
console.log(obj);
findbuyid(obj)
}
    },
    error: function(xhr, status, error) {
        
      console.error(xhr.responseText);
  }
});
     
    }

  }


function  findbuyid(obj){
  var id = obj[0].Id; 
 
  $.ajax({
    type: "POST",
    url: "./php/mergeAddress.php",
    data: {
      id: id
   
    },
    success: function(response) {
      var boo = isJsonString(response);

if (boo == true) {
var obj = JSON.parse(response);
console.log(obj);
 fetchdetail(obj);
}
    },
    error: function(xhr, status, error) {
        
      console.error(xhr.responseText);
  }
});


}



  function fetchdetail(obj){

  var buyid=obj[0].buyId;
  var id=obj[0].userId;
  console.log(id);
var pin=  document.getElementById("pincode").value;
var city=document.getElementById("city").value;
var street=document.getElementById("street").value;
var district=document.getElementById("district").value;
var doornum=document.getElementById("doornum").value;

$.ajax({
  type: "POST",
  url: "./php/deliveryaddress.php", 
  data: {
    id:id,
  
     city:city,
     doornum:doornum,
     street:street,
     district:district,
    pin:pin,
    buyid:buyid
 
  },
  success: function(response) {
      
  },
  
  error: function(xhr, status, error) {
      
      console.error(xhr.responseText);
  }
});

}




  function youmaylike(){
  

 var tokenlist= localStorage.getItem('token');
 $.ajax({
  type: "POST",
  url: "./php/youmaylike.php", 
  data: {
  token:tokenlist

  },
  success: function(response) {
    
      var boo = isJsonString(response);

      if(boo==true){
      var obj=JSON.parse(response);
    
        $('.cate-like').css("display", "block"); 
        $('.product-carousel').css("display", "block"); 

      likeproductsname(obj);
      }
      
      
     
  },
  error: function(xhr, status, error) {
      
      console.error(xhr.responseText);
  }
});


  }

  function  likeproductsname(obj){
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
       youmayprice(product);

       }
      
      },
      error: function (error) {
        console.log(error);
      }
    });


  }


  function  youmayprice(obj){
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
    
         
        
          displayyoumay(obj);
      
      },
      error: function (error) {
          console.log(error);
      }
  });

  }
  function displayyoumay(products) {
    var carouselContent = '';

    for (var i = 0; i < products.length; i++) {
        carouselContent += '<div class="item">';
        carouselContent += '<div class="product">';
        carouselContent += '<p class="first-image">';
        carouselContent += '<img src="' + products[i].imgPath_1 + '">';
        carouselContent += '</p>';
        carouselContent += '<p class="productname">';
        carouselContent += products[i].productName;
        carouselContent += '</p>';
        carouselContent += '<p class="productamount">';
        carouselContent += '<del>';
        carouselContent += 'Rs.' + products[i].price + '.00';
        carouselContent += '</del>';
        carouselContent += '<span class="offerpricepro">';
        carouselContent += 'From Rs.' + products[i].offerPrice + '.00';
        carouselContent += '</span>';
        carouselContent += '</p>';
        carouselContent += '</div>';
        carouselContent += '</div>';
    }

    var carouselContainer = document.querySelector('.product-list1');
    carouselContainer.innerHTML = carouselContent;

    var responsiveItems = {}; 

    if (products.length <= 1) {
        responsiveItems = {
            0: { items: 1 },
            900: { items: 1, dots: true, nav: false }
        };
    } else if (products.length <= 2) {
        responsiveItems = {
            0: { items: 1 },
            600: { items: 2, dots: true, nav: false }
        };
    } else if (products.length <= 3) {
        responsiveItems = {
            0: { items: 1 },
            600: { items: 2, dots: true, nav: false },
            800: { items: 3 }
        };
    } else {
        responsiveItems = {
            0: { items: 1 },
            600: { items: 2, dots: true, nav: false },
            800: { items: 4}
        };
    }

    $('.product-list1').owlCarousel({
        loop: true,
        margin: 10,
        responsive: responsiveItems,
        
    });
}
$(document).on("click", ".productname", function() {
  
  var temp1= $(this).text();


  window.location.href = "./ponniproductpage.html?innerHTML="+temp1;

 
});
$(document).on("click", ".first-image", function() {

  var productName = $(this).closest('.item').find('.productname').text()

  window.location.href = "./ponniproductpage.html?innerHTML="+ productName;

 
});

function getofferbtn() {
  $(".getofferbanner").css("display", "block");
  dynamicoffer();
}

function calculateTime(endTime) {
  var currentTime = new Date().getTime();
  var remainingTime = endTime - currentTime;

  var hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return { hours, minutes, seconds, remainingTime };
}

function updateCountdown(offer) {
  var endTime = new Date(offer[0].expiretime).getTime();
  console.log(endTime);
  localStorage.setItem('endTime', endTime);

  var time = document.getElementById('offertime');
  if (time) {
    var { hours, minutes, seconds, remainingTime } = calculateTime(endTime);
    time.innerHTML = `
        <span class="countdown-element hours">${hours}h</span>
        <span class="countdown-element minutes">${minutes}m</span>
        <span class="countdown-element seconds">${seconds}s</span>
    `;

   
    if (remainingTime <= 0) {
      localStorage.removeItem('endTime'); 
      $("#offerImage").css("display", "none");
      $("#offertime").css("display", "none"); 
      $('.getcancel').css("display", "none"); 
      $('.timesec').css("display", "none"); 
    } else {
      setTimeout(function() {
        updateCountdown(offer); 
      }, 1000);
    }
  }
}

function offercancel(event) {
  if (!event.target.classList.contains('offerimg1')) {
    event.stopPropagation();
    $(".getofferbanner").css("display", "none");
    localStorage.removeItem('endTime'); 
  }
}

function getcancel() {
  $(".getofferbanner").css("display", "none");
  localStorage.removeItem('endTime'); 
}

function dynamicoffer() {
  var productId = "PO#003";

  $.ajax({
    type: "POST",
    url: "./php/offerimage.php",
    data: {
      productId: productId
    },
    success: function (response) {
      console.log(response);
      var boo = isJsonString(response);
      if (boo) {
        var offer = JSON.parse(response);
        console.log(offer);
        displayofferimg(offer[0].img_Path);
        updateCountdown(offer);
      }
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    }
  });
}

function displayofferimg(offer) {
  console.log(offer);
  var offerImage = document.getElementById('offerImage');
  if (offerImage) {
    offerImage.src = offer;
  }
}


function navindex(){
  window.location.href = "./index.html";
  
}

var slickInitialized = false;

function initializeSlick() {
  if (!slickInitialized) {
    $('.whyponniflex').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      dots: true,
      arrows: false,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
    slickInitialized = true;
  }
}


function destroySlick() {
  if (slickInitialized) {
    $('.whyponniflex').slick('unslick');
    slickInitialized = false;
  }
}

function handleSlickOnResize() {
  var windowWidth = $(window).width();
  if (windowWidth < 950) {
    initializeSlick();
  } else {
    destroySlick();
  }
}


$(document).ready(function(){
  handleSlickOnResize();
});


$(window).resize(function(){
  handleSlickOnResize();
});

var refreshload=document.getElementById("cartlastcancle");
if(refreshload){
  refreshload.addEventListener('click',function(){

    location.reload();
  });
}
