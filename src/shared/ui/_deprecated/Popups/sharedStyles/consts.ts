import { DropdownDirection } from '@/shared/types/ui';
import cls from './popup.module.scss';

export const mapDirectionClass: Record<DropdownDirection, string> = {
    bottomLeft: cls.bottomLeft,
    bottomRight: cls.bottomRight,
    topLeft: cls.topLeft,
    topRight: cls.topRight,
};
