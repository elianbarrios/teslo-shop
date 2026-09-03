import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, input, viewChild } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: `
    .swiper {
      width: 100%;
      height: 500px;
    }
  `
})
export class ProductCarousel implements AfterViewInit {
  public images = input.required<string[]>();
  protected swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  ngAfterViewInit(): void {
    const element = this.swiperDiv().nativeElement;
    if (!element) return;

    const swiper = new Swiper(element, {
      modules: [Navigation, Pagination, Scrollbar],
      direction: 'horizontal',
      loop: true,

      pagination: {
        el: '.swiper-pagination',
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
