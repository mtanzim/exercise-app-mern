# Exercise Tracking App with MERN

[Project Planning](https://trello.com/b/uICmF13r/exercise-app)

Review full stack fundamentals by building this app. Following aspects will be covered:

- Back end design with:
  - Typescript
  - NodeJS/Express
  - MongoDB/Mongoose
  - PassportJS
  - Mocha/Chai
- Front end design with:
  - React Native/Redux

Lessons Learned

- Switching from Babel to TS (ts-node, nodemon)
- [Debugging ts-node with vscode](.vscode/launch.json)
  - [Source article](https://medium.com/@dupski/debug-typescript-in-vs-code-without-compiling-using-ts-node-9d1f4f9a94a)
- [Enums with Typescript](routes/common.ts)
- Resuable code between models, controllers, routes, tests (DRY!!)
  - [Controllers](controllers/common.ts)
  - [Models](models/common.ts)
  - [Routes](routes/common.ts)
  - [Tests](test/common.ts)