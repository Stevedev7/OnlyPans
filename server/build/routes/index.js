"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ping_routes_1 = __importDefault(require("./ping.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const recipe_routes_1 = __importDefault(require("./recipe.routes"));
const ingredient_routes_1 = __importDefault(require("./ingredient.routes"));
const tag_routes_1 = __importDefault(require("./tag.routes"));
const cuisine_routes_1 = __importDefault(require("./cuisine.routes"));
const allergen_routes_1 = __importDefault(require("./allergen.routes"));
const diet_routes_1 = __importDefault(require("./diet.routes"));
const unit_routes_1 = __importDefault(require("./unit.routes"));
const errorHAndler_middleware_1 = require("../middleware/errorHAndler.middleware");
const router = (0, express_1.Router)();
// Get /api/ping -> Route to check if the api is up and running.
router.use('/ping', ping_routes_1.default);
router.use('/users', user_routes_1.default);
router.use('/recipes', recipe_routes_1.default);
router.use('/ingredients', ingredient_routes_1.default);
router.use('/tags', tag_routes_1.default);
router.use('/cuisines', cuisine_routes_1.default);
router.use('/allergens', allergen_routes_1.default);
router.use('/diets', diet_routes_1.default);
router.use('/units', unit_routes_1.default);
router.use((req, res, next) => {
    const error = new Error('Page Not found');
    error.status = 404;
    next(error);
});
router.use(errorHAndler_middleware_1.errorHandler);
exports.default = router;
