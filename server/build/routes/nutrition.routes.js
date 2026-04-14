"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nutrition_controller_1 = require("../controllers/nutrition.controller");
const router = (0, express_1.Router)({ mergeParams: true });
/**
 * TODO
 * Route to calculate the recipe nutritional facts per 100g of the food.
 * Needs swagger documentation.
 * getNutrition controller needs to be completed.
 */
router.get('/', nutrition_controller_1.getNutrition);
exports.default = router;
