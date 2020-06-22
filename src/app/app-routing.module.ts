import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './middlaware/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./view/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./view/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./view/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
