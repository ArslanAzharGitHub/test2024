import swaggerJSDoc from 'swagger-jsdoc';
const PORT = 5000;
const SWAGGER_SERVERS = [
    {
        url: `http://localhost:${PORT}/api/v1`,
        description: 'Local server'
    },
    // {
    //     url: `http://157.230.240.157:${PORT}/api/v1`,
    //     description: 'Production server'
    // }
];
const useSwaggerUIAuthStoragePlugin = () => {
    const afterLoad = (ui) => {
        const AUTH_SCHEME = 'bearerAuth';

        setTimeout(() => {
            const token = localStorage.getItem(AUTH_SCHEME);
            if (token) {
                setAuthToken(token);
            }
        }, 1500);


        const setAuthToken = (token) => {
            const authorization = {
                bearerAuth: {
                    name: 'bearerAuth',
                    schema: {
                        type: 'apiKey',
                        in: 'header',
                        name: 'Authorization',
                        description: ''
                    },
                    value: token
                }
            };
            ui.authActions.authorize(authorization);
        };
    };

    return {
        afterLoad
    };
};

const responseInterceptor = (req) => {
    const { status, url, body } = req;
    const splittedUrl = url.split('/');
    const route = splittedUrl[splittedUrl.length - 1];
    if (status === 200 && route === 'sign-in') {
        const { token } = body;
        localStorage.setItem('bearerAuth', token);
        const authorization = {
            bearerAuth: {
                name: 'bearerAuth',
                schema: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: ''
                },
                value: token
            }
        };
        ui.authActions.authorize(authorization);
    }
};

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-Coms API Documentation',
            version: '1.0.0',
            description: 'E-comm API'
        },
        servers: SWAGGER_SERVERS,
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
    apis: [
        './controllers/**/*.js',
        './controllers/auth/*.js',
        './controllers/custom-field-profile/*.js',
        './controllers/store/*.js',
        './controllers/warehouse/*.js'
    ]
};

const options = {
    //customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
        docExpansion: 'none',
        plugins: [useSwaggerUIAuthStoragePlugin()],
        responseInterceptor
    }
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export {
    swaggerDocs,
    options
};
//