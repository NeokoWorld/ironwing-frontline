import YAML from 'yaml';
import raw from './nationsExpanded.yaml?raw';

const parsed = YAML.parse(raw);
export const nationsExpandedData = parsed.nations;
