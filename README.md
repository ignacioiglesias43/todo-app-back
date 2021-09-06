# Todo App Challenge - Back-End Repository

## Description

To Do App Challenge Back-End repository

## Installation

```bash
# With npm
$ npm install
```

## Step One:

After installing dependencies you will need to start your Postgres DB server-side, then run migrations and seeders like:

```bash
# Run migrations
$ npm run migrate:dev

# Run seeders
$ npm run prisma:seed
```

## Step Two:

After migrating and seeding the DB you will need to start nest server:

```bash
# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test
```
