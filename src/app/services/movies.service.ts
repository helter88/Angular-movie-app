import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiUrl = environment.apiUrl;
  apiKey = environment.apiKey;
  constructor(private http: HttpClient) {}

  getMovies(type: string = 'upcoming') {
    return this.http.get(this.apiUrl + `/${type}?api_key=${this.apiKey}`);
  }
}
