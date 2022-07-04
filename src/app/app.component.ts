import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Observable, Subscription } from 'rxjs';
import { Todo } from './models/todo.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subscription!: Subscription;

  constructor(
    public todoService: TodoService,
  ) {

  }
  ngOnInit(): void {
      this.loadData();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  todos: Todo[] = [];
  todo?: Todo;
  title: string = '';
  completed: boolean= false;
  isShowFormAddTodo: boolean = false;

  loadData() {
    this.subscription
    =this.todoService
    .getAllTodos()
    .subscribe(data => {
      this.todos = data;
      
    }, error => {
      this.todoService.handleError(error)
      
    });
  }

  onShowFormAddTodo() {
    this.isShowFormAddTodo = !this.isShowFormAddTodo
  }

  onAddTodo() {
    let completedTodo = this.completed == false ? false : true
    let todo:Todo = {
      id:0,
      title: this.title,
      completed: completedTodo,

    }
    this.subscription = this.todoService.addTodo(todo).subscribe(data => {
      this.todos.push(data)
      
    }, error => {
      this.todoService.handleError(error)
      
    })
    
  }

  onEditTodo(item : Todo) {
    this.todo = item;
  }

  onUnEditTodo() {
    this.todo = undefined;
  }

  onUpdateTodo() {
    let dataTodo: Todo;
    if (this.todo) {
      let completedTodo = this.todo.completed == false ? false : true
      dataTodo= {
        id: this.todo.id,
        title: this.todo.title,
        completed: completedTodo,
      }
      
      this.subscription = this.todoService.upDateTodo(dataTodo).subscribe(data => {
        let index = this.getIndex(data.id);
        this.todos[index] = data       
      }, error => {
      this.todoService.handleError(error)
      })
    }

  }
  getIndex(id: number): number{
    let resualt = 0;
    this.todos.forEach( (item, index) => {
      if(item.id == id){
        resualt = index;        
      }
      
    } )
    return resualt;
  }

  onDeleteTodo(id: number) {
    this.subscription = this.todoService.deleteTodo(id).subscribe(
      data => {
        let index = this.getIndex(data.id);
        console.log(index);
        
        this.todos.splice(index, 1)      
      }, 
      error => {
        this.todoService.handleError(error)
      }
    )  
  }

}
