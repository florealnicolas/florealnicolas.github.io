const mongoose = require("mongoose");

const playerDraft = {
    name: String,
    password: String,
    gender: String,
    coins: Number,
    reputation: Number
};

const playerSchema = mongoose.Schema(playerDraft);
const Player = mongoose.model("Player", playerSchema);

module.exports = {Player};