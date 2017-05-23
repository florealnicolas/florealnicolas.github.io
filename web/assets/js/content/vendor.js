function Vendor(vendorName, vendingCategories) {

    this.name = vendorName;
    this.categories = vendingCategories;
    this.inventory = new List();

    //Getters of Vendor

    this.getName = function () {
        return this.name;
    };

    this.getCategories = function () {

        if (this.categories == null) {
            this.categories = new List();
        }
        return this.categories.getList();

    };

    this.getInventory = function () {
        return this.inventory;
    };

    //Setters of Vendor

    this.setCategories = function (newCategories) {

        if (newCategories.constructor != List) {
            this.categories.clearList();
            this.categories.addAnItem(newCategories);
        }

        else {
            this.categories = newCategories;
        }
    };

    //Functions of Vendor

    this.proposeItem = function (someItem) {

        return this.categories.contains(someItem.getCategory());
    };

    this.makeOffer = function (someItem) {

        if (this.proposeItem(someItem)) {
            return someItem.getUnitValue();
        }

        else {
            return someItem.getUnitValue() / 2;
        }
    };

    this.trade = function (tradeItem, tradeAmt, game) {

        let cost = null;
        const stockOfTradeItem = game.getStock().getItemByName(tradeItem.getName());

        //Second condition can be removed after tests
        if (tradeItem.getQuantity() >= tradeAmt && stockOfTradeItem.getQuantity() >= tradeAmt) {
            cost = this.makeOffer(tradeItem) * tradeAmt;
        }

        if (cost != null) {
            game.getStock().getItemByName(tradeItem.getName()).removeQuantityOfAResource(tradeAmt);
            game.getStock().removeResourceIfThereIsNoQuantity(game.getStock().getItemByName(tradeItem.getName()));

            const tradedItem = new Resource(tradeItem.getName(), tradeAmt, tradeItem.getUnitValue(), tradeItem.getCategory());
            this.inventory.addAnItem(tradedItem);

            game.getPlayer().addCoins(cost);
        }

    };

    this.visualizeVendorButton = function () {
      return "<div class='vendorButton'>"+this.getName()+"</div>";
    };

    this.visualizeVendor = function () {

        let visual = "<div class='vendor' id='" + this.getName() + "'>";

        const name = "<h4>" + this.getName() + "</h4>";

        let greeting = "<p>Hello!<br>I'm " + this.getName() + " and I'm interested in all your ";
        greeting += this.categories.allItemsToString() + ".";
        greeting += "<br>Go ahead and offer me an item, so we can do business.</p>";

        let dropzone = "<p>Drop the item you wish the sell here:</p>";
        dropzone += "<div id='itemToSell'></div>";

        const message = "<div id='message'></div>";

        visual += name + greeting + dropzone + message;

        return visual + "</div>";
    };

    this.visualizeRFQ = function (itemToSell) {

        let visual = "<div class='RFQ'>";

        let question = "<form>";
        question += "<p>So you want to sell " + itemToSell.getName() + ", eh?</br>";

        let interest = "I'm very interested in " + itemToSell.getName() + ".";

        if (!this.proposeItem(itemToSell)) {
            interest = "I'm not interested in " + itemToSell.getName() + ", so I'll only give you half the price of its value.";
        }

        question += interest + "</br>";
        question += "How much do you want to sell?</br>";
        question += "I can see you have " + itemToSell.getQuantity() + " units with you.</p>";
        question += "<input type='number' id='itemQuantity' min='0' max='" + itemToSell.getQuantity() + "'/>";
        question += "</form>";

        question += "<div id='finalItemQuantity'>";
        question += "</div>";

        question += "<div id='offer'>";
        question += "</div>";

        visual += question;
        visual += "</div>";

        return visual;
    };

    this.visualizeFinalItemQuantity = function (itemToSell, itemQuantity) {

        itemQuantity = eval(itemQuantity);

        switch (itemQuantity) {
            case 0:
                itemQuantity = "no";
                break;

            case itemToSell.getQuantity():
                itemQuantity = "all your";
                break;

            default:
                break;
        }

        return "<p>You want to sell " + itemQuantity + " units of " + itemToSell.getName() + "?</p>";
    };

    this.visualizeOffer = function (itemToSell, finalQuantity) {

        const finalItem = finalQuantity + " units of " + itemToSell.getName();
        const price = this.makeOffer(itemToSell) * finalQuantity;

        let offer = "<p>I can sell you " + finalItem + " for " + price + " coins.</p>";
        offer += "<p>Are you alright with that?</p>";
        offer += "<button class='button uk-button uk-button-default' value='yes'>Yes</button><button class='button uk-button uk-button-default' value='no'>No</button>";

        return offer;
    };

    this.visualizeDealMessage = function (deal) {
        let message = "<p>" + this.getName() + ": No deal means no deal, come back when you change your mind.</p>";

        if (deal) {
            message = "<p>" + this.getName() + ": Glad to do business with you.</p>";
        }

        return message;
    };
}
