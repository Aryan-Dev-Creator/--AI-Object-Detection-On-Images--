img="";
statuz="";
objects=[];
function preload()
{
    img=loadImage('IMG-0368.jpg');
}

function setup()
{
    canvas=createCanvas(640, 420);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("statuz").innerHTML="Status: Detecting Objects";
}

function modelLoaded()
{
    console.log("Model is loaded");
    statuz= true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error , results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects=results;
    }

}
function draw()
{
    image(img,0,0,640,420);
    if(statuz != "")
    {
        for(i=0; i<objects.length; i++)
        {
            document.getElementById("statuz").innerHTML="Status: Objects Detected";
            fill("#6b20f7");
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("#6b20f7");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}