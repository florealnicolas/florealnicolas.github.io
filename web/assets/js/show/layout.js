function showInstances(game, instanceType, plaats) {

    let addresses = [];

    switch (instanceType) {

        case "source":
            var instanceGroup = game.getSources();
            break;
        case "processor":
            instanceGroup = game.getProcessors();
            break;
    }

    let instanceForm = "<form>";

    for (let instanceNr = 0; instanceNr < instanceGroup.getSize(); instanceNr++) {

        const instance = instanceGroup.getItemByNumber(instanceNr);

        if (plaats == instance.getPlace()) {

            const address = "#" + instance.getName() + '.' + instanceType;

            instanceForm += "<fieldset>";
            instanceForm += "<h5>The ";
            instanceForm += instance.getName().toLowerCase() + "</h5>";
            instanceForm += "<div class='progressbar' id='" + instance.getName() + "'><div class='progress-label'>0%</div></div>";
            instanceForm += "<div class='opbrengst' id='" + instance.getName() + "'></div>";

            if (instanceGroup == game.getProcessors()) {
                instanceForm += "<label for='" + instance.getName() + "'>";
                instanceForm += "How much " + instance.getPossibleInputs().getItemByNumber(0).getName() + " you want to convert to " + instance.getOutput().getName() + "?</label>";
                instanceForm += "<input id='inputNumber" + instance.getName() + "' type='number' min='0' value='0'/>";
            }

            instanceForm += "<button class='" + instanceType + " uk-button uk-button-default button' id='" + instance.getName() + "'>Execute</button>";
            instanceForm += "</fieldset>";

            addresses.push(address);
        }
    }

    instanceForm += "</form>";

    $("." + plaats).append(instanceForm);
    $('.opbrengst').hide();

    for (let addressNr = 0; addressNr < addresses.length; addressNr++) {
        addBehaviour(game, addresses[addressNr]);
    }
}

function showNCRCounter(game) {

    const name = $("#naam a");
    const amtOfCoins = $("#valuta span");
    const amtOfReputation = $("#reputatie span");

    if (game.getPlayer() != null) {
        name.text(game.getPlayer().getPlayerName());
        amtOfCoins.text(game.getPlayer().getCoins());
        amtOfReputation.text(game.getPlayer().getReputation());
    }

    else {
        name.html("Stranger");
        amtOfCoins.text(13);
        amtOfReputation.text(0);
    }
}

function showPage(e) {
    e.preventDefault();

    $('.workspace > div').hide();
    $('#main a').removeClass("active");
    $('#offCanvasNav a').removeClass("active");

    let page = $(this).text().toLowerCase();

    page = page.replace(" ", "-");

    $('#' + page).show();
    $(this).addClass("active");

    if (page == "work") {
        const activePage = $("#secondaryWork > .active").text();
        $('.' + activePage.toLowerCase()).show();
    }

    if (page == "brew") {
        const activePage = $("#secondaryBrew > .active").text();
        $('.' + activePage.toLowerCase()).show();
    }
}

function showWorkSubpage(e, game) {
    e.preventDefault();

    const prevPage = $("#secondaryWork > .active").text();
    const currentPage = $(this).text().toLowerCase();

    if (prevPage != currentPage) {

        $('#work > div').hide();
        $('#secondaryWork > a').removeClass("active");

        $('.' + currentPage).show();
        $(this).addClass("active");
    }
}

function showBrewSubpage(e, game) {
    e.preventDefault();

    const prevPage = $("#secondaryBrew > .active").text();
    const currentPage = $(this).text().toLowerCase();

    if (prevPage != currentPage) {

        $('#brew > div').hide();
        $('#secondaryBrew > a').removeClass("active");

        $('.' + currentPage).show();
        $(this).addClass("active");
    }
}

