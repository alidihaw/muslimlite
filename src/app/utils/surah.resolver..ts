import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError, combineLatest, filter, first, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurahDetailResolver implements Resolve<boolean>, OnInit {
  constructor(private httpClient: HttpClient, private meta: Meta, private title: Title) {
  }

  user: any;
  async initData() {
  }

  async ngOnInit() {
  }
  
  isLoaded = false;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let index: any = route.paramMap.get("id");
    if (index) index = +index;
    return this.httpClient.get('assets/surah/' + +index + '.json');
  }
}
