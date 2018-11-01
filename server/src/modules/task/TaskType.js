import axios from 'axios';
import R from 'ramda';
import Task from './TaskModel';

export const typeDefs = `
  type Task {
    id: String
    name: String
  }
`

const renameKeys = R.curry((keysMap, obj) =>
  R.reduce((acc, key) => R.assoc(keysMap[key] || key, obj[key], acc), {}, R.keys(obj))
);

const getIssues = async () => {
  const { data: issuesRes } = await axios.get('https://api.github.com/repos/vadimnicolai/graphql-mongodb-angular/issues')
  const issues = R.map(
    R.pipe(
      R.pickAll(['id', 'title']),
      renameKeys({ title: 'name' }),
      R.merge({ 'label': 'GitHub issue', 'editable': false })
    )
  )(issuesRes);
  return issues;
};

export const resolvers = {
  Query: {
    getAllTasks: async () => {
      const tasks = await Task.find();
      const issues = await getIssues();

      return [...tasks, ...issues];
    },
    task: (parent, arg) => {
      return { name: arg.name }
    },
  },
  Mutation: {
    addTask: (parent, { name }) => {
      Task.create({ name }, (err, result) => {
        const task = R.pipe(
          R.pickAll(['_id', 'name']),
          renameKeys({ _id: 'id' })
        )(result.toJSON());

        console.log({ task })
        if (err) return console(err);
        return task;
      });
    },
    removeTask: async (parent, { id }) => {
      try {
        const removedtask = await Task.findByIdAndRemove(id).exec();

        return removedtask;
      } catch (e) {
        throw new Error('Error: ', e)
      }
    }
  },
}

export default {
  typeDefs,
  resolvers
}