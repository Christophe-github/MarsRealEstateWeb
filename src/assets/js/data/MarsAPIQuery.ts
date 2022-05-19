/* eslint-disable no-unused-vars */
export class MarsAPIQuery {

    constructor(
        public filter: string = "",
        public type: string = MarsAPIQuery.Type.All,
        public sortBy: string = MarsAPIQuery.SortBy.Default,
        public page: number = 1,
        public subSetIds: string[] = []) 
        { }


}

export namespace MarsAPIQuery {
    export enum Type {
        All = "all",
        Rent = "rent",
        Buy = "buy"
    }

    export enum SortBy {
        Default = "default",
        PriceAsc = "priceAsc",
        PriceDesc = "priceDesc"
    }
}

