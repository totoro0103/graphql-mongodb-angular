import axios from 'axios';
import R from 'ramda';
import Task from '../models/task';

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

export default {
  Query: {
    getAllTasks: async () => {
      const tasks = await Task.find();
      const issues = await getIssues();

      return [...tasks, ...issues];
    },
    task: (parent, arg) => {
      return { name: arg.name }
    },
  }
};