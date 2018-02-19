import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { ParentCategoryComponent } from './parent-category/parent-category.component';
import { ListParentCategoryComponent } from './list-parent-category/list-parent-category.component';
import { AddRingToneComponent } from './add-ring-tone/add-ring-tone.component';
import { ListRingToneComponent } from './list-ring-tone/list-ring-tone.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ListSubCategoryComponent } from './list-sub-category/list-sub-category.component';
import { PushNotificationComponent } from './push-notification/push-notification.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ParentCategoryComponent,
    ListParentCategoryComponent,
    AddRingToneComponent,
    ListRingToneComponent,
    SubCategoryComponent,
    ListSubCategoryComponent,
    PushNotificationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
