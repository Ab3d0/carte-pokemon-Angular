import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../Models/user.model'
import { map, Observable, tap } from 'rxjs';

export interface Credentials{
  user: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:8000'

  user = signal<User | null | undefined>(undefined);

  

  constructor() { }

  login(credentials: Credentials): Observable<User | null | undefined> {

    return this.http.post<Credentials>(this.BASE_URL + '/sessions/login/', credentials).pipe(
      tap((result: any) =>{
        localStorage.setItem('token' , result['token']);
        const user = Object.assign(new User(), result['user']);
        this.user.set(user);

      }),
      map((result: any)=> {
        return this.user();

      })
    )


    /*Pipe et tap*/

  }

  getUser():Observable<User | null | undefined>{
    return this.http.get(this.BASE_URL + '/sessions/me/').pipe(
      tap((result: any) => {
        const user = Object.assign(new User(), result);
        this.user.set(user);
      }),
      map((result: any) => {
        return this.user();
      })
    )
  }

  logout(): Observable<null>{
    return this.http.get(this.BASE_URL + '/sessions/logout/').pipe(
      tap((result: any) => {
        localStorage.removeItem('token');
        this.user.set(null);
      })
    )
  }
}
