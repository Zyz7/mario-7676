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



npm run test:coverage
