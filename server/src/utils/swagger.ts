import { Application } from 'express';
import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: Options = {
    definition: {
        openapi: '3.0.2',
        info: {
            title: 'Recipe API docs',
            version: '1.0.0'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/**/*.ts']
};


const spec =  swaggerJSDoc(options);

export default (app: Application) => {
    app.use(
        '/api/docs',
        swaggerUi.serve,
        swaggerUi.setup(spec)
    );
};