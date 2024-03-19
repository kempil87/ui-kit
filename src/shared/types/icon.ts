export interface SpritesMap {
  common:
    | 'arrow'
    | 'basket'
    | 'clip'
    | 'close'
    | 'collapse'
    | 'done'
    | 'home'
    | 'long_arrow'
    | 'phone'
    | 'search'
    | 'spin'
    | 'user';
}
export const SPRITES_META: {
  [Key in keyof SpritesMap]: {
    filePath: string;
    items: Record<
      SpritesMap[Key],
      {
        viewBox: string;
      }
    >;
  };
} = {
  common: {
    filePath: 'common.ba5792a5.svg',
    items: {
      arrow: {
        viewBox: '0 0 22 12',
      },
      basket: {
        viewBox: '0 0 21 23',
      },
      clip: {
        viewBox: '0 0 37 39',
      },
      close: {
        viewBox: '0 0 10 10',
      },
      collapse: {
        viewBox: '0 0 256 256',
      },
      done: {
        viewBox: '0 0 20 16',
      },
      home: {
        viewBox: '0 0 17 19',
      },
      long_arrow: {
        viewBox: '0 0 55 24',
      },
      phone: {
        viewBox: '0 0 21 22',
      },
      search: {
        viewBox: '0 0 22 22',
      },
      spin: {
        viewBox: '0 0 24 24',
      },
      user: {
        viewBox: '0 0 256 256',
      },
    },
  },
};
