export type GuitarTypes = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type CartTypes = GuitarTypes & {

  quantity: number;
};