function showProfilePage(game) {

    const player = game.getPlayer();

    let profile = "<p>You are still just a stranger to us...<br/>Finish the story of Troubadour first!</p>";

    if (player != null) {

        profile = "<h2>" + player.getPlayerName() + "</h2>" +
        "<p>Who are you to us?<br/>" +
        "Here you can find all the information we have about you.</p>";

    profile += "<div class='profileSection'>" +
        "<h3>Account details</h3>" +
        "<p>Username: " + player.getPlayerName() + "<br/>" +
        "Coins: " + player.getCoins() + "<br/>" +
        "Reputation: " + player.getReputation() + "</p>" +
        "</div>" +

        "<div class='profileSection'>" +
        "<h3>Change password</h3>" +
        "<form action='/PASSWORDCHANGE' method='post'>" +
        "<label for='currentPassword'>Current password</label>" +
        "<input type='password' id='currentPassword' name='passwordChange[currentPassword]'/>" +
        "<label for='newPassword'>New password</label>" +
        "<input type='password' id='newPassword' name='passwordChange[newPassword]'/>" +
        "<label for='confirmPassword'>Confirm new password</label>" +
        "<input type='password' id='confirmPassword' name='passwordChange[confirmNewPassword]'/>" +
        "<input class='button uk-button uk-button-default' type='submit' name='changePassword' value='Change password'/>" +
        "</form>" +
        "<div/>";

    profile += "<div class='profileSection'>" +
        "<h3 title='Besides playing of course.'>Alternative options</h3>" +
        "<a class='button uk-button uk-button-default' href='/RESET'>Reset account</a>" +
        "<a class='button uk-button uk-button-default' href='/LOGOUT'>Log out</a>" +
        "</div>";
    }

    else {

    }

    $("#profile").html(profile);
}

function showStock(stock) {
    $("#stock").html("");
    var content = "<h3>Stock</h3>" + stock;
    $("#stock").html(content);
}

function showBrewery(game) {
    $("#brew .overview").html("");
    $("#brew .process").html("");

    const overview = game.getBrewery().visualizeOverview();
    const process = game.getBrewery().visualizeProcess();

    $("#brew .overview").html(overview);
    $("#brew .process").html(process);

    var recipe = game.getBrewery().getSelectedRecipe();

    if (recipe != null) {
        for (let stepNr = 0; stepNr < recipe.getScheme().getAmtOfSteps(); stepNr++) {
            const step = recipe.getScheme().getStepByNumber(stepNr);
            const address = "#process" + step.getName().replace(" ", "-") + ".process.button";
            addBehaviour(game, address);
        }
    }
}

function showInventory(game) {
    $("#inventory").html(game.visualizeInventory());

    $(".inventoryItem").draggable({revert:true});
}

function showVendor(game, vendorName) {

    let selectedVendor = game.getVendors().getItemByName(vendorName);

    $("#dealScreen").html(selectedVendor.visualizeVendor());

    $("#itemToSell").droppable({
        drop: function (event, ui) {

            const vendorName = $(this).parents()[0].id;
            const productName = ui.draggable[0].children[0].className;

            $(this).droppable("disable");

            $(this).html("<p>" + productName + "</p>");
            $(".inventoryItem." + productName).css("display", "none");

            const vendor = game.getVendors().getItemByName(vendorName);
            const itemToSell = game.getStock().getItemByName(productName);

            $("#" + vendor.getName() + " #message").hide();

            $("#" + vendor.getName()).append(vendor.visualizeRFQ(itemToSell));
            $("#" + vendor.getName() + " #itemQuantity").val(0);

            $("#" + vendor.getName() + " #itemQuantity").on("change", function () {
                const itemQuantity = $(this).val();

                $("#" + vendor.getName() + " #finalItemQuantity").html(vendor.visualizeFinalItemQuantity(itemToSell, itemQuantity));
                $("#" + vendor.getName() + " #offer").html(vendor.visualizeOffer(itemToSell, itemQuantity));

                $("#" + vendor.getName() + " #offer .button").on("click", function () {

                    let deal = false;

                    if ($(this).val() == "yes") {
                        deal = true;
                        const price = vendor.makeOffer(itemToSell) * itemQuantity;
                        game.getPlayer().addCoins(price);
                        const resourceInStock = game.getStock().getItemByName(itemToSell.getName());
                        resourceInStock.removeQuantityOfAResource(itemQuantity);
                        game.getStock().removeResourceIfThereIsNoQuantity(resourceInStock);
                        showNCRCounter(game);
                    }

                    $("#" + vendor.getName() + " .RFQ").remove();
                    showInventory(game);
                    $("#" + vendor.getName() + " #itemToSell").html("");
                    $("#" + vendor.getName() + " #itemToSell").droppable("enable");
                    $("#" + vendor.getName() + " #message").html(vendor.visualizeDealMessage(deal));
                    $("#" + vendor.getName() + " #message").show();
                });
            });
        }
    });
}

