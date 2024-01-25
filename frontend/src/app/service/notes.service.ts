import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class NotesService {

  constructor(private http: HttpClient) { }

  saveFile(data: any) {
    return this.http.post(environment.apiUrl + '/notes/save', data)
      .pipe(take(1),
      map((res) => {
        return res;
      }));
  }
}
