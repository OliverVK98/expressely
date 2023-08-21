import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';

export function useGetChartColor() {
    const { theme } = useTheme();

    const themeColorMapping = {
        [Theme.DARK]: '#74a2b2',
        [Theme.ORANGE]: '#4875f0',
        [Theme.LIGHT]: '#5ed3f3',
    };

    return themeColorMapping[theme] || '#5ed3f3';
}
