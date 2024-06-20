var ulit = document.getElementById("productList");
ulit.innerHTML = "";
var startTime = new Date().getTime();
const searchInputElement = document.querySelector('#searchbutton #searchInput');

if (searchInputElement) {
  searchInputElement.addEventListener("input", function(event) {
    // Handler function for the 'input' event on searchInput
    if (event.target === searchInputElement) {
      // Your event handling code here
      const searchTerm = this.value.trim(); // Get trimmed search term
      if (searchTerm.length >= 3) {
        const replacedString = searchTerm.replace(/ /g, "_");
        displayProducts(replacedString);
      } else {
        // Handle case when search term length is less than 3 (optional)
        ulit.innerHTML = ""; // Clear previous results or handle differently
      }
    }
  });
}
/*document.getElementById('searchInput').addEventListener('input', function () {
  const searchTerm = this.value;
  const tolen = searchTerm.length;
  ulit.innerHTML = " ";
  //console.log(tolen);
  var replacedString = searchTerm.replace(/ /g, "_");
  if(tolen >= 3){
    displayProducts(replacedString);
  }
});*/

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
        var imgsrc="./assets/icons/error.png";
        var mgs="Error";
        var content="Sorry! No Products Found.";
        var btn="Cancel";
        popup(imgsrc,mgs,content,btn);
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
        //console.log(error);
      }
    });

}

function getvalfn(obj) {
  // Object to store grouped products by productName
  const groupedProducts = {};

  // Iterate through obj array
  obj.forEach((product) => {
      const { productName, unit, volume, category, imgPath_1 } = product;

      // Check if productName already exists in groupedProducts
      if (!groupedProducts[productName]) {
          // If not exists, initialize with the first product
          groupedProducts[productName] = {
              productName: productName,
              unit: unit,
              volume: volume,
              category: category,
              imgPath_1: imgPath_1
          };
      } 
  });

  // Iterate through groupedProducts and create HTML elements
  for (const key in groupedProducts) {
      if (groupedProducts.hasOwnProperty(key)) {
          const product = groupedProducts[key];

          // Create <li> element and its content
          var t = "";
          var prodname = product.productName;
          var produnit = product.unit;
          var prodvol = product.volume;
          var prodcat = product.category;
          var prodimg = product.imgPath_1;
          var listcreate = document.createElement("li");
          listcreate.classList.add("acting");
          t += "<img src=" + prodimg + " class='searimg'>";
          t += "<div class='flecls'>";
          t += "<div class='titlesear'>";
          t += prodname;
          t += "</div>";
          t += "<span id='prodcat'>";
          t += prodvol + " " + produnit;
          t += "</span>";
          t += "</div>";
          listcreate.innerHTML = t;

          // Append <li> element to the container
          ulit.appendChild(listcreate);
      }
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
          //console.log("Error");
      }   
    },
    error: function (error) {
      //console.log(error);
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
        //navigatepage(obj);
      },
      error: function (error) {
          console.log(error);
      }
  });
}

$(document).on("click", ".acting", function() {  
  var temp= $(this).find(".titlesear").text();
  window.location.href = "./ponniproductpage.html?innerHTML="+temp;  
});

/*function navigatepage(obj){
  var wholeobj = obj;
  const serializedObject = encodeURIComponent(JSON.stringify(wholeobj));
  const url = `ponniproductpage.html?data=${serializedObject}`;
  window.location.href = url;
}


function dataserial(){
  const urlParams = new URLSearchParams(window.location.search);
  const serializedData = urlParams.get("data");
  productpageonload(serializedData);
}*/

/*function productpageonload(serializedData){
  var converttoobj = JSON.parse(serializedData);
  console.log(converttoobj);
  var hecticinsert = "";
  var t2 = "";
  var t3 = "";
  hecticinsert +='<div class="product-details">';  
  hecticinsert +='<h3 id="productname">';
  hecticinsert += converttoobj[0].productName;
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
  checkTime(converttoobj);
}*/

function countcheckforcart(totcount){
  var countforicon = totcount;
  $("#cartCount").text(countforicon);
}

var clicksearch = document.getElementById("productList2");
var displayval = document.getElementById("totalstart");

