import { DetailsHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface CategoryProps extends DetailedHTMLProps<DetailsHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
    appearance: 'cat';
    href?: string;
}