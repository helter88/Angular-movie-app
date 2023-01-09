import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  Movie,
  MovieDto,
  MovieVideoDto,
  MovieVideo,
  MovieImages,
} from '../models/movie';
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
  getMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(this.apiUrl + `/${id}?api_key=${this.apiKey}`);
  }

  getMovieVideos(id: string): Observable<MovieVideo[]> {
    return this.http
      .get<MovieVideoDto>(this.apiUrl + `/${id}/videos?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getMovieImages(id: string): Observable<MovieImages> {
    return this.http.get<MovieImages>(
      this.apiUrl + `/${id}/images?api_key=${this.apiKey}`
    );
  }

  searchMovies(page: number): Observable<Movie[]> {
    return this.http
      .get<MovieDto>(
        this.apiUrl + `/popular?page=${page}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }
}
