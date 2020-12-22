# MINICHAT

#### Descrição:
> Esta aplicação é um minichat desenvolvido afim de aprimorar meu conhecimento nas ferramentas utilizadas.

<br>

### Tecnologias usadas
|  APLICAÇÃO WEB  |       API        |
|-----------------|------------------|
| VueJS com Nuxt  | NodeJS com Nest  |
| Socket.IO       | WebSockets       |
| Vuetify         | TypeORM          |
| Vuex            | Postgres         |
| #               | JWT              |

<br>

#### Requisitos funcionais:
- [x] O usuário deverá fazer sua conta informando um nickname e uma senha
- [x] O usuário deverá realizar o login na sua conta informando os mesmos dados
- [ ] O usuário **logado** poderá pesquisar quaisquer outros usuários pelo nickname
- [ ] O usuário **logado** poderá visualizar os grupos e conversas em que é participante
- [ ] O usuário **logado** poderá mandar mensagens para qualquer outro, a partir do nickname
- [ ] O usuário **logado** poderá criar grupos e inserir outros usuários a partir do nickname
- [ ] O usuário **logado** poderá enviar e _apagar_ mensagens (para si ou para todos) de grupos e conversas nos quais pertence
- [ ] O usuário **logado** poderá sair dos grupos e _apagar_ conversas no qual está inserido


#### Requisitos não funcionais:
- [x] Um grupo deverá ter no mínimo um membro
- [x] Se todos os membros de um grupo saírem, o grupo e suas mensagens serão apagadas
- [ ] Se os participantes de uma conversa excluírem-a, a conversa e suas mensagens serão apagados