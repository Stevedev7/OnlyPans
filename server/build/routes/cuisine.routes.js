"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cuisine_controller_1 = require("../controllers/cuisine.controller");
const router = (0, express_1.Router)();
/**
 * @openapi
 *  '/api/cuisines/search':
 *      get:
 *          tags:
 *              - Cuisine
 *          summary: Search cuisine
 *          parameters:
 *          - in: query
 *            name: q
 *            schema:
 *              type: string
 *              example: In
 *          responses:
 *              200:
 *                  description: Success
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
router.get('/search', cuisine_controller_1.getCuisineByName);
/**
 * @openapi
 *  '/api/cuisines/all':
 *      get:
 *          tags:
 *              - Cuisine
 *          summary: Search cuisine
 *          responses:
 *              200:
 *                  description: Success
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
router.get('/all', cuisine_controller_1.getAllCuisines);
/**
 * @openapi
 *  '/api/cuisines/{id}':
 *      get:
 *          tags:
 *              - Cuisine
 *          summary: Search cuisine
 *          parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              example: 1
 *            required: true
 *          responses:
 *              200:
 *                  description: Success
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
router.get('/:id', cuisine_controller_1.getCuisineById);
exports.default = router;
