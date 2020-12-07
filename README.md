<div align="center">
  <h1>🚀 Zoosh Movie Hunter Service API</h1>
</div>

Hi Zoosh. I created this API from my own starter, I made it a serveral months ago and I have already used for some projects. You can find the starter repo in the package.json

It is using the brand new Prisma 2 like "ORM" database connector and Apollo GraphQL Server with Express.

## Getting Started

### 1. Install dependencies
```
yarn install
```

### 2. Set yout database

#### optional - create MySQL docker

```
cd prisma
docker-compose up -d
```

#### set up your database url in your prisma/.env file
#### exmaple url: mysql://username:password@127.0.0.1:3306/databasename
```
DATABASE_URL=
```

#### !IMPORTANT! Create your first migration
```
yarn migrate
```

### 4. Set up your API .env file based on .env.example

```
.env.example
```

### 5. Fill the database with the dummy data

```
yarn fetch
```

### 6. Start the GraphQL server or run it with docker
#### or you can start with vscode with start debugging.
```
yarn dev
```

```
yarn docker && yarn docker:run
```



### 7. Open the playground and run queries
#### playground url maybe: http://localhost:4000/graphql
```
query FindSimularMoviesByCast{
  findSimularMoviesByCast(castId: 78){
    title
  }
}

query FetchMovieFromWikipedia {
  fetchMovieFromWikipedia(movieId: 4) {
    title
    wikiDescription
    wikiUrl
    imdbUrl
  }
}

query FindMovieByTitleOrCast {
  movieSearch(searchValue: "Gabriel") {
    title
    casts {
      name
    }
  }
}
```

## Just run an easy test with jest
```
yarn test
```

## Additional info
### You can use the prisma studio its open you for a database GUI editor
```
yarn studio
```

## License
MIT