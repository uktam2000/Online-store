import { BehaviorSubject } from "rxjs";

export class LoaderService{
    public loaderState = false;
    public loaderStateRx= new BehaviorSubject<boolean>(false);
    constructor(){
        this.loaderStateRx.subscribe((res:boolean)=>{
            console.log('state rx', res);
        });

        console.log('simple', this.loaderState);
    }

}
