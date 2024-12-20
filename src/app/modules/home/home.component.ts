import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AppData } from '@appData';
import { MakkiyahMadaniyah, surahInfo } from '@utils/surah';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { PipesModule } from '@pipes/pipes.module';
import { MenuComponent } from './components/menu.component';
import { TahlilComponent } from './components/tahlil.component';
import { DoaComponent } from './components/doa.component';
import { AsmaulHusnaComponent } from './components/asmaulhusna.component';
import { AyatKursiComponent } from './components/ayatkursi.component';
import { WiridComponent } from './components/wirid.component';
import { AboutComponent } from './components/about.component';
import { JadwalSholatComponent } from './components/jadwalsholat.component';
import { JuzammaComponent } from './components/juzamma.component';
import { SuratComponent } from './components/surat.component';
import { SuratDetailComponent } from './components/suratdetail.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        PipesModule,
        MatButtonModule,
        MatProgressBarModule,
        MenuComponent,
        TahlilComponent,
        DoaComponent,
        AsmaulHusnaComponent,
        AyatKursiComponent,
        WiridComponent,
        AboutComponent,
        JadwalSholatComponent,
        JuzammaComponent,
        SuratComponent,
        SuratDetailComponent,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
    selectedMenu = '';

    surah = surahInfo;
    MakkiyahMadaniyah = MakkiyahMadaniyah;

    bottom = false;
    bottomTitle = '';
    bottomTerjemahan = '';
    bottomTafsir = '';
    search = '';

    subs!: Subscription;
    subsDetail!: Subscription;
    constructor(public appData: AppData, private meta: Meta, private httpClient: HttpClient, private title: Title, private router: Router, private route: ActivatedRoute) {
        if (this.subs) this.subs?.unsubscribe();
        this.subs = this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.configMeta();
            }
        });
    }

    configMeta() {
        if (this.router.url === '/') {
            this.selectedMenu = '';
            this.setMeta({
                title: "Qur'an Online Gratis | muslimlite.id",
                description: "Bacaan lengkap Al-Qur'an 30 Juz beserta terjemahan dan tafsir dari Kemenag, 💸 gratis sepenuhnya, 💫 tanpa iklan, 📈 tanpa analitik",
            });  
        }
        if (this.router.url === '/tentang') {
            this.selectedMenu = 'tentang';
            this.setMeta({
                title: "Tentang Muslim Lite | Qur'an Online Gratis | muslimlite.id",
            });  
        }
        if (this.router.url === '/tahlil') {
            this.selectedMenu = 'tahlil';
            this.setMeta({
                title: "Tahlil | Qur'an Online Gratis | muslimlite.id",
            });  
        }
        if (this.router.url === '/wirid') {
            this.selectedMenu = 'wirid';
            this.setMeta({
                title: "Wirid | Qur'an Online Gratis | muslimlite.id",
            });  
        }
        if (this.router.url === '/juzamma') {
            this.selectedMenu = 'juzamma';
            this.setMeta({
                title: "Juzamma | Qur'an Online Gratis | muslimlite.id",
            });  
        }
        if (this.router.url === '/ayatkursi') {
            this.selectedMenu = 'ayatkursi';
            this.setMeta({
                title: "Ayat Kursi | Qur'an Online Gratis | muslimlite.id",
            });  
        }
        if (this.router.url === '/doa') {
            this.selectedMenu = 'doa';
            this.setMeta({
                title: "Doa | Qur'an Online Gratis | muslimlite.id",
            });  
        }
        if (this.router.url === '/asmaulhusna') {
            this.selectedMenu = 'asmaulhusna';
            this.setMeta({
                title: "Asmaul Husna | Qur'an Online Gratis | muslimlite.id",
            });  
        }
        if (this.router.url === '/jadwalsholat') {
            this.selectedMenu = 'jadwalsholat';
            this.setMeta({
                title: "Jadwal Sholat | Qur'an Online Gratis | muslimlite.id",
            });  
        }
        if (this.router.url === '/surah') {
            this.selectedMenu = 'surah';
            this.setMeta({
                title: "Semua Surah | Qur'an Online Gratis | muslimlite.id",
            });  
        }
        if (this.router.url.includes('/surahdetail')) {
            this.selectedMenu = 'surahdetail';
            let index: any = this.route.snapshot.params["id"];
            if (index) index = +index;
            this.surahDataPrev = null;
            this.surahDataNext = null;
            this.surahData = this.route.snapshot.data['surahData'][index];
            this.setMeta({ title: this.surahData.name_latin + " | Qur'an Online Gratis | muslimlite.id", });
            if (index != 1) {
                this.httpClient.get('assets/surah/' + (+index - 1) + '.json').subscribe((i: any) => {
                    this.surahDataPrev = i[+index - 1];
                })
            } 
            if (index != 114) {
                this.httpClient.get('assets/surah/' + (+index + 1) + '.json').subscribe((i: any) => {
                    this.surahDataNext = i[+index + 1];
                })
            } 
        }
    }

    setMeta(metaValue: any) {
        if (metaValue) {
            const value = {
                title: metaValue?.title || "",
                description: metaValue?.description || "",
            };
            if (value?.title) {
                this.title.setTitle(value.title);
                this.meta.updateTag({ name: "title", content: value.title });
                this.meta.updateTag({ property: "og:title", content: value.title });
                this.meta.updateTag({ property: "twitter:title", content: value.title });
            }
            if (value?.description) {
                this.meta.updateTag({ name: "description", content: value.description });
                this.meta.updateTag({ property: "og:description", content: value.description });
                this.meta.updateTag({ property: "twitter:description", content: value.description });
            }
        }
    }

    bottomOpen(title: string, terjemahan: string, tafsir?: string) {
        this.bottom = true;
        this.bottomTitle = title;
        this.bottomTerjemahan = terjemahan;
        this.play = false; 
        this.stopAudio(); 
        if (tafsir) this.bottomTafsir = tafsir;
    }

    bottomOpenComp(event: any) {
        if (event) {
            this.bottomOpen(event?.title, event?.terjemahan, event?.tafsir);
        }
    }

    closeBottom() {
        this.bottom = false;
        this.bottomTitle = '';
        this.bottomTerjemahan = '';
        this.bottomTafsir = '';
    }

    surahData: any;
    surahDataNext: any;
    surahDataPrev: any;

    play = false;
    start = '00:00';
    end = '00:00';
    duration = 0;
    startDuration = 0;
    playInterval: any;
    audio?: HTMLAudioElement;

    stopAudio(surat?: any, index?: number) {
        this.play = false;
        this.duration = 0;
        this.startDuration = 0;
        this.start = '00:00';
        this.end = '00:00';
            // this.audio.currentTime = 0;
        if (this.playInterval) {
            clearInterval(this.playInterval);
            this.playInterval = null;
        }
        this.audio?.pause();
        if (this.audio) this.audio.currentTime = 0;
        this.audio = undefined;

        if (!this.iOS() && !this.android()) {
            setTimeout(() => {
                if (surat && index != undefined) {
                    if ((+index + 1) < +(surat.number_of_ayah)) {
                        this.playAudio(surat, (index + 1))
                    }
                }
            });
        }
        // this.audio = undefined;
    }

    playAudio(surat: any, index: number) {
        if (this.playInterval) {
            clearInterval(this.playInterval);
            this.playInterval = null;
        }
        if (this.audio) {
            this.audio?.pause();
            this.audio.currentTime = 0;
            this.audio = undefined;
        }

        if (this.play) return;
        this.duration = 0;
        this.startDuration = 0;
        this.start = '00:00';
        this.end = '00:00';

        this.play = true;
        this.bottom = false;
        this.bottomTitle = 'Memutar Q.S ' + surat.number + ':' + (index + 1);

        let suratN: any= surat.number;
        let ayatN: any = (index + 1);

        suratN = ("00" + suratN).slice(-3)
        ayatN = ("00" + ayatN).slice(-3)
        let audio = new Audio();
        audio.src = 'https://everyayah.com/data/Abdurrahmaan_As-Sudais_192kbps/'+ suratN + ayatN +'.mp3';
        audio.autoplay = true;
        audio.load();
        audio.play();

        audio.onloadedmetadata = () => {
            this.audio = audio;
            this.duration = audio?.duration || 0;

            this.startDuration = 0;
            this.start = new Date(this.startDuration * 1000).toISOString().slice(14, 19);
            this.end = new Date(this.duration * 1000).toISOString().slice(14, 19);
            this.playInterval = setInterval(() => {
                if (this.startDuration < this.duration) {
                    this.startDuration++;
                    this.start = new Date(this.startDuration * 1000).toISOString().slice(14, 19);
                    this.end = new Date(this.duration * 1000).toISOString().slice(14, 19);
                } else {
                    this.stopAudio(surat, index);
                }

            }, 1000);
        };
    }

    playComp(event: any) {
        this.bottom = false;
        if (this.play) {
            this.stopAudio();
        } else {
            this.playAudio(event.surahData, event.i);
        }
    }

    iOS() {
        return [
          'iPad Simulator',
          'iPhone Simulator',
          'iPod Simulator',
          'iPad',
          'iPhone',
          'iPod'
        ].includes(navigator.platform)
    }

    android() {
        let ua = navigator.userAgent.toLowerCase();
        let isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
        if (isAndroid) {
            return true;
        }
        return false;
    }

    surahindex = 0;
    surahDetail(index: any) {
        this.surahindex = index;
        this.router.navigate(['surahdetail' + "/" + index]);
    }

    setTag() {
    }
    
    ngOnInit(): void {
    }

    ngOnDestroy() {
        if (this.subs) this.subs?.unsubscribe();
        if (this.subsDetail) this.subsDetail?.unsubscribe();
    }

    changeMenu(event: string) {
        // this.selectedMenu = event;
        this.router.navigate([event]);
        this.play = false; 
        this.stopAudio(); 
        this.bottom = false;
    }
}
