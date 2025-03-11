import React from 'react';
import './QuickAccessCard.css';

interface QuickAccessCardProps {
  image: string;
  title: string;
  description: string;
  onClick?: () => void;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
                                                           image,
                                                           title,
                                                           description,
                                                           onClick,
                                                         }) => {
  return (
    <div className="quick-access-card" onClick={onClick}>
      <img src={image} alt={title} className="quick-access-card__image" />
      <h4 className="quick-access-card__title">{title}</h4>
      <p className="quick-access-card__desc">{description}</p>
    </div>
  );
};

export default QuickAccessCard;
