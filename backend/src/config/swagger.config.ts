import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Mi API",
      version: "1.0.0",
      description: "Documentación de la API",
    },

    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Servidor local",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

  },

  apis: [
    "./src/routes/*.ts",
    "./src/docs/*.swagger.ts",
  ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
