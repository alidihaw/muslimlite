import { Component, OnDestroy, OnInit, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";

import { CommonModule } from "@angular/common";
import { tahlilData } from "@utils/tahlil";

@Component({
  selector: "app-tahlil",
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
            <div>Tahlil</div>
          </div>
        </div>
      </div>

      <div class="flex flex-col items center gap-4">
        @for (item of tahlil; track item; let i = $index) {
          <div class="card-standard card-asmaul">
            <div class="flex flex-col w-full">
              <div>
                <div class="flex items-center gap-2">
                  <div class="font-bold">
                    <div class="flex items-center gap-2">
                      <div>💠</div>
                      <div>{{ item.title }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="font-bold text-2xl text-right flex w-full justify-end items-center mt-4">
                {{ item.arabic }}
              </div>
              <div class="mt-4">
                <div class="iconaction flex items-center justify-center pointer"
                  (click)="bottomOpen('Terjemahan: ' + item.title, item.translation)">
                  <i class="material-icons">
                    description
                  </i>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TahlilComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() selectedMenu = '';
  @Output() selectedMenuChanges: EventEmitter<string> = new EventEmitter();
  @Output() bottomOpenChanges: EventEmitter<any> = new EventEmitter();

  tahlil = tahlilData;

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
