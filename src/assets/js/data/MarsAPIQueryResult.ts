import { MarsProperty } from "./MarsProperty";

export class MarsAPIQueryResult {
    constructor(
        public readonly totalPageCount : number ,
        public readonly data : MarsProperty[] ) { }
}

