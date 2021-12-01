import { Component, OnInit } from '@angular/core';
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
  constructor(private dashboard:DashboardService) { }

  ngOnInit(): void {
  }

  searching(){
    console.log(this.termino);
    
    this.dashboard.getSuggestion(this.termino)
        .subscribe(resp => {
          this.suggestions = resp
        })
  }

}
