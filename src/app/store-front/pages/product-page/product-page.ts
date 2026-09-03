import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '@products/services/product.service';
import { ProductCarousel } from "@products/components/product-carousel/product-carousel";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProductPage {
  protected activatedRoute = inject(ActivatedRoute);
  protected productService = inject(ProductService);

  // protected produtIdSlug = this.activatedRoute.snapshot.paramMap.get('idSlug') as string;
  protected productIdSlug = this.activatedRoute.snapshot.params['idSlug'];

  protected productResource = rxResource({
    params: () => ({idSlug: this.productIdSlug}),
    stream: (({params}) => {
      return this.productService.getProductByIdSlug(params.idSlug);
    })
  });
}
