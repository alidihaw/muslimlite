import { Component, OnDestroy, OnInit, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";

import { CommonModule } from "@angular/common";
import { WIRID } from "@utils/wirid";
import { CanvasClockComponent } from "./clock.component";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-jadwalsholat",
  standalone: true,
  imports: [CommonModule, CanvasClockComponent],
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
            <div>⏰</div>
            <div>Jadwal Sholat</div>
          </div>
        </div>
      </div>
      
      <div class="mt-4 text-xs">
        @if (!location) {
          <div class="flex items-center justify-center">
            <button mat-raised-button color="primary" (click)="locationOn()">
              <div class="flex items-center gap-2">
                <i class="material-icons">location_on</i> {{ 'Ijinkan Lokasi' }}
              </div>
            </button>
          </div>
        } @else {
          <div class="breadcrumb flex items-center gap-2 text-md mb-4 text-xs">
            <div class="breadcrumb-item pointer" [class.selected]="today" (click)="today = true">
              <div class="flex items-center gap-2">
                <div>⏰</div>
                <div>Hari Ini</div>
              </div>
            </div>
            <div class="breadcrumb-item pointer" [class.selected]="!today" (click)="today = false">
              <div class="flex items-center gap-2">
                <div>⏰</div>
                <div>1 Bulan</div>
              </div>
            </div>
          </div>
          @if (pray) {
            <div class="">
              <div class="mb-4 flex items-center justify-between">
                <div>
                  <cs-canvas-clock></cs-canvas-clock>
                </div>
                <div>
                  <div class="text-2xl font-bold">{{ now | date: 'hh:mm' }}</div>
                  <div class="text-lg">{{ now | date: 'dd MMM yyyy' }}</div>
                </div>
              </div>
              @if (today && prayToday) {
                <div class="flex flex-col items center gap-4">
                  <div class="card-standard card-asmaul">
                    <div class="flex justify-between gap-4 items-center w-full">
                      <div>Subuh</div>
                      <div>{{ prayToday?.timings?.Sunrise }}</div>
                    </div>
                  </div>
                  <div class="card-standard card-asmaul">
                    <div class="flex justify-between gap-4 items-center w-full">
                      <div>Dzuhur</div>
                      <div>{{ prayToday?.timings?.Dhuhr }}</div>
                    </div>
                  </div>
                  <div class="card-standard card-asmaul">
                    <div class="flex justify-between gap-4 items-center w-full">
                      <div>Ashar</div>
                      <div>{{ prayToday?.timings?.Asr }}</div>
                    </div>
                  </div>
                  <div class="card-standard card-asmaul">
                    <div class="flex justify-between gap-4 items-center w-full">
                      <div>Maghrib</div>
                      <div>{{ prayToday?.timings?.Maghrib }}</div>
                    </div>
                  </div>
                  <div class="card-standard card-asmaul">
                    <div class="flex justify-between gap-4 items-center w-full">
                      <div>Isya</div>
                      <div>{{ prayToday?.timings?.Isha }}</div>
                    </div>
                  </div>
                </div>
              }
              @if (!today && pray) {
                <div class="flex flex-col items center gap-4">
                  @for (d of pray; track d; let i = $index) {
                    <div class="card-standard card-asmaul">
                      <div class="flex flex-col items-center gap-2 w-full">
                        <div class="flex gap-4 items-center justify-center font-bold text-center w-full">
                          <div>{{ d?.date?.readable}}</div>
                        </div>
                        <div class="flex flex-col items-start gap-2 w-full">
                          <div class="flex justify-between gap-4 items-center w-full">
                            <div>Subuh</div>
                            <div>{{ prayToday?.timings?.Sunrise }}</div>
                          </div>
                          <div class="flex justify-between gap-4 items-center w-full">
                            <div>Dzuhur</div>
                            <div>{{ prayToday?.timings?.Dhuhr }}</div>
                          </div>
                          <div class="flex justify-between gap-4 items-center w-full">
                            <div>Ashar</div>
                            <div>{{ prayToday?.timings?.Asr }}</div>
                          </div>
                          <div class="flex justify-between gap-4 items-center w-full">
                            <div>Maghrib</div>
                            <div>{{ prayToday?.timings?.Maghrib }}</div>
                          </div>
                          <div class="flex justify-between gap-4 items-center w-full">
                            <div>Isya</div>
                            <div>{{ prayToday?.timings?.Isha }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          }
        }
      </div>
  `,
  styles: [],
})
export class JadwalSholatComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() selectedMenu = '';
  @Output() selectedMenuChanges: EventEmitter<string> = new EventEmitter();
  @Output() bottomOpenChanges: EventEmitter<any> = new EventEmitter();

  now = new Date();
  location: any;
  today = true;

  pray: any;
  prayToday: any;

  constructor(private httpClient: HttpClient,) {}

  ngOnInit() {
    this.locationOn();
    setInterval(() => {
        this.now = new Date();
    }, 1000)
  }
  ngAfterViewInit() {
    this.locationOn();
  }
  ngOnDestroy() {
  }

  getLocation() {
    if (this.location) {
        this.httpClient.get('https://api.aladhan.com/v1/calendar/' + this.now.getFullYear() + '/' + ("0" + (this.now.getMonth() + 1)).slice(-2) +'?method=1&latitude=' + this.location.latitude +'&longitude='  + this.location.longitude).subscribe((i: any) => {
            this.pray = i?.data;
            this.prayToday = i?.data?.filter((a: any) => a?.date?.gregorian?.day === ("0" + (this.now.getDate())).slice(-2))[0];
        });
    }
  }

  locationOn() {
      navigator.geolocation.getCurrentPosition((position) => {
          if (position) {
              this.location = {
                  latitude: position.coords.latitude, 
                  longitude: position.coords.longitude
              };
              this.getLocation();
          }
        });
      navigator.permissions.query({name:'geolocation'}).then((result) => {
          if (result.state == 'granted') {
              // this.location = true;
              navigator.geolocation.getCurrentPosition((position) => {
                  if (position) {
                      this.location = {
                          latitude: position.coords.latitude, 
                          longitude: position.coords.longitude
                      };
                      this.getLocation();
                  }
                });
          } else if (result.state == 'prompt') {
              // this.location = true;
              navigator.geolocation.getCurrentPosition((position) => {
                  if (position) {
                      this.location = {
                          latitude: position.coords.latitude, 
                          longitude: position.coords.longitude
                      };
                      this.getLocation();
                  }
                });
          } else if (result.state == 'denied') {
          }
      });
  }

  bottomOpen(title: string, terjemahan: string, tafsir?: string) {
    this.bottomOpenChanges.next({title, terjemahan, tafsir});
  }
}
