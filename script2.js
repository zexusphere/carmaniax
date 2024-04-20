let carts = document.querySelectorAll('.btn2')
/*feutured cars */

let products = [
  {
    name: 'Suzuki S-PRESSO',
    tag: 'car-a1',
    price: 523000,
    inCart:0
  },
  {
    name: 'Suzuki Dzire GA 1.2 MT',
    tag: 'car-2',
    price: 559000,
    inCart:0
  },
  {
    name: 'Toyota Wigo',
    tag: 'car-3',
    price: 568000,
    inCart:0
  },
  {
    name: 'Kia Picanto',
    tag: 'car-4a',
    price: 590000,
    inCart:0
  },
  {
    name: 'Honda Brio',
    tag: 'car-5',
    price: 601000,
    inCart:0
  },
  {
    name: 'Suzuki Celerio',
    tag: 'car-6',
    price: 628000,
    inCart:0
  },
  {
    name: 'Suzuki APV',
    tag: 'car-7',
    price: 651000,
    inCart:0
  },
  {
    name: 'Toyota Vios',
    tag: 'car-8',
    price: 753000,
    inCart:0
  },
  {
    name: 'Hyundai Reina',
    tag: 'car-9',
    price: 733000,
    inCart:0
  },
  {
    name: 'Chevrolet Spark',
    tag: 'car-10',
    price: 734888,
    inCart:0
  },
  {
    name: 'Mitsubishi Mirage',
    tag: 'car-11a',
    price: 711000,
    inCart:0
  },
  {
    name: 'Nissan Almera',
    tag: 'car-12',
    price: 728000,
    inCart:0
  }
];

for (let i=0; i < carts.length; i++){
  carts[i].addEventListener('click', ()=>{
    cartNumbers(products[i]);
    totalCost(products[i])
  })
}
function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');

  if(productNumbers){
    document.querySelector('.cart span').textContent = productNumbers;
  }
}
function cartNumbers(product){
  console.log("The car that has been added to the cart is ",product); 

  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers=parseInt(productNumbers);

  if(productNumbers){
    localStorage.setItem('cartNumbers',productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
  }else{
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }

  setItems(product);
}

function setItems(product){
  let cartItems=localStorage.getItem('productsInCart');
  cartItems= JSON.parse(cartItems);
  console.log("The customer products are ", cartItems);

  if(cartItems != null){

    if(cartItems[product.tag]==undefined){
      cartItems= {
        ...cartItems,
        [product.tag]:product
      }
    }
      cartItems[product.tag].inCart += 1;
  }else{
    product.inCart=1;
    cartItems={
        [product.tag]: product
      }
  }
  localStorage.setItem("productsInCart", JSON.stringify
  (cartItems));
}

function totalCost(product){
    console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("The costumer total purchase is", cartCost);

    if(cartCost != null){
        cartCost=parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }else{
      localStorage.setItem("totalCost",product.price);
    }
    
  }
  
  function displayCart(){
      let cartItems = localStorage.getItem("productsInCart")
      cartItems = JSON.parse(cartItems);
      let productContainer = document.querySelector
      (".products");
      let cartCost = localStorage.getItem('totalCost');

      console.log(cartItems);
      if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item=>{
           productContainer.innerHTML += `
           <div class= "product">
                <ion-icon onclick="removeAll('${item.tag}')"<ion-icon name="close-circle"></ion-icon>
                <img src="./image/${item.tag}.png" height="100" width="100">
                <span>${item.name}</span>
          </div>      
                <div class="price">₱${item.price}.00</div>
                <div class="quantity">

                <ion-icon onclick="removeOne('${item.tag}')"
                <ion-icon class="decrease"
                name="arrow-dropleft-circle"></ion-icon>
                <span>${item.inCart}</span>
                

                <ion-icon onclick="addOne('${item.tag}')"
                <ion-icon class="increase"
                name="arrow-dropright-circle"></ion-icon>
                </div>

                <div class="branch"> 
                <select >
                <option>Set branch</option>
                <option>Manila</option>
                <option>Bulacan</option>
                <option>Masbate</option>
                <option>Cebu</option>
                <option>Davao</option>
                </select>
                </div>
                <div class="total">
                ₱${item.inCart*item.price}.00
                    </div>
           `;
        });
        productContainer.innerHTML += `
              <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Total Purchase
                </h4>
                <h4 class="basketTotal">
                    ₱${cartCost}.00
                </h4>
                `    
      }

  }


