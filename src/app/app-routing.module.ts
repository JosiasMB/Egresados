import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TargetasUsuariosComponent } from './Componentes/targetas-usuarios/targetas-usuarios.component';
import { DestacadosComponent } from './Componentes/destacados/destacados.component';
import { LoginComponent } from './Componentes/login/login.component';
import { UsuarioComponent } from './Componentes/usuario/usuario.component';
import { AuthGuard } from './authGuard';
import { UserSettingsComponent } from './Componentes/user-settings/user-settings.component';
import { AdminComponent } from './Componentes/admin/admin.component';
import { RecuperarPasswordComponent } from './Componentes/recuperar-password/recuperar-password.component';
import { ResetComponent } from './Componentes/reset/reset.component';
import { HomeComponent } from './Componentes/home/home.component';
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
    path: 'Home/:id',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-settings/:id',
    component: UserSettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/:id',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'recuperar_contrasena',
    component: RecuperarPasswordComponent,
  },
  {
    path: 'reset/:token',
    component: ResetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
