import { BaseParams } from '../types';
import { messages } from '../messages';

interface AddKeysParams extends BaseParams {
  scopeAlias: string;
  keyWithoutScope: string;
}

export function addKey({ defaultValue, scopeToKeys, scopeAlias, keyWithoutScope, scopes }: AddKeysParams) {
  const scopePath = scopes.aliasToScope[scopeAlias];
  const keyWithScope = scopeAlias ? `${scopeAlias}.${keyWithoutScope}` : keyWithoutScope;
  const keyValue = defaultValue
    ? defaultValue.replace('{{key}}', keyWithScope)
    : `${messages.missingValue} '${keyWithScope}'`;

  if (scopePath) {
    if (!scopeToKeys[scopePath]) {
      scopeToKeys[scopePath] = {};
    }
    scopeToKeys[scopePath][keyWithoutScope] = keyValue;
  } else {
    scopeToKeys.__global[keyWithoutScope] = keyValue;
  }
}
