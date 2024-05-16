import { DetailsHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";


export interface SquareTourCardProps extends DetailedHTMLProps<DetailsHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
    appearance: 'card';
    href?: string;
    title: string;
    description?: string;
    price?: number;
    image?: string;
    average_rating: number;
}