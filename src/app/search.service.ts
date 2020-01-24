import { Injectable } from '@angular/core';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
class SearchItem {
  constructor(
    public track: string,
    public artist: string,
    public link: string,
    public thumbnail: string,
    public artistId: string
  ) {}
}
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiRoot: string = "http://www.omdbapi.com/?i=tt3896198&apikey=f705e69b";
  constructor(private http: HttpClient) {}
  search(term: string): Observable<any> {
   let apiURL = `${this.apiRoot}&t=${term}`;
   return this.http.get(apiURL);
  }
}
