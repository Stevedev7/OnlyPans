import { NextFunction, Response, Router } from 'express';
import pingRoutes from './ping.routes';
import userRoutes from './user.routes';
import recipeRoutes from './recipe.routes';
import ingredientRoutes from './ingredient.routes';
import tagRoutes from './tag.routes';
import cuisineRoutes from './cuisine.routes';
import allergenRoutes from './allergen.routes';
import dietRoutes from './diet.routes';

import unitRoutes from './unit.routes';
import Request from '../interfaces/Request.interface';
import { errorHandler } from '../middleware/errorHAndler.middleware';
import { HTTPError } from '../interfaces/HTTPError';

const router: Router = Router();


// Get /api/ping -> Route to check if the api is up and running.
router.use('/ping', pingRoutes);

router.use('/users', userRoutes);

router.use('/recipes', recipeRoutes);

router.use('/ingredients', ingredientRoutes);

router.use('/tags', tagRoutes);

router.use('/cuisines', cuisineRoutes);

router.use('/allergens', allergenRoutes);

router.use('/diets', dietRoutes);

router.use('/units', unitRoutes);

router.use((req: Request, res: Response, next: NextFunction) => {
    const error: HTTPError = new Error('Page Not found');
    error.status = 404;
    next(error);
});
router.use(errorHandler);
export default router;