function showMarket(game) {

    let vendorList = "";

    for (let vendorNr = 0; vendorNr < game.getVendors().getSize(); vendorNr++) {
        const selectedVendor = game.getVendors().getItemByNumber(vendorNr);
        vendorList += selectedVendor.visualizeVendorButton();
    }

    $("#vendors").html(vendorList);

    $(".vendorButton").on("click", function () {
        $(".vendorButton").removeClass("active");
        $(this).addClass("active");

        showVendor(game, $(this).text());
    });

    showInventory(game);
}

function updateFields(game) {
    $(".grounds").html("");

    let addresses = [];

    let field = "<form>";

    for (let fieldNr = 0, amtOfFields = game.getFields().getSize(); fieldNr < amtOfFields; fieldNr++) {

        const selectedField = game.getFields().getItemByNumber(fieldNr);
        const address = "#" + selectedField.getName() + '.field.button';

        const resourceName = game.getFields().getItemByNumber(fieldNr).getResourceName().toLowerCase();

        field += "<fieldset>";
        field += "<h5>A <span id='" + selectedField.getName() + "' class='type'>";
        field += resourceName + "</span> field</h5>";

        field += "<div class='progressbar' id='" + selectedField.getName() + "'><div class='progress-label'>0%</div></div>";

        field += "<div class='opbrengst' id='" + selectedField.getName() + "'></div>";

        field += "<div class='veldWijzigen' id='" + selectedField.getName() + "'><label  class='wijzigLabel' for='type" + selectedField.getName() + "'>Fieldtype:</label>";

        field += showFieldTypes(game, selectedField.getName());

        field += "<button class='button fieldChanger uk-button uk-button-default' id='" + selectedField.getName() + "'>Change field</button>";
        field += "<br/><button class='button sellField uk-button uk-button-default' id='" + selectedField.getName() + "'>Sell field<br/>[<span id='fieldValue'>";
        field += game.getFields().getItemByNumber(fieldNr).getFieldValue() + " coins</span>]</button></div>";
        field += "<br/> <button class='field button' id='" + selectedField.getName() + "'>Execute</button>";
        field += "<button class='button uk-button uk-button-default' id='" + selectedField.getName() + "Options'>Field options</button>";
        field += "</fieldset>";

        addresses.push(address);
    }

    field += "</form>";

    $(".grounds").append(field);
    updateBuyFieldButton(game);

    $(".opbrengst").hide();

    for (let addressNr = 0; addressNr < addresses.length; addressNr++) {
        addBehaviour(game, addresses[addressNr]);
    }
}

function updateBuyFieldButton(game) {

    if (game.getPriceOfAField() == 0) {
        $("#fieldPrice").text("Free")
    }

    else {
        $("#fieldPrice").text(String(game.getPriceOfAField()) + " coins");
    }
}

