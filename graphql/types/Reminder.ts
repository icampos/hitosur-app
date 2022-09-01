// /graphql/types/User.ts
import { extendType, objectType, enumType } from 'nexus'
import { Collaborator } from './Collaborator'

export const Reminder = objectType({
  name: 'Reminder',
  definition(t) {
    t.string('title')
    t.string('description')
    t.string('date')
    t.string('assigneeId')
    t.string("status")
    t.field('assignee', {
        type: Collaborator,
        async resolve(_parent, _args, ctx) {
          return await ctx.prisma.collaborator
            .findUnique({
              where: {
              id: _parent.assigneeId,
              },
            })
        },
      })
  },
})

export const RemindersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('reminders', {
      type: 'Reminder',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.reminder.findMany()
      },
    })
  },
})