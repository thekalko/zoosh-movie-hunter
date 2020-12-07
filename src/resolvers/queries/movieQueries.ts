import { prisma } from "prisma";
import { Movie } from "@prisma/client";
import { ApolloContext } from "src/types/ApolloContext";
import { ApolloError } from "apollo-server-express";
import { WikiService } from "src/utils/WikiService";
import { first } from "lodash";

export interface MoviveSearchArgs {
  searchValue: string
}

export interface FetchMovieFromWikipediaArgs {
  movieId: number;
}

export interface ExtendedMovieResponse {
  title: string;
  imdbUrl: string;
  wikiUrl: string;
  wikiDescription: string;
}

export interface FindSimularMoviesByCastArgs {
  castId: number;
}

export default {
  movies: async (_: void, args: void, ctx: ApolloContext): Promise<Array<Movie>> | never => {
    return await prisma.movie.findMany({
      include: {
        casts: true
      }
    });
  },
  movieSearch: async (_: void, args: MoviveSearchArgs, ctx: ApolloContext): Promise<Array<Movie>> | never => {
    return await prisma.movie.findMany({
      where: {
       OR: [
        {
          title: {
            contains: args.searchValue
          },
        },
        {
          casts: {
            some: {
              name: {
                contains: args.searchValue
              }
            }
          }
        }
       ]
      },
      include: {
        casts: true
      }
    });
  },
  fetchMovieFromWikipedia: async (_: void, args: FetchMovieFromWikipediaArgs, ctx: ApolloContext): Promise<ExtendedMovieResponse> | never => {
    try {
      let movie = await prisma.movie.findUnique({
        where: {
          id: args.movieId
        }
      })
      if(!movie) {
        throw new ApolloError("Wrong movie id");
      }

      let wikiSearchResult = await WikiService.serchMovie(movie.title);
      let bestResult = first(wikiSearchResult.query.search);
      let wikiPageResult = await WikiService.fetchWikiPage(bestResult.pageid);

      return {
        title: bestResult.title,
        imdbUrl: process.env.IMDB_MOVIE_URL.replace(/{imdbid}/gm, movie.imdbId),
        wikiUrl: wikiPageResult.query.pages[bestResult.pageid].fullurl,
        wikiDescription: bestResult.snippet
      }

    } catch (error) {
      throw new ApolloError(error)
    }
  },
  findSimularMoviesByCast: async (_: void, args: FindSimularMoviesByCastArgs, ctx: ApolloContext): Promise<Array<Movie>> | never => {
    return await prisma.movie.findMany({
      where: {
          casts: {
            some: {
              id: args.castId
            }
          }
      },
      include: {
        casts: true
      }
    });
  },
};