import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import routing from './interstitial.routing';

import CoreComponent from './components/core/core.component';
import GameComponent from './components/game/game.component';


@NgModule({
    imports: [BrowserModule, FormsModule, routing, HttpModule],
    providers:[
    ],
    declarations: [
        CoreComponent,
        GameComponent
    ],
    bootstrap: [CoreComponent]
})

export default class OnBoardingModule {
}
