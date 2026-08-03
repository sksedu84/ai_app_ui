import { Routes } from '@angular/router';
import { Rag } from './rag/rag';
import { Admin } from './admin/admin';

export const routes: Routes = [
  { path: '', component: Rag },
  { path: 'admin', component: Admin },
  { path: '**', redirectTo: '' },
];
