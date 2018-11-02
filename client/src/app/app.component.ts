import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import * as Query from './global-query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular-Apollo';
  tasks: Array<any> = [];
  messages: Array<any> = [];
  task: any = {};
  value: string;
  valueToEdit: any = {};
  isVisible = false;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.getTasks();
    this.getMessages();
  }
  getTasks() {
    this.apollo.watchQuery({ query: Query.getAllTasks })
      .valueChanges
      .pipe(
        map((result: any) => result.data)
      ).subscribe((data) => {
        this.tasks = data.getAllTasks;
      })
  }
  getMessages() {
    this.apollo.watchQuery({ query: Query.getAllMessages })
      .valueChanges
      .pipe(
        map((result: any) => result.data)
      ).subscribe((data) => {
        this.messages = data.messages.edges;
        console.log(this.messages)
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

  edit(item): void {
    this.valueToEdit = item;
    this.isVisible = true;
  }

  handleOk(): void {
    const { id, name } = this.valueToEdit;
    this.isVisible = false;

    this.apollo
      .mutate({
        mutation: Query.updateTask,
        variables: {
          id, name
        }
      })
      .subscribe(({ data }) => {
        console.log('data', data)
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
