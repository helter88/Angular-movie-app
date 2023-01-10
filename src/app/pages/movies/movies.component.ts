import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  categoryId: string | null = null;
  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({ catId }) => {
      if (catId) {
        this.getMoviesByCategory(catId, 1);
        this.categoryId = catId;
      } else {
        this.getPagedMovies(1);
      }
    });
  }

  getPagedMovies(page: number) {
    this.moviesService
      .searchMovies(page)
      .subscribe((item) => (this.movies = item));
  }

  getMoviesByCategory(catId: string, page: number) {
    this.moviesService.getMoviesByCategory(catId, page).subscribe((item) => {
      this.movies = item;
    });
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;
    if (this.categoryId) {
      this.getMoviesByCategory(this.categoryId, pageNumber);
    } else {
      this.getPagedMovies(pageNumber);
    }
  }
}