/*document.getElementById('searchInput2').addEventListener('input', function () {
  const searchTerm2 = this.value;
  const tolen2 = searchTerm2.length;
  clicksearch.innerHTML = " ";
  //console.log(tolen);
  var replacedString2 = searchTerm2.replace(/ /g, "_");
  if(tolen2 >= 3){
    displayProd(replacedString2);
  }
});*/

const searchInput = document.querySelector('#seartype #searchInput2');

if (searchInput) {
  searchInput.addEventListener("input", function(event) {
    // Handler function for the 'input' event on searchInput
    if (event.target === searchInput) {
      // Your event handling code here
      const searchterm2 = this.value.trim(); // Get trimmed search term
      if (searchterm2.length >= 3) {
        const replaceString2 = searchterm2.replace(/ /g, "_");
        displaydetails(replaceString2);
      } else {
        // Handle case when search term length is less than 3 (optional)
        clicksearch.innerHTML = ""; // Clear previous results or handle differently
      }
    }
  });
}

function displaydetails(replaceString2) {
  var name = replaceString2.replace(/_/g, " ");
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
          secondpricecheck(obj);
      }else{
        $("#nullitem").css("display","block");
        /*var imgsrc="./assets/icons/error.png";
        var mgs="Error";
        var content="Sorry! No Products Found.";
        var btn="Cancel";
        popup(imgsrc,mgs,content,btn);*/
      }   
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function secondpricecheck(obj) {
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
        displayoncheck(obj);
      },
      error: function (error) {
        console.log(error);
      }
  });
}

function displayoncheck(obj){
  //console.log(obj);
  var totvalue = obj.length;
  /*const uniqueMap = new Map();
  obj.forEach((item) => {
    uniqueMap.set(item.name,item);
  });
  const uniqueObj =  Array.from(uniqueMap.values());*/
  for(i=0;i<totvalue;i++){
    var emptyval = "";
    var secondprodname = obj[i].productName;
    //var productname = prodname.charAt(0).toUpperCase() + prodname.slice(1);
    var secondprodunit = obj[i].unit;
    var secondprodvol = obj[i].volume;
    var prodcat = obj[i].category;
    var secondprodimg = obj[i].imgPath_1;
    var secondlistcreate= document.createElement("li");
    secondlistcreate.classList.add("itemone");
    emptyval += "<div class='photopic'>";
    emptyval += "<img src="+ secondprodimg+" class='searchimage'>";
    emptyval += "</div>";
    emptyval += "<div class='contentforpic'>";
    emptyval += "<span class='titlesear'>";
    emptyval += secondprodname;
    emptyval += "</span>";
    emptyval += "<span id='prodcat'>";
    emptyval += secondprodvol + " " + secondprodunit;
    emptyval += "</span>";
    emptyval += "</div>";
    //t += "<del id='delval'> ";
    //t += prodprice;
    //t += "</del>";
    //t += " <span id='offpriceid'>";
    //t += offprice;
    //t += "</span>";
    secondlistcreate.innerHTML = emptyval;
    //listcreate.innerHTML = "<img src=https://gramiyum.in/wp-content/uploads/2022/12/Coldpressed-Sesame-Oil.jpg class='searimg'>" + "<div id='titlesear'>" + prodname + "</div>" + "<del id='delval'> " + prodprice + "</del>" + " <span id='offpriceid'>" + offprice + "</span>";
    $("#nullitem").css("display","none");
    clicksearch.appendChild(secondlistcreate);
  }
}

$(document).on("click", ".itemone", function() {  
  var temp= $(this).find(".titlesear").text();
  window.location.href = "./ponniproductpage.html?innerHTML="+temp;  
});

