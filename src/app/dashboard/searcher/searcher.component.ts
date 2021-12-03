import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';
import { Origin } from 'src/app/interfaces/origin.interface';
import { apiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styles: [
  ]
})
export class SearcherComponent implements OnInit {

  termino: string = '';
  suggestions: Origin[] = [];
  @Output() searchOrigin: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();

  constructor(
    private apiService: apiService
  ) { }

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.onDebounce.emit(value)
      })
  }

  searching() {
    this.searchOrigin.emit(this.termino)
  }

  search() {
    this.debouncer.next(this.termino)
  }

}
