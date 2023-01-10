import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  Movie,
  MovieDto,
  MovieVideoDto,
  MovieVideo,
  MovieImages,
  MovieCredits,
} from '../models/movie';
import { Observable, of, switchMap } from 'rxjs';
import { Genre, GenresDto } from '../models/genre';

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
  getMovieGenres(): Observable<Genre[]> {
    return this.http
      .get<GenresDto>(
        this.apiUrl.replace('/movie', '/genre') +
          `/movie/list?api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.genres);
        })
      );
  }

  getMovieImages(id: string): Observable<MovieImages> {
    return this.http.get<MovieImages>(
      this.apiUrl + `/${id}/images?api_key=${this.apiKey}`
    );
  }
  getMovieCredits(id: string): Observable<MovieCredits> {
    return this.http.get<MovieCredits>(
      this.apiUrl + `/${id}/credits?api_key=${this.apiKey}`
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
