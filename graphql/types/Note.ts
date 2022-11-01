// /graphql/types/User.ts
import { extendType, nonNull, objectType, stringArg } from 'nexus'
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


export const CretateNoteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createNote', {
      type: Note,
      args: {
        date: nonNull(stringArg()),
        note: nonNull(stringArg()),
        projectId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {

        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`)
        }

        const newNote = {
          date: args.date,
          note: args.note,
          projectId: args.projectId,
        }

        return await ctx.prisma.note.create({
          //@ts-ignore
          data: newNote,
        })
      },
    })
  },
})


export const DeleteNoteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteNote', {
      type: Note,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`)
        }

        return await ctx.prisma.note.delete({
          //@ts-ignore
          where: {
            id: args.id,
          },
        })
      },
    })
  },
})