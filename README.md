# SoundBase

SoundBase é um backoffice musical desenvolvido por Pedro Henrique Garcia com Next.js, Prisma, PostgreSQL, Docker e NextAuth.

O projeto permite gerenciar artistas, álbuns e músicas em um painel administrativo protegido por autenticação e controle de acesso por role.

## Tecnologias

- Next.js 15
- React 19
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker
- NextAuth
- Tailwind CSS
- Zod
- React Hot Toast

## Funcionalidades

- Login com NextAuth Credentials
- Proteção de rotas administrativas por role `ADMIN`
- Dashboard com estatísticas
- CRUD de artistas
- CRUD de álbuns
- CRUD de músicas
- Upload local de imagens
- Upload local de áudio
- Player de áudio no backoffice
- Validação de formulários com Zod
- Feedback visual com toast
- Seed de usuário admin e dados demo

## Estrutura principal

```txt
src/
  app/
    dashboard/
      artists/
      albums/
      songs/
  components/
    artists/
    albums/
    songs/
    dashboard/
  lib/
  services/
  utils/
prisma/
  schema.prisma
  seed.ts
```

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone git@github.com:pedrogarciaphgs/soundbase.git
cd soundbase
```

### 2. Criar o arquivo `.env`

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

No Windows PowerShell:

```bash
Copy-Item .env.example .env
```

Depois edite o `.env` com suas credenciais locais.

> Importante: não commite o arquivo `.env` real. Use apenas o `.env.example` como referência.

### 3. Subir o projeto com Docker

```bash
docker compose up --build
```

A aplicação ficará disponível em:

```txt
http://localhost:3000
```

### 4. Rodar as migrations

Em outro terminal, execute:

```bash
npx prisma migrate dev
```

### 5. Rodar o seed

```bash
npx prisma db seed
```

Usuário administrador demo criado pelo seed:

```txt
E-mail: garcia.admin@soundbase.com
Senha: admin123
```

### 6. Acessar o backoffice

Depois do login, acesse:

```txt
http://localhost:3000/dashboard
```

Rotas principais:

```txt
/dashboard
/dashboard/artists
/dashboard/albums
/dashboard/songs
```

### 7. Abrir o Prisma Studio

Para visualizar os dados do banco:

```bash
npx prisma studio
```

## Observações

Os arquivos enviados pelo backoffice são armazenados localmente em:

```txt
public/uploads
```

Em produção, essa camada pode ser substituída por um serviço externo de storage como S3, Cloudinary ou R2.

## Status do projeto

Projeto em desenvolvimento.

Próximas etapas planejadas:

- Interface pública/client
- Busca e filtros
- Página pública de artistas
- Página pública de álbuns
- Página pública de músicas
- Player público
- Deploy

## Autor

Desenvolvido por Pedro Henrique Garcia.

- GitHub: github.com/pedrogarciaphgs
- LinkedIn:https://www.linkedin.com/in/pedrogarciaphgs
