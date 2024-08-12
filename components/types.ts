import { ComponentType, Key, SVGProps } from 'react';

export interface MenuItem {
  id: Key | null;
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



  
  