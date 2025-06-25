import YAML from 'yaml';
import raw from './characters.yaml?raw';

export const charactersData = YAML.parse(raw).characters;
