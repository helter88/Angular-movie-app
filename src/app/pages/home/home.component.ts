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
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService
      .getMovies('popular')
      .subscribe((resp: any) => (this.popularMovies = resp.results));
    this.moviesService
      .getMovies('upcoming')
      .subscribe((resp: any) => (this.upcomingMovies = resp.results));
    this.moviesService
      .getMovies('top_rated')
      .subscribe((resp: any) => (this.topRatedMovies = resp.results));
  }
}
