function cn(...args: unknown[]): string {
  const result: string[] = [];

  for (const i of args) {
    if (typeof i === 'string') {
      result.push(i);
    } else {
      for (const key in i as Record<string, boolean>) {
        if ((i as Record<string, boolean>)[key]) result.push(key);
      }
    }
  }

  return result.join(' ');
}

export default cn;
