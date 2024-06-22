import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './routes/user.js';

const app = express();
const PORT = 4356;

// Swagger definition
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management API',
            version: '1.0.0',
            description: 'API for managing users in the application',
        },
        servers: [
            {
                url: `http://localhost:${PORT}/`,
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(bodyParser.json());

// Serve Swagger docs
app.use('/v1', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/user', userRoutes);

app.get('/', (req, res) => res.send('oops'));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
