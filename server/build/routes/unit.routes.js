"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const unit_controller_1 = require("../controllers/unit.controller");
const router = (0, express_1.Router)();
/**
 * @openapi
 *  '/api/units/search':
 *      get:
 *          tags:
 *              - Unit
 *          summary: Search Unit
 *          parameters:
 *          - in: query
 *            name: q
 *            schema:
 *              type: string
 *              example: cup
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  data:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/Unit'
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
router.get('/search', unit_controller_1.getUnitByName);
/**
 * @openapi
 *  '/api/units/all':
 *      get:
 *          tags:
 *              - Unit
 *          summary: Search Allergen
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  data:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/Unit'
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
router.get('/all', unit_controller_1.getAllUnits);
/**
 * @openapi
 *  '/api/units/{id}':
 *      get:
 *          tags:
 *              - Unit
 *          summary: Search Allergen
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
 *                              type: object
 *                              properties:
 *                                  data:
 *                                      $ref: '#/components/schemas/Unit'
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
router.get('/:id', unit_controller_1.getUnitById);
exports.default = router;
