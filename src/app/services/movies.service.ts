import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Movie, MovieDto } from '../models/movie';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiUrl = environment.apiUrl;
  apiKey = environment.apiKey;
  constructor(private http: HttpClient) {}

  getMovies(type: string = 'upcoming'): Observable<Movie[]> {
    return this.http
      .get<MovieDto>(this.apiUrl + `/${type}?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  searchMovies(): Observable<Movie[]> {
    return this.http
      .get<MovieDto>(this.apiUrl + `/popular?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }
}
