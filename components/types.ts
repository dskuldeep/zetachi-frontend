import { ComponentType, SVGProps } from 'react';

export interface MenuItem {
  href: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  fileName?: string; // Add fileName for optional usage
  children: boolean;
}

export interface SubMenuItems {
    [category: string]: MenuItem[];
  }
  
export interface UserSubMenu {
    [key: string]: SubMenuItems;
  }



  
  