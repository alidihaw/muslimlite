import { Component, OnDestroy, OnInit, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";

import { CommonModule } from "@angular/common";

@Component({
  selector: "app-about",
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
            <div>ℹ️</div>
            <div>Tentang</div>
          </div>
        </div>
      </div>
      
      <div class="mt-4 text-xs">
        <div>muslimlite.id merupakan aplikasi untuk membaca Al-Quran melalui peramban (browser), tanpa perlu lagi
          install aplikasi tambahan, tanpa iklan dan tanpa analitik apapun sehingga lebih aman untuk privasi data Anda.
        </div>

        <div class="mt-2 mb-2">muslimlite.id menggunakan berbagai sumber data, diantaranya:</div>

        <div>- <a href="https://github.com/rioastamal/quran-json" target="_blank">Quran Json</a> oleh Rio Astamal untuk
          sumber data ayat-ayat Al Qur'an.</div>
        <div>- <a
            href="https://www.doaharianislami.com/2017/06/kumpulan-doa-sehari-hari-lengkap-dalam-bahasa-arab-latin-dan-artinya.html"
            target="_blank">Doa Harian Islami</a> untuk data doa-doa harian</div>
        <div>- <a href="https://quran.kemenag.go.id" target="_blank">quran.kemenag.go.id</a> untuk data mp3 murotal dari
          setiap ayat</div>
        <div>- <a href="https://islam.nu.or.id" target="_blank">islam.nu.or.id</a> untuk bacaan tahlil, wirid dan Asmaul
          Husna</div>
        <div>- <a href="https://aladhan.com" target="_blank">aladhan.com</a> untuk jadwal sholat</div>
      </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() selectedMenu = '';
  @Output() selectedMenuChanges: EventEmitter<string> = new EventEmitter();
  @Output() bottomOpenChanges: EventEmitter<any> = new EventEmitter();

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
