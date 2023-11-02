export interface Egresado {
  id: number;
  PrimerNombre: string;
  SegundoNombre: string;
  Nivel: string;
  PrimerApellido: string;
  SegundoApellido: string;
  Cedula: string;
  Pasaporte: string;
  FechaNac: string;
  Genero: string;
  profilePicUrl: string;
  about: string;
  destacado: Boolean;
  descripcionDestacado: string;
  experienciaLaboralEgresado: ExperienciaLaboralEgresado[];
  mostrarPerfil: Boolean;
  contacto: ContactoEgresado[];
  educacion: EducacionEgresado[];
  nacionalidadEgresado: ProvinciaEgresado[];
  idiomaEgresado: IdiomaEgresado[];
  egresadosHabilidad: HabilidadEgresado[];
  direccionEgresado: DireccionEgresado[];
}

export interface ExperienciaLaboralEgresado {
  id: number;
  egresadoId: number;
  posicion: string;
  empresa: string;
  salario: number;
  FechaEntr: string;
  FechaSal: string;
}

export interface ContactoEgresado {
  id: number;
  egresadoId: number;
  tipo: string;
  valor: string;
}

export interface EducacionEgresado {
  id: number;
  egresadoId: number;
  Universidad: string;
  FechaEntr: string;
  FechaSal: string;
  carreraId: number;
  Titulo: string;
  TipoTitulo: string;
}

export interface ProvinciaEgresado {
  id: number;
  egresadoId: number;
  nacionalidadId: number;
  nacionalidad: string;
}

export interface IdiomaEgresado {
  id: number;
  egresadoId: number;
  idiomaId: number;
  idioma: string;
}

export interface HabilidadEgresado {
  habilidad: string;
  habilidadId: number;
  egresadoId: number;
  id: number;
}

export interface DireccionEgresado {
  id: number;
  egresadoId: number;
  provincia: string;
  provinciaId: number;
}
