# SoundBase

SoundBase é uma aplicação full stack para gerenciamento musical, desenvolvida por Pedro Henrique Garcia com Next.js, Prisma, PostgreSQL, Docker e NextAuth.

O projeto conta com um backoffice administrativo para gerenciar artistas, álbuns e músicas, além de uma interface pública para navegação, busca e reprodução das músicas cadastradas.

## Links

- Repositório: https://github.com/pedrogarciaphgs/soundbase
- Autor: Pedro Henrique Garcia
- LinkedIn: https://www.linkedin.com/in/pedrogarciaphgs

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

### Backoffice

- Login com NextAuth Credentials
- Proteção de rotas administrativas por role `ADMIN`
- Proteção das Server Actions por role `ADMIN`
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

### Interface pública

- Home pública com últimas músicas cadastradas
- Listagem pública de artistas
- Página pública de detalhes do artista
- Listagem pública de álbuns
- Página pública de detalhes do álbum
- Página pública de detalhes da música
- Player de áudio reutilizado na interface pública
- Busca por músicas, álbuns e artistas
- Navegação pública com links para Início, Artistas, Álbuns e Backoffice

## Screenshots

### Home pública

![Home pública](docs/screenshots/home.png)

### Busca

![Busca](docs/screenshots/search.png)

### Login

![Login](docs/screenshots/login.png)

### Dashboard

![Dashboard](docs/screenshots/dashboard.png)

### Backoffice - Artistas

![Backoffice - Artistas](docs/screenshots/artists.png)

### Backoffice - Álbuns

![Backoffice - Álbuns](docs/screenshots/albums.png)

### Backoffice - Músicas

![Backoffice - Músicas](docs/screenshots/songs.png)

### Interface pública - Artistas

![Interface pública - Artistas](docs/screenshots/public-artists.png)

### Interface pública - Álbuns

![Interface pública - Álbuns](docs/screenshots/public-albums.png)

### Interface pública - Músicas

![Interface pública - Músicas](docs/screenshots/public-songs.png)

> As imagens acima mostram o fluxo público e administrativo da aplicação.

## Estrutura principal

```txt
src/
  app/
    dashboard/
      artists/
      albums/
      songs/
    artists/
    albums/
    songs/
    search/
  components/
    artists/
    albums/
    songs/
    dashboard/
    public/
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

## Decisões técnicas

- O projeto foi estruturado primeiro como um backoffice administrativo, responsável por alimentar e gerenciar os dados musicais.
- A interface pública/client consome os dados cadastrados pelo painel administrativo.
- As operações administrativas usam Server Actions do Next.js.
- O acesso ao banco foi isolado em services, mantendo as páginas e actions mais organizadas.
- A autenticação usa NextAuth com Credentials Provider.
- O acesso ao backoffice é restrito a usuários com role `ADMIN`.
- As Server Actions também validam permissão de administrador antes de criar, editar ou excluir dados.
- Os formulários usam Zod para validação antes da persistência.
- Os uploads são armazenados localmente em ambiente de desenvolvimento.
- Os arquivos enviados usam UUID no nome para evitar conflitos.
- Em produção, a camada de upload pode ser substituída por storage externo como S3, Cloudinary ou R2.

## Uploads

O projeto possui upload local para imagens e arquivos de áudio.

Validações implementadas:

- Imagens: PNG, JPG ou JPEG
- Áudios: MP3, WAV ou OGG
- Limite de imagem: 5MB
- Limite de áudio: 20MB
- Arquivos salvos com UUID para evitar conflito de nomes

Os uploads são armazenados em `public/uploads`, mas os arquivos enviados não são versionados no Git.

## Deploy

O projeto está preparado para desenvolvimento local com Docker.

Para produção, alguns pontos precisam ser configurados:

- Banco PostgreSQL hospedado externamente
- Variáveis de ambiente configuradas na plataforma de deploy
- `NEXTAUTH_URL` apontando para a URL final da aplicação
- `NEXTAUTH_SECRET` seguro e exclusivo do ambiente de produção
- Storage externo para uploads de imagens e áudio

Atualmente, os uploads são salvos localmente em `public/uploads`, o que é adequado para desenvolvimento. Em produção, essa camada deve ser substituída por um serviço de storage externo como S3, Cloudinary, R2 ou Vercel Blob.

Para produção, use o arquivo `.env.production.example` como referência para configurar as variáveis de ambiente na plataforma de deploy.

As migrations em produção devem ser aplicadas com:

```bash
npm run prisma:migrate:deploy
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

O seed cria um usuário administrador demo para acesso local:

```txt
E-mail: garcia.admin@soundbase.com
Senha: admin123
```

> Essas credenciais são apenas para ambiente local de desenvolvimento.

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

Rotas Públicas:

```txt
/
/artists
/artists/[id]
/albums
/albums/[id]
/songs
/songs/[id]
/search?q=termo
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

- Melhorias na interface pública
- Filtros avançados
- Storage externo para uploads
- Deploy

## Autor

Desenvolvido por Pedro Henrique Garcia.

- GitHub: https://github.com/pedrogarciaphgs
- LinkedIn: https://www.linkedin.com/in/pedrogarciaphgs
