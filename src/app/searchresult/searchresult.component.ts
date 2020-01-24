import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from "rxjs/operators";
import { SearchService } from '../search.service';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss']
})
export class SearchresultComponent implements OnInit {
  title = 'Angular Search Using ng2-search-filter';
  searchText;
  dropDown = [
    { Value: "All", name: 'All' },
    { Value: 12, name: 'Titles' },
    { Value: 13, name: 'Tv Episodes' },
    { Value: 14, name: 'Celebs' },
    
  ];
  private loading: boolean = false;
  results: any[] = [];
  searchField: FormControl = new FormControl();
  constructor(private imdb: SearchService) { }

  ngOnInit() {
    this.searchField.valueChanges.pipe(
      debounceTime(1000),
      switchMap(id => {
        console.log(id);
        return this.imdb.search(id);
      })
    ).subscribe(res =>this.results = res );
  
  
  }
  doSearch(term: string) {
    this.imdb.search(term).subscribe((res : any[])=>{
      console.log(res);
      
    });
  }

}
