import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http: HttpClient) { }

  addTask(task: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/todo/add', task)
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
    return this.http.get(environment.apiUrl + '/todo/fetch')
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
    return this.http.delete(environment.apiUrl + '/todo/delete/'+ _id)
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
