"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/**
* @openapi
* /api/ping:
*  get:
*     tags:
*     - Ping
*     description: Responds if the app is up and running
*     responses:
*       200:
*         description: App is up and running
*/
router.get('/', (req, res) => res.sendStatus(200));
exports.default = router;
