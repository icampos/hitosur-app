import { objectType, extendType, stringArg } from "nexus";

export const TaskType = objectType({
    name: "TaskType",
    definition(t) {
        t.string("id");
        t.string("name");
    },
});


export const TaskTypesQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('taskTypes', {
            //@ts-ignore
            type: 'TaskType',
            resolve(_parent, _args, ctx) {
                return ctx.prisma.taskType.findMany()
            },
        })
    },
})

export const TaskTypeQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.field('taskType', {
            //@ts-ignore
            type: 'TaskType',
            args: { id: stringArg() },
            resolve: (_parent, args, ctx) => ctx.prisma.taskType.findUnique({ where: { id: args.id } }),
        })
    },
})