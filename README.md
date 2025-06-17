# 💻 Ahorrista - Aplicación Web de Control de Gastos

Una aplicación web moderna desarrollada en React + TypeScript que permite a los usuarios visualizar y controlar sus gastos personales de manera eficiente.

## 🚀 Características Principales

### ✅ Autenticación JWT Completa
- Registro de usuarios con validación de contraseña (mínimo 12 caracteres)
- Inicio de sesión seguro
- Almacenamiento persistente del token JWT
- Protección de rutas privadas
- Auto-generación de 10,000 gastos de ejemplo al registrarse

### ✅ Consumo Eficiente de APIs
- **Carga progresiva**: Primero muestra resumen mensual, luego detalles bajo demanda
- **Optimización de rendimiento**: Solo carga datos detallados cuando el usuario hace clic en una categoría
- **Caché inteligente**: Almacena datos cargados para evitar llamadas repetitivas
- **Interceptores HTTP**: Manejo automático de tokens de autorización

### ✅ Diseño de Componentes Modular
- Componentes reutilizables y bien estructurados
- Separación clara de responsabilidades
- Props tipadas con TypeScript
- Arquitectura escalable

### ✅ Gestión Completa de Gastos
- **Dashboard principal** con resumen mensual por categorías
- **Vista detallada** de gastos por categoría y mes
- **Registro de nuevos gastos** con formulario validado
- **Eliminación de gastos** con confirmación
- **Navegación por meses** con selector intuitivo

### ✅ Sistema de Metas de Ahorro
- Creación de metas mensuales personalizadas
- Seguimiento visual del progreso
- Edición inline de metas existentes
- Cálculo automático de porcentajes de cumplimiento

### ✅ UI/UX Moderno y Responsive
- Diseño limpio y profesional con Tailwind CSS
- Componentes responsive para móviles y desktop
- Indicadores de carga y estados de error
- Navegación intuitiva con breadcrumbs
- Iconos contextuales por categoría

### ✅ Código Limpio y Tipado
- 100% TypeScript con tipos estrictos
- Interfaces bien definidas para todos los datos
- Manejo robusto de errores
- Código modular y mantenible

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19 + TypeScript
- **Routing**: React Router DOM 7
- **Estado Global**: Zustand con persistencia
- **HTTP Client**: Axios con interceptores
- **Estilos**: Tailwind CSS 4
- **Build Tool**: Vite 6
- **Linting**: ESLint + TypeScript ESLint

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── AddExpenseModal.tsx
│   ├── AddGoalModal.tsx
│   ├── ExpenseSummaryCard.tsx
│   ├── GoalCard.tsx
│   ├── LoadingSpinner.tsx
│   ├── MonthSelector.tsx
│   └── NavBar.tsx
├── contexts/           # Contextos de React
│   └── AuthProvider.tsx
├── pages/             # Páginas principales
│   ├── DashboardPage.tsx
│   ├── ExpenseDetailsPage.tsx
│   ├── GoalsPage.tsx
│   └── LoginPage.tsx
├── router/            # Configuración de rutas
│   ├── ProtectedRoute.tsx
│   └── routes.tsx
├── stores/            # Estado global con Zustand
│   └── appStore.ts
├── types/             # Definiciones de tipos TypeScript
│   ├── authTypes.tsx
│   └── expenseTypes.ts
├── utils/             # Utilidades y APIs
│   └── api.tsx
├── App.tsx
└── main.tsx
```

## 🔌 API Endpoints Utilizados

### Autenticación
- `POST /authentication/register` - Registro de usuarios
- `POST /authentication/login` - Inicio de sesión

### Gastos
- `GET /expenses_summary` - Resumen mensual por categorías
- `GET /expenses/detail` - Detalles de gastos por categoría
- `POST /expenses` - Crear nuevo gasto
- `DELETE /expenses/:id` - Eliminar gasto

### Categorías
- `GET /expenses_category` - Lista de categorías disponibles

### Metas
- `GET /goals` - Obtener metas del usuario
- `POST /goals` - Crear nueva meta
- `PATCH /goals/:id` - Actualizar meta existente

## 🚀 Instalación y Configuración

1. **Clonar el repositorio**
```bash
git clone [repository-url]
cd hackaton-2
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Construir para producción**
```bash
npm run build
```

## 📱 Flujo de Usuario

1. **Registro/Login**: El usuario se registra o inicia sesión
2. **Dashboard**: Ve el resumen mensual de gastos por categoría
3. **Detalles**: Hace clic en una categoría para ver gastos individuales
4. **Gestión**: Puede agregar nuevos gastos o eliminar existentes
5. **Metas**: Define y hace seguimiento a sus metas de ahorro
6. **Navegación**: Puede cambiar entre diferentes meses y años

## 🎯 Principios de Desarrollo

- **Consumo Eficiente**: Carga datos progresivamente para optimizar rendimiento
- **UX First**: Interfaz intuitiva y responsive
- **Type Safety**: Tipado estricto en TypeScript
- **Modularidad**: Componentes reutilizables y bien organizados
- **Error Handling**: Manejo robusto de errores y estados de carga

## 📊 Optimizaciones Implementadas

- Carga perezosa de detalles de gastos
- Caché de datos para evitar llamadas repetitivas
- Componentes optimizados para renderizado
- Gestión eficiente del estado global
- Interceptores HTTP para manejo de tokens

## 🔒 Seguridad

- Tokens JWT para autenticación
- Rutas protegidas
- Validación de formularios
- Manejo seguro de datos sensibles

---

**Desarrollado para el Hackathon UTEC 2025-1**  
*Desarrollo Basado en Plataformas*
