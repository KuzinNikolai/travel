import React from 'react';
import { RatingPreviewProps } from './RatingPreview.props';
import styles from './RatingPreview.module.css';

const RatingPreview = ({ average_rating }: RatingPreviewProps): JSX.Element => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < average_rating ? styles.filled : ''}>
        ★
      </span>
    );
  }

  return <div className={styles.container}>{stars}</div>;
};

export default RatingPreview;
