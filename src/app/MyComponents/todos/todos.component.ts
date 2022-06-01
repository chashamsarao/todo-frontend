import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from "../../Todo"
import { AppServiceService } from 'src/app/app-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  // localItem: string;
  todo : Todo;
  // todos: Todo[];
  todosArray: Todo[];
  todoId : string;
  
  constructor(private appService : AppServiceService, private route: ActivatedRoute,) {
    // this.localItem = localStorage.getItem("todos");
    // if(this.localItem == null){

    //   this.todos = []

    // }
    // else {
    //   this.todos = JSON.parse(this.localItem);
    // }
    
    // this.todos = []
    this.todosArray = [];
    
    


   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log();
      
    });
  }

  deleteTodo (todo: Todo){
    // console.log(todo);
    // const index = this.todos.indexOf(todo);
    // this.todos.splice(index, 1);
    // localStorage.setItem("todos", JSON.stringify(this.todos));
    // this.heroes = this.heroes.filter(h => h !== hero);
    // this.heroService.deleteHero(hero.id).subscribe();
    
    this.appService.delete('todos', todo._id).subscribe( data => {
      console.log("Deleted successfully");
      
      this.showTodos()
    })


  }

addTodo(todo: Todo){

  console.log(todo);
  // this.todos.push(todo);
  // localStorage.setItem("todos", JSON.stringify(this.todos));
  this.appService.post('todos', todo).subscribe(data => {console.log(data, "Succesfully added");
  this.showTodos();
  } );
   
}

toggleTodo(todo: Todo){
  const index = this.todosArray.indexOf(todo);
  this.todosArray[index].active = !this.todosArray[index].active
  // localStorage.setItem("todos", JSON.stringify(this.todos));
}

showTodos() {
  this.appService.get('todos').subscribe(response => {
    console.log(typeof response);

    this.todosArray = response["msg"]
    // this.todo._id = response["_id"],
    // this.todo.title = response["title"],
    // this.todo.desc = response["desc"],
    // this.todo.active = response["active"]
   });
}

}



