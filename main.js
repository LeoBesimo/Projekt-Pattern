function setup()
{

}

function generateImage(){
    let date = new Date(document.getElementById("date").value)
    let seed = date.getTime();
    let w = document.getElementById("width").value;
    let h = document.getElementById("height").value;
    noiseSeed(seed);

    let canv;

    let isRound = document.getElementById("is-round").value=="round";

    strokeWeight(1);

    if(isRound)
    {
        console.log("round");
        canv = createCanvas(w,w);
        background(128);
        generateRound(canv);
    }
    else
    {
        console.log("rect");
        canv = createCanvas(w,h);
        background(128);
        generateRectangle(canv);
    }

    saveCanvas(date.toLocaleDateString(),'jpg');
}

function generateRectangle(canv)
{
    let xOff = 0;
    let yOff = 10000;

    console.log(canv)

    //loadPixels();

    for(let i = 0; i < canv.width; i++)
    {
        for(let j = 0; j < canv.height; j++)
        {
            let p = noise(xOff, yOff);
            let col = p < 0.67 ? 255 : 0;
            let index = i + j * canv.width;
            stroke(col);
            fill(col);
            point(i,j);
            //rect(i,j,1,1);
            //pixels[index] = color(col);
            yOff += 0.01;
            //console.log("Yeet");
        }
        //console.log("Xeet");
        xOff += 0.01;
    }

    //updatePixels();
}

function generateRound(canv)
{
    let xOff = 0;
    let yOff = 10000;

    console.log(canv)

    //loadPixels();

    let rad = canv.width / 2;

    for(let i = -rad; i < rad; i++)
    {
        for(let j = -rad; j < rad; j++)
        {
            let p = noise(xOff, yOff);
            let col = p < 0.67 ? 255 : 0;

            //x * x + y * y < radius * radius + radius

            if(i * i + j * j < rad * rad + rad)
            {

                stroke(col);
                fill(col);
                point(rad + i,rad + j);
                //rect(i,j,1,1);
                //pixels[index] = color(col);
            }
            yOff += 0.01;
            //console.log("Yeet");
        }
        //console.log("Xeet");
        xOff += 0.01;
    }
}
