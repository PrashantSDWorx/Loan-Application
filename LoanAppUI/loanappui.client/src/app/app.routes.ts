import { Routes } from '@angular/router';
import { DashboardPage } from './features/dashboard/pages/dashboard-page/dashboard-page';
import { DashboardSettingsPage } from './features/dashboard/pages/dashboard-settings-page/dashboard-settings-page';


export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        children: [{
            path: "",
            component: DashboardPage
        },
        {
            path: "settings",
            component: DashboardSettingsPage
        }
        ]
    },
];
