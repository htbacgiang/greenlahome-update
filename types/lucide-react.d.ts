declare module "lucide-react" {
  import * as React from "react";

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  }

  export type LucideIcon = React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;

  export const AlignJustify: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const Bell: LucideIcon;
  export const Bookmark: LucideIcon;
  export const Camera: LucideIcon;
  export const Check: LucideIcon;
  export const CheckCheck: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const Circle: LucideIcon;
  export const ClipboardList: LucideIcon;
  export const CreditCard: LucideIcon;
  export const Download: LucideIcon;
  export const Edit: LucideIcon;
  export const Edit2: LucideIcon;
  export const Eye: LucideIcon;
  export const EyeOff: LucideIcon;
  export const FolderPlus: LucideIcon;
  export const GripVertical: LucideIcon;
  export const Heart: LucideIcon;
  export const ImageIcon: LucideIcon;
  export const Layers: LucideIcon;
  export const Layout: LucideIcon;
  export const LayoutGrid: LucideIcon;
  export const Loader2: LucideIcon;
  export const LogOut: LucideIcon;
  export const Mail: LucideIcon;
  export const MapPin: LucideIcon;
  export const Menu: LucideIcon;
  export const Moon: LucideIcon;
  export const Notebook: LucideIcon;
  export const Package: LucideIcon;
  export const PanelLeftClose: LucideIcon;
  export const PanelLeftOpen: LucideIcon;
  export const Plus: LucideIcon;
  export const RefreshCcw: LucideIcon;
  export const Repeat: LucideIcon;
  export const Save: LucideIcon;
  export const Settings: LucideIcon;
  export const ShoppingBag: LucideIcon;
  export const ShoppingCart: LucideIcon;
  export const SquarePen: LucideIcon;
  export const Star: LucideIcon;
  export const Sun: LucideIcon;
  export const Trash2: LucideIcon;
  export const Upload: LucideIcon;
  export const User: LucideIcon;
  export const Users2: LucideIcon;
  export const X: LucideIcon;
}
