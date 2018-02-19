import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

import { ParentCategoryComponent } from './parent-category/parent-category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ListParentCategoryComponent } from './list-parent-category/list-parent-category.component';
import { ListSubCategoryComponent } from './list-sub-category/list-sub-category.component';
import { AddRingToneComponent } from './add-ring-tone/add-ring-tone.component';
import { ListRingToneComponent } from './list-ring-tone/list-ring-tone.component';
import { PushNotificationComponent } from './push-notification/push-notification.component';





const routes: Routes = [
  { path: 'parent-category', component: ParentCategoryComponent },
  { path: 'list-parent-category', component: ListParentCategoryComponent },
  { path: 'list-sub-category', component: ListSubCategoryComponent },
  { path: 'sub-category', component: SubCategoryComponent },
  { path: 'add-ring-tone', component: AddRingToneComponent },
  { path: 'list-ring-tone', component: ListRingToneComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'push-notification', component: PushNotificationComponent },

  { path: 'user-profile', component: UserProfileComponent },
  { path: 'table-list', component: TableListComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'upgrade', component: UpgradeComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
