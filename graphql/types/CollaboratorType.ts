import { objectType, extendType } from "nexus";

export const CollaboratorType = objectType({
    name: "CollaboratorType",
    definition(t) {
        t.string("id");
        t.string("type")
    },
});

export const CollaboratorTypesQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.field('collaboratorType', {
            /*@ts-ignore*/
            type: 'CollaboratorType',
            resolve(_parent, _args, ctx) {
                return ctx.prisma.collaboratorType.findFirst()
            },
        })
    },
})