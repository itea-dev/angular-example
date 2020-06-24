import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products = [];
  destroy$ = new Subject<boolean>();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      });
  }

  public firstPage() {
    this.products = [];
    this.apiService
      .sendGetRequestToUrl(this.apiService.first)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      });
  }
  public previousPage() {
    if (this.apiService.prev !== undefined && this.apiService.prev !== '') {
      this.products = [];
      this.apiService
        .sendGetRequestToUrl(this.apiService.prev)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.products = res.body;
        });
    }
  }
  public nextPage() {
    if (this.apiService.next !== undefined && this.apiService.next !== '') {
      this.products = [];
      this.apiService
        .sendGetRequestToUrl(this.apiService.next)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.products = res.body;
        });
    }
  }
  public lastPage() {
    this.products = [];
    this.apiService
      .sendGetRequestToUrl(this.apiService.last)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
