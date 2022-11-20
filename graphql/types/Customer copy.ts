// /graphql/types/User.ts
import { extendType, objectType, enumType, stringArg, nonNull } from "nexus";

export const Customer = objectType({
  name: "Customer",
  definition(t) {
    t.string("id");
    t.string("email");
    t.string("phone");
    t.string("name");
    t.string("lastName");
    t.string("userName");
    t.string("notes");
    t.string("logo");
    t.string("address");
    t.field("status", { type: Status });
  },
});

const Status = enumType({
  name: "Status",
  members: ["ACTIVE", "INACTIVE"],
});

export const CustomersQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("customers", {
      type: "Customer",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.customer.findMany();
      },
    });
  },
});

export const CustomerQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("customer", {
      type: "Customer",
      args: { id: stringArg() },
      //@ts-ignore
      resolve: (_parent, args, ctx) => ctx.prisma.customer.findUnique({where: { id: args.id }}),
    });
  },
});


export const CustomerQueryTest = extendType({
  type: "Query",
  definition(t) {
    t.field("customer", {
      type: "Customer",
      args: { id: stringArg() },
      //@ts-ignore
      resolve: (_parent, args, ctx) => ctx.prisma.customer.findUnique({where: { id: args.id }}),
    });
  },
});

export const CreateClientMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createClient', {
      type: Customer,
      args: {
        name: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        phone: nonNull(stringArg()),
        email: nonNull(stringArg()),
        address: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {

        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`)
        }

        const newClient = {
          name: args.name,
          lastName: args.lastName,
          phone: args.phone,
          email: args.email,
          address: args.address,
        }

        return await ctx.prisma.customer.create({
          //@ts-ignore
          data: newClient,
        })
      },
    })
  },
})


/*const Address = objectType({
  name: 'Address',
  definition(t) {
    t.string('city')
    t.string('country')
    t.string('postalCode')
    t.string('directions')
  },
})*/