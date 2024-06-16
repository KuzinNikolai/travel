import { FC } from "react";
import styles from './BurgerIcon.module.css';

import { cn } from "@/packages/tw-utils";

interface IBurgerIconProps {
  isActive?: boolean
}

export const BurgerIcon: FC<IBurgerIconProps> = ({ isActive = false }) => {
  return (
    <div className={cn(styles.burger, isActive && styles["burger--active"])}>
      <span className={styles.burger__line}></span>
      <span className={styles.burger__line}></span>
      <span className={styles.burger__line}></span>
    </div>
  )
}