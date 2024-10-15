import { Component, OnDestroy, OnInit, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";

import { CommonModule } from "@angular/common";
import { ayatKursi } from "@utils/ayatkursi";

@Component({
  selector: "app-ayatkursi",
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
        <div class="card-standard card-asmaul">
          <div class="flex flex-col items-center w-full gap-4">
            <div class="font-bold text-2xl text-right flex w-full justify-end items-center">
              {{ ayatkursi.arabic }}
            </div>
            <div class="mt-4 text-xs text-gray text-italic">
              {{ ayatkursi.latin }}
            </div>
            <div class="mt-4 flex items-start justify-start w-full">
              <div class="iconaction flex items-center justify-center pointer"
                (click)="bottomOpen('Terjemahan & Tafsir: ' + 'Ayat Kursi', ayatkursi.translation, ayatkursi.tafsir)">
                <i class="material-icons">
                  description
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AyatKursiComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() selectedMenu = '';
  @Output() selectedMenuChanges: EventEmitter<string> = new EventEmitter();
  @Output() bottomOpenChanges: EventEmitter<any> = new EventEmitter();

  ayatkursi = ayatKursi;

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
