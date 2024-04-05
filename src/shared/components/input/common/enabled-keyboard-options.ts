import { KeyboardEvent } from 'react';

export const enabledNumberKeyEvent = {
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
    if (new Set(['e', 'E']).has(e.key)) {
      e.preventDefault();
    }
  },
};
