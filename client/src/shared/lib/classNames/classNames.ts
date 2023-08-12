export type Mods = Record<string, boolean | string | undefined>;

export function classNames(
    cls: string,
    mods: Mods = {},
    additional: Array<string | undefined> = [],
) {
    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            // eslint-disable-next-line no-unused-vars
            .filter(([_, value]) => Boolean(value))
            .map(
                ([className, value]: [
                    string,
                    boolean | string | undefined,
                ]) => {
                    if (
                        typeof value === 'string' ||
                        typeof value === 'boolean'
                    ) {
                        return className;
                    }
                    return '';
                },
            ),
    ].join(' ');
}
