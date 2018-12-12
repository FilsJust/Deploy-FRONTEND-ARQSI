import { Category } from './Category';
import { Dimension } from './Dimension';

export class Produto {
    productID: string;
    Name: string;
    Category: Category;
    height: Dimension;
    width: Dimension;
    length: Dimension;
}