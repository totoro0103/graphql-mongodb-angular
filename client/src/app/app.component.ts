import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import * as Query from './global-query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular-Apollo';
  tasks: Array<any> = [];
  task: any = {};
  validateForm: FormGroup;
  value: string;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery({ query: Query.getAllTasks })
      .valueChanges
      .pipe(
        map((result: any) => result.data)
      ).subscribe((data) => {
        this.tasks = data.getAllTasks;
      })
  }
  createTask() {
    const { value } = this;

    this.apollo
      .mutate({
        mutation: Query.addTask,
        variables: {
          name: value
        }
      })
      .subscribe(({ data }) => {
        this.tasks = [...this.tasks, data.addTask];
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  delete(task) {
    const { id } = task;

    this.apollo
      .mutate({
        mutation: Query.removeTask,
        variables: {
          id: id
        }
      })
      .subscribe(({ data }) => {
        const tasks = this.tasks.filter(task => task.id !== data.removeTask.id);
        this.tasks = tasks;
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }
}
