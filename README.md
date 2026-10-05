# mario-7676
Aplicación web utilizando react, express, typescript y localstorage con el tema de apuestas en carreras de caracoles.

## Requisitos
Antes de ejecutar el proyecto, es necesario tener instalado: 
Node.js, npm

## Instalación
Clonar el repositorio: 
git clone https://github.com/Zyz7/mario-7676

Entrar a la carpeta del proyecto: 
cd mario-7676

Instalar dependencias del backend
cd backend
npm install

Instalar dependencias del frontend
Desde la carpeta raíz del proyecto:

cd frontend
npm install

## Configuración
Crear un archivo .env dentro de la carpeta raíz:

Crear un archivo .env dentro de la carpeta frontend:

Agregar en estos archivos las variables de entorno necesarias para el funcionamiento de la aplicación.

## Ejecución del proyecto
El frontend y el backend deben ejecutarse de forma independiente, por lo que se recomienda utilizar dos terminales.
Una terminal más para stripe.

Backend
Abrir una terminal y entrar a la carpeta del backend: 
cd backend

Ejecutar el servidor en modo desarrollo: 
npm run dev

Frontend
Abrir una segunda terminal y entrar a la carpeta del frontend: 
cd frontend

Ejecutar la aplicación en modo desarrollo: 
npm run dev

Stripe
Ejecutar: stripe listen --events checkout.session.completed,payment_intent.payment_failed \
  --forward-to localhost:3000/api/v1/webhook/stripe  

## Ejecución de las pruebas back
cd backend

Ejecuta las pruebas mostrando información detallada
npm run test:verbose

## Tarjetas de prueba en stripe
Cobro exitoso:

Visa	4242424242424242	3 dígitos al azar	Cualquier fecha futura
Visa (débito)	4000056655665556	3 dígitos al azar	Cualquier fecha futura
Mastercard	5555555555554444	3 dígitos al azar	Cualquier fecha futura
Mastercard (serie 2)	2223003122003222	3 dígitos al azar	Cualquier fecha futura
Mastercard (débito)	5200828282828210	3 dígitos al azar	Cualquier fecha futura
Mastercard (prepaga)	5105105105105100	3 dígitos al azar	Cualquier fecha futura
American Express	378282246310005	4 dígitos al azar	Cualquier fecha futura
American Express	371449635398431	4 dígitos al azar	Cualquier fecha futura
Discover	6011111111111117	3 dígitos al azar	Cualquier fecha futura
Discover	6011000990139424	3 dígitos al azar	Cualquier fecha futura
Discover (débito)	6011981111111113	3 dígitos al azar	Cualquier fecha futura
Diners Club	3056930009020004	3 dígitos al azar	Cualquier fecha futura
Diners Club (tarjeta de 14 dígitos)	36227206271667	3 dígitos al azar	Cualquier fecha futura
BCcard y DinaCard	6555900000604105	3 dígitos al azar	Cualquier fecha futura
JCB	3566002020360505	3 dígitos al azar	Cualquier fecha futura
UnionPay	6200000000000005	3 dígitos al azar	Cualquier fecha futura
UnionPay (débito)	6200000000000047	3 dígitos al azar	Cualquier fecha futura
UnionPay (tarjeta de 19 dígitos)	6205500000000000004	3 dígitos al azar	Cualquier fecha futura

Pago rechazado:

Rechazo genérico	4000000000000002	card_declined	generic_decline
Pago rechazado por fondos insuficientes	4000000000009995	card_declined	insufficient_funds
Pago rechazado por ser una tarjeta reportada como perdida	4000000000009987	card_declined	lost_card
Pago rechazado por tratarse de una tarjeta robada	4000000000009979	card_declined	stolen_card
Pago rechazado por tarjeta vencida	4000000000000069	expired_card	n/d
Rechazo por CVC incorrecto	4000000000000127	incorrect_cvc	n/d
Pago rechazado por error de procesamiento	4000000000000119	processing_error	n/d
Rechazo por número incorrecto	4242424242424241	incorrect_number	n/d
Pago rechazado porque se excedió el límite de velocidad	4000000000006975	card_declined	card_velocity_exceeded




