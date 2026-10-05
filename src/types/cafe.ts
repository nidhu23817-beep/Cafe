export interface MenuItem {
  id: string;
  name: string;
  category: 'brews' | 'espresso' | 'bakery' | 'brunch';
  categoryLabel: string;
  price: number;
  description: string;
  tastingNotes?: string[];
  origin?: string;
  calories?: string;
  dietary?: (
    | 'Vegan'
    | 'Gluten-Free'
    | 'Gluten-Free Option'
    | 'Dairy-Free'
    | 'Single-Origin'
    | 'Organic'
    | 'House Signature'
  )[];
  image: string;
  isSeasonal?: boolean;
  isPopular?: boolean;
  customizable: boolean;
}

export interface SelectedOptions {
  milk?: string;
  sweetness?: string;
  temperature?: 'Hot' | 'Iced';
  espressoShots?: 'Single' | 'Double (+ $0.75)' | 'Decaf (Swiss Water)';
  extraPastryWarm?: boolean;
  specialInstructions?: string;
}

export interface CartItem {
  id: string; // unique cart line id
  menuItem: MenuItem;
  quantity: number;
  options: SelectedOptions;
  unitPrice: number;
  lineTotal: number;
}

export interface Reservation {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'Solarium' | 'Espresso Bar' | 'Garden Courtyard' | 'Library Corner';
  specialNotes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  drinkChoice: string;
  verified: boolean;
}
