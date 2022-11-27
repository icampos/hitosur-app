// /graphql/types/User.ts
import { extendType, objectType, enumType, stringArg, nonNull, list } from 'nexus'
import { Collaborator } from './Collaborator'
import { Document } from './Document'
import { Customer } from './Customer'
import { ProjectType } from './ProjectType'
import { Note } from './Note'

import { currentWeek } from 'utils/calendar'

import dayjs from "dayjs";


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
    t.string('task')
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
              type: _parent.typeId,
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


export const CreateProjectrMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createProject', {
      type: Project,
      args: {
        name: nonNull(stringArg()),
        startDate: nonNull(stringArg()),
        endDate: stringArg(),
        address: nonNull(stringArg()),
        typeId: nonNull(stringArg()),
        responsible: nonNull(stringArg()),
        onField: stringArg(),
        customer: nonNull(stringArg()),
        assistant: stringArg(),
        note: stringArg(),
        task: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {

        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`)
        }

        const newProject = {
          name: args.name,
          startDate: args.startDate,
          endDate: args.endDate,
          address: args.address,
          type: {
            connect: {
              type: args.typeId
            }
          },
          collaborators: {
            connect:
              [{ id: args.responsible }, { id: args.onField }, {id: args.assistant}]
          },
          customer: {
            connect: {
              id: args.customer
            }
          },
          notes: args.note ?  {
            create: {
              note: args.note || '',
              date: dayjs().format(),
            },
          } : {},
          documents: {},
          tasks: {},
          task: args.task
        }

        return await ctx.prisma.project.create({
          //@ts-ignore
          data: newProject,
        })
      },
    })
  },
})


export const UpdateProjectMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateProjectStatus', {
      type: Project,
      args: {
        id: nonNull(stringArg()),
        task: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {

        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`)
        }

        return await ctx.prisma.project.update({
          where: {
            id: args.id,
          },
          data: {
            task: args.task,
          }
        })
      },
    })
  },
})


const ProjectStatus = enumType({
  name: "ProjectStatus",
  members: ["COMPLETED", "IN_PROGRESS", "CANCELED", "DELAYED"],
});