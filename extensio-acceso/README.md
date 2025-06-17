# Extensio Acceso

App de campo para técnicos que permite registrar visitas a productores, con soporte offline y sincronización automática.

## 🧪 Funcionalidades

- Listar productores desde API
- Registrar visita (con ubicación y foto)
- Consultar historial de visitas
- Funciona sin conexión
- Sincroniza automáticamente al reconectarse

## 🚀 Instalación

1. Clona este repositorio o descomprime el `.zip`
2. Instala dependencias:

```bash
yarn install
# o npm install

Inicia el proyecto:

bash
Copiar
Editar
npx expo start
🧩 Librerías clave
react-navigation

@react-native-async-storage/async-storage

@react-native-community/netinfo

expo-location

expo-image-picker

📦 Estructura
screens/ → pantallas principales

services/ → manejo de datos locales y API

hooks/ → lógica reutilizable (sincronización)

components/ → componentes visuales reutilizables

yaml
Copiar
Editar

---

## ▶️ Pasos finales para ejecutar y probar

1. Asegúrate de tener Node.js y Expo CLI instalados
2. En terminal:
```bash
cd extensio-acceso
yarn install
npx expo start
Escanea el QR con la app de Expo Go en tu celular

para correr los test usa: yarn/npm jest/test despues de yarn/npm install
