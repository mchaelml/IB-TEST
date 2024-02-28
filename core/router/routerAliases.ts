import en_EN from './aliases/en_EN';

type Aliases = Record<string, string>;

export const locales: Record<string, Aliases> = { en_EN };

const combinedAliases: Record<string, string[]> = {};

Object.keys(locales).forEach((locale) => {
  Object.keys(locales[locale]).forEach((alias) => {
    combinedAliases[alias] = combinedAliases[alias] ? combinedAliases[alias] : [];
    combinedAliases[alias].push(locales[locale][alias]);
  });
});

export default combinedAliases;