function openNav() {
  document.getElementById("searchsort").style.width = "100%";
  const screenWidth = window.innerWidth;
  if (screenWidth > 990) {
    document.getElementById("searchsort").style.display = "none";
    document.getElementById("contentsear").style.display = "none"; 
  }else if(screenWidth > 775){
    document.getElementById("searchsort").style.display = "block";
    document.getElementById("contentsear").style.display = "block"; 
    document.getElementById("contentsear").style.width = "50%";
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

function getIPAddress(callback) {
  $.getJSON('https://api.ipify.org?format=json', function(data) {
    callback(null, data.ip);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    callback(errorThrown, null);
  });
}

// Function to save IP address in local storage
function saveIPAddressToLocalStorage(ipAddress) {
  localStorage.setItem('Local_IP', ipAddress);
  //console.log('Local Ip Address:', ipAddress);
}

// Main function to get and save IP address
function getAndSaveIPAddress() {
  getIPAddress(function(error, ipAddress) {
    if (error) {
      console.error('Error getting IP address:', error);
    } else {
      saveIPAddressToLocalStorage(ipAddress);
    }
  });
}

/* RECENT VIEW */

var inputlist = "";
function checkTime(inputs) {
  inputlist = inputs;
  var currentTime = new Date().getTime();
  var elapsedTime = (currentTime - startTime) / 10000; // Convert milliseconds to seconds
  if (elapsedTime >= 3) {
    tocheckfortoken(inputlist);
  } else {
    setTimeout(function() {
      checkTime(inputs);
    }, 10000);
  }
}

function tocheckfortoken(inputs){
  var userid=localStorage.getItem("token");
  if(userid){
    var data = {
      "token":userid,
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
            checkalreadytorecent(inputs,obj);
          }else{
            console.log("Error");
          }
        },
        error: function (error) {
            console.log(">>"+error);
        }
    });
  }else{
    //console.log("please login");
    var imgsrc="./assets/icons/error.png";
    var mgs="Error";
    var content="Please Login";
    var btn="Cancel";
    popup(imgsrc,mgs,content,btn);
  }
}

function checkalreadytorecent(inputs,userid){
  var productId=inputs[0].productId;
  var userid = userid[0].id;
  var data = {
      "idproduct": productId,
      "userwithid":userid,
  }
  $.ajax({
      url: "./php/checkdata.php",
      type: "post",
      data: data,
      success: function (response) {   
        //console.log(">>"+response);      
         if (response === "true") {
          $(".cate-recent").css("display","block");  
        }else {       
          addtorecentdata(inputs,userid);  
        }
      },
      error: function (error) {
          console.log(">>"+error);
      }
  });
}

function addtorecentdata(inputs,userid){
  var productId=inputs[0].productId;
  var data = {
      "productid": productId,
      "userid":userid,
  }
  $.ajax({
      url: "./php/addDatatoRecent.php",
      type: "post",
      data: data,
      success: function (response) {
        console.log("New Record Created");  
      },
      error: function (error) {
          console.log(error);
      }
  });
}


function loadvaluesprint(){
  var token = localStorage.getItem("token");
  if(token){
    var data = {
      "token":token,
    }
    $.ajax({
        url: "./php/getuserId.php",
        type: "post",
        data: data,
        success: function (response) {   
          var boo = isJsonString(response);
          if(boo==true){
            var obj = JSON.parse(response);
            getdatawithuserrecent(obj);
          }else{
            console.log("Error");
          }
        },
        error: function (error) {
            console.log(">>"+error);
        }
    });
  }
}

function getdatawithuserrecent(obj){
  //console.log(obj);
  var userid = obj[0].id;
  var data = {
    "userid" : userid
  }
  $.ajax({
    url: "./php/getuserrecentproduct.php",
    type: "post",
    data: data,
    success: function (response) {  
      //console.log(typeof(response)); 
      var boo = isJsonString(response);
      if(boo==true){
        var obj = JSON.parse(response);
        //console.log(obj);
        getproductswithid(obj);
      }else{
        //console.log("It was not a string");
      }
    },
    error: function (error) {
        console.log(">>"+error);
    }
});
}

function getproductswithid(obj){
  var objects = obj;
  //console.log(objects);
  $.ajax({
    url: "./php/getProductId.php",
    type: "post",
    data: { objects: objects },
    success: function (response) {
        var boo = isJsonString(response);
        if(boo==true){
            var obj = JSON.parse(response);
            //console.log(obj);
            getpriceforrecent(obj);
        }else{
            //console.log("Response Is Object");
        }    
    },
    error: function (error) {
        //console.log('No Product Found');
    }
  });
}
function getpriceforrecent(obj){
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
        recentlyview(obj);
      },
      error: function (error) {
        //console.log(error);
      }
  });
}


