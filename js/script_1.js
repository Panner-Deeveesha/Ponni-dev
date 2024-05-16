const products = [
  { imageurl: 'https://gramiyum.in/wp-content/uploads/2022/12/Coldpressed-Sesame-Oil.jpg', name: 'Wood Pressed Gingelly Oil', price: 480, category: 'Oil' },
  { imageurl: 'https://gramiyum.in/wp-content/uploads/2022/12/Coldpressed-Groundnut-oil.jpg', name: 'Wood Pressed Groundnut Oil ', price: 360, category: 'Oil' },
  { imageurl: 'https://gramiyum.in/wp-content/uploads/2022/12/Coldpressed-Coconut-Oil.jpg', name: 'Wood Pressed Coconut Oil ', price: 360, category: 'Oil' },
  { imageurl: 'https://gramiyum.in/wp-content/uploads/2022/09/Had-pound-rice.jpg', name: 'Little millet Rice', price: 70, category: 'Rice' },
  { imageurl: 'https://gramiyum.in/wp-content/uploads/2022/09/Had-pound-rice.jpg', name: 'Kodo millet Rice', price: 70, category: 'Rice' },
  { imageurl: 'https://gramiyum.in/wp-content/uploads/2022/09/Kullakar-Rice.jpg2_.jpg', name: 'foxtail millet Rice', price: 70, category: 'Rice' },
  { imageurl: 'https://gramiyum.in/wp-content/uploads/2022/09/Kullakar-Rice.jpg2_.jpg', name: 'barnyard millet Rice', price: 70, category: 'Rice' },
  { imageurl: 'https://gramiyum.in/wp-content/uploads/2022/09/Mappillai-Samba-Arisi.jpg', name: 'bridegroom Rice ', price: 60, category: 'Rice' }
];


function displayProducts(searchTerm) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  products.forEach(product => {
    if (product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
       const li = document.createElement('li');
       productList.innerHTML += `<li><img src="${product.imageurl}" style="width:60px; height:auto; vertical-align:middle; padding:5px;">
          <span>${product.name}-${product.price}'<span>&#x20B9</span>'-${product.category}</span>
          </li>`;
       productList.appendChild(li);

    }
  });
}

document.getElementById('searchInput').addEventListener('input', function () {
  const searchTerm = this.value;
  displayProducts(searchTerm);
});

displayProducts('products');

const products2 = [
  { imageurl: 'https://gramiyum.in/wp-content/uploads/2022/12/Coldpressed-Sesame-Oil.jpg', name: 'Wood Pressed Gingelly Oil', price: 480, category: 'Oil' },
  { imageurl: 'https://gramiyum.in/wp-content/uploads/2022/12/Coldpressed-Groundnut-oil.jpg', name: 'Wood Pressed Groundnut Oil ', price: 360, category: 'Oil' },
  { imageurl: 'https://gramiyum.in/wp-content/uploads/2022/12/Coldpressed-Coconut-Oil.jpg', name: 'Wood Pressed Coconut Oil ', price: 360, category: 'Oil' },
  { imageurl: 'https://gramiyum.in/wp-content/uploads/2022/09/Had-pound-rice.jpg', name: 'Little millet Rice', price: 70, category: 'Rice' },
  { imageurl: 'https://gramiyum.in/wp-content/uploads/2022/09/Had-pound-rice.jpg', name: 'Kodo millet Rice', price: 70, category: 'Rice' },
  { imageurl: 'https://gramiyum.in/wp-content/uploads/2022/09/Kullakar-Rice.jpg2_.jpg', name: 'Foxtail millet Rice', price: 70, category: 'Rice' },
  { imageurl: 'https://gramiyum.in/wp-content/uploads/2022/09/Kullakar-Rice.jpg2_.jpg', name: 'Barnyard millet Rice', price: 70, category: 'Rice' },
  { imageurl: 'https://gramiyum.in/wp-content/uploads/2022/09/Mappillai-Samba-Arisi.jpg', name: 'Bridegroom Rice ', price: 60, category: 'Rice' }
];

function displayProd(searchTerm2) {
  const productList2 = document.getElementById('productList2');
  productList2.innerHTML = '';

  products2.forEach(product => {
    if (product.name.toLowerCase().includes(searchTerm2.toLowerCase())) {
       const li = document.createElement('li');
       productList2.innerHTML += `<li><img src="${product.imageurl}" style="width:60px; height:auto; vertical-align:middle; padding:5px;">
          <span>${product.name}-${product.price}'<span>&#x20B9</span>'-${product.category}</span>
          </li>`;
       productList2.appendChild(li);

    }
  });
}

document.getElementById('searchInput2').addEventListener('input', function () {
  const searchTerm2 = this.value;
  displayProd(searchTerm2);
});

displayProd('products2');

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
    document.getElementById("menusear").style.width = "18%";

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


