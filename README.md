
# API MODEL IA CHAT

Este proyecto es una api que permite interactuar con un servicio de chat basado en IA de manera gratis y sin necesidad de autenticación. Permite
crear un chat con modelos como *MINIO3*, *MINIO4*, *LLAMA*, *CLAUDE*, *MISTRAL*

> [!WARNING]  
> **Este proyecto se encuntra en desarrollo y depende de un servicio externo para funcionar.**

<div>
<img width="40" height="40" src="./logos/claude-ai-icon.svg" alt="Claude AI Icon"/>
<img width="40" height="40" src="./logos/ollama_dark.svg" alt="Llama Icon"/>
<img width="40" height="40" src="./logos/openai_dark.svg" alt="OpenIA Icon"/>
<img width="40" height="40" src="./logos/mistral-ai_logo.svg" alt="Mistral Icon"/>
</div>

## Tabla de contenido

- [API MODEL IA CHAT](#api-model-ia-chat)
  - [Tabla de contenido](#tabla-de-contenido)
  - [Requisitos](#requisitos)
  - [Instalación](#instalación)
    - [Clona el repositorio](#clona-el-repositorio)
    - [Instala las dependencias](#instala-las-dependencias)
  - [Configura las variables de entorno](#configura-las-variables-de-entorno)
  - [Ejecuta el servidor](#ejecuta-el-servidor)
  - [Uso](#uso)
    - [MINIO3](#minio3)
    - [MINIO4](#minio4)
    - [LLAMA](#llama)
    - [CLAUDE](#claude)
    - [MISTRAL](#mistral)
    - [About Me](#about-me)

## Requisitos

- Node.js 18 o superior
- NPM 9 o superior

## Instalación

### Clona el repositorio

```bash
git clone https://github.com/epmyas2022/api-chat-ia-model.git
cd api-model-ia-chat
```

### Instala las dependencias

```bash
npm install
```

## Configura las variables de entorno

Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

```env
EXTERNAL_CHAT_IA_URL=<url (ej: https://duckduckgo.com/duckchat/)>
EXTERNAL_API_KEY=<string | url> (ej: https://duckduckgo.com/?q=DuckDuckGo+AI+Chat&ia=chat&duckai=1)>
````

## Ejecuta el servidor

```bash
npm start
```

si estas en desarrollo puedes usar el siguiente comando para que se reinicie automaticamente al hacer cambios

```bash
npm run start:dev
```

## Uso

Para todos lo modelos la estructura de la peticion es la siguiente:

```json
{
 
    "messages": [
        {
            "role": "<user | assistant>",
            "content": "<mensaje>",
        }
    ]
}
```

### MINIO3

```bash
curl -X POST http://localhost:3000/chat/v1/mini03 \
-H "Content-Type: application/json" \
-d '{
    "messages": [
        {
            "role": "user",
            "content": "Hola, ¿cómo estás?"
        }
    ]
}'
```

### MINIO4

```bash
curl -X POST http://localhost:3000/chat/v1/mini04 \
-H "Content-Type: application/json" \
-d '{
    "messages": [
        {
            "role": "user",
            "content": "Hola, ¿cómo estás?"
        }
    ]
}'
```

### LLAMA

```bash
curl -X POST http://localhost:3000/chat/v1/llama-turbo \
-H "Content-Type: application/json" \
-d '{
    "messages": [
        {
            "role": "user",
            "content": "Hola, ¿cómo estás?"
        }
    ]
}'
```

### CLAUDE

```bash
curl -X POST http://localhost:3000/chat/v1/claude \
-H "Content-Type: application/json" \
-d '{
    "messages": [
        {
            "role": "user",
            "content": "Hola, ¿cómo estás?"
        }
    ]
}'
```

### MISTRAL

```bash
curl -X POST http://localhost:3000/chat/v1/mistral-small \
-H "Content-Type: application/json" \
-d '{
    "messages": [
        {
            "role": "user",
            "content": "Hola, ¿cómo estás?"
        }
    ]
}'
```

### About Me

```bash
curl -X POST http://localhost:3000/chat/about-me \
-H "Content-Type: application/json" \
-d '{
    "messages": [
        {
            "role": "user",
            "content": "Hola, ¿cómo estás?"
        }
    ]
}'
```

Repuesta esperada:

```json
{
 "id": "bb1045a0-a6ee-4b06-9cdb-d74fd2a9f7f9",
 "message": "¡Hola! Soy Isaac Castillo, un desarrollador de software. Estoy bien, gracias. ¿Y tú? Si tienes preguntas sobre mi trabajo o habilidades en desarrollo de aplicaciones web/móviles o inteligencia artificial, estaré encantado de ayudarte. 😊",
 "model": "gpt-4o-mini",
 "action": "chat",
 "created": "2025-04-28T14:44:26.655Z"
}
```
