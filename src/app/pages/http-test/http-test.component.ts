import { Component, OnInit } from '@angular/core';
import {HttpMoviesService} from '../../services/http-movies.service';
import {Movie} from '../../models/movie';

@Component({
  selector: 'app-http-test',
  templateUrl: './http-test.component.html',
  styleUrls: ['./http-test.component.css']
})
export class HttpTestComponent {
  errorMessage: string;

  constructor(private http: HttpMoviesService) { }

  get() {
    this.http.getMovies().subscribe();
  }

  post() {
  const movie: Movie = {
    country: 'Poland',
    director: 'Gall Anonim',
    category: 'Fantasy',
    plot: 'Ile jeszcze do końca..',
    poster: null,
    year: '2022',
    title: 'Kurs Angular',
    imdbRating: '10.0'
  };
  this.http.postMovie(movie).subscribe();
  }

  put() {
    const movie: Movie = {
      id: '50',
      country: 'Poland',
      director: 'Gall Anonim',
      category: 'Fantasy',
      plot: 'Ile jeszcze do końca..',
      poster: null,
      year: '2022',
      title: 'Kurs Angular ',
      imdbRating: '10.0'
    };
    this.http.putMovie(movie).subscribe();
  }

  patch() {
    const movie: Partial<Movie> = {
      id: '5',
      title: 'Kurs Angular v3',
    };
    this.http.patchMovie(movie).subscribe();
  }

  delete() {
    this.http.deleteMovie('5').subscribe();
  }
  error(){
    this.http.makeError().subscribe({error: (err: string) => this.errorMessage = err});
  }

  headers(){
    this.http.headers().subscribe();
  }

  params(){
    this.http.params().subscribe();
  }
}
