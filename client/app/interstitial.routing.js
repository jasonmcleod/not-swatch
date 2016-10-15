import { Routes, RouterModule } from '@angular/router';
import GameComponent from './components/game/game.component';

const appRoutes = [
    {
        path: '',
        redirectTo: 'game',
        pathMatch: 'full'
    },
    {
        path: 'game',
        component: GameComponent,
        pathMatch: 'full'
    }
];

export default RouterModule.forRoot(appRoutes);