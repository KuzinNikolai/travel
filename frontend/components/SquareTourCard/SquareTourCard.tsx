import { SquareTourCardProps } from "./SquareTourCard.props";
import styles from "./SquareTourCard.module.css";
import cn from 'classnames';
import { Htag } from "../Htag/Htag";
import RatingPreview from "../RatingPreview/RatingPreview";


export const SquareTourCard = ({ appearance, children, title, meta_desc, description, duration, min_price, image, href, className, average_rating, ...props }: SquareTourCardProps): JSX.Element => {
    return (
        <section className={cn(styles.card, className, { [styles.card]: appearance == 'card' })} {...props}>
            <div className={styles.row}>
                {image && <img src={image} alt={title} className={styles.image} />}
                <div className={styles.content}>
                    <Htag tag={"h1"}>{title}</Htag>
                    {meta_desc && <p className={styles.meta_desc}>{meta_desc}</p>}
                    {description && <p className={styles.description}>{description}</p>}
                    {duration && <p className={styles.duration}>{duration}</p>}
                    {min_price && <p className={styles.min_price}>Price: {min_price}</p>}
                </div>
                <div className={styles.product_content}>
                   <RatingPreview average_rating={average_rating} />
                </div>
                
                {href ?
                    <a href={href}>
                        {children}
                    </a>
                    :
                    <>
                        {children}
                    </>
                }
            </div>
        </section>
    );
};