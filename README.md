# Proyecto de Gestión de Usuarios y Permisos

Este es un sistema de gestión de usuarios y permisos inspirado en la arquitectura de n8n. Es un monorepo que utiliza pnpm workspaces, con un backend de TypeScript y un frontend de Vue.js.

## Estructura del Proyecto

### Directorio Raíz (`/`)

-   `pnpm-workspace.yaml`: Define los directorios que contienen los paquetes del monorepo (en este caso, los que están en `packages/*`). Es el archivo que le dice a `pnpm` que este es un proyecto con múltiples paquetes.
-   `package.json`: El archivo de configuración principal del proyecto. Contiene scripts para ejecutar tareas comunes (`build`, `dev`, `start`) a nivel de todo el monorepo y las dependencias de desarrollo globales, como `typescript`.
-   `tsconfig.json`: El archivo de configuración base de TypeScript para todo el proyecto. Los `tsconfig.json` de los paquetes individuales pueden extender o sobreescribir esta configuración.
-   `GEMINI.md`: Archivo de contexto para la IA de Gemini, que le ayuda a entender la estructura y tecnologías del proyecto.
-   `.pnpmfile.cjs`: Un archivo de hooks para `pnpm` que permite personalizar el proceso de instalación.

### `packages/core`

Este paquete contiene la lógica de negocio y las definiciones de datos que se comparten entre otros paquetes (principalmente el backend).

-   `package.json`: Define las dependencias y scripts específicos para el paquete `core`.
-   `src/entity/`: Este directorio contiene las **entidades** de TypeORM. Cada archivo `.ts` aquí define la estructura de una tabla en la base de datos.
    -   `User.ts`: Define el modelo de datos para los usuarios.
    -   `Enterprise.ts`: Define el modelo para las empresas.
    -   `Permission.ts`: Define los permisos que se pueden asignar.
    -   `UserGroup.ts`: Define los grupos o roles de usuarios.
    -   `UserGroupPermission.ts`: Tabla intermedia que asocia permisos a los grupos de usuarios.
    -   `UserUserGroupMap.ts`: Tabla intermedia que asocia usuarios a los grupos de usuarios.

### `packages/main`

Este es el paquete del backend, una aplicación de servidor construida con Express.

-   `package.json`: Contiene las dependencias del servidor (como `express`, `typeorm`, `cors`) y scripts para iniciar y construir el backend.
-   `src/index.ts`: El punto de entrada de la aplicación del servidor. Aquí se crea la instancia de Express, se configuran los middlewares y se inician las rutas.
-   `src/seed.ts`: (Probablemente) Un script para poblar la base de datos con datos iniciales (semilla) para desarrollo o pruebas.
-   `src/middleware/auth.ts`: Contiene el middleware de autenticación. Probablemente intercepta las peticiones, verifica el token JWT y permite o deniega el acceso a las rutas protegidas.
-   `src/routes/`: Este directorio define los **endpoints** de la API.
    -   `enterprise.ts`, `permission.ts`, `user.ts`, etc.: Cada archivo define las rutas para gestionar un recurso específico (ej. `GET /api/users`, `POST /api/users`). El archivo `user.ts` probablemente también contenga la ruta `/api/login`.

### `packages/ui`

Este es el paquete del frontend, una aplicación de una sola página (SPA) construida con Vue.js.

-   `package.json`: Define las dependencias del frontend (como `vue`, `vue-router`, `axios`) y los scripts para el servidor de desarrollo de Vite (`dev`) y la compilación (`build`).
-   `vite.config.ts`: Archivo de configuración para Vite, el empaquetador y servidor de desarrollo del frontend.
-   `index.html`: El archivo HTML principal de la SPA. Vue.js montará la aplicación dentro de este archivo.
-   `src/main.ts`: El punto de entrada de la aplicación Vue. Aquí se crea la instancia de Vue, se instala el router y se monta la aplicación en el `index.html`.
-   `src/App.vue`: El componente raíz de la aplicación Vue.
-   `src/router/index.ts`: Define las rutas de la aplicaci��n frontend. Mapea las URLs (como `/login`, `/home`) a los componentes de Vue que se deben renderizar. También contiene la lógica de protección de rutas (guardias de navegación) para redirigir a los usuarios no autenticados.
-   `src/services/api.ts`: Centraliza la comunicación con la API del backend. Probablemente exporta una instancia de `axios` preconfigurada con la URL base de la API y para adjuntar tokens de autenticación a las peticiones.
-   `src/views/`: Contiene los componentes de Vue que representan páginas completas.
    -   `Login.vue`: La página de inicio de sesión.
    -   `Home.vue`: La página principal a la que se accede después de iniciar sesión.
    -   `Landing.vue`: La página de bienvenida o de inicio.
-   `src/components/`: Contiene componentes de Vue reutilizables que se usan dentro de las vistas.
    -   `UserManagement.vue`, `RoleManagement.vue`, etc.: Componentes para gestionar diferentes partes de la aplicación una vez que el usuario ha iniciado sesión.

## Explicación del Backend (`packages/main/src/index.ts`)

El archivo `packages/main/src/index.ts` es el punto de entrada principal de la aplicación de backend. Sus responsabilidades clave son:

1.  **Configuración del Servidor**: Inicia una instancia del servidor web utilizando Express.
2.  **Middlewares**:
    -   `cors`: Permite que el frontend (que se ejecuta en un origen diferente) se comunique con el backend.
    -   `bodyParser`: Parsea el cuerpo de las solicitudes entrantes en formato JSON.
    -   `authMiddleware`: Un middleware personalizado que actúa como un guardián para las rutas protegidas. Verifica la validez de los tokens de autenticación (JWT) en las cabeceras de las solicitudes.
3.  **Conexión a la Base de Datos**:
    -   Utiliza `TypeORM` para conectarse a una base de datos SQLite.
    -   La configuración de la conexión (`AppDataSource`) se exporta para que pueda ser utilizada en otros archivos (por ejemplo, en los archivos de rutas para realizar consultas).
    -   `synchronize: true` está habilitado para el desarrollo, lo que sincroniza automáticamente el esquema de la base de datos con las definiciones de las entidades.
4.  **Rutas (Endpoints)**:
    -   **Rutas Públicas**: Las rutas que no requieren autenticación, como `/api/login`, se registran *antes* del `authMiddleware`.
    -   **Rutas Protegidas**: Las rutas que gestionan los datos principales de la aplicación (usuarios, empresas, permisos, etc.) se registran *después* del `authMiddleware`, asegurando que solo las solicitudes autenticadas puedan acceder a ellas.
5.  **Arranque**: Inicia el servidor para que escuche en el puerto 3000.
