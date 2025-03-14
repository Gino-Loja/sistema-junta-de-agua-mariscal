import { ButtonProps } from '@nextui-org/react';
import { type SearchParams } from 'nuqs/server'

export type PageProps = {
    searchParams: SearchParams // Next.js 15+: async searchParams prop
}

type ChartData = {
    name: string;
    [key: string]: string | number;
};

export type CircleChartProps = {
    title: string;
    color: ButtonProps["color"];
    categories: string[];
    chartData: ChartData[];
};


export type QueryParams = {
    page: string;
    per_page: string;
    date: string;
    from: string;
    to: string;
    month: number;
    year: number;
};
