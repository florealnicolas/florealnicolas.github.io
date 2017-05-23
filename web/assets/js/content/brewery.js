function Brewery(breweryMonks) {

    this.selectedRecipe = null;
    this.amtOfMonks = breweryMonks;

    this.equipment = new List();


// Getters of Brewery

    this.getAmtOfMonks = function () {
        return this.amtOfMonks;
    };

    this.getEquipment = function () {
        return this.equipment;
    };

    this.getSelectedRecipe = function () {
        return this.selectedRecipe;
    };

// Setters of Brewery

    this.setAmtOfMonks = function (newAmtOfMonks) {
        this.amtOfMonks = newAmtOfMonks;
    };

    this.setSelectedRecipe = function (newRecipe) {
        this.selectedRecipe = newRecipe;
    };

    this.setEquipment = function (listOfEquipment) {
        this.equipment = listOfEquipment;
    };


// Functions of Brewery

    this.visualizeOverview = function () {

        let visual = "<h4>Overview</h4>";

        let amtOfMonk = "<h5>Employees</h5>";
        amtOfMonk += "<p>At the moment there are ";
        if (this.getAmtOfMonks() == undefined) {
            amtOfMonk += "no";
        }

        else {
            amtOfMonk += this.getAmtOfMonks();
        }

        amtOfMonk += " monks working in your brewery.</p>";

        let recipe = "<h5>Recipe</h5>";
        recipe += "<p>This brewery will produce ";

        let recipeName = "no beer because you didn't gave them a recipe";

        if (this.getSelectedRecipe() != null) {
            recipeName = this.getSelectedRecipe().getName();
        }

        recipe += recipeName + ".</p>";

        let equipment = "<h5>Equipment</h5>";

        if (this.getEquipment().getSize() != 0) {
            equipment += "<ul>";
            for (let equipmentItem = 0; equipmentItem < this.getEquipment().getSize(); equipmentItem++) {
                equipment += "<li>" + this.getEquipment().getItemByNumber(equipmentItem).getName() + "</li>";
            }

            equipment += "</ul>";
        }

        else {
            equipment += "Your brewery is empty!";
        }

        visual += amtOfMonk + recipe + equipment;

        return visual;
    };

    this.visualizeProcess = function () {

        let visual = "<h4>Process</h4>";

        let process = "<p>There is no recipe selected yet, go to the recipe book and select one.</p>";

        if (this.getSelectedRecipe() != null) {

            process = "";

            for (let stepNumber = 0; stepNumber < this.getSelectedRecipe().getScheme().getAmtOfSteps(); stepNumber++) {

                process += "<div id='process" + this.getSelectedRecipe().getName() + stepNumber + "' class='processRow'>";

                process += this.getSelectedRecipe().getScheme().getStepByNumber(stepNumber).visualizeStep();

                process += "</div>";
            }
        }

        return visual + process;
    }
}