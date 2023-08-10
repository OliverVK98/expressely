import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import {
    BarControllerChartOptions,
    ChartData,
    CoreChartOptions,
    DatasetChartOptions,
    ElementChartOptions,
    PluginChartOptions,
    ScaleChartOptions,
} from 'chart.js';

export type BarChartOptionsType = _DeepPartialObject<
    CoreChartOptions<'bar'> &
        ElementChartOptions<'bar'> &
        PluginChartOptions<'bar'> &
        BarControllerChartOptions &
        DatasetChartOptions<'bar'> &
        ScaleChartOptions<'bar'>
>;

export type LineChartOptionsType = _DeepPartialObject<
    CoreChartOptions<'line'> &
        ElementChartOptions<'line'> &
        PluginChartOptions<'line'> &
        BarControllerChartOptions &
        DatasetChartOptions<'line'> &
        ScaleChartOptions<'line'>
>;

export type BarChartData = ChartData<'bar'>;
export type LineChartData = ChartData<'line'>;
