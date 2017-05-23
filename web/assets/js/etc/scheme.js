function Scheme() {

    this.steps = new List();

    this.usedStorage = new List();

// Getters of Scheme

    this.getStepByNumber = function (stepNr) {
        return this.steps.getItemByNumber(stepNr);
    };

    this.getStepByName = function (stepName) {
        return this.steps.getItemByName(stepName);
    };

    this.getAmtOfSteps = function () {
        return this.steps.getSize();
    };

    this.getSteps = function () {
        return this.steps.list;
    };

// Functions of Scheme

    this.addStep = function (newStep) {
        return this.steps.addAnItem(newStep);
    };

    this.visualizeArrow = function () {
        return "<div class='arrow'><i id='arrow' class='fa fa-chevron-right fa-5x notProcessable medium-2 column arrow'></i></div>";
    };

    this.visualizeScheme = function (recipeName) {

        let stepString = "<h3>" + recipeName + " scheme</h3>";

        stepString += "<div id='" + recipeName + "' class='scheme'>";
        stepString += "<div class='row medium-12'>";

        for (let stepNr = 1; stepNr < this.getAmtOfSteps() + 1; stepNr++) {

            const selectedStep = this.steps.getItemByNumber(stepNr - 1);
            stepString += "<div class='schemeStep medium-4 columns' id='" + selectedStep.getName() + (stepNr - 1) + "'>";
            stepString += "<h4>" + selectedStep.getName() + "</h4>";

            if (selectedStep.getStorage() != null) {
                stepString += "<div class='tankField'>";
                stepString += "<p>" + selectedStep.getStorage().getName() + "</p>";
                stepString += selectedStep.getStorage().visualizeTank();
                stepString += "<button id='" + recipeName + "-step" + (stepNr) + "' class='phaseAction button'>Go!</button>";
                stepString += "</div>";
            }

            stepString += "</div>";

            if (stepNr != this.getAmtOfSteps() && stepNr % 2 == 0) {
                stepString += "</div><div class='row medium-12'>";
            }

            if (stepNr < this.getAmtOfSteps()) {
                stepString += this.visualizeArrow();
            }

        }

        stepString += "</div>";
        stepString += "</div>";

        return stepString;
    };

    this.loadUsedStorage = function () {

        for (let stepNr = 0; stepNr < this.getAmtOfSteps(); stepNr++) {

            const selectedStep = this.steps.getItemByNumber(stepNr);

            if (selectedStep.getStorage() != null) {
                this.usedStorage.addAnItem(this.steps.getItemByNumber(stepNr).getStorage());
            }
        }
    }

}
