export class ItemEFilhos {
    id: string;
    name: string;
    productId: number;
    category: string;
    material: string;
    finishing: string;
    height: number;
    width: number;
    length: number;
    sons: ItemEFilhos;
    fatherId: string;
}