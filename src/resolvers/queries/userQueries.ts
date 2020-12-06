import { prisma } from "prisma";
// import { User } from "@prisma/client";
import { ApolloContext } from "src/types/ApolloContext";


export default {
  users: async (_: void, args: void, ctx: ApolloContext) => {
    // return await prisma.user.findMany();
  }
};