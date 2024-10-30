import { Routes } from "@angular/router";
import { NotfoundComponent } from "./modules/others/notfound/notfound.component";
import { HomeComponent } from "./modules/home/home.component";
import { SurahDetailResolver } from "@utils/surah.resolver.";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    },
    {
        path: '404',
        component: NotfoundComponent
    },
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'tentang',
        component: HomeComponent,
    },
    {
        path: 'tahlil',
        component: HomeComponent,
    },
    {
        path: 'wirid',
        component: HomeComponent,
    },
    {
        path: 'juzamma',
        component: HomeComponent,
    },
    {
        path: 'ayatkursi',
        component: HomeComponent,
    },
    {
        path: 'doa',
        component: HomeComponent,
    },
    {
        path: 'asmaulhusna',
        component: HomeComponent,
    },
    {
        path: 'jadwalsholat',
        component: HomeComponent,
    },
    {
        path: 'surah',
        component: HomeComponent,
    },
    {
        path: 'surahdetail/:id',
        resolve: {surahData: SurahDetailResolver,},
        component: HomeComponent,
    },
    { path: '**', redirectTo: '/404' },
];
