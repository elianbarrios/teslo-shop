import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductService } from '@products/services/product.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class HomePage {
  protected productService = inject(ProductService);

  protected productsResource = rxResource({
    params: () => ({}),
    stream: ((params) => {
      return this.productService.getProducts({});
    })
  });
}
