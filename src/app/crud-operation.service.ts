import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CrudOperationService {

  private baseUrl='https://jsonplaceholder.typicode.com/posts'
  constructor( private http: HttpClient) { }
  getUaser(): Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/users');
   }

  get(): Observable<any>{
    return this.http.get(this.baseUrl);
   }

   delete(id: any): Observable<any> {
     return this.http.delete(this.baseUrl+'/'+id);
  }
 
  update(data): Observable<any> {
    return this.http.put(this.baseUrl+'/'+data.id, data);
  }

  add(data): Observable<any>{
      return this.http.post(this.baseUrl, data);
  }
}
