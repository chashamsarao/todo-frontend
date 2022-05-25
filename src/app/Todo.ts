export class Todo {
    sno: number
    title: string
    desc: string
    active: boolean
    constructor(sno: number,
        title: string,
        desc: string,
        active: boolean) {
        this.sno = sno;
        this.title = title;
        this.desc = desc;
        this.active = active
        }
}


// This version of typescript had a strict property. Hence, we need to initalize each variable through a constructor or through other methods
//https://www.typescriptlang.org/tsconfig#strictPropertyInitialization
