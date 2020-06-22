import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Urls } from './../apiUrl/url';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    private api: Urls) {

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    console.log(this.currentUserSubject.value);

  }

  public get currentUserValue(){
    return this.currentUserSubject.value
  }

  getAcesse(email: any, password:any){
    return this.http.post<any>(`${this.api.url + this.api.acesseUser}`, {email, password})
    .pipe(map(user =>{
      
      //Armazeno o retorno contendo os dados do usuario
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      if(user && user.data){
        if(user.data.nome && user.data.email){
          window.localStorage.setItem('nome', user.data.nome);
          window.localStorage.setItem('email', user.data.email);
        }
      }
      return user;
    }));
  }

  getNome(){
    const nome = window.localStorage.getItem('nome');
    return nome;
  }
  getEmail(){
    const email = window.localStorage.getItem('email');
    return email;
  }

  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('nome');
    localStorage.removeItem('email');
    this.currentUserSubject.next(null);
  }


}
