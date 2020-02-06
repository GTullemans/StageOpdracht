
export function Contains(pointx:number,pointy:number,xmin:number,xmax:number,ymin:number,Ymax:number){

    if(pointx < xmax && pointx > xmin
        && pointy < Ymax && pointy > ymin ){

            return true;
        }
        
    else return false;

}

