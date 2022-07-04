import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.class';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public API: string = 'https://62947bc3a7203b3ed069dbdd.mockapi.io/todos';

  constructor(
    public http: HttpClient,
  ) { }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.API)
  }

  handleError(err : any) {
    if(err.error instanceof Error){
      console.log('Client-side error: ', err.error.message);
    }else{
      console.log("Server-sdide error: ", err.status, '-', err.error);
      
    }
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.API, todo);
  }

  upDateTodo(todo: Todo): Observable<Todo>{
    return this.http.put<Todo>(`${this.API}/${todo.id}`, todo)
  }

  deleteTodo(id: number): Observable<Todo>{
    return this.http.delete<Todo>(`${this.API}/${id}`)
  }
}
