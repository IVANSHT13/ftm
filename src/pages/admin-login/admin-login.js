import adminLoginTemplate from './admin-login.html?raw';
import './admin-login.css';
import { navigateTo } from '../../router.js';

export const title = 'Pro League | Admin Log In';

export function render() {
  return adminLoginTemplate;
}

export function mount() {
  navigateTo('/login');
}
