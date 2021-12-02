import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Origin } from 'src/app/interfaces/origin.interface';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styles: [
  ]
})
export class SearcherComponent implements OnInit {


  termino: string  = '';
  suggestions: Origin[] = [];
  @Output() optionSelected: EventEmitter<Origin[]> = new EventEmitter(); 

  constructor(private dashboard:DashboardService) { }

  ngOnInit(): void {
  }

  searching(){
    if (this.termino.trim().length == 0) {
      this.optionSelected.emit([])
    }else{
      this.dashboard.getSuggestion(this.termino)
      .subscribe(resp => {
        this.suggestions = resp
        this.optionSelected.emit(resp)
      });
    }

   
  }

  // seleccion(origin:any){
  //   this.optionSelected.emit(origin)
  // }

}
