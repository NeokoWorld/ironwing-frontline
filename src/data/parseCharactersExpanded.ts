import YAML from 'yaml';
import raw from './charactersExpanded.yaml?raw';

export const charactersExpandedData = YAML.parse(raw).characters;
