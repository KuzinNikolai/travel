import { FC } from "react";
import styles from './BurgerIcon.module.css'

import clsx from "clsx";

interface IBurgerIconProps {
  isActive?: boolean
}

export const BurgerIcon: FC<IBurgerIconProps> = ({ isActive = false }) => {
  return (
    <div className={clsx(styles.burger, isActive && styles["burger--active"])}>
      <span className={styles.burger__line}></span>
      <span className={styles.burger__line}></span>
      <span className={styles.burger__line}></span>
    </div>
  )
}