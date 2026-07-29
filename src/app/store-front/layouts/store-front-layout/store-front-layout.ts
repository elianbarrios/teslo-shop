import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-store-front-layout',
  imports: [RouterOutlet],
  templateUrl: './store-front-layout.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class StoreFrontLayout {

}
