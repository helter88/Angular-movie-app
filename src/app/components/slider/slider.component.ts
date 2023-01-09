import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { Movie, SingleMovie } from '../../models/movie';

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
  @Input() isBaner: boolean = false;
  currentSlideNumber: number = 0;
  readonly imagesSizes = IMAGES_SIZES;

  ngOnInit(): void {
    if (!this.isBaner) {
      setInterval(() => {
        this.currentSlideNumber = ++this.currentSlideNumber % this.items.length;
      }, 5000);
    }
  }
}
