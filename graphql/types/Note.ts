// /graphql/types/User.ts
import { extendType, objectType } from 'nexus'
import { Project } from './Project'

export const Note = objectType({
  name: 'Note',
  definition(t) {
    t.string('id')
    t.string('date')
    t.string('note')
    t.string('projectId')
    t.field('project', {
        type: Project,
        async resolve(_parent, _args, ctx) {
          return await ctx.prisma.project
            .findUnique({
              where: {
                id: _parent.projectId,
              },
            })
            //@ts-ignore
            .project()
        },
      })
  },
})


export const NotesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('note', {
      type: 'Note',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.note.findMany()
      },
    })
  },
})