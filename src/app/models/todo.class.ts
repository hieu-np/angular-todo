// export class Todo{
//   public id: number;
//   public title: string;
//   completed: boolean;

//   constructor(title: string, conpleted: boolean, id: number){
//     this.title = title;
//     this.completed = conpleted;
//     this.id = id
//   }
// }

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}