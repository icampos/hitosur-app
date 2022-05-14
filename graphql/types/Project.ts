// /graphql/types/User.ts
import { extendType, objectType } from 'nexus'
import { Task } from './Task'
import { Customer } from './Customer'

export const Project = objectType({
  name: 'Project',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('location')
    t.string('startDate')
    t.string('endDate')
    t.string('description')
    t.string('address')
    t.field('customer', {
        type: Customer,
        async resolve(_parent, _args, ctx) {
          return await ctx.prisma.project
            .findUnique({
              where: {
                id: _parent.id,
              },
            })
            .customer()
        },
      })
      t.list.field('tasks', {
        type: Task,
        async resolve(_parent, _args, ctx) {
          return await ctx.prisma.task
            .findUnique({
              where: {
                id: _parent.id,
              },
            })
            .tasks()
        },
      })
      t.list.field('collaborators', {
        type: Task,
        async resolve(_parent, _args, ctx) {
          return await ctx.prisma.project
            .findUnique({
              where: {
                id: _parent.id,
              },
            })
            .collaborators()
        },
      })
  },
})


export const ProjectsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('projects', {
      type: 'Project',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.project.findMany()
      },
    })
  },
})