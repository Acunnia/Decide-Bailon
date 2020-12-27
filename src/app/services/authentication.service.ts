import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLogged: boolean;
  statusChanged = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<object> {
    if (username !== '' && password !== '') {
      const headers = new HttpHeaders().set('Access-Control-Allow-Origin','http://localhost:8080/');
      return this.http.post(`${environment.apiUrl}authentication/login/`, {
        username,
        password,
      }, {headers});
    }
  }

  logout(): Observable<object> {
    return this.http.post(`${environment.apiUrl}authentication/logout/`, {token: this.getToken()});
  }

  getUser(token: string): Observable<object> {
    const data = {token};
    return this.http.post(`${environment.apiUrl}authentication/getuser/`, data);
  }

  getToken(): string {
    const cookies = document.cookie.split('; ');
    let token = '';
    console.log(cookies);
    console.log(document.cookie);
    cookies.forEach((c) => {
      const cs = c.split('=');
      if (cs[0] === 'sessionid' && cs[1]) {
        token = cs[1];
      }
    });
    return token;
  }

  setToken(token: string): void {
    document.cookie = 'sessionid=' + token + ';';
  }

  removeToken(): void {
    document.cookie = 'sessionid=;';
  }

  changeLoggedStatus(newStatus: boolean): void {
    this.isLogged = newStatus;
    this.statusChanged.emit(this.isLogged);
  }
}
