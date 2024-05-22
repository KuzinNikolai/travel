import { DetailsHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";


export interface SquareTourCardProps extends DetailedHTMLProps<DetailsHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
    appearance: 'card';
    href?: string;
    title: string;
    meta_desc: string;
    description?: string;
    duration: string;
    min_price?: number;
    programs?: string;
    image?: string;
    average_rating: number;
    photo?: string;
    photos?: string[];
}