/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Operaciones relacionadas con saldo y pagos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     PaymentRechargeRequest:
 *       type: object
 *       required:
 *         - amount
 *         - currency
 *       properties:
 *         amount:
 *           type: integer
 *           description: Monto de la recarga expresado en centavos
 *           example: 10000
 *         currency:
 *           type: string
 *           description: Moneda utilizada para la recarga
 *           example: MXN
 *
 *     PaymentCreateResponse:
 *       type: object
 *       properties:
 *         paymentId:
 *           type: integer
 *           description: ID interno del pago
 *           example: 1
 *         checkoutUrl:
 *           type: string
 *           description: URL del Checkout de Stripe
 *           example: https://checkout.stripe.com/c/pay/cs_test_...
 *
 *     PaymentResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID del pago proporcionado por el proveedor
 *           example: pi_3N123456789
 *         status:
 *           type: string
 *           description: Estado del pago
 *           enum:
 *             - pending
 *             - processing
 *             - paid
 *             - failed
 *             - cancelled
 *             - refunded
 *           example: paid
 *         status_detail:
 *           type: string
 *           description: Detalle del estado del pago
 *           example: Payment completed successfully
 *         transaction_amount:
 *           type: string
 *           description: Monto de la transacción
 *           example: "100.00"
 *         date_created:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del pago
 *           example: "2026-10-04T18:30:00.000Z"
 *         authorization_code:
 *           type: string
 *           nullable: true
 *           description: Código de autorización del pago
 *           example: pi_3N123456789
 *         reference:
 *           type: string
 *           description: Referencia del pago
 *           example: REF-123456
 *         payer_id:
 *           type: integer
 *           description: Identificador del pagador
 *           example: 1
 *         payer_email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del pagador
 *           example: usuario@example.com
 *
 *     PaymentError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: No autenticado
 */

/**
 * @swagger
 * /payment/balance:
 *   get:
 *     summary: Obtener saldo disponible
 *     description: Obtiene el saldo disponible del usuario autenticado.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Saldo obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Balance:
 *                   type: number
 *                   description: Saldo disponible del usuario
 *                   example: 100.50
 *
 *       401:
 *         description: Usuario no autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentError'
 */

/**
 * @swagger
 * /payment/recharge:
 *   post:
 *     summary: Crear una recarga
 *     description: Crea un pago y genera una sesión de Checkout de Stripe.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentRechargeRequest'
 *     responses:
 *       201:
 *         description: Recarga creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentCreateResponse'
 *
 *       400:
 *         description: Datos de recarga inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentError'
 *
 *       401:
 *         description: Usuario no autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentError'
 */

/**
 * @swagger
 * /payment/status/{id}:
 *   get:
 *     summary: Consultar estado del pago de un usuario
 *     description: Obtiene la información y el estado del pago asociado al usuario autenticado.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Estado del pago obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentResponse'
 *
 *       401:
 *         description: Usuario no autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentError'
 *
 *       404:
 *         description: Pago no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentError'
 */