function buildFields(game) {

    let addresses = [];

    let field = "<div class='grounds'><form>";

    for (let fieldNr = 0, amtOfFields = game.getFields().getSize(); fieldNr < amtOfFields; fieldNr++) {

        const selectedField = game.getFields().getItemByNumber(fieldNr);
        const address = "#" + selectedField.getName() + '.field.button';

        const resourceName = game.getFields().getItemByNumber(fieldNr).getResourceName().toLowerCase();

        field += "<fieldset>";
        field += "<h5>A <span id='" + selectedField.getName() + "' class='type'>";
        field += resourceName + "</span> field</h5>";

        field += "<div class='progressbar' id='" + selectedField.getName() + "'><div class='progress-label'>0%</div></div>";

        field += "<div class='opbrengst' id='" + selectedField.getName() + "'></div>";

        field += "<div class='veldWijzigen' id='" + selectedField.getName() + "'><label  class='wijzigLabel' for='type" + selectedField.getName() + "'>Fieldtype:</label>";

        field += showFieldTypes(game, selectedField.getName());

        field += "<button class='button fieldChanger uk-button uk-button-default' id='" + selectedField.getName() + "'>Change field</button>";
        field += "<br/><button class='button sellField uk-button uk-button-default' id='" + selectedField.getName() + "'>Sell field<br/>[<span id='fieldValue'>";
        field += game.getFields().getItemByNumber(fieldNr).getFieldValue() + " coins</span>]</button></div>";
        field += "<br/> <button class='field button uk-button uk-button-default' id='" + selectedField.getName() + "'>Execute</button>";
        field += "<button class='button uk-button uk-button-default' id='" + selectedField.getName() + "Options'>Field options</button>";
        field += "</fieldset>";

        addresses.push(address);
    }

    field += "</form></div>";
    field += "<button class='button uk-button uk-button-default' id='buyField'>Buy a new field<br/>[<span id='fieldPrice'></span>]</button>";

    $(".fields").append(field);
    updateBuyFieldButton(game);

    $(".opbrengst").hide();

    $("#buyField").on("click", function (e) {
        e.preventDefault();

        game.buyAField();
        updateFields(game);
        showNCRCounter(game);
    });

    for (let addressNr = 0; addressNr < addresses.length; addressNr++) {
        addBehaviour(game, addresses[addressNr]);
    }
}

function showPeople(game) {

    let peopleForm = "<form name='people' method='post'>";
    peopleForm += "<h3>People</h3><p>Here you can say how many people need to work on a certain job.</p>";
    peopleForm += "<p>Your abbey counts <span id='totaalMonniken'>" + game.totalAmtOfMonks + "</span> monks, ";
    peopleForm += "<span id='bezetMonniken'>" + game.getAmtOfOccupiedMonks() + "</span> of them are already working.</p>";

    for (let departementNr = 0, aantalDepartementen = game.getDepartments().length; departementNr < aantalDepartementen; departementNr++) {

        peopleForm += "<fieldset> <legend>" + game.getDepartments()[departementNr] + "</legend>";
        peopleForm += "<label>Number of monks:</label>";
        peopleForm += "<input type='number' id='" + game.getDepartments()[departementNr] + "People' min='0' value='0' max='"
            + game.getAmtOfAvailableMonks() + "'/></fieldset>";
    }

    peopleForm += "</form>";

    $("#people").append(peopleForm);
}

function showRecipesAsOptions(game) {
    $("#recipes").append(game.getRecipesAsOptions());
}

function showRecipeDescription(recipe) {
    $("#recipeDescription").append(recipe.getDescription());
}

function showFieldTypes(game, fieldName) {

    const resourceName = game.getFields().getItemByName(fieldName).getResourceName();
    let fieldTypes = "<select id='Type" + fieldName + "'>";

    const allFieldTypes = game.getFieldTypes().sort();

    for (let fieldTypeNr = 0; fieldTypeNr < allFieldTypes.length; fieldTypeNr++) {

        let fieldType = allFieldTypes[fieldTypeNr];

        if (fieldType != resourceName) {
            const fieldTypeName = fieldType.substring(0, 1).toUpperCase() + fieldType.substring(1).toLowerCase();
            fieldTypes += "<option value='" + fieldType + "'>" + fieldTypeName + "</option>";
        }
    }

    fieldTypes += "</select>";

    return fieldTypes;
}

function updateFieldTypes(game, fieldName) {
    $("#Type" + fieldName).html(showFieldTypes(game, fieldName));
}