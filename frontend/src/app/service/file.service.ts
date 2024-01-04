import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  upload(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];

    const data = new FormData();
    data.append('file', file, file.name);
    console.log(data.get('file'));

    return this.http.post('http://localhost:3000/file/upload', data)
      .pipe(
        take(1),
        map(
          (res: any) => {
            return 'File upload successful'
          },
          (err: any) => {
            return 'File upload unsuccessful'
          }
        )
      )
  }

  download(folder: string) {

    const params = {
      mimeType: folder
    }

    return this.http.get('http://localhost:3000/file/download', { params })
      .pipe(
        take(1),
        map((res) => {
          return res;
        },
        (err: any) => {
          return err;
        }
        )
      )
  }
}
