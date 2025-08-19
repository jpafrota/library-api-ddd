# Shared Library API

## Overview

This is a shared library API that uses Domain-Driven Design as its main architectural pattern.

Main entities:

- Book
- Loan

A few features:

- Create books
- Get book by id
- Request loan
- Return loan
- List books and loans

## Commands

To boot up the database using Docker, use:

For Docker CLI: 
- `docker-compose up -d --build`

For Docker Desktop:
- `docker compose up -d --build`

If you want to run locally, make sure to install **Node.js** and **Yarn classic**.

**Build**
`yarn build`

**Migrate database**
`yarn prisma migrate dev`

**Start (dev mode)**
`yarn start:dev`

**Start (prod mode)**
`yarn start:prod`


## Thought process

I'll try to describe in this session all the steps I've taken to implement this challenge.

### Initial DDD study

I was not very familiar with DDD approach per se, so the first step was to study it.
I learned that DDD splits application into several layers, where the **domain layer** being in the core of the app.

The **domain layer** contains all business logic for a given entity, and it's independent from the infrastructure, API, and other application components. It is an independent layer where we keep the core functionality for a specific entity. 

The **api layer** is composed of the app's network interfaces (controllers) that will map the requests/responses with the client

The **application layer** will feature the use cases, which will then invoke the domain layer for specific entity logic.

The **infrastructure layer** will be responsible for mapping the entities to the database and ensure that we persist valid cahnges when requested. It is independent of the domain layer, whereas if the business logic changes, changes to the infrastructure layer should be minimal. 

Of course, we need to convert often from the infra entity to the domain entity, that's where interfaces and mappers are really handy. 

The main benefit of this approach is that it makes the domain independent from the implementation. If we ever decide to change database or ORM, it is easy because everything is built on top of abstractions and **dependency injection**. 

### App structure

Given that, I decided to create two modules, each with their own layers. Each module will have all the layers for its entities.

### Database setup

I decided to start with the database creation. I booted up a PostgreSQL image with a `docker-compose.yml` file to speed up this process and set up Prisma ORM with the initial schema/migrations.

----

## Technologies used

- Yarn
- Node.js
- NestJS
- PostgreSQL
- Prisma ORM