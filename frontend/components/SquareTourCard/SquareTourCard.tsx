import { SquareTourCardProps } from "./SquareTourCard.props";
import styles from "./SquareTourCard.module.css";
import cn from 'classnames';
import { Htag } from "../Htag/Htag";
import RatingPreview from "../RatingPreview/RatingPreview";


export const SquareTourCard = ({ appearance, children, title, description, price, image, href, className, average_rating, ...props }: SquareTourCardProps): JSX.Element => {
    return (
        <section className={cn(styles.card, className, { [styles.card]: appearance == 'card' })} {...props}>
            <div className={styles.row}>
                {image && <img src={image} alt={title} className={styles.image} />}
                <div className={styles.content}>
                    <Htag tag={"h1"}>{title}</Htag>
                    {description && <p className={styles.description}>{description}</p>}
                    {price && <p className={styles.price}>Price: {price}</p>}
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