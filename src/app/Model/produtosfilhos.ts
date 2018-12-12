import { Category } from 'src/app/Model/Category';
import { Material } from './Material';
import { Dimension } from './Dimension';

export class ProdutosFilhos {
    productID: number;
    name: string;
    category: Category;
    materials: Material[];
    heightDimensionId: Dimension;
    widthDimensionId: Dimension;
    lengthDimensionId: Dimension;
    mandatory: boolean;
    productSons: ProdutosFilhos[];
}