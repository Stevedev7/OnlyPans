import express, { Application } from 'express';
import docs from './utils/swagger';
import Routes from './routes';
import { config } from 'dotenv';
import morgan from 'morgan';

config({ path: '.env'});

const PORT = process.env.PORT || 8001;

const app: Application = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('docs'));
docs(app);
app.use('/api', Routes);

app.listen(PORT, async() => {
    console.log('Server is running on port', PORT);
});