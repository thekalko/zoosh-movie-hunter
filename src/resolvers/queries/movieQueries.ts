import { prisma } from "prisma";
import { Movie } from "@prisma/client";
import { ApolloContext } from "src/types/ApolloContext";

export interface MoviveSearchArgs {
  searchValue: string
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
};