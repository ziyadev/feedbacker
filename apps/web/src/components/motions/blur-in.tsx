'use client';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ComponentProps } from 'react';

export const BlurIn: React.FC<ComponentProps<typeof motion.div>> = ({
  children,
  className,
}) => {
  const variants1 = {
    hidden: { filter: 'blur(10px)', opacity: 0, height: 0 },
    visible: { filter: 'blur(0px)', opacity: 1, height: 'auto' },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3, ease: 'easeIn' }}
      variants={variants1}
      className={clsx('', className)}
    >
      {children}
    </motion.div>
  );
};
