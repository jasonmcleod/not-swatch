import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import InterstitialModule from './app/interstitial.module';
import gameInstance from './app/game';
platformBrowserDynamic().bootstrapModule(InterstitialModule);