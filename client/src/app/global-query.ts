/**
 * Server Mutation Query
 */

'use strict';

import gql from 'graphql-tag';

export const addTask = gql`
  mutation addTask($name: String!) {
    addTask(name: $name) {
      id
      name
    }
  }`;

export const getAllTasks = gql`
  query {
    getAllTasks{
      id
      name
    }
  }`;

export const removeTask = gql`
  mutation removeTask($id: String!) {
    removeTask(id: $id) {
      id
      name
    }
  }`;

export const updateTask = gql`
  mutation updateTask($id: String!, $name: String!) {
    updateTask(id: $id, name: $name) {
      id
      name
    }
  }`;