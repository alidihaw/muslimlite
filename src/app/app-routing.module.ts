import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { NotfoundComponent } from './modules/others/notfound/notfound.component';

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
    { path: '**', redirectTo: '/404' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
