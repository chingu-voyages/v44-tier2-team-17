import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArenaComponent } from './arena/arena.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ConfigPanelComponent } from './config-panel/config-panel.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotComponent } from './bot/bot.component';

@NgModule({
  declarations: [
    AppComponent,
    ArenaComponent,
    LeaderboardComponent,
    ConfigPanelComponent,
    FooterComponent,
    HeaderComponent,
    BotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
