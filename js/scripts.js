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
 
function Pizza(name, description, imgSrc){
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

   var pizza1 = new Pizza("Cheese Pizza", "cheese and base Tomato Sauce","img/pizza_1.jpg");
   var pizzaSize1 = new PizzaSize("Small", 7);
   var pizzaSize2 = new PizzaSize("Medium", 10);
   var pizzaSize3 = new PizzaSize("Large", 14);
   pizza1.addSize(pizzaSize1);
   pizza1.addSize(pizzaSize2);
   pizza1.addSize(pizzaSize3);
   this.addPizza(pizza1);
}

// function displayContactDetails(addressBookToDisplay) {
//    var contactsList = $("ul#contacts");
//    var htmlForContactInfo = "";
//    addressBookToDisplay.contacts.forEach(function(contact) {
//      htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
//    });
//    contactsList.html(htmlForContactInfo);
//  };

 function displayPizzaList(store){
    
   var inputList = $(".container");
   var htmlForInfo = "";
   store.pizzaList.forEach(function(pizza){
      console.log(pizza.description)
    htmlForInfo +='<div class="d-flex flex-wrap align-content-center bg-light"> '+
                  '<div class="p-2 border">'+ pizza.name +
                  '<div class="card" style="width: 18rem;">' +
                     '<img class="card-img-top" src="'+pizza.imgSrc +'" alt="Card image cap">'+
                     '<div class="card-body">'+
                        '<p class="card-text">'+ pizza.description+'</p>'+
                     '</div>'+
                  '</div>'+
                  '</div>'

   });
   inputList.append(htmlForInfo);
 };




// user interface logic
$(document).ready(function(){
   
   var store = new Store();
   store.init();
   console.log(store.pizzaList);
   displayPizzaList(store);


   $("#inputForm").submit(function(event){
      event.preventDefault();
     
   });
   
});

 




