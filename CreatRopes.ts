import Matter from "matter-js";


let Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    Composite = Matter.Composite,
    World = Matter.World,
    Vector = Matter.Vector, 
    Bodies = Matter.Bodies;

function CreateRope( x: number, y: number  , ball: Matter.Body, world: Matter.World , group: any): Matter.Composite{
    


    let anchorPosition = Vector.create(x,y);
    let vectorBalltoAnchor = Vector.sub(ball.position,anchorPosition);
    let distance = Vector.magnitude(vectorBalltoAnchor);

      
    

    // creat a rope of the correct lenght
    let rope = Composites.stack(x,y,distance/25,1,5,5,function(x: number,y: number){
        return Bodies.rectangle(x-10,y,25,20,{
            collisionFilter: {group: group},            
            density: 0.0005,
            frictionAir: 0.00001  
        })
      });
      
      
      
    //make the stack into a chain
    Composites.chain(rope, 0.4, 0, -0.4, 0, {
       stiffness: 1,
       length: 0,         
    });

    // rotate the rope to the ball
    let rad = Vector.angle(Vector.create(10,0),vectorBalltoAnchor);
    Composite.rotate(rope,rad,anchorPosition);

    // anchor the rope into the world
    let ropeAnchor = Constraint.create({
        pointA: { x: x, y: y  },
        bodyB: rope.bodies[0],
        pointB: { x: 0, y: 0 },
        length: 1,
        stiffness: 0.9
      });
    
    
    // anchor the end the rope to the ball
    let conntochain = Constraint.create({
        bodyA: rope.bodies[rope.bodies.length -1],
        bodyB: ball,
        length: 1,
        stiffness: 0.9
      });


     World.add(world,rope);
     World.add(world,[ropeAnchor,conntochain]);
     
    return rope;
}


