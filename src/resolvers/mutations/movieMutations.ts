import { prisma } from '../../../prisma/prisma';
import { Movie } from "@prisma/client";
interface Args  {
  name: string;
  email: string;
}

export interface CreateMoviceArgs {
  title: string;
  casts: Array<Cast>;
  imdbId: string;
}

export interface Cast {
  name: string;
}

export default {
  createMovie: async (_: void, args: CreateMoviceArgs, ctx: void): Promise<Movie> => {
    return await prisma.movie.create({
      data: {
        title: args.title,
        imdbId: args.imdbId,
        casts: {
          connectOrCreate: args.casts.map(credit => {
            return {
              where: {
                name: credit.name,
              },
              create: {
                name: credit.name
              }
            }
          })
        }
      },
      include: {
        casts: true
      }
    })
  }
};