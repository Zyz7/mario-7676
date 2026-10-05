/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación y gestión de sesión
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: usuario@email.com
 *         password:
 *           type: string
 *           format: password
 *           example: "Password123"
 *
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - confirm
 *       properties:
 *         name:
 *           type: string
 *           example: Juan Pérez
 *         email:
 *           type: string
 *           format: email
 *           example: juan@email.com
 *         password:
 *           type: string
 *           format: password
 *           example: "Password123"
 *         confirm:
 *           type: string
 *           format: password
 *           example: "Password123"
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             name:
 *               type: string
 *               example: Juan Pérez
 *             email:
 *               type: string
 *               format: email
 *               example: juan@email.com
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Juan Pérez
 *         email:
 *           type: string
 *           format: email
 *           example: juan@email.com
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: No autenticado
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica un usuario mediante su correo electrónico y contraseña.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Datos de entrada inválidos
 */
 
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un usuario
 *     description: Crea una nueva cuenta de usuario.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Datos inválidos o la contraseña no coincide con su confirmación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     description: Cierra la sesión del usuario.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Logout exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
 
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtener usuario autenticado
 *     description: Obtiene la información del usuario actualmente autenticado.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario autenticado
 *       401:
 *         description: Token inválido, expirado o ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
