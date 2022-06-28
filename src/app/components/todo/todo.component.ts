import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;
  tasks : any[] = [];
  inProgress : any[] = [];
  done : any[] = [];

  constructor( private fb : FormBuilder ) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      items : new FormControl( '' , [Validators.required] )
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


  addTasks(){
    this.tasks.push({
      description : this.todoForm.value.items ,
      done : false
    }) 
  }

  deleteTask( i : number ){
    this.tasks.splice(i ,1)
  }


}
