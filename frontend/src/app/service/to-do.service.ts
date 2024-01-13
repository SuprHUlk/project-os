import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http: HttpClient) { }

  addTask(task: any): Observable<any> {
    return this.http.post('http://localhost:3000/todo/add', task)
      .pipe(
        take(1),
        map(
          (res: any) => {
            return res;
          },
          (err: any) => {
            return err;
          }
        )
      )
  }

  fetchTasks(): Observable<any> {
    return this.http.get('http://localhost:3000/todo/fetch')
      .pipe(
        take(1),
        map(
          (res: any) => {
            return res;
          },
          (err: any) => {
            return err;
          }
        )

      )
  }

  deleteTask(_id: string): Observable<any> {
    return this.http.delete('http://localhost:3000/todo/delete/'+ _id)
      .pipe(
        take(1),
        map(
          (res: any) => {
            return res;
          },
          (err: any) => {
            return err;
          }
        )
      )
  }
}
