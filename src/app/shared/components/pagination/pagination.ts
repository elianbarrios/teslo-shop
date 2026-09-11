import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class Pagination {
  public pages = input(0);
  public currentPage = input<number>(1);
  protected activePage = linkedSignal(this.currentPage);

  protected getPagesList = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });
}
