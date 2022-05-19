/* eslint-disable no-unused-vars */
export class MarsProperty {
    constructor(
        public id: string,
        public imgSrcUrl: string,
        public type: MarsProperty.Type,
        public price: number,
        public description : string,
        public surfaceArea: number,
        public latitude: number,
        public longitude: number) { }
}


export namespace MarsProperty {
    export enum Type {
        Rent = "rent",
        Buy = "buy"
    }
}
