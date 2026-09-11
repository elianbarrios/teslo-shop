import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductService } from '@products/services/product.service';
import { Pagination } from '@shared/components/pagination/pagination';
import { PaginationService } from '@shared/components/pagination/paginationService';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage {
  protected productService = inject(ProductService);
  protected paginationService = inject(PaginationService);

  // activatedRoute = inject(ActivatedRoute);
  // protected currentPage = toSignal(
  //   this.activatedRoute.queryParamMap.pipe(
  //     map((param) => Number(param.get('page') ?? 1)),
  //     // map((params) => (params.get('page') ? +params.get('page')! : 1)),
  //     map((page) => (isNaN(page) ? 1 : page)),
  //   ),
  //   {
  //     initialValue: 1,
  //   },
  // );

  protected productsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1 }),
    stream: ({ params }) => {
      return this.productService.getProducts({
        offset: params.page * 9,
      });
    },
  });
}
