import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { SearchService } from "../shared/services/search/search.service";

@Component({
  selector: "search-box",
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: "./search-box.component.html",
  styles: [``],
})
export class SearchBoxComponent {
  searchService = inject(SearchService);
  searchForm: FormGroup = new FormGroup({
    search: new FormControl(null),
  });
  ngOnInit() {}
  search() {
    this.searchService.setSearchObservable(this.searchForm.value.search);
  }
}
