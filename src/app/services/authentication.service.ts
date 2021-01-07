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

  private headers = new HttpHeaders({'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'});

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<object> {
    if (username !== '' && password !== '') {
      return this.http.post<any>(`${environment.apiUrl}gateway/authentication/login`, {
        username,
        password,
      });
    }
  }

  logout(): Observable<object> {
    return this.http.post(`${environment.apiUrl}authentication/logout`, {token: this.getToken()});
  }

  getUser(token: string): Observable<object> {
    const data = {token};
    return this.http.post(`${environment.apiUrl}authentication/getuser`, data);
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
