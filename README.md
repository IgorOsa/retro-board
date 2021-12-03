# RetroBoard

A simple retrospective tool. Demo link [retroboard.ml](https://retroboard.ml/). To run project locally see instructions below.

## Main features

- [x] Create Columns
- [x] Create Tasks
- [x] Drag'n'Drop Tasks
- [x] Leave Comments to Tasks
- [x] Likes for Tasks
- [x] Save Board State (through backend API calls)
- [x] Export Board state to file (columns & tasks)

## Dev Stack

- Angular with Material UI for frontend part
- Nest JS for backend with Swagger UI for API docs

## Run project locally

- Git clone this repo.
- Create `.env` file in `apps/api` according to `.env.example` file with your MongoDB connection string and security credentials.
- Run `npm install` command to install dependencies.
- Run `npm run dev` to start both backend API and frontend dev servers.

Frontend App will be started on [`localhost:4200`](http://localhost:4200/).

Swagger Doc with API description will be available on [`localhost:3333/doc`](http://localhost:3333/doc/).

## Tools

This project was generated using [Nx](https://nx.dev).
