import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Componentes/header/header.component';
import { TargetasUsuariosComponent } from './Componentes/targetas-usuarios/targetas-usuarios.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DestacadosComponent } from './Componentes/destacados/destacados.component';
import { FiltrosComponent } from './Componentes/filtros/filtros.component';
import { CommonModule } from '@angular/common';
import { FiltroPorFechaPipe } from './Componentes/filtros/filtro-por-fecha.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './Componentes/login/login.component';
import { UsuarioComponent } from './Componentes/usuario/usuario.component';
import { tokentAuth } from './shared/auth.authentication';
import { FiltroHabilidades } from './Componentes/usuario/filtro-habilidad.pipe';
import { FiltroIdioma } from './Componentes/usuario/filtro-idioma.pipe';
import { FiltroProvincias } from './Componentes/usuario/filtro-provincia.pipe';
import { LoadingComponent } from './Componentes/loading/loading.component';
import { UserSettingsComponent } from './Componentes/user-settings/user-settings.component';
import { AdminComponent } from './Componentes/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TargetasUsuariosComponent,
    DestacadosComponent,
    FiltrosComponent,
    FiltroPorFechaPipe,
    LoginComponent,
    UsuarioComponent,
    FiltroHabilidades,
    FiltroIdioma,
    FiltroProvincias,
    LoadingComponent,
    UserSettingsComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: tokentAuth, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
