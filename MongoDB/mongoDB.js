const mongoDBModels = require("./mongoDBModels");
const mongoose = require("mongoose");

function MongoDBH() {

    db = null;

    this.getDBC = function () {
        return db;
    };

    this.openConnection = function () {
        mongoose.connect("mongodb://abbot:tobba@ds149511.mlab.com:49511/abbey");
        db = mongoose.connection;
    };

    this.closeConnection = function () {
        mongoose.disconnect();
        console.log("The mongodb-connection is gone!");
    };

    this.documentSomething = function (model, instance) {
        let selectedModel = null;

        switch (model.toLowerCase()) {
            case "player":
                selectedModel = mongoDBModels.Player;
                break;
        }

        if (selectedModel != null) {
            return selectedModel(instance);
        }
        else {
            console.error("Choose another model.");
        }
    };

    this.saveSomething = function (something) {

        const connection = this;

        something.save(function (error, instance) {
            if (error) {
                console.error("Something happened during the safe of '", instance, "'. [Error = ", error, "]");
            }
            connection.closeConnection();
        })
    };

    this.getSearchCollectionCursor = function (someCollection) {

        let collection = null;
        let foundInstances = null;

        switch (someCollection) {
            case "player":
                collection = mongoDBModels.Player;
                break;
        }

        return collection.find().cursor();
    };

    this.getSearchCollectionByNameCursor = function (someCollection, instanceName) {
        let collection = null;

        switch (someCollection) {
            case "player":
                collection = mongoDBModels.Player;
                break;
        }

        return collection.findOne({'name': instanceName}).cursor();
    }
}

module.exports = MongoDBH;