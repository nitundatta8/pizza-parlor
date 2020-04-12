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
   
   function Pizza(name, description, imgSrc,id){
      this.pizzaId = id;
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
   var store;
   Store.prototype.addPizza = function(pizza){
      this.pizzaList.push(pizza);
   }


   Store.prototype.init = function(){

      var pizza1 = new Pizza("Plain Pizza", "Mozzarella, provolone, tomato sauce","img/pizza_2.jpg","p1");
      var pizza2 = new Pizza("Jhon Candy", "Pepperoni,mushrooms, black olives, tomato sauce","img/pizza_1.jpg","p2");
      var pizzaSize1 = new PizzaSize("Small", "7.00");
      var pizzaSize2 = new PizzaSize("Medium", "10.00");
      var pizzaSize3 = new PizzaSize("Large", "14.00");

      var pizzaSize4 = new PizzaSize("Small", "8.00");
      var pizzaSize5 = new PizzaSize("Medium", "12.00");
      var pizzaSize6 = new PizzaSize("Large", "15.00");
      pizza1.addSize(pizzaSize1);
      pizza1.addSize(pizzaSize2);
      pizza1.addSize(pizzaSize3);
      pizza2.addSize(pizzaSize4);
      pizza2.addSize(pizzaSize5);
      pizza2.addSize(pizzaSize6);
      
      this.addPizza(pizza1);
      this.addPizza(pizza2);
   }

   Store.prototype.findPizza = function(id){
     for(var i=0;i<this.pizzaList.length;i++){
         if(this.pizzaList[i]){
            if(this.pizzaList[i].pizzaId === id){
               return this.pizzaList[i];
           }
        }
     }
     return null;
   }

   function SaleItem(pizza,quantity,totalPrice){
      this.pizza = pizza;
      this.quantity = quantity;
      this.totalPrice = totalPrice;
 
   }
 
   function Cart(){
      this.saleItemList = [];
   }
   var saleItem ;
   Cart.prototype.addCart = function(saleItem){
      this.saleItemList.push(saleItem);
   }
  

   
   // display size and price
   function displayPizzaList(store){
    
      var inputList = $(".pizzList");
      var htmlForInfo = "";
      store.pizzaList.forEach(function(pizza){
         var sizeInfo ="";
         pizza.sizeList.forEach(function(pizzaSize){
             sizeInfo += '<div class="input-group">'+
            '<div class="input-group-prepend">'+
               '<div class="input-group-text">' +
               '<input type="radio"  value="'+pizzaSize.size + "-" +pizzaSize.sizePrice +'"  id="'+pizza.pizzaId+'" name="'+pizza.pizzaId+'" aria-label="Radio button for following text input">'
                + pizzaSize.size + ' ' + pizzaSize.sizePrice + '<br>'+
               '</div>'+
            '</div>'+
          '</div>' 
         });
         var value = "Quantity"+'<input type="text" id="quantity" style="width:50px">'

      htmlForInfo +='<div class="d-flex flex-wrap align-content-center bg-light"> '+
                     '<div class="p-2 border">'+ pizza.name +
                     '<div class="card" style="width: 18rem;">' +
                        '<img class="card-img-top" src="'+pizza.imgSrc +'" alt="Card image cap">'+
                        '<div class="card-body">'+
                           '<p class="card-text">'+ pizza.description+'</p>'+
                        '</div>'+sizeInfo + value +
                        '<a id="customizePizza" href="#">Customize</a>'+
                        '<button type="button" id="'+pizza.pizzaId+'"   class="btn btn-primary btn-sm">'+ 'Add To Cart'+'</button>'+
                         
                        '</div>'+
                     '</div>'

      });
      inputList.append(htmlForInfo);
   };

   //show saleItemList from cart
   function showItemList(cart){
     
      cart.saleItemList.forEach(function(saleItem){
         $("#pizzaName").text("Pizza Name: " + saleItem.pizza.name);
         $("#toatlPrice").text("Total Price: "+ saleItem.totalPrice);
         $("#pizzaQuantity").text("Quantity: " + saleItem.quantity);
         $("#cart").show();
         console.log(saleItem.pizza.pizzaId+ "   =======")
      });
   }




   function attachPizzaSizeListeners() {
      $(".pizzList").on("click", "button", function() {
        
         var sizePrice =  $("#"+this.id+":checked").val();
         $("#"+this.id+":checked").val('');
        
         $("#pizzaSize").text("Size: " +sizePrice.split("-")[0]);
         $("#pizzaPrice").text("Price: " +sizePrice.split("-")[1]);

         var itemPrice= parseInt(sizePrice.split("-")[1]);
         var quantity = parseInt($("#quantity").val());
         $("#quantity").val('');
         
         var rs =  $("input[name='topping']:checked").each(function () {
            itemPrice +=parseInt($(this).val().split("-")[1]);
         });
         console.log(quantity)
         
          var totalPrice = (itemPrice *  quantity);
          
          var storePizza = store.findPizza(this.id);
          
         //saleItem
         saleItem = new SaleItem(storePizza,quantity,totalPrice);
         console.log("saleItem " +saleItem.totalPrice)
         //cart
         var cart = new Cart();
         cart.addCart(saleItem);
         // show pizza to cart
         showItemList(cart);

         //  $("#toatlPrice").text("Total Price: "+totalPrice);
         // $("#cart").show();
      });
      $(".pizzList").on("click", "a", function() {
         $("#custom").show();
       
      });
   
   };


   // user interface logic
   $(document).ready(function(){
      attachPizzaSizeListeners();
       store = new Store();
      store.init();
      
      displayPizzaList(store);


      $("#inputForm").submit(function(event){
         event.preventDefault();
      
      });
      
   });

   

