import playerLoginTemplate from './player-login.html?raw';
import './player-login.css';
import { navigateTo } from '../../router.js';

export const title = 'Pro League | Player Log In';

export function render() {
  return playerLoginTemplate;
}

export function mount() {
  navigateTo('/login');
}
