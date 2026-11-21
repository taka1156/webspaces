'use client';
import { forwardRef } from 'react';
import Image, { ImageProps } from 'next/image';
import clsx from 'clsx';
import { styles } from './BaseImg.css';

type BaseCommonImgProps = {
  src: string;
  alt: string;
  className?: string;
};

type DefaultImgProps = BaseCommonImgProps &
  React.ImgHTMLAttributes<HTMLImageElement>;
type NextImgProps = BaseCommonImgProps & ImageProps;

type BaseImgProps = DefaultImgProps | NextImgProps;

const isNextImgProps = (props: BaseImgProps): props is NextImgProps =>
  'fill' in props || 'height' in props || 'width' in props;

export const BaseImg = forwardRef<HTMLImageElement, BaseImgProps>(
  ({ className, ...props }, ref) => {
    if (isNextImgProps(props)) {
      return (
        <Image
          {...props}
          ref={ref}
          className={clsx(styles.img, className)}
          alt={props.alt}
        />
      );
    }

    return (
      <img
        {...(props as DefaultImgProps)}
        ref={ref}
        className={clsx(styles.img, className)}
        alt={props.alt}
      />
    );
  }
);

BaseImg.displayName = 'BaseImg';
