/**
 * Configure and register global directives
 */
import type { App } from 'vue';
// import { setupPermissionDirective } from './permission';
// import { setupLoadingDirective } from './loading';
import { setupClickOutsideDirective } from './clickOutside';

export function setupGlobDirectives(app: App) {
  setupClickOutsideDirective(app)
  // setupPermissionDirective(app);
  // setupLoadingDirective(app);
}
