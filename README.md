# lifebot

## Getting started with development
### Database
Use docker to start the database instance
```bash
$: docker-compose up
```

## Configure App
Create a `.env` based on the `.env.example` file
You will need to create an application using the [Discord developer portal](https://discord.com/developers/applications)
to get a token and app id.
You can use the default database url since it's already set up for docker

## Starting app
First, deploy the commands to your discord bot.
```bash
$: pnpm run deployCommands
```
Then, run the start command
```bash
$: pnpm run dev
```

Bot is now running. Any time you add a new command, you will need to re-run the deploy commands command.
