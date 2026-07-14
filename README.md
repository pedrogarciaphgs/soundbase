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

## Screenshots

### Login

![Login](docs/screenshots/login.png)

### Dashboard

![Dashboard](docs/screenshots/dashboard.png)

### Artistas

![Artistas](docs/screenshots/artists.png)

### Álbuns

![Álbuns](docs/screenshots/albums.png)

### Músicas

![Músicas](docs/screenshots/songs.png)

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

## Arquitetura

O projeto segue uma separação simples entre interface, regras de aplicação e acesso ao banco.

- `app/`: rotas, páginas e Server Actions do Next.js
- `components/`: componentes reutilizáveis de interface
- `services/`: funções responsáveis por acessar o banco com Prisma
- `utils/`: helpers reutilizáveis, como autenticação e upload
- `prisma/`: schema, migrations e seed do banco

As páginas administrativas são protegidas por autenticação com NextAuth e validação de role `ADMIN`.

As operações de criação, edição e exclusão são feitas por Server Actions, com validação usando Zod antes de persistir os dados no banco.

## Uploads

O projeto possui upload local para imagens e arquivos de áudio.

Validações implementadas:

- Imagens: PNG, JPG ou JPEG
- Áudios: MP3, WAV ou OGG
- Limite de imagem: 5MB
- Limite de áudio: 20MB
- Arquivos salvos com UUID para evitar conflito de nomes

Os uploads são armazenados em `public/uploads`, mas os arquivos enviados não são versionados no Git.

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
