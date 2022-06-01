import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/Todo';
import { AppServiceService } from 'src/app/app-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  

  todo : Todo;
  

  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();

  constructor( private appService : AppServiceService ) { }

  ngOnInit(): void {
      
  }
  onSubmit(f : NgForm){

      const todo = {

      title : f.value['title'],
      desc : f.value['desc'],
      active : true
  
    
      // title :  this.title,

      // desc: this.desc,
      // active: true
      
    }
    
    // this.appService.setter(todo)
    // console.log(todo);
    // this.todo = this.appService.getter()
    

    this.todoAdd.emit(todo);
  } 
  
}
