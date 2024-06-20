const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Basic metadata for your API
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Buzzz',
            version: '1.0.0',
            description: 'My API Information',
            contact: {
                name: 'Developer',
                email: 'developer@example.com'
            },
            servers: [
                {
                    url: 'http://localhost:4006',
                },
            ],
        },
    },
    apis: ['./app.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs };
