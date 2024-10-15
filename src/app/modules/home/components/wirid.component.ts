import { Component, OnDestroy, OnInit, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";

import { CommonModule } from "@angular/common";
import { WIRID } from "@utils/wirid";

@Component({
  selector: "app-wirid",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="breadcrumb flex items-center gap-2 text-md mb-4 text-xs">
        <div class="breadcrumb-item pointer" (click)="selectedMenu = ''; selectedMenuChanges.next('');">
          Beranda
        </div>
        <div class="mt-1">
          <i class="material-icons">
            navigate_next
          </i>
        </div>
        <div class="breadcrumb-item active">
          <div class="flex items-center gap-2">
            <div>🤲</div>
            <div>Ayat Kursi</div>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col items center gap-4">
        <ng-container *ngFor="let item of wirid; let i = index;">
          <div class="card-standard card-asmaul">
            <div class="flex flex-col items-center w-full gap-4">
              <div class="font-bold text-2xl text-right flex w-full justify-end items-center">
                {{ item.arabic }}
              </div>
              <div class="flex w-full items-center justify-start">
                <div class="number">{{ item.times }}x</div>
              </div>
            </div>
          </div>
        </ng-container>
      </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WiridComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() selectedMenu = '';
  @Output() selectedMenuChanges: EventEmitter<string> = new EventEmitter();
  @Output() bottomOpenChanges: EventEmitter<any> = new EventEmitter();

  wirid = WIRID;

  constructor() {}

  ngOnInit() {}
  ngAfterViewInit() {
  }
  ngOnDestroy() {
  }

  bottomOpen(title: string, terjemahan: string, tafsir?: string) {
    this.bottomOpenChanges.next({title, terjemahan, tafsir});
  }
}