function recentlyview(inputs){
  recentlyinput = " ";
  for(i=0;i<inputs.length;i++){
    recentlyinput += '<div class="item">';
    recentlyinput += '<div class="product">';
    recentlyinput += '<p class="first-image">';
    recentlyinput += '<img src="' + inputs[i].imgPath_3 + '" onmouseover="this.src=\'' + inputs[i].imgPath_4 + '\'" onmouseout="this.src=\'' + inputs[i].imgPath_3 + '\'">';
    recentlyinput += '</p>';
    recentlyinput += '<p class="productname">';
    recentlyinput += inputs[i].productName;
    recentlyinput += '</p>';
    recentlyinput += '<p class="productamount">';
    recentlyinput += '<del>';
    recentlyinput += 'Rs.' + inputs[i].price + '.00';
    recentlyinput += '</del>';
    recentlyinput += '<span class="cate-span">';
    recentlyinput += 'From Rs.' + inputs[i].offerPrice + '.00';
    recentlyinput += '</span>';
    recentlyinput += '</p>';
    recentlyinput += '</div>';
    recentlyinput += '</div>';
  }
  $(".cate-recent").css("display","block"); 
  $(".product-list2").html(recentlyinput);

  var responsiveItems = {}; 

  // Define responsive items based on the number of products
  if (inputs.length <= 1) {
      responsiveItems = {
          0: { items: 1 },
          900: { items: 1, dots: true, nav: false }
      };
  } else if (inputs.length <= 2) {
      responsiveItems = {
          0: { items: 1 },
          600: { items: 2, dots: true, nav: false }
      };
  } else if (inputs.length <= 3) {
      responsiveItems = {
          0: { items: 1 },
          600: { items: 2, dots: true, nav: false },
          800: { items: 3 }
      };
  } else {
      responsiveItems = {
          0: { items: 1 },
          600: { items: 2, dots: true, nav: false },
          800: { items: 3}
      };
  }

  $('.product-list2').owlCarousel({
      loop: true,
      margin: 10,
      responsive: responsiveItems,
      
  });
}

/* WISHLIST */

function wishListfor(){
  var token31 = localStorage.getItem('token');
  //console.log('token31');
  if(token31){
    var data = {
      "token": token31
    }
    $.ajax({
        url: "./php/getuserId.php",
        type: "post",
        data: data,
        success: function (response) {
            var boo = isJsonString(response);
            if(boo==true){
                var obj = JSON.parse(response);
                getinwishlist(obj);
            }else{
                //console.log("Error");
            }    
        },
        error: function (error) {
            //console.log(error);
        }
    });
  }else{
    $("#noproduct").css("display","block");
    $("#cate-myimages").css("display","none");
  }
}

function getinwishlist(obj){
  var id = obj[0].id;
  var string = typeof id;
  //console.log(typeof(id));
  var data = {
    "userId" : id
  }
  $.ajax({
    url: "./php/getuserIdforwishlist.php",
    type: "post",
    data: data,
    success: function (response) {
      //console.log("ss" + response);
        var boo = isJsonString(response);
        if(boo==true){
            var obj = JSON.parse(response);
            getdetailsInproduct(obj);
        }else{
          /*$("#samplework").text("No Products Found");
          var imgsrc="./assets/icons/error.png";
          var mgs="Error";
          var content="Sorry! No Products Found.";
          popup(imgsrc,mgs,content);*/
          $("#noproduct").css("display","block");
          $("#cate-myimages").css("display","none");
        }    
    },
    error: function (error) {
       // console.log(error);
    }
  });
}

function getdetailsInproduct(obj){
  var objects = obj;
  $.ajax({
    url: "./php/getProductdetails.php",
    type: "post",
    data: { objects: objects },
    success: function (response) {
        var boo = isJsonString(response);
        if(boo==true){
            var obj = JSON.parse(response);
            thirdpricecheck(obj);
        }else{
            //console.log("Response Is Object");
            thirdpricecheck(obj);
        }    
    },
    error: function (error) {
        //console.log('No Product Found');
    }
  });
}

function thirdpricecheck(obj) {
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
        printonwish(obj);
      },
      error: function (error) {
        console.log(error);
      }
  });
}

