// /graphql/types/User.ts
import { extendType, objectType, enumType } from 'nexus'
import { Task } from './Task'
import { Customer } from './Customer'
import { ProjectType } from './ProjectType'

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
    t.string('typeId')
    t.field("status", { type: ProjectStatus })
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
      t.field('projectType', {
        type: ProjectType,
        async resolve(_parent, _args, ctx) {
          return await ctx.prisma.projectType
            .findUnique({
              where: {
                id: _parent.typeId,
              },
            })
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

const ProjectStatus = enumType({
  name: "ProjectStatus",
  members: ["COMPLETED", "IN_PROGRESS", "CANCELED", "DELAYED"],
});