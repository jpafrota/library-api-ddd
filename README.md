# Shared Library API

## Overview

This is a shared library API that uses Domain-Driven Design as its main architectural pattern.

Main entities:

- Book
- Loan

Core features/endpoints:

- Create books
- Get book by id
- Request loan
- Return loan
- List books and loans

## Commands

### Docker Setup
For Docker CLI: 
- `docker-compose up -d --build`

For Docker Desktop:
- `docker compose up -d --build`

Both commands will do the same: start the database and the api.

### Local Setup

If you want to run locally, make sure to install **Node.js** and **Yarn classic**. I did not include the local DB Setup in this readme, but if you want, feel free to use a local db as well (or run just the database in Docker using `docker compose up -d --build postgres`)

#### Build

`yarn build`

#### Migrate database

`yarn prisma migrate dev`

#### Start (dev mode)

`yarn start:dev`

#### Start (prod mode)
`yarn start:prod`

## Thought process

I'll try to describe in this session all the steps I've taken to implement this challenge.

### Initial DDD study

I was not very familiar with DDD approach per se, so the first step was to search and study about it. Although I have never worked directly with it, I was familiar with some concepts like dependency inversion, SRP and other principles that DDD relies heavily on. 

Based on my research, I found out that DDD splits application into several layers, where the **domain layer** is at the core of the application, as it describes the business models and entities with all their inner rules. 

The **domain layer** contains all business logic for a given entity, and it's independent from the infrastructure, API, and other application components. It is an independent layer where we keep the core functionality for a specific entity. Having a separate layer for this type of resource is extremely useful if we ever decide to change the implementation details in the future. Change databases? OK, domain remains untouched. Implement a CLI feature instead of relying on the HTTP transport layer with REST? You're covered too! There are a lot of possibilities. 

The **api layer** is composed of the app's network interfaces (controllers) that will manipulate requests/responses, talking directly to the client. 

The **application layer** will basically orchestrate everything. Invoking the domain models and persisting them by talking with the infrastructure layer, we make sure that they do not ever talk directly to each other and are totally decoupled.

The **infrastructure layer** will be responsible for mapping the entities to the database and ensure that we persist valid cahnges when requested. It is independent of the domain layer, whereas if the business logic changes, changes to the infrastructure layer should be minimal. 

Of course, we need to convert often from the infra entity to the domain entity, that's where interfaces and mappers are really handy. 

### App structure

Given that, I decided to create two main modules: **books** and **loans**, each with their own layers. 
We also have **shared modules** such as database modules that will be, as the name says, shared between all the other (books/loans).

### Database setup

I decided to start with the database creation. I booted up a PostgreSQL image with a `docker-compose.yml` file to speed up this process and set up Prisma ORM with the initial schema/migrations. After that, I created a prisma module/service containing the database connection required by the module. 
Note that the PrismaService is not abstraced. The abstractions are the Repository interfaces, which will then 

**Note:** While injecting the prisma repositories in the use cases, I noticed that I could not use the interface definitions directly, as they only exist in compile-time and nest requires runtime references. So I had to map them to a tag, that you may see as "PRISMA_BOOK_REPOSITORY", so that Nest knows who I am referencing at runtime.

### Entity design

Designing separate entities was a tough challenge because in NestJS I was used to keep them as one, using decorators specific to orms like you would in Mongoose and TypeORM. Keeping them separate with getters (similar to Java) seemed very unusual at first. Another thing was instantiating these entities. 
Usually, when we couple the entities to the ORM/db implementations, there is no need to generate ids, or care about instantiating dates or things like that. It's all Out-of-the-box, but of course, this is bad practice since it would be a nightmare to change it later.

Anyway, I kept the design as is and this allowed me to use modern things like `uuidv7`, which is a better way to generate random ids that are still sortable by a database.

### Use case pattern

As I wanted each resource in this app to "mind its own business", I decided to go with the use cases pattern and assign each one a single responsibility, avoiding things like god services that are thousand-lines long and contain lots of business logic, making maintenance difficult (yes, I guess we've all been there, right?)

### Repository pattern

I loved to implement this one. It's one of the patterns that fascinates me the most. No much to describe here though. It's plain dependency inversion! 

### Unit tests

I was also not very familiar with unit testing so I tried my best shot by reading Jest's documentation and trying to implement simple/dummy tests. I also read a few online articles on how to implement unit testing in Jest using repository interfaces. 

----

## What could be improved?

- I did not write unit tests for loans as I was already on a tight schedule, but it is a major point for improvement.
- We could enhance the DomainException by passing a custom http status code to return to the api instead of always returning 400.
- 
- Of course, there are a lot of features we could use here... update loans, extend return dates, add users auth, auto fill book metadata from a Open source API, I can think of many things!

----

## Technologies used

- Yarn
- Node.js
- NestJS
- PostgreSQL
- Prisma ORM

----

## About the author

Hello! My name's Jorge, I'm 25 years old (currently), and I'm from Manaus - Brazil :brazil:. Studying about software architecture and best practices is one of my biggest passions when it comes to coding, alongside with performance optimization problems and algorithms. 

I learned a lot with this challenge and I hope I can improve it in a near future. 
