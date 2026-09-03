import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductService } from '@products/services/product.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard],
  templateUrl: './gender-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class GenderPage {
  protected route = inject(ActivatedRoute);
  protected productService = inject(ProductService);

  protected gender = toSignal(this.route.params.pipe(
    map(({gender}) => gender)
  ));

  protected productsResource = rxResource({
    params: () => ({gender: this.gender()}),
    stream: (({params}) => {
      return this.productService.getProducts({
        gender: params.gender
      });
    })
  });
}
