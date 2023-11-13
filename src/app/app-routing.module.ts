import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TargetasUsuariosComponent } from './Componentes/targetas-usuarios/targetas-usuarios.component';
import { DestacadosComponent } from './Componentes/destacados/destacados.component';
import { LoginComponent } from './Componentes/login/login.component';
import { UsuarioComponent } from './Componentes/usuario/usuario.component';
import { AuthGuard } from './authGuard';
import { UserSettingsComponent } from './Componentes/user-settings/user-settings.component';
import { AdminComponent } from './Componentes/admin/admin.component';

const routes: Routes = [
  { path: '', component: TargetasUsuariosComponent },
  { path: 'destacados', component: DestacadosComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'usuario/:id',
    component: UsuarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-settings/:id',
    component: UserSettingsComponent,
  },
  {
    path: 'admin/:id',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
