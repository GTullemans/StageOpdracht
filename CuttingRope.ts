import Matter from "matter-js";


var Composite = Matter.Composite;
var Vector = Matter.Vector;


function CutRope(Anchors: Matter.Composite[],mousPosx: number,mousPosy:number): Matter.Vector{

    // to keep track of what to remove
    // Im using indicis becouse I have to return and the rope and the constraint
    var ropeToRemoveFrom = 10;
    var closestDistance = 10000;
    var closestConstraint= 100 ;
    
    Anchors.forEach((RopeComosite,ropeIndex)=> {        

        // i have to use as unknown as Matter.Constraint[] becouse intellisense incorrectly has return type as Matter.Composite[]
        var rope  = Composite.allConstraints(RopeComosite) as unknown as Matter.Constraint[];           
            
        rope.forEach((part,partIndex) => {
            
            var distance = Vector.magnitude(Vector.sub(part.bodyA.position,Vector.create(mousPosx,mousPosy)));
                
            if(distance  < closestDistance){
                
                   closestDistance = distance;
                   closestConstraint = partIndex;
                   ropeToRemoveFrom = ropeIndex;
                   

               }
               
        });
    });
    
        return Vector.create(ropeToRemoveFrom,closestConstraint);

 };


 

 