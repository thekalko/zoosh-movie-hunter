import { prisma } from "prisma";
import { Movie } from "@prisma/client";
import { ApolloContext } from "src/types/ApolloContext";


export default {
  movies: async (_: void, args: void, ctx: ApolloContext): Promise<Array<Movie>> | never => {
    return await prisma.movie.findMany({
      include: {
        casts: true
      }
    });
  }
};