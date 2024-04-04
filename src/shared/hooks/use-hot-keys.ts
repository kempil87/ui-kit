import { useCallback, useEffect } from 'react';

type Key = KeyboardEvent['key'];

export interface HotKeysOptions {
  enabled?: boolean;
}

export const useHotKeys = (
  keys: Array<Key> | Key,
  callback?: () => void,
  options?: HotKeysOptions
) => {
  const isKeysArray = Array.isArray(keys);

  const handler = useCallback(() => callback?.(), [callback]);

  useEffect(() => {
    const keysMap = new Map<Key, boolean>();
    let pressed = false;

    const callbackDown = (e: KeyboardEvent) => {
      if (!isKeysArray && e.key === keys) {
        handler();

        return;
      }

      if (!keys.includes(e.key)) {
        return;
      }

      keysMap.set(e.key, true);

      if (keysMap.size === keys.length && !pressed) {
        pressed = true;
        handler();
      }
    };

    const callbackUp = (e: KeyboardEvent) => {
      if (!isKeysArray) return;

      pressed = false;

      if (keysMap.has(e.key)) {
        keysMap.delete(e.key);
      }
    };

    if (options?.enabled) {
      window.addEventListener('keyup', callbackUp);
      window.addEventListener('keydown', callbackDown);
    }

    return () => {
      window.removeEventListener('keyup', callbackUp);
      window.removeEventListener('keydown', callbackDown);
    };
  }, [handler, isKeysArray, keys]);
};
