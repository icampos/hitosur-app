import { objectType, extendType, stringArg } from "nexus";

export const ProjectType = objectType({
    name: "ProjectType",
    definition(t) {
        t.string("id");
        t.string("type");
    },
});


export const ProjectTypesQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('projectTypes', {
            type: 'ProjectType',
            resolve(_parent, _args, ctx) {
                return ctx.prisma.projectType.findMany()
            },
        })
    },
})

export const ProjectTypeQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.field('projectType', {
            type: 'ProjectType',
            args: { id: stringArg() },
            resolve: (_parent, args, ctx) => ctx.prisma.projectType.findUnique({ where: { id: args.id } }),
        })
    },
})