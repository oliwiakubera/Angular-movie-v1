import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {observable, Observable, throwError} from 'rxjs';
import {Movie} from '../models/movie';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpMoviesService {
 private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

    getMovies(): Observable<Movie[]>{
     return this.http.get<Movie[]>(this.url + '/movies')
       .pipe(tap(console.log));
  }

  // getMovies(): Observable<HttpResponse<Movie[]>>{
  //   return this.http.get<HttpResponse<Movie[]>>(this.url, {observe: 'response'})
  //     .pipe(tap(console.log));
  // }

  postMovie(movie: Movie): Observable<Movie>{
   return this.http.post<Movie>(this.url + '/movies', movie)
      .pipe(tap(console.log));
  }

  putMovie(movie: Movie): Observable<Movie>{
    return this.http.put<Movie>(this.url + '/movies/' + movie.id, movie)
      .pipe(tap(console.log));
  }

  patchMovie(movie: Partial<Movie>): Observable<Movie>{
    return this.http.put<Movie>(this.url + '/movies/' + movie.id, movie)
      .pipe(tap(console.log));
  }
  deleteMovie(id: string): Observable<{}>{
    return this.http.delete<{}>(this.url + '/movies/' + id)
      .pipe(tap(console.log));
  }

  makeError(): Observable<HttpErrorResponse> {
    return this.http
      .delete(this.url + '/movies/' + 999)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse){
    console.error(
      `Name: ${error.name} \n` +
      `Message: ${error.message} \n` +
      `Returned code: ${error.status} \n`
    );
    return throwError('Something bad happened; please try again later.');
  }

    headers(): Observable<HttpResponse<Movie[]>>{
    const myHeaders = new HttpHeaders({
      Authorizations: 'my-token',
      'Content-Type': 'application/json',
      'X-Custom-Header': 'Projekt Angulara'
    })
      return this.http
        .get<Movie[]>(this.url, {observe: 'response', headers: myHeaders})
        .pipe(
          tap((res: HttpResponse<Movie[]>) =>{
            console.log(res.headers.keys());
            console.log(res.headers.get('Cache-Control'));
            console.log(res.headers.get('Content-Type'));
            console.log(res.headers.get('Expires'));
            console.log(res.headers.get('Pragma'));
          }),
        );
  }

  params(): Observable<Movie>{
    const myParams = new HttpParams();
    myParams.set('_sort', 'title')
    myParams.set('_order', 'desc');
    return this.http
      .get<Movie[]>(this.url, {params: myParams})
      .pipe(tap(console.log));
  }
}
