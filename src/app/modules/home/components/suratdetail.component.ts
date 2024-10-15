import { Component, OnDestroy, OnInit, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";

import { CommonModule } from "@angular/common";
import { MakkiyahMadaniyah, surahInfo } from "@utils/surah";
import { PipesModule } from "@pipes/pipes.module";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-suratdetail",
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
        <div class="breadcrumb-item" (click)="selectedMenu = 'surah'; selectedMenuChanges.next('surah');">
          <div class="flex items-center gap-2">
            <div>📚</div>
            <div>Semua Surat</div>
          </div>
        </div>
        <div class="mt-1">
          <i class="material-icons">
            navigate_next
          </i>
        </div>
        <div class="breadcrumb-item active" *ngIf="surahData">
          <div class="flex items-center gap-2">
            <div>{{ surahData.name_latin }}</div>
          </div>
        </div>
      </div>
     
      <div class="flex flex-col items center gap-4" *ngIf="surahData">
        <div class="card-standard card-asmaul">
          <div class="flex flex-col gap-4 items-start w-full">
            <div class="flex justify-between items-center w-full">
              <div class="w-1/2">
                <div class="flex items-center gap-2">
                  <div class="font-bold">{{ surahData.name_latin }}</div>
                </div>
                <div class="text-gray text-xs flex items-center gap-2">
                  {{ surahData.translation }} • {{ surahData.number_of_ayah }} Ayat
                </div>
              </div>
              <div class="font-bold text-2xl text-right flex w-1/2 justify-end items-center">
                {{ surahData.name }}
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="numbertracking flex items-center justify-center text-xs text-gray">
                {{ surahData.number }}
              </div>
              <div class="text-xs" [class.makkiyah]="MakkiyahMadaniyah[surahData.number] === 1"
                [class.madaniyah]="MakkiyahMadaniyah[surahData.number] === 2">
                {{ MakkiyahMadaniyah[surahData.number] === 1 ? 'Makkiyah' : 'Madaniyah' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ng-template *ngTemplateOutlet="navigation"></ng-template>

      <div class="flex flex-col items center gap-4 mt-4" *ngIf="surahData">
        <ng-container *ngFor="let ayat of surahData.text | keyvalue; let i = index;">
          <div class="card-standard card-asmaul">
            <div class="flex flex-col items-center w-full gap-4">
              <div class="font-bold text-2xl text-right flex w-full justify-end items-center">
                {{ ayat.value }}
              </div>
              <div class="mt-4 text-xs text-gray text-italic flex items-center justify-start text-left w-full">
                {{ surahData.translations.id.text[i + 1] }}
              </div>
              <div class="mt-4 flex items-center justify-between w-full">
                <div class="flex items-center gap-2">
                  <div class="iconaction flex items-center justify-center pointer"
                    (click)="playChanges.next({surahData: surahData, i: i})">
                    <i class="material-icons">
                      {{ play ? 'pause' : 'play_arrow'}}
                    </i>
                  </div>
                  <div class="iconaction flex items-center justify-center pointer"
                    (click)="bottomOpen('Terjemahan & Tafsir: ' + surahData.name_latin + ', Ayat ' + (i + 1), surahData.translations.id.text[i + 1], surahData.tafsir.id.kemenag.text[i + 1])">
                    <i class="material-icons">
                      description
                    </i>
                  </div>
                </div>
                <div class="numbertracking flex items-center justify-center text-xs text-gray">
                  {{ i + 1 }}
                </div>
              </div>
            </div>
          </div>
        </ng-container>
      </div>

      <ng-template *ngTemplateOutlet="navigation"></ng-template>

      <ng-template #navigation>
        <div class="mt-4">
          <div class="flex items-center justify-around w-full">
            <div class="w-1/3">
              <div class="" *ngIf="surahDataPrev" (click)="suratChanges.next(surahDataPrev.number)">
                <div class="breadcrumb-item flex gap-2 items-center pointer justify-start">
                  <i class="material-icons">
                    navigate_before
                  </i>
                  {{ surahDataPrev?.name_latin }}
                </div>
              </div>
            </div>
            <div class="w-1/3 flex items-center justify-center">
              <ng-container *ngIf="surahData">
                <div>{{ surahData.number }} / 114</div>
              </ng-container>
            </div>
            <div class="w-1/3">
              <div class="" *ngIf="surahDataNext" (click)="suratChanges.next(surahDataNext.number)">
                <div class="breadcrumb-item flex gap-2 items-center pointer justify-end">
                  {{ surahDataNext?.name_latin }}
                  <i class="material-icons">
                    navigate_next
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ng-template>
  `,
  styles: [],
})
export class SuratDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() selectedMenu = '';
  @Output() selectedMenuChanges: EventEmitter<string> = new EventEmitter();
  @Output() bottomOpenChanges: EventEmitter<any> = new EventEmitter();
  @Output() suratChanges: EventEmitter<any> = new EventEmitter();
  @Output() playChanges: EventEmitter<any> = new EventEmitter();

  surah = surahInfo;
  search = '';
  MakkiyahMadaniyah = MakkiyahMadaniyah;
  @Input() surahData: any;
  @Input() surahDataNext: any;
  @Input() surahDataPrev: any;
  @Input() play = false;

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
