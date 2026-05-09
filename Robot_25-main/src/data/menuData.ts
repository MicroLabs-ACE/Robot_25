export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'main' | 'side' | 'drink';
}

export interface ComboMeal {
  id: string;
  name: string;
  items: string[]; // IDs of items included
  price: number;
  savings: number; // How much is saved compared to buying separately
  image: string;
}

export const menuItems: MenuItem[] = [
  {
    id: 'rice-meat',
    name: 'Rice & Meat',
    price: 3000,
    description: 'Delicious white rice served with tender beef',
    image: '/jolllof-meat.png',
    category: 'main'
  },
  {
    id: 'jollof-chicken',
    name: 'Jollof Rice & Chicken',
    price: 4000,
    description: 'Spicy jollof rice with grilled chicken',
    image: '/jollof-smallchick.png',
    category: 'main'
  },
  {
    id: 'jollof-big-chicken',
    name: 'Jollof Rice & Bigger Chicken',
    price: 5000,
    description: 'Spicy jollof rice with a larger portion of grilled chicken',
    image: '/jollof-bigchick.png',
    category: 'main'
  },
  {
    id: 'coke',
    name: 'Coke',
    price: 600,
    description: 'Ice-cold Coca-Cola in a bottle',
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'drink'
  },
  {
    id: 'water',
    name: 'Bottle Water',
    price: 300,
    description: 'Refreshing bottled water',
    image: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'drink'
  },
  {
    id: 'moi-moi',
    name: 'Moi-Moi',
    price: 1000,
    description: 'Steamed bean pudding with spices',
    image: '/moimoi.png',
    category: 'side'
  }
];

export const comboMeals: ComboMeal[] = [
  {
    id: 'combo-1',
    name: 'Rice & Meat + Coke',
    items: ['rice-meat', 'coke'],
    price: 3400,
    savings: 200,
    image: '/jollof-meat-coke.png'
  },
  {
    id: 'combo-2',
    name: 'Jollof Rice & Chicken + Water',
    items: ['jollof-chicken', 'water'],
    price: 4100,
    savings: 200,
    image: '/jollof-chicken-water.png'
  },
  {
    id: 'combo-3',
    name: 'Jollof Rice & Bigger Chicken + Moi-Moi',
    items: ['jollof-big-chicken', 'moi-moi'],
    price: 5500,
    savings: 500,
    image: '/jollof-chicken-moimoi.png'
  },
  {
    id: 'combo-4',
    name: 'Rice & Meat + Moi-Moi',
    items: ['rice-meat', 'moi-moi'],
    price: 3700,
    savings: 300,
    image: '/Jollof-moimoi-meat.png'
  },
  {
    id: 'combo-5',
    name: 'Jollof Rice & Chicken + Moi-Moi',
    items: ['jollof-chicken', 'moi-moi'],
    price: 4700,
    savings: 300,
    image: '/jollof-chicken-moimoi.png'
  }
];