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
  // selector: 'nz-demo-input-search-input',
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

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  createTask() {
    const { value } = this;

    this.apollo
      .mutate({
        mutation: Query.addTask,
        variables: {
          name: value
        },
        update: (proxy, { data: { addTask } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.getAllTasks });

          this.tasks.push(addTask);

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.getAllTasks, data });
        }
      })
      .subscribe(({ data }) => {
        // this.closeFirstModal(); // Close Modal
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
        },
        update: (proxy, { data: { removeTask } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.getAllTasks });
          console.log('data.tasks', data.tasks);
          const tasks = data.tasks.filter(task => task.id !== id);
          this.tasks = tasks;

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.getAllTasks, data });
        }
      })
      .subscribe(({ data }) => {
        console.log(data)
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }
}
