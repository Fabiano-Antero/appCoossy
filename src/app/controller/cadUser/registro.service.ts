import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { user } from 'src/app/model/user';
import { Urls } from './../apiUrl/url';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor( 
    private http: HttpClient, 
    private api: Urls ) { 
      
    }


  posRegistro(dados): Observable<user>{

    console.log(dados)
    return this.http.post<user>(`${this.api.url+this.api.cadUsers}`, dados).pipe(
      
      map(results => {

        console.log(results);
        return results;


      }),
      
    );
  }
}

