import { Component, OnDestroy, OnInit, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";

import { CommonModule } from "@angular/common";
import { MakkiyahMadaniyah, surahInfo } from "@utils/surah";
import { PipesModule } from "@pipes/pipes.module";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-juzamma",
  standalone: true,
  imports: [CommonModule, PipesModule, FormsModule],
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
            <div>📚</div>
            <div>Juz Amma</div>
          </div>
        </div>
      </div>
      
      <div>
        <div class="interkom-faq-main-input flex mb-4">
          <input type="search" placeholder="Search..." [(ngModel)]="search" />
        </div>
      </div>

      <div class="flex flex-col items center gap-4">
        <ng-container
          *ngFor="let item of surah | keyvalue | orderBy: ['value.index'] | slice: 77: 114 | filterBy: ['value.latin', 'value.translation', 'value.arabic']: search; let i = index;">
          <div class="card-standard card-asmaul">
            <div class="flex flex-col gap-4 items-start w-full">
              <div class="flex justify-between items-center w-full">
                <div class="w-1/2">
                  <div class="flex items-center gap-2">
                    <div class="font-bold">{{ item.value.latin }}</div>
                  </div>
                  <div class="text-gray text-xs flex items-center gap-2">
                    {{ item.value.translation }} • {{ item.value.ayah_count }} Ayat
                  </div>
                </div>
                <div class="font-bold text-2xl text-right flex w-1/2 justify-end items-center">
                  {{ item.value.arabic }}
                </div>
              </div>
              <div class="flex items-center gap-2">
                <div class="numbertracking flex items-center justify-center text-xs text-gray">
                  {{ item.value.index }}
                </div>
                <div class="text-xs" [class.makkiyah]="MakkiyahMadaniyah[item.value.index] === 1"
                  [class.madaniyah]="MakkiyahMadaniyah[item.value.index] === 2">
                  {{ MakkiyahMadaniyah[item.value.index] === 1 ? 'Makkiyah' : 'Madaniyah' }}
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
export class JuzammaComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() selectedMenu = '';
  @Output() selectedMenuChanges: EventEmitter<string> = new EventEmitter();
  @Output() bottomOpenChanges: EventEmitter<any> = new EventEmitter();

  surah = surahInfo;
  MakkiyahMadaniyah = MakkiyahMadaniyah;
  search = '';

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
