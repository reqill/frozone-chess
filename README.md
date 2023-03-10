# frozone-chess :chess_pawn::ice_cube:

Online chess portal with custom chess engine AI. Main focus of the project is to explore new technologies, tools, as well as improve on currently known ones. Hopefully combining ambitous idea with learning will fruit satisfying results

> :construction::construction::construction: This project is still in version `< 1.0.0`, so expect bugs and unfinished mechanics, but if you're here to learn and observe the progress - now it's the perfect time for that! Check current preview build [here](https://frozone-chess.vercel.app/), or some of the designs [over here](https://xd.adobe.com/view/a64d7437-8e09-4688-8888-ed3acba4f3b6-f31e/?fullscreen).

## Table of content

- [Blog](#blog)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Learning resources](#learning-resources)
- [Useful components](#useful-components)
- [Bug reports and feature requests](#bug-reports-and-feature-requests)
- [Running app on your own](#running-app-on-your-own)

## Blog

**TBA**

> I'm thinking of writing a small blog about development process of this project as well as sharing personal thoughs on it along the way. Link to the blog shall appear here once it's created.

## Features

Mind that even if feature is marked as completed it more likely means that it works, but it is not polished.

### Completed :ballot_box_with_check:

- Rendering chessboard with pieces
- Piece movement (on click / on drag)
- Higlight squares
- Piece move validation
- Castling mechanics
- En passant mechanics
- FEN notation support
- Board flip
- Game clock with increments
- Captured pieces
- Game configuration / setup
- Game UI
- Pausing game
- Move history

### In progress :building_construction:

You can check out progress on [this board](https://github.com/users/reqill/projects/2)

### Planned :bookmark_tabs:

- End game conditions (with surrendering)
- Drawing arrows
- Go back to certain move
- Game preview
- Starting game from given position
- Export game FEN and move history
- Chess engine AI
- Game synchronization
- Dark theme
- Game spectators
- Support for keyboard-only chess (or blindfolded)
- Proper support for local games (to be precised)
- Proper support for multiplayer internet games (to be precised)
- Proper support for singleplayr games (to be precised)
- (propably more as I go)

## Tech stack

I've split this section into two categories because not everything is implemented yet, but still want to share my plans and current state of the app, so I will update this as I progress.

### Current

- Svelte
- SvelteKit
- Typescript
- TailwindCSS
- HTML
- CSS
- vite
- Vercel

### To be used in the future

- Python
- Machine learning
- tRPC
- Websockets (socket.io)
- Auth0 (or maybe svelte/auth)
- PocketBase/SupraBase/AWS/Firestore/(more research needed)
- Express.js (?)
- (propably more as I go)

## Learning resources

This list will be constanlty updated to reflect learning resources I used along the way, as well as those I plan on using (all of the resources that are not marked can spoil what technologies will come next to the project)

- Svelte introduction [(link)](https://www.youtube.com/watch?v=rv3Yq-B8qp4) :ballot_box_with_check:
- SvelteKit introduction [(link)](https://www.youtube.com/watch?v=uEJ-Rnm2yOE) :ballot_box_with_check:
- Svelte(kit) tutorial [(link)](https://learn.svelte.dev/tutorial) :ballot_box_with_check:
- Angular Commit Convention [(link)](https://www.conventionalcommits.org/en/v1.0.0-beta.4/) :ballot_box_with_check:
- TailwindCSS [(link)](https://tailwindcss.com) :ballot_box_with_check:
- Svelte docs [(link)](https://svelte.dev/docs) :ballot_box_with_check:
- SvelteKit [(link)](https://kit.svelte.dev/docs/introduction) :ballot_box_with_check:
- RefactoringUI [(link)](https://www.refactoringui.com)
- websockets [(link)](https://appmaster.io/pl/blog/czym-sa-websockety-i-jak-je-tworzyc)
- socket.io docs [(link)](https://socket.io/docs/v4/)
- SvelteKit with socket.io [(link)](https://dev.to/theether0/sveltekit-with-socketio-and-nodejs-285h)
- SvelteKit authorization [(link)](https://github.com/nextauthjs/next-auth/tree/main/apps/examples/sveltekit)
- Auth0 docs [(link)](https://auth0.com/docs/)
- tRPC docs [(link)](https://trpc.io/docs) :grey_question:
- tRPC crash course [(link)](https://www.youtube.com/watch?v=UfUbBWIFdJs) :grey_question:

## Useful components

As I plan on limiting `svelte` packages to minimum, because I want to try to solve some of the most common problems myself (e.g. tooltips etc.). Below you can find direct links to in project files that contain some ov the `svelte components` that you might be intersted in. Later on I'm planning on creating separate code sandboxes for them for you to try out.

> coming soon

## Bug reports and feature requests

Feel free to create contructive tickets in both sections available under `Issues` tab. I will make sure to read all of them and act accordingly (within good reasoning and available resources and time constraints). I'm more than happy to hear from you, but to the time of release `1.0.0` - I won't be able to implement any od the suggestions beside critical bugs/vulnerabilities

## Running app on your own

If you're intrested forking the project, suggesting changes, or simply expiriencing it yourself - it is useful to be able to run the app on your machine. Below you can find out more how to do it on your own.

### Getting started

The very first thing after cloning a repo is to make sure you have installed [node.js](https://nodejs.org/en/) on your machine. After that you can make sure you have all dependencies installed:

```bash
npm install

# alernatively

pnpm install
yarn

```

### Developing

Once you've installed dependencies, start a development server:

```bash
npm run dev

# or start the server and open browser tab as well (my prefered option | qdev - quick development)
npm run qdev
```

### Building

To create a production version of your app:

```bash
npm run build

# after that you an preview your production build
npm run preview
```

### Formatting

It is useful to have your code neat and clean, as well as being error free. For that purpouse you can use one of the following:

```bash
# formatting
npm run format

# formatting and linting
npm run lint

# type-checking
npm run check
```

### Other

For other needs please reffer to [docs](https://svelte.dev/docs)
