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
   var cart;
   Store.prototype.addPizza = function(pizza){
      this.pizzaList.push(pizza);
   }


   Store.prototype.init = function(){

      var pizza1 = new Pizza("Plain Pizza", "Mozzarella, provolone, tomato sauce","img/pizza_2.jpg","p1");
      var pizza2 = new Pizza("Jhon Candy", "Pepperoni,mushrooms, black olives, tomato sauce","img/pizza_1.jpg","p2");
      var pizza3 = new Pizza("Veggie Thai" ,"Broccoli, red onions, green peppers, pickled carrot,cilantro,","img/pizza_3.jpg","p3")
      var pizzaSize1 = new PizzaSize("Small", "7.00");
      var pizzaSize2 = new PizzaSize("Medium", "10.00");
      var pizzaSize3 = new PizzaSize("Large", "14.00");

      pizza1.addSize(pizzaSize1);
      pizza1.addSize(pizzaSize2);
      pizza1.addSize(pizzaSize3);
      pizza2.addSize(pizzaSize1);
      pizza2.addSize(pizzaSize2);
      pizza2.addSize(pizzaSize3);
      pizza3.addSize(pizzaSize1);
      pizza3.addSize(pizzaSize2);
      pizza3.addSize(pizzaSize3);
      
      this.addPizza(pizza1);
      this.addPizza(pizza2);
      this.addPizza(pizza3);
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
   function displayPizzaInStore(store){
    
      var inputList = $(".pizzList");
      var htmlInfo = "";
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
         var value = "Quantity"+'<input type="text" id="qt-'+pizza.pizzaId+ '" style="width:50px">'

      htmlInfo +='<div class="d-flex flex-wrap align-content-center bg-light"> '+
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
      inputList.append(htmlInfo);
   };

   //show saleItemList from cart
   function showItemList(cartDetails,pizzaSize){
     var inputTag = $("#intro");
     var htmlTagInfo = "";
     var total =0;
     var balance =0;

     cartDetails.saleItemList.forEach(function(saleItem){
      balance =(saleItem.quantity * saleItem.totalPrice);
      total += balance;
         htmlTagInfo += '<li class="list-group-item ">'+
            '<p id="pizzaName" class="list-group-item-text">'+"Pizza Name: "+saleItem.pizza.name +'</p>'+
             '<p id="pizzaSize" class="list-group-item-text">'+"Size: " +pizzaSize +'</p>'+
            '<p id="pizzaQuantity" class="list-group-item-text">'+"Quantity: "+saleItem.quantity+'</p>'+
            
            '<p id="toatlPrice" class="list-group-item-text">'+"Unit Price: "+"$"+saleItem.totalPrice+".00"+'</p>'+
            '<p id="pizzaPrice" class="list-group-item-text">'+"Price: "+"$"+ 
              balance+".00" +'</p>'+
            '</li>'+
        '</ul>'
        });
      
      inputTag.html(htmlTagInfo);
      var output = $("#result");
      output.text(total);
      console.log("total  " + total)
       return total;
     
   };




   function attachPizzaSizeListeners() {
      $(".pizzList").on("click", "button", function() {
         $("#custom").hide();
         var sizePrice =  $("#"+this.id+":checked").val();
         $("#"+this.id+":checked").prop("checked",false);
         var pizzaSize = sizePrice.split("-")[0];
        
        
      
         var itemPrice= parseInt(sizePrice.split("-")[1]);
         var quantity = parseInt($("#qt-" + this.id).val());
         $("#qt-" + this.id).val('');
         
          $("input[name='topping']:checked").each(function () {
            itemPrice +=parseInt($(this).val().split("-")[1]);
            $("input[name='topping']:checked").prop("checked",false);
         });
         
         
         var storePizza = store.findPizza(this.id);
          
         //saleItem
         saleItem = new SaleItem(storePizza,quantity,itemPrice);
         console.log("saleItem " +saleItem.totalPrice)
         //cart
         
         cart.addCart(saleItem);
         // show pizza to cart
         var finalPrice = showItemList(cart,pizzaSize);
        
         $("#result").text("Total Balance: "+"$"+ finalPrice +".00");
           
          $("#cart").show();
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
      
      displayPizzaInStore(store);
      
       cart = new Cart();
       

      $("#inputForm").submit(function(event){
         event.preventDefault();
      
      });
      
   });

   

