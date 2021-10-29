status =""
object=[]

function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects"
}

function modelLoaded()
{
    console.log("Model is loaded");
    status=true;
} 

function gotResults(error,results)
{
    if (error)
    {
        console.log(error);
    }

    else
    {
        console.log(results);
        object=results;
    }

}
function draw()
{
    image(video,0,0,380,380);
    if (status !="")
    {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResults);
        for(i=0; i < object.length; i++)
       {
           
           document.getElementById("status").innerHTML="Status : Objects Detected";
           document.getElementById("number_of_objects").innerHTML="Number of Object Detetected "+ object.length;
           fill(r,g,b);
           percent=floor(object[i].confidence*100);
           text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+17);
           noFill();
           stroke(r,g,b);
           rect(object[i].x,object[i].y,object[i].width,object[i].height); 

       }
       

    }
}