![EXPORT - BetterEarth Render](https://user-images.githubusercontent.com/29945147/229606920-ecda83e4-2106-4f6f-913f-c22771ce89cc.png)

# EcoQuest Backend

Welcome to the EcoQuest Backend! Our game promotes sustainable living by engaging users in activities that encourage responsible consumption. By completing these events, users can earn credits that can be redeemed for prizes.

## Inital setup

**Prerequisites NodeJS LTS v18.14.0**

1. Install nvm on your machine
2. run `nvm install v18.14.0`
3. run `nvm use`
4. Run `npm install` in the working directory to install required packages
5. Reference `.env.example` and create your own `.env` file
6. Run `npm run db:create` to create the database.
7. Run `npm run db:migrate` to migrate models.
8. Run `npm run db:seed` to seed database.
9. Run `npm run dev` to start the development server

## Documentation

- [**Production Link**](https://sus-backend.herokuapp.com/)
- [**Entity Relation Diagram**](https://drawsql.app/teams/butters/diagrams/sus-tainability)

### Relation Diagram
<img width="559" alt="image" src="https://user-images.githubusercontent.com/29945147/229607493-6d27246b-801a-4d70-b6c5-8c47c1bc86ab.png">


### File Structure and Naming Convention

```
src/
├─ consts/
│  ├─ environment.ts
│  ├─ userFriendlyMessages.ts
├─ controllers/
│  ├─ ExampleController.ts
├─ db/
│  ├─ migrations/
│  ├─ seeders/
│  ├─ index.ts
├─ middlewares/
├─ models/
│  ├─ Example.ts
│  ├─ index.ts
├─ repositories/
│  ├─ BaseRepository.ts
├─ routes/
│  ├─ ExampleRoutes.ts
├─ services/
│  ├─ ExampleService.ts
├─ types/
│  ├─ index.ts
├─ utils/
│  ├─ container.ts
│  ├─ dbUtils.ts
├─ app.ts
├─ server.ts
```

### Commit Message Convention

- Use [Gitmoji](https://gitmoji.dev/) to add emojis to your commit messages
- Use the following format for your commit messages
  - :sparkles: `feat: add new feature`
  - :bug: `fix: fix a bug`
  - :recycle: `refactor: refactor code`
  - :art: `style: change styling`
  - :fire: `chore: remove unused code`
  - :memo: `docs: update documentation`
  - :package: `package: update package`
  - :rocket: `deploy: deploy to production`
  - :wastebasket: `waste: remove unused code`
