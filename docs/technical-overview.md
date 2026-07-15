# SoundBase - Visão técnica

## Objetivo

SoundBase é uma aplicação full stack para gerenciamento musical, composta por um backoffice administrativo e uma interface pública.

O backoffice permite gerenciar artistas, álbuns e músicas. A interface pública consome os dados cadastrados e exibe músicas, artistas, álbuns, busca e player.

## Stack

- Next.js
- React
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker
- NextAuth
- Tailwind CSS
- Zod

## Arquitetura

O projeto usa uma separação simples entre rotas, componentes, serviços e utilitários.

- `app/`: páginas, rotas e Server Actions
- `components/`: componentes reutilizáveis
- `services/`: acesso ao banco com Prisma
- `utils/`: helpers de autenticação, upload e validações auxiliares
- `prisma/`: schema, migrations e seed

## Autenticação e autorização

A autenticação é feita com NextAuth usando Credentials Provider.

O usuário possui uma role:

- `ADMIN`
- `USER`

As páginas do dashboard são protegidas por um layout administrativo que exige usuário autenticado com role `ADMIN`.

As Server Actions também validam permissão de administrador antes de criar, editar ou excluir dados.

## Modelagem principal

O domínio principal é formado por:

- `User`
- `Artist`
- `Album`
- `Song`

Relacionamentos:

- Um artista possui vários álbuns
- Um álbum pertence a um artista
- Um álbum possui várias músicas
- Uma música pertence a um álbum

## Uploads

O projeto permite upload local de imagens e áudios.

Validações implementadas:

- Imagens: PNG, JPG ou JPEG
- Áudios: MP3, WAV ou OGG
- Limite de imagem: 5MB
- Limite de áudio: 20MB
- Arquivos salvos com UUID

Em produção, a camada de upload pode ser substituída por storage externo.

## Fluxo principal

1. Admin acessa o backoffice
2. Admin cadastra artistas, álbuns e músicas
3. Os dados são persistidos no PostgreSQL via Prisma
4. A interface pública lista os dados cadastrados
5. Usuários podem buscar músicas, artistas e álbuns
6. O player reutilizável permite ouvir músicas no backoffice e na interface pública

## Pontos de destaque

- CRUD completo com relacionamentos
- Controle de acesso por role
- Validação com Zod
- Upload de arquivos
- Player de áudio reutilizável
- Separação entre backoffice e interface pública
- Docker para ambiente local
- Seed com dados demo
