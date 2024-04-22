import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css";
import cn from 'classnames';

export const Button = ({ appearance, children, className, ...props }: ButtonProps): JSX.Element => {
    return (
       <button className={cn(styles.button, className, {
               [styles.btn_solid]: appearance == 'btn_solid',
               [styles.w_100_btn_solid]: appearance == 'w_100_btn_solid',
               [styles.btn_outline]: appearance == 'btn_outline',
               [styles.w_100_btn_outline]: appearance == 'w_100_btn_outline'})}
               {...props}>
          {children}
       </button>
    );
};