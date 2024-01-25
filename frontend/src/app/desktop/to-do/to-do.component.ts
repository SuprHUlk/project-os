import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToDoService } from 'src/app/service/to-do.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent {

  @Output('closeToDo') isToDoOpen = new EventEmitter<{ appName: string, status: boolean }>();

  constructor (private formBuilder: FormBuilder, private toDoService: ToDoService) {}

  tasks: any;

  ngOnInit() {
    this.fetch();
  }

  toDoForm = this.formBuilder.group({
    task: ['', Validators.required],
  })

  width: string = '40%';
  height: string = '60%';
  maxHeight: string = '10rem';
  dragPosition = {x: 0, y: 0};

  close() {
    this.isToDoOpen.emit({ appName: "toDo", status: false });
  }

  maximize() {
    if(this.width === '40%') {
      this.dragPosition = {x: 0, y: 0};
      this.width = '100%';
      this.height = '100%';
      this.maxHeight = '25rem';
    }
    else {
      this.width = '40%';
      this.height = '60%';
      this.maxHeight = '10rem';
    }
  }

  add() {
    if(this.toDoForm.valid) {
      this.toDoService.addTask(this.toDoForm.value)
        .subscribe(
          (res: any) => {
            this.fetch();
            this.toDoForm.reset();
          },
          (err: any) => {
            console.log('unsuccessful');
          }
        )

    }
  }

  fetch() {
    this.toDoService.fetchTasks()
      .subscribe(
        res => {
          this.tasks = res.result;
        }
      )
  }

  delete(_id: string) {
    this.toDoService.deleteTask(_id)
      .subscribe(
        (res: any) => {
          this.fetch();
        },
        (err: any) => {
          console.log(err);
        }
      )
  }
}
