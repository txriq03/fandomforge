'use client'
import { cn } from '@/lib/utils';
import { useSidebar } from '@/providers/SidebarProvider';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className?: string;
    symmetrical?: boolean
}
const Container = ({children, className, symmetrical = false}: Props) => {
  const { collapsed } = useSidebar();


  return (
    <div className={cn("transition-all duration-500", collapsed ? symmetrical ? "lg:mx-[81px]" : "lg:ml-[81px]" : "lg:ml-[216px]", className)}>
        {children}
    </div>
  )
}

export default Container