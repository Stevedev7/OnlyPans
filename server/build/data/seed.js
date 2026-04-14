"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ingredientData_1 = __importDefault(require("./ingredientData"));
const allergens_1 = __importDefault(require("./allergens"));
const cuisine_1 = __importDefault(require("./cuisine"));
const diet_1 = __importDefault(require("./diet"));
const units_1 = __importDefault(require("./units"));
const users_1 = __importDefault(require("./users"));
const tags_1 = __importDefault(require("./tags"));
const client_1 = require("@prisma/client");
const password_1 = require("../utils/password");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const ingredient of ingredientData_1.default.ingredients) {
            yield prisma.ingredient.create({
                data: ingredient
            });
        }
        for (const allergen of allergens_1.default) {
            yield prisma.allergen.create({
                data: allergen
            });
        }
        for (const cuisine of cuisine_1.default) {
            yield prisma.cuisine.create({
                data: cuisine
            });
        }
        for (const diet of diet_1.default) {
            yield prisma.diet.create({
                data: diet
            });
        }
        for (const unit of units_1.default) {
            yield prisma.unit.create({
                data: unit
            });
        }
        for (const user of users_1.default) {
            const { email, firstName, lastName, password } = user;
            const hash = yield (0, password_1.hashPassword)(password);
            yield prisma.auth.create({
                data: {
                    email,
                    password: hash
                }
            });
            yield prisma.userProfile.create({
                data: {
                    emailId: email,
                    firstName,
                    lastName,
                }
            });
        }
        for (const tag of tags_1.default) {
            yield prisma.tag.create({
                data: tag
            });
        }
    });
}
main().catch(e => { console.log(e); process.exit(1); }).finally(() => prisma.$disconnect());
