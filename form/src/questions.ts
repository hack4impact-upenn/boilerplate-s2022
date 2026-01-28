import { PopcornFlavor } from './types';

export const flavors: {
  key: PopcornFlavor;
  label: string;
  size: string;
}[] = [
  {
    key: 'caramel',
    label: 'Caramel',
    size: '4.8oz (137g)',
  },
  {
    key: 'respresso',
    label: 'Dark Chocolate Espresso',
    size: '6.6oz (188g)',
  },
  {
    key: 'butter',
    label: 'Butter',
    size: '1.8oz (50g)',
  },
  {
    key: 'cheddar',
    label: 'Chicago Baked Cheddar',
    size: '2.1oz (60g)',
  },
  {
    key: 'kettle',
    label: 'Kettle',
    size: '2.1oz (60g)',
  },
];
