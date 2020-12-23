
export class RKColor
{
    rgb: Array<number>;
    code: number;
    name: String;

    constructor(c: number)
    {
        if (c==1){
            this.name="black";
            this.rgb=[0,0,0];
            this.code = c;
        }
        else if (c==2)
        {
            this.name="red";
            this.rgb=[255,0,0];
            this.code = c;           
        }
        else if (c==3)
        {
            this.name="yellow";
            this.rgb=[255,255,0];
            this.code = c;  
        }

        else if (c==4)
        {
            this.name="blue";
            this.rgb=[0,0,255];
            this.code = c;  
        }
    }
}