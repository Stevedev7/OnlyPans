"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const diet_controller_1 = require("../controllers/diet.controller");
const router = (0, express_1.Router)();
/**
 * @openapi
 *  '/api/diets/search':
 *      get:
 *          tags:
 *              - Diets
 *          summary: Search Diets
 *          parameters:
 *          - in: query
 *            name: q
 *            schema:
 *              type: string
 *              example: keto
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/DietsResponse'
 *              404:
 *                  description: Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error404'
 *              500:
 *                  description: Server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error500'
 */
router.get('/search', diet_controller_1.getDietByName);
/**
 * @openapi
 *  '/api/diets/all':
 *      get:
 *          tags:
 *              - Diets
 *          summary: Search Diets
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/DietsResponse'
 *              404:
 *                  description: Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error404'
 *              500:
 *                  description: Server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error500'
 */
router.get('/all', diet_controller_1.getAllDiets);
/**
 * @openapi
 *  '/api/diets/{id}':
 *      get:
 *          tags:
 *              - Diets
 *          summary: Search Diets
 *          parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: number
 *              example: 1
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/DietIDResponse'
 *              404:
 *                  description: Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error404'
 *              500:
 *                  description: Server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error500'
 */
router.get('/:id', diet_controller_1.getDietById);
exports.default = router;
