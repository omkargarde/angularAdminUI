import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private searchObservable = new Subject<any>();

  setSearchObservable(data: any): void {
    this.searchObservable.next(data);
  }
  getSearchObservable() {
    return this.searchObservable.asObservable();
  }
}
