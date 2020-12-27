
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(private http: HttpClient) { }

  getVotingsByUserId(id: number): Observable<object> {
    return this.http.get(`${environment.apiUrl}voting/user/?id=${id}`);
  }


  getVoting(id: number): Observable<object> {
    return this.http.get(`${environment.apiUrl}voting/?id=${id}`);
  }

  postData(data: { vote: { a: any; b: any; }; voting: number; voter: number; token: string; }): Observable<object> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json').set('Authorization', 'Token ' + data.token);
    return this.http.post(`${environment.apiUrl}store/`, data, { headers });
  }
}
