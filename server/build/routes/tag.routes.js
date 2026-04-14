"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const tag_controller_1 = require("../controllers/tag.controller");
const router = (0, express_1.Router)();
router.get('/all', tag_controller_1.getAllTags);
/**
 * @openapi
 *  '/api/tags/new':
 *      post:
 *          tags:
 *              - Tags
 *          summary: Create new Tags
 *          description: Route to create new tags
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TagsInput'
 *          responses:
 *              201:
 *                  description: Created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/TagsResponse201'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error401'
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/TagsResponse200'
 *              400:
 *                  description: Bad request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/TagsResponse400'
 *
 */
router.post('/new', auth_middleware_1.isLoggedIn, tag_controller_1.postTags);
/**
 * @openapi
 * /api/tags/search/:
 *   get:
 *     tags:
 *       - Tags
 *     summary: Search tags
 *     description: Search tags
 *     parameters:
 *       - name: q
 *         in: query
 *         schema:
 *           type: string
 *           example: in
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           example: 1
 *           maximum: 100
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TagsSearchResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error500'
 */
router.get('/search', tag_controller_1.getTagsByText);
exports.default = router;
