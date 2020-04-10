// busniess logic
function Topping(toppingName , toppingPrice){
   this.toppingName = toppingName;
   this.toppingPrice = toppingPrice;
}
var topping1 = new Topping()

function PizzaSize(size, sizePrice){
   this.size = size;
   this.sizePrice = sizePrice;
}
 
function Pizza(name, description, imgSrc, id){
   this.pizzaId =id;
   this.name = name;
   this.description = description;
   this.imgSrc = imgSrc;
   this.toppingList = [];
   this.sizeList = [];
}




Pizza.prototype.addTopping = function(topping){
  this.toppingList.push(topping);
}

Pizza.prototype.addSize = function(pizzaSize1){
   this.sizeList.push(pizzaSize1);
}

function Store(){
   this.pizzaList = [];
}

Store.prototype.addPizza = function(pizza){
    this.pizzaList.push(pizza);
}


Store.prototype.init = function(){

   var pizza1 = new Pizza("Cheese Pizza", "Cheese and base Tomato Sauce","img/pizza_2.jpg","p1");
   var pizza2 = new Pizza("Jhon Candy", "Pepperoni,mushrooms, black olives, tomato sauce","img/pizza_1.jpg","p2");
   var pizzaSize1 = new PizzaSize("Small", "$7.00");
   var pizzaSize2 = new PizzaSize("Medium", "$10.00");
   var pizzaSize3 = new PizzaSize("Large", "$14.00");

   var pizzaSize4 = new PizzaSize("Small", "$8.00");
   var pizzaSize5 = new PizzaSize("Medium", "$12.00");
   var pizzaSize6 = new PizzaSize("Large", "$15.00");
   pizza1.addSize(pizzaSize1);
   pizza1.addSize(pizzaSize2);
   pizza1.addSize(pizzaSize3);
   pizza2.addSize(pizzaSize4);
   pizza2.addSize(pizzaSize5);
   pizza2.addSize(pizzaSize6);
   
   this.addPizza(pizza1);
   this.addPizza(pizza2);
}


function displayPizzaList(store){
    
   var inputList = $(".pizzList");
   var htmlForInfo = "";
   store.pizzaList.forEach(function(pizza){
      var sizeInfo ="";
      pizza.sizeList.forEach(function(pizzaSize){
          sizeInfo += '<div class="input-group">'+
         '<div class="input-group-prepend">'+
            '<div class="input-group-text">' +
            '<input type="radio"  value="'+pizzaSize.sizePrice+'"  id="'+pizza.pizzaId+'" name="'+pizza.pizzaId+'" aria-label="Radio button for following text input">'
             + pizzaSize.size + ' ' + pizzaSize.sizePrice + '<br>'+
            '</div>'+
         '</div>'+
       '</div>' 
      });
      


    htmlForInfo +='<div class="d-flex flex-wrap align-content-center bg-light"> '+
                  '<div class="p-2 border">'+ pizza.name +
                  '<div class="card" style="width: 18rem;">' +
                     '<img class="card-img-top" src="'+pizza.imgSrc +'" alt="Card image cap">'+
                     '<div class="card-body">'+
                        '<p class="card-text">'+ pizza.description+'</p>'+
                     '</div>'+ sizeInfo +
                     '<button type="button" id="'+pizza.pizzaId+'"  id="cart_button" class="btn btn-primary btn-sm">'+ 'Add To Cart'+'</button>'+
                  '</div>'+
                  '</div>'

   });
   inputList.append(htmlForInfo);
 };



//  function showPrice(price){
//    var inputPrize = $("p#info");
//    var htmlInfo = price;
//    inputPrize.html(htmlInfo);

//  }

//  function attachPizzaSizeListeners() {
//    $("ul#contacts").on("click", "li", function() {
//      showContact(this.id);
//    });
//    $("#buttons").on("click", ".deleteButton", function() {
//      addressBook.deleteContact(this.id);
//      $("#show-contact").hide();
//      displayContactDetails(addressBook);
//    });
//  };


 function attachPizzaSizeListeners() {
   $(".pizzList").on("click", "button", function() {
      var price =  $("#"+this.id+":checked").val();
      
      //<p id="pizzaName"></p>
     // <p id="pizzaSize"></p>
     // <p id="pizzaPrice"></p>

      $("#pizzaPrice").text("Pizza Price " +price)
   });
  
 };


// user interface logic
$(document).ready(function(){
   attachPizzaSizeListeners();
   var store = new Store();
   store.init();
   
   displayPizzaList(store);


   $("#inputForm").submit(function(event){
      event.preventDefault();
     
   });
   
});

 




