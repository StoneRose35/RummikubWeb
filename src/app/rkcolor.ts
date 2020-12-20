
export class RKColor
{
    rgb: Array<number>;
    code: number;
    name: String;

    constructor(c: number)
    {
        if (c==0){
            this.name="red";
            this.rgb=[255,0,0];
            this.code = c;
        }
        else if (c==1)
        {
            this.name="blue";
            this.rgb=[0,255,0];
            this.code = c;           
        }
        else
        {
            this.name="black";
            this.rgb=[0,0,0];
            this.code = c;  
        }
    }
}