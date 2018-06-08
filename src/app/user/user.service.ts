import { Injectable } from '@angular/core';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUser$(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/profiles/${userId}`);
  }

  getUsers$(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/profiles`);
  }

  saveUser$(user: User): Observable<User | any> {

    if (!user.userId) {
      return this.httpClient.post<User>(
        `${environment.apiUrl}/profiles`, user
      )
        .pipe(
          catchError(this.errorHandler)
        );

    } else {

      return this.httpClient.put<void>(
        `${environment.apiUrl}/profiles/${user.userId}`, user
      )
        .pipe(
          catchError(this.errorHandler)
        );

    }

  }

  deleteUser$(userId: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/profiles/${userId}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  private errorHandler(error: Error): Observable<User> {
    console.error('USER ERROR:', error);
    return of(null);
  }

}