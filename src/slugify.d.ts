
declare module 'slugify' {
    function slugify(input: string, options?: { lower?: boolean, replacement?: string, remove?: RegExp | string }): string;
    export = slugify;
  }
  