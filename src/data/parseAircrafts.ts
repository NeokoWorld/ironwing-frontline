import YAML from 'yaml';
import raw from './aircrafts.yaml?raw';

export const aircraftsData = YAML.parse(raw).aircrafts;
