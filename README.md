# Payments Service

Este proyecto es un servicio de pagos construido con [NestJS](https://nestjs.com/) y la API de Mercado Pago. Facilita la creación, consulta y gestión de pagos a través de integraciones con Mercado Pago. 

## Requisitos Previos

- Node.js (versión 14 o superior)
- NestJS CLI
- Una cuenta de Mercado Pago y un token de acceso
- Un servidor de base de datos compatible (por ejemplo, PostgreSQL o MySQL)

## Configuración del Proyecto

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tuusuario/payments-service.git
    cd payments-service
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias:

    ```plaintext
    DATABASE_URL=your_database_url
    MERCADOPAGO_ACCESS_TOKEN=your_mercado_pago_access_token
    ```

4. Inicia la base de datos y ejecuta las migraciones si es necesario.

5. Inicia el servidor de desarrollo:

    ```bash
    npm run start:dev
    ```

El servidor estará ejecutándose en `http://localhost:3000`.

## Endpoints

### GET `/payments`
Obtiene una lista de todos los pagos registrados en el sistema.

#### Ejemplo de Uso

```bash
curl http://localhost:3000/payments
