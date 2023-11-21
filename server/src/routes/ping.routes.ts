import { Request, Response, Router } from 'express';

const router: Router = Router();

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
router.get('/', (req: Request, res: Response) => res.sendStatus(200));

export default router;