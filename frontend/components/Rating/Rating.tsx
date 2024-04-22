import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import cn from 'classnames';
import StarIcon from './rating.svg';
import { useEffect, useState } from "react";

export const Rating = ({ isEditable = false, rating, setRating, ...props }: RatingProps): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    useEffect(() =>{
        constructRating(rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating]);

    const constructRating = (currentRating: number) => {
        const updateArray = ratingArray.map((r: JSX.Element, i: number) => {
            return (
             <StarIcon className = {cn(styles.star, {[styles.filled]: i < currentRating})}
             onMouseEnter={() => changeDisplay(i + 1)}
             onMouseLeave={() => changeDisplay(rating)}/>
            );
        });
        setRatingArray(updateArray); 
    };
    const changeDisplay = (i: number) => {
        if (!isEditable) {
            return;
        }
        constructRating(i);
    };

    return (
       <div {...props}>
          {ratingArray.map((r, i) =>(<span key={i}>{r}</span>))}
       </div>
    );
};