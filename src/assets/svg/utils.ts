import { Directions } from './types';

export const switchRotation = (direction: Directions) => {
  switch (direction) {
    case 'top':
      return '90deg';
    case 'right':
      return '180deg';
    case 'bottom':
      return '270deg';
    case 'left':
      return '0deg';

    default:
      return '0deg';
  }
};
