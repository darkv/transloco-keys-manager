import { buildPath } from '../helpers/buildPath';
import { isObject } from '../helpers/isObject';

export function mapDiffToKeys(diffArr: any[], side: string): string {
  const keys = diffArr.reduce((acc, diff) => {
    const base = diff.path.join('.');
    const keys = !isObject(diff[side]) ? [`'${base}'`] : buildPath(diff[side]).map(inner => `'${base}.${inner}'`);

    return acc.push(...keys) && acc;
  }, []);

  return keys.join('\n');
}
