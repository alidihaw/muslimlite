import { Component, OnDestroy, OnInit, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";

import { CommonModule } from "@angular/common";
import { ASMAUL_HUSNA } from "@utils/asmaulhusna";

@Component({
  selector: "app-asmaulhusna",
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
            <div>💯</div>
            <div>Asmaul Husna</div>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col items center gap-4">
        <ng-container *ngFor="let item of asmaulHusna; let i = index;">
          <div class="card-standard card-asmaul">
            <div class="flex flex-col gap-4 items-start w-full">
              <div>
                <div class="flex items-center gap-2">
                  <div class="number">{{ item.index }}</div>
                  <div class="font-bold">{{ item.latin }}</div>
                </div>
              </div>
              <div class="font-bold text-2xl text-right flex w-full justify-end items-center">
                {{ item.arabic }}
              </div>
              <div class="text-xs text-gray mt-1">
                <div class="flex items-center gap-2">
                  <div>🇬🇧</div>
                  <div>{{ item.translation_en }}</div>
                </div>
                <div class="flex items-center gap-2">
                  <div>🇮🇩</div>
                  <div>{{ item.translation_id }}</div>
                </div>
              </div>
            </div>
          </div>
        </ng-container>
      </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsmaulHusnaComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() selectedMenu = '';
  @Output() selectedMenuChanges: EventEmitter<string> = new EventEmitter();
  @Output() bottomOpenChanges: EventEmitter<any> = new EventEmitter();

  asmaulHusna = ASMAUL_HUSNA;

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
