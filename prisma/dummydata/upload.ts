import dotenv from "dotenv";
import { prisma } from "../prisma"
import {each} from 'bluebird';
import fs from 'fs';
import path from 'path';

dotenv.config();

export interface MockMovies {
  movies: {
    topRated: Array<MockMovie>;
  }
}

export interface MockMovie {
  node: {
    title: string;
    credits: {
      cast:  Array<MochMovieCredit>
    };
    details: MockMovieDetail;
  }
}

export interface MockMovieDetail {
  imdbID: string;
}

export interface MochMovieCredit {
  character: string;
}

const fetchDummyDataToDatabase = async () => {
  try {

    await prisma.movie.deleteMany({});
    await prisma.cast.deleteMany({});

    let moviesJson = await fs.readFileSync(path.resolve('./prisma/dummydata/mock.json'), 'utf-8');
    let movies: MockMovies = JSON.parse(moviesJson);

    console.log('dummy data fetch started');

     await each(movies.movies.topRated, async movie => {
       await prisma.movie.create({
        data: {
          title: movie.node.title,
          imdbId: movie.node.details.imdbID,
          casts: {
            connectOrCreate: movie.node.credits.cast.map(credit => {
              return {
                where: {
                  name: credit.character,
                },
                create: {
                  name: credit.character
                }
              }
            })
          }
        }
      })
    })

    console.log('dummy data fetch end');
    process.exit(0);
  } catch (error) {
    console.error('fetchDummyDataToDatabase failed', error);
  }
}

fetchDummyDataToDatabase();