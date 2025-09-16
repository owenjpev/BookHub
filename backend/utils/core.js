const express = require("express");
const pool = require("../db");
const tryCatch = require("./tryCatch");
const Hashids = require('hashids/cjs');
const hashids = new Hashids("ecommerce-salt", 10);

function createRouter() {
    return express.Router();
}

module.exports = {
    createRouter,
    pool,
    tryCatch,
    hashids
};