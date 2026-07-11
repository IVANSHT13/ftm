import scoresheetTemplate from './scoresheet.html?raw';
import './scoresheet.css';

export const title = 'Pro League | Score Sheet';

export function render(params = {}) {
  return scoresheetTemplate.replaceAll('{{id}}', params.id ?? 'unknown');
}
