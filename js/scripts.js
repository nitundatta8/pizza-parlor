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
 
function Pizza(name, description){
   this.name = name;
   this.description = description;
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

st

Store.prototype.init = function(pizza){

   var pizza1 = new Pizza("Cheese Pizza", "cheese and base Tomato Sauce");
   var pizzaSize1 = new PizzaSize("Small", 7);
   var pizzaSize2 = new PizzaSize("Medium", 10);
   var pizzaSize3 = new PizzaSize("Large", 14);
   
   pizza1.addSize(pizzaSize1);
   pizza1.addSize(pizzaSize2);
   pizza1.addSize(pizzaSize3);
   
   var store = new Store();
   store.showPizza(pizza1);
   this.pizzaList.push(pizza)
}







// user interface logic
$(document).ready(function(){
   $("#inputForm").submit(function(event){
      event.preventDefault();
     
   });
   
});

 




