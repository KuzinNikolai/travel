import { CategoryProps } from "./Category.props";
import styles from "./Category.module.css";
import cn from 'classnames';

export const Category = ({ appearance, children, href, className, ...props }: CategoryProps): JSX.Element => {
    return (
       <div className={cn(styles.cat, className, {
               [styles.cat]: appearance == 'cat'})}
               {...props}>
                {
                    href?
                        <a href={href}>
                            {children}
                        </a>
                        :
                        <>
                            {children}
                        </>
                }
       </div>
    );
};