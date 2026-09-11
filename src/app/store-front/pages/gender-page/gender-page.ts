import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductService } from '@products/services/product.service';
import { Pagination } from '@shared/components/pagination/pagination';
import { PaginationService } from '@shared/components/pagination/paginationService';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard, Pagination],
  templateUrl: './gender-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class GenderPage {
  protected route = inject(ActivatedRoute);
  protected productService = inject(ProductService);
  protected paginationService = inject(PaginationService);

  protected gender = toSignal(this.route.params.pipe(
    map(({gender}) => gender)
  ));

  protected productsResource = rxResource({
    params: () => ({gender: this.gender(), page: this.paginationService.currentPage() - 1}),
    stream: (({params}) => {
      return this.productService.getProducts({
        gender: params.gender,
        offset: params.page
      });
    })
  });
}