function printonwish(obj){
  document.getElementById("samplework").style.display="grid";
  document.getElementById("noneproducts").style.display="none";
  const uniqueMap = new Map();
  
  obj.forEach((item) => {
    
    uniqueMap.set(item.productName, item);
  });
  const uniqueObjects = Array.from(uniqueMap.values());
  $("#cate-myimages").css("display","grid");
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

/* PROFILE IMAGE */ 

var profiletot = document.getElementById("smallimg");
var profiletot1 = document.getElementById("smallimg1");

function proficondynamic(){
 var token3 = localStorage.getItem("token");
 if(token3){
  var data = {
    "token": token3
  }
  $.ajax({
      url: "./php/getuserImage.php",
      type: "post",
      data: data,
      success: function (response) {
        var obj = JSON.parse(response);
        var obj2 = obj[0].profileImage;
        if(obj2!=null){
          var obj = JSON.parse(response);
          displayimg(obj);
          iftheretoken(obj);
        }else{
          if(profiletot){
            profiletot.src = "./assets/icons/maleuser.png";
          }
        } 
      },
      error: function (error) {
          //console.log(error);
      }
  });
}else{
  if(profiletot){
    profiletot.src = "./assets/icons/maleuser.png";
  }
  //profiletot1.src = "./assets/icons/maleuser.png";
}
}

function displayimg(obj){
  //console.log(obj[0].profileImage);
  if(profiletot){
    profiletot.src = obj[0].profileImage;
  }
}


function proficondynamic2(){
 var token3 = localStorage.getItem("token");
 if(token3){
  var data = {
    "token": token3
  }
  $.ajax({
      url: "./php/getuserImage.php",
      type: "post",
      data: data,
      success: function (response) {
        var obj = JSON.parse(response);
        var obj2 = obj[0].profileImage;
        if(obj2!=null){
          var obj = JSON.parse(response);
          displayimg2(obj);
          iftheretoken(obj);
        }else{
          if(profiletot1){
            profiletot1.src = "./assets/icons/maleuser.png";
          }
        }   
      },
      error: function (error) {
          console.log(error);
      }
  });
}else{
  if(profiletot1){
    profiletot1.src = "./assets/icons/maleuser.png";
  }
  //profiletot1.src = "./assets/icons/maleuser.png";
}
}

function displayimg2(obj){
  //console.log(obj[0].profileImage);
  if(profiletot1){
    profiletot1.src = obj[0].profileImage;
  }
}

/* PROFILE AREA */

function iftheretoken(){
  let h = "";
  h += "<li class = 'prolist'>";
  h += "<a href='image.html'>";
  h += "CHANGE PROFILE IMAGE";
  h += "</a>";
  h += "</li>";
  h += "<li class = 'prolist'>";
  h += "<a href='pswdwithold.html'>";
  h += "CHANGE PASSWORD";
  h += "</a>";
  h += "</li>";
  h += "<li class = 'prolist'>";
  h += "<a href='login.html'>";
  h += "LOGOUT";
  h += "</a>";
  h += "</li>";
  $("#profilelist").html(h);
  $("#profilelist1").html(h);
};

function ifnottoken(){
  let h = "";
  h += "<li class = 'prolist'>";
  h += "<a href = './login.html'>";
  h += "LOGIN";
  h += "</a>";
  h += "</li>";
  h += "<li class = 'prolist'>";
  h += "<a href = './register.html'>";
  h += "REGISTER";
  h += "</a>";
  h += "</li>";
  $("#profilelist").html(h);
  $("#profilelist1").html(h);
};

function forhead(){
  var token33 = localStorage.getItem("token");
  const screenWidth = window.innerWidth;
  if(token33){
    $("#titlelogin").css("display","none");
    /*$(".cart-headline").css("margin-top","99px");
    $(".productpage").css("margin-top","80px");
    $(".privacy-content").css("margin-top","92px");
    $("#loginmenu").css("display","none");
    $("#logoutmenu").css("display","block");
    $(".wholeregisterpage").css("margin-top","99px");
    $(".wholeloginpage").css("margin-top","99px");
    $(".wholepasswordpage").css("margin-top","99px");
    $(".wholecategories2").css("margin-top","99px");
    $("#wholecancelation, #wholetc").css("margin-top","124px");
    if(screenWidth > 1070 ){
      $("#firimage").css("margin-top","90px");
    }else if(screenWidth > 990){
      $("#firimage").css("margin-top","99px");
    }else if(screenWidth > 575){
      $("#firimage").css("margin-top","110px");
    }else if(screenWidth > 475){
      $("#firimage").css("margin-top","99px");
    }else{
      $("#firimage").css("margin-top","70px");
    }*/
  }else{
    $("#titlelogin").css("display","block");
    /*$(".wholecategories2").css("margin-top","130px");
    $(".cart-headline").css("margin-top","130px");
    $(".productpage").css("margin-top","119px");
    $(".privacy-content").css("margin-top","125px");
    $("#loginmenu").css("display","block");
    $("#logoutmenu").css("display","none");
    $("#wholecancelation, #wholetc").css("margin-top","135px");
    if(screenWidth > 990 ){
      $("#firimage").css("margin-top","130px");
      $(".wholeregisterpage").css("margin-top","100px");
      $(".wholepasswordpage").css("margin-top","100px");
      $(".wholeloginpage").css("margin-top","100px");
    }else if(screenWidth > 775){
      $("#firimage").css("margin-top","120px");
      $(".wholeregisterpage").css("margin-top","90px");
      $(".wholepasswordpage").css("margin-top","90px");
      $(".wholeloginpage").css("margin-top","90px");
    }else if(screenWidth > 575){
      $("#firimage").css("margin-top","130px");
      $(".wholeregisterpage").css("margin-top","80px");
      $(".wholepasswordpage").css("margin-top","80px");
      $(".wholeloginpage").css("margin-top","80px");
    }else if(screenWidth > 475){
      $("#firimage").css("margin-top","130px");
      $(".wholeregisterpage").css("margin-top","90px");
      $(".wholepasswordpage").css("margin-top","90px");
      $(".wholeloginpage").css("margin-top","90px");
    }else{
      $("#firimage").css("margin-top","100px");
      $(".wholeregisterpage").css("margin-top","80px");
      $(".wholepasswordpage").css("margin-top","80px");
      $(".wholeloginpage").css("margin-top","80px");
      $(".cart-headline").css("margin-top","110px");
    }*/
  }
}

/* PSWDWITHOLD PAGE */

function continueElseIf() {
  var inputVal = document.querySelectorAll(".wholepswdpage input");
  var isEmpty = false;
  for (let i = 0; i < inputVal.length; i++) {
    console.log(inputVal[i].value.trim()); // Use trim() to remove leading/trailing whitespace
  
    if (inputVal[i].value.trim() === "") {
      isEmpty = true;
      if (isEmpty) {
        $("#reg-comm2").css("display","none");
        $("#reg-comm3").css("display","none");
        document.getElementById("reg-emptyval").innerHTML = "* All input fields must be filled";
      } else {
        document.getElementById("reg-emptyval").innerHTML = ""; // Clear error message if all fields are filled
      }
    } 
  }
  var passvalue=document.getElementById("reg-pwd").value;
  var confirmpass=document.getElementById("confirmreg-pwd").value;
  var oldpswd=document.getElementById("old-pwd").value;
  if(isEmpty == false){
    document.getElementById("reg-emptyval").style.display="none";
    if(passvalue.length<5){
      $("#reg-comm2").css("display","none");
      $("#reg-comm3").css("display","none");
      document.getElementById("reg-comm").innerHTML="* Password must be more than five letters";
    }else if (passvalue != confirmpass) {
      $("#reg-comm2").css("display","none");
      $("#reg-comm3").css("display","none");
      document.getElementById("reg-comm").innerHTML = "* Password and confirm password must be same";
    }else {
      document.getElementById("reg-emptyval").style.display = "none";
      document.getElementById("reg-comm").style.display = "none";
      $("#reg-comm2").css("display","none");
      $("#reg-comm3").css("display","none");
        var token = localStorage.getItem("token");
        var data = {
          "password": passvalue,
          "token": token
        }
        $.ajax({
            url: "./php/updatepswd.php",
            type: "post",
            data: data,
            success: function(response) {   
              var imgsrc="./assets/icons/success.png";
              var mgs="SUCCESS";
              var content="Success! Your Password Has Been Changed.";
              var btn = "Continue";
              popup(imgsrc,mgs,content,btn);
              setTimeout(function() {
                // Code to execute after the delay
                window.location.href = "./login.html";
              }, 2000);
            },
            error: function (error) {
                console.log(">>"+error);
            }
        });
    }
  }
}
function resetbtn(){
  var oldpswd=document.getElementById("old-pwd").value;
  if(oldpswd){
    var token = localStorage.getItem("token");
    var data = {
      "password": oldpswd,
      "token": token
    }
    $.ajax({
        url: "./php/checkpswd.php",
        type: "post",
        data: data,
        success: function (response) {   
          //console.log(">>"+response);      
          if (response === "true") {
            continueElseIf();
          }else {    
            $("#reg-comm2").text("* Incorrect Old Password");   
            $("#reg-comm3").css("display","block");            
          }
        },
        error: function (error) {
            console.log(">>"+error);
        }
    });
   }
}

$(document).ready(function () {
  $("#searchInput").focus(function () {
    $(".blackscreen").css("display", "block");
    $("#productList").css("display", "block");
  });
  $(".blackscreen").click(function () {
    $(".blackscreen").css("display", "none");
    $("#productList").css("display", "none");
    $(".profilechange").css("display","none");
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

$("#shopnowid").click(function () {
  $(".contentmenuslide #shopslide").slideToggle("slow", function() {
    if ($("#shopslide").is(":visible")) {
      $("#shopslide").css("display", "flex");
      $("#minussym").css("display","block");
      $("#plussym").css("display","none");
    } else {
      $("#minussym").css("display","none");
      $("#plussym").css("display","block");
    }
  });
});

  $(document).on("click",".acting",function(){
    var getname = $(this).find(".titlesear").text();
    getprod(getname);
  });

  $(document).on("click", ".comonclas", function() {
    var passval = $(this).find(".spancls").text();
    window.location.href = "./categories.html?value=" + passval;
  });

  $(document).on("click","#iconsearch",function(){
    let checkinput = document.getElementById("searchInput").value;
    let prolist = document.getElementById("productList");
    const screenWidth = window.innerWidth;
    if(!checkinput && screenWidth > 990 ){
      $(".serchlist").css("display","block");
      $("#productList").css("display","block");
      $(".blackscreen").css("display", "block");
      //prolist.style.fontSize = "18px";
      //prolist.innerHTML = "Enter Product Name!";
        var imgsrc="./assets/icons/error.png";
        var mgs="Error";
        var content="Please Enter Product Name!";
        var btn="Cancel"
        popup(imgsrc,mgs,content,btn);
    }
  });

  $(document).on("click","#smallimg",function(){
    const token = localStorage.getItem("token");
    const screenWidth = window.innerWidth;
    if(screenWidth > 390 && token){
      $("#profilelist").fadeIn("2000");
      $(".blackscreen").css("display", "block");
      $(".profilechange").fadeIn("2000");
      iftheretoken();
    }else{
      $("#profilelist").fadeIn("2000");
      $(".blackscreen").css("display", "block");
      $(".profilechange").fadeIn("2000");
      ifnottoken();
    }
  });
  $(document).on("click","#smallimg1",function(){
    const token = localStorage.getItem("token");
    const screenWidth = window.innerWidth;
    if(screenWidth < 400 && token){
      $("#profilelist1").fadeIn("2000");
      $("#profilelist").css("display","none");
      $(".blackscreen").css("display", "block");
      $(".profilechange").fadeIn("2000");
      $(".profilechange").css({"left":"8%","width":"75%"});
      iftheretoken();
    }else{
      $("#profilelist1").fadeIn("2000");
      $("#profilelist").css("display","none");
      $(".blackscreen").css("display", "block");
      $(".profilechange").fadeIn("2000");
      $(".profilechange").css({"left":"8%","width":"75%","display":"block"});
      ifnottoken();
    }

  });
  $("#cancelButton").click(function() {
    window.location.href = "login.html"; // Replace with your desired login page URL
  });

  proficondynamic();
  forhead();
  proficondynamic2();

  /*$(document).ready(function(){
    $('.menureg').click(function(){
        $('.menureg').removeClass('addborder'); 
        $(this).addClass('addborder'); 
    });
  });

  $("#iconsearch").click(function(){
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


