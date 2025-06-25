import YAML from 'yaml';
import raw from './nations.yaml?raw';

export const nationsData = YAML.parse(raw);
