export interface RouteMeta {
  title?: string;
  requiresAuth?: boolean;
  layout?: 'default' | 'auth' | 'blank';
  icon?: string;
  hidden?: boolean;
  order?: number;
}
