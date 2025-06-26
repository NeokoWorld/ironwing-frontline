import YAML from 'yaml';
import raw from './timeline.yaml?raw';

export const timelineData = YAML.parse(raw).timeline;
