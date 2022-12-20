export interface TodoInterface {
  id: string;
  label: string;
  description: string;
  category: string;
  done: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
