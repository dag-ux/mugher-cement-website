import React from 'react';

interface IconWrapperProps {
  icon: React.ComponentType<any>;
  className?: string;
  size?: number;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({ icon: Icon, className, size }) => {
  return <Icon className={className} size={size} />;
};