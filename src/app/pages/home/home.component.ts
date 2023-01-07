import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  upComingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService
      .getMovies('popular')
      .subscribe((resp) => (this.popularMovies = resp.results));
    this.moviesService
      .getMovies('upcoming')
      .subscribe((resp) => (this.upComingMovies = resp.results));
    this.moviesService
      .getMovies('top_rated')
      .subscribe((resp) => (this.topRatedMovies = resp.results));
  }
}
