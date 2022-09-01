// /graphql/types/User.ts
import { extendType, objectType, enumType, stringArg } from 'nexus'
import { Collaborator } from './Collaborator'
import { Document } from './Document'
import { Customer } from './Customer'
import { ProjectType } from './ProjectType'
import { Note } from './Note'

import { currentWeek } from 'utils/calendar'

export const Project = objectType({
  name: 'Project',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('location')
    //@ts-ignore
    t.date('startDate')
    //@ts-ignore
    t.date('endDate')
    t.string('description')
    t.string('address')
    t.string('typeId')
    t.string('notes')
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
      type: Collaborator,
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
    t.list.field('documents', {
      type: Document,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.project
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .documents()
      },
    })
    t.list.field('notes', {
      type: Note,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.project
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .notes()
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

export const ProjectQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("project", {
      type: "Project",
      args: { id: stringArg() },
      //@ts-ignore
      resolve: (_parent, args, ctx) => ctx.prisma.project.findUnique({ where: { id: args.id } }),
    });
  },
});


export const currentWeekProjectsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("currentWeekProjects", {
      type: "Project",
      //@ts-ignore
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.project.findMany({
          where: {
            startDate: {
              lte: currentWeek.lastDay,
              gte: currentWeek.firstDay,
            }
          }
        })
      }
    });
  },
});


const ProjectStatus = enumType({
  name: "ProjectStatus",
  members: ["COMPLETED", "IN_PROGRESS", "CANCELED", "DELAYED"],
});