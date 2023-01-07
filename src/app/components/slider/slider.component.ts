import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { IMAGES_SIZES } from 'src/app/constants/images-sizes';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('1s')]),
    ]),
  ],
})
export class SliderComponent {
  @Input() items: Movie[] = [];
  currentSlideNumber: number = 0;
  imagesSizes = IMAGES_SIZES;

  ngOnInit(): void {
    setInterval(() => {
      this.currentSlideNumber = ++this.currentSlideNumber % this.items.length;
    }, 5000);
  }
}
