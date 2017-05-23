function Player(aPlayerName, amtOfCoins, amtOfReputation) {

    this.name = aPlayerName;
    this.gender = "";
    this.coins = amtOfCoins;
    this.reputation = amtOfReputation;
    this.password = "";

//Getters of Player

    this.getCoins = function () {
        return this.coins;
    };

    this.getPlayerName = function () {
        return this.name;
    };

    this.getReputation = function () {
        return this.reputation;
    };

    this.getGender = function () {
        return this.gender;
    };

    this.getPassword = function () {
        return this.password;
    };

//Setters of Player

    this.setPlayerGender = function (playerGender) {
        this.gender = playerGender;
    };

    this.setPassword = function (newPassword) {
        this.password = newPassword;
    };

//Functions of Player

    this.addCoins = function (coinsToAdd) {
        this.coins += coinsToAdd;
    };

    this.reduceCoins = function (coinsToReduce) {
        this.coins -= coinsToReduce;
    };

    this.addReputation = function (reputationToAdd) {
        this.reputation += reputationToAdd;
    };

    this.toJSON = function () {
        return  {
            name: this.getPlayerName(),
            gender: this.getGender(),
            coins: this.getCoins(),
            reputation: this.getReputation(),
            password: this.getPassword()
        };
    }
}