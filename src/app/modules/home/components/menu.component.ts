import { Component, OnDestroy, OnInit, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";

import { CommonModule } from "@angular/common";

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-4 mt-4">
      <div class="flex items center gap-4">
        <div class="card-standard w-1/2 text-left items-center justify-start card-menu pointer"
          (click)="selectedMenu = 'surah'; selectedMenuChanges.next('surah');">
          <div class="flex items-center gap-2">
            <div>📚</div>
            <div>Semua Surat</div>
          </div>
        </div>
        <div class="card-standard w-1/2 text-left items-center justify-start card-menu pointer"
          (click)="selectedMenu = 'jadwalsholat'; selectedMenuChanges.next('jadwalsholat');">
          <div class="flex items-center gap-2">
            <div>⏰</div>
            <div>Jadwal Sholat</div>
          </div>
        </div>
      </div>
      <div class="flex items center gap-4">
        <div class="card-standard w-1/2 text-left items-center justify-start card-menu pointer"
          (click)="selectedMenu = 'asmaulhusna'; selectedMenuChanges.next('asmaulhusna');">
          <div class="flex items-center gap-2">
            <div>💯</div>
            <div>Asmaul Husna</div>
          </div>
        </div>
        <div class="card-standard w-1/2 text-left items-center justify-start card-menu pointer"
          (click)="selectedMenu = 'doa'; selectedMenuChanges.next('doa');">
          <div class="flex items-center gap-2">
            <div>🙏</div>
            <div>Doa Harian</div>
          </div>
        </div>
      </div>
      <div class="flex items center gap-4">
        <div class="card-standard w-1/2 text-left items-center justify-start card-menu pointer"
          (click)="selectedMenu = 'ayatkursi'; selectedMenuChanges.next('ayatkursi');">
          <div class="flex items-center gap-2">
            <div>🤲</div>
            <div>Ayat Kursi</div>
          </div>
        </div>
        <div class="card-standard w-1/2 text-left items-center justify-start card-menu pointer"
          (click)="selectedMenu = 'juzamma'; selectedMenuChanges.next('juzamma');">
          <div class="flex items-center gap-2">
            <div>📚</div>
            <div>Juz Amma</div>
          </div>
        </div>
      </div>
      <div class="flex items center gap-4">
        <div class="card-standard w-1/2 text-left items-center justify-start card-menu pointer"
          (click)="selectedMenu = 'wirid'; selectedMenuChanges.next('wirid');">
          <div class="flex items-center gap-2">
            <div>🧎</div>
            <div>Wirid</div>
          </div>
        </div>
        <div class="card-standard w-1/2 text-left items-center justify-start card-menu pointer"
          (click)="selectedMenu = 'tahlil'; selectedMenuChanges.next('tahlil');">
          <div class="flex items-center gap-2">
            <div>🤲</div>
            <div>Tahlil</div>
          </div>
        </div>
      </div>
      <div class="flex items center gap-4">
        <div class="card-standard w-full text-left items-center justify-start card-menu pointer"
          (click)="selectedMenu = 'tentang'; selectedMenuChanges.next('tentang');">
          <div class="flex items-center gap-2">
            <div>ℹ️</div>
            <div>Tentang</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() selectedMenu = '';
  @Output() selectedMenuChanges: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  ngAfterViewInit() {
  }
  ngOnDestroy() {
  }
}
