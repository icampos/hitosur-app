// /graphql/types/User.ts
import { extendType, objectType, enumType, nonNull, stringArg } from 'nexus'
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


export const CreateReminderMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createReminder', {
      type: Reminder,
      args: {
        title: nonNull(stringArg()),
        description: nonNull(stringArg()),
        date: nonNull(stringArg()),
        status: nonNull(stringArg()),
        assignee: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {

        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`)
        }

        const newReminder = {
          title: args.title,
          description: args.description,
          date: args.date,
          status: args.status,
          assignee: {
            connect: {
              id: args.assignee
            }
          },
        }

        return await ctx.prisma.reminder.create({
          //@ts-ignore
          data: newReminder,
        })
      },
    })
  },
})
