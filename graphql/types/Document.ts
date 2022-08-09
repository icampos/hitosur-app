import { objectType, extendType, stringArg } from "nexus";
import { Project } from './Project'

export const Document = objectType({
    name: "Document",
    definition(t) {
        t.string("id");
        t.string("number");
        t.string("link");
        t.string("projectId")
        t.field('project', {
            type: Project,
            async resolve(_parent, _args, ctx) {
                return await ctx.prisma.project
                    .findUnique({
                        where: {
                            id: _parent.projectId,
                        },
                    })
            },
        })
    },
});


export const DocumentsQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('documents', {
            type: 'Document',
            resolve(_parent, _args, ctx) {
                return ctx.prisma.document.findMany()
            },
        })
    },
})


export const DocumentQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.field('document', {
            type: 'Document',
            args: { id: stringArg() },
            resolve: (_parent, args, ctx) => ctx.prisma.document.findUnique({ where: { id: args.id } }),
        })
    },
})