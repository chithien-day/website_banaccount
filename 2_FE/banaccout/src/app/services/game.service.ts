import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { game } from '../models/game';
import { environment } from 'src/environments/environment';

// const baseUrl = 'http://localhost:8080/api/games';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private url = "games"
  constructor(private http: HttpClient) { }

  // getAll(): Observable<game[]> {
  //   return this.http.get<game[]>(baseUrl);
  // }

  // get(id: any): Observable<game> {
  //   return this.http.get(`${baseUrl}/${id}`);
  // }

  // create(data: any): Observable<any> {
  //   return this.http.post(baseUrl, data);
  // }

  // update(id: any, data: any): Observable<any> {
  //   return this.http.put(`${baseUrl}/${id}`, data);
  // }

  // delete(id: any): Observable<any> {
  //   return this.http.delete(`${baseUrl}/${id}`);
  // }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl);
  // }

  // findByTitle(title: any): Observable<game[]> {
  //   return this.http.get<game[]>(`${baseUrl}?title=${title}`);
  // }

  public getg() : Observable<game[]>{
    return this.http.get<game[]>(`${environment.apiUrl}/${this.url}`);
  }

  public themg(g:game) : Observable<game[]>{
    return this.http.post<game[]>(`${environment.apiUrl}/${this.url}`, g);
  }

  public suag(g:game) : Observable<game[]>{
    return this.http.put<game[]>(`${environment.apiUrl}/${this.url}/${g.id}`, g);
  }

  public xoag(g:game) : Observable<game[]>{
    return this.http.delete<game[]>(`${environment.apiUrl}/${this.url}/${g.id}`);
  }
}
