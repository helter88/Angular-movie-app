import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMAGES_SIZES } from 'src/app/constants/images-sizes';
import {
  Movie,
  MovieCredits,
  MovieImages,
  MovieVideo,
} from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  movieData: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  imagesSizes = IMAGES_SIZES;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.moviesService.getMovie(id).subscribe((movie) => {
        this.movieData = movie;
        this.moviesService.getMovieVideos(id).subscribe((movieVideoData) => {
          this.movieVideos = movieVideoData;
        });
      });
      this.moviesService.getMovieImages(id).subscribe((images) => {
        this.movieImages = images;
      });
      this.moviesService.getMovieCredits(id).subscribe((credits) => {
        this.movieCredits = credits;
      });
    });
  }
}
