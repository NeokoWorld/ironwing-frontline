import YAML from 'yaml';
import raw from './timeLine.yaml?raw';

export const timeLineData = YAML.parse(raw).timeLine;