//-------------function for increasing the quantity
  function addOne(tag) {
    console.log("The customer added one item");
  //gets data from localstorage
  var cart = JSON.parse(localStorage.getItem("productsInCart"));
  var totalPrice = parseInt(localStorage.getItem("totalCost"));
var N = parseInt(localStorage.getItem("cartNumbers"));

  //gets the correct item
  var item = cart[tag];

  //change values
  item.inCart++; //adds one more inCart
  localStorage.setItem("productsInCart", JSON.stringify(cart));
  localStorage.setItem("totalCost", totalPrice + item.price);
  localStorage.setItem("cartNumbers", N + 1);
  location.reload();
  }

  //-------------function for decreasing the quantity
  function removeOne(tag) {
    console.log("The customer remove one item");
     //gets data from localstorage
  var cart = JSON.parse(localStorage.getItem("productsInCart"));
  var totalPrice = parseInt(localStorage.getItem("totalCost"));
  var N = parseInt(localStorage.getItem("cartNumbers"));

  //gets the correct item
  var item = cart[tag];

  //changes values of cart items
  if (item.inCart > 1) {
    item.inCart--;
    localStorage.setItem("productsInCart", JSON.stringify(cart));
  } else {
    delete cart[tag];
    localStorage.setItem("productsInCart", JSON.stringify(cart));
  }

  //changes total price and total number of products
  localStorage.setItem("totalCost", totalPrice - item.price);
  localStorage.setItem("cartNumbers", N - 1);
  location.reload();
  }

  //-------------function for removing one item
  function removeAll(tag) {
    console.log("The customer remove the all item/s");
    //gets data from localstorage
    var cart = JSON.parse(localStorage.getItem("productsInCart"));
    var totalPrice = parseInt(localStorage.getItem("totalCost"));
    var N = parseInt(localStorage.getItem("cartNumbers"));
  
    //gets the correct item
    var item = cart[tag];
  
    delete cart[tag];
    localStorage.setItem("productsInCart", JSON.stringify(cart));
    localStorage.setItem("totalCost", totalPrice - item.price * item.inCart);
    localStorage.setItem("cartNumbers", N - item.inCart);
    location.reload();
  }

  ///-------------alert buttons

  function PurchaseMessage(){
    var name = prompt("Thank you for browsing and purchasing our product! Kindly put your Complete Name for this transaction", "First name/Middle name/Last Name");
    if (name == null) {
      txt = "You pressed cancel";
    } else if (name != null) {
      var information= prompt("We also request your contact number Sir/Maam " + name);  
    }  if(information == null) {
      txt = "You pressed cancel";
    }else{
      alert("Your inputted name and contact number: " + name +" and "  + information);
      alert("Thank you for filling-up! Wait for the confirmation of our team for the date and time of your appointment. Rest assured that your information will be remained confidential.");
      window.location.reload ()
    }  
  }

  onLoadCartNumbers();
  displayCart();

  //--------Confirm button
  function ConfirmMessage2(){
    var name = prompt("Your car information has been sent to our team! Kindly put your Complete Name for this process", "First name/Middle name/Last Name");
    if (name == null) {
      txt = "You pressed cancel";
    } else if (name != null) {
      var information= prompt("We also request your contact number Sir/Maam " + name);  
    } if(information == null) {
    }else{
      alert("Your inputted name and contact number: " + name +" and "  + information);
      alert("Thank you for filling-up about your Car! Wait for the confirmation of our team with your submitted request and for the date and time of your appointment. Rest assured that your information will be remained confidential.");
  
    }  
    window.location.reload ()
  }

  function SubmitMessage(){
    alert("Thank you for submitting message to us! Our support executives team will received your message and could get back to you with a solution to your query. Rest assured that your information will be remained confidential.");
    location.reload();
  }

  function AppoinmentMessage(){
    var name = prompt("Your have requested an appointment! Kindly put your Complete Name for this process", "First name/Middle name/Last Name");
    if (name == null) {
      txt = "You pressed cancel";
    } else if (name != null) {
      var information= prompt("We also request your contact number Sir/Maam " + name);  
    } if(information == null) {
      txt = "You pressed cancel";
    }else if (information !=null){  
      var date= prompt("Type your available date for this appointment (Your appointment date is only valid on our work hours)")
    }if(date == null)
    txt = "You pressed cancel";
    else{
    alert("Your inputted name and contact number: " + name +" and "  + information);
    alert("Also your inputted Appoinment Date is " + date);
    alert("Thank you for making an appointment to us! Our support executives team will received your request and could get back to you through calls. Rest assured that your information will be remained confidential.");
   
  }
  location.reload();
}
function AlertMessage(){
  alert("You have sent your car information to us. Our team are finding related parts and tools for your Car.");
  location.reload();
}

function SendMessage(){
  alert("Thank you for submitting message to us!");
  location.reload();
}

function SendMessage2(){
  alert("Thank you for subscribing to CarManiax!");
  location.reload();
}






