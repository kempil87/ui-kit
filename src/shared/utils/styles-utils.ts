class Styles {
  compose(...args: unknown[]): Record<PropertyKey, string | number> {
    const result: Record<PropertyKey, string | number> = {};

    for (const el of args) {
      if (Array.isArray(el)) {
        const [styles, flag] = el;

        if (flag) {
          for (const style of styles) {
            for (const key in style) {
              result[key] = style[key];
            }
          }
        }
      } else {
        for (const key in el as Record<PropertyKey, string | number>) {
          result[key] = (el as Record<PropertyKey, string | number>)[key];
        }
      }
    }

    return result;
  }
}

export const s = new Styles();
