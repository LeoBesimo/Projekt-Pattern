function generateImage(){
    let date = new Date(document.getElementById("date").value)
    let nColors = floor(document.getElementById("col-sel").value);
    let seed = date.getTime();
    let w = document.getElementById("width").value;
    let h = document.getElementById("height").value;
    noiseSeed(seed);

    let colors = [];
    let percentages = [];

    const f1 = 0.66;
    const f2 = 0.60;
    const f3 = 0.5;

    const p1 = [0.27];
    const p2 = [0.27, 0.23];
    const p3 = [0.27, 0.23, 0.19];

    percentages = nColors == 1 ? p1 : nColors == 2 ? p2 : p3;

    let canv;

    let isRound = document.getElementById("is-round").value=="round";

    for(let i = 0; i < nColors; i++)
    {
        colors.push(color(map(i,0,nColors,0,191),255));
    }

    strokeWeight(1);

    if(isRound)
    {
        canv = createCanvas(w,w);
        background(255);
        generateRound(canv);
    }
    else
    {
        canv = createCanvas(w,h);
        background(255);
        generateRectangle(canv);
    }

    if(nColors > 1)
        processImage(colors,percentages);

    //saveCanvas(date.toLocaleDateString(),'jpg');
}

function downloadPattern()
{
    let date = new Date(document.getElementById("date").value)
    saveCanvas(date.toLocaleDateString(),'jpg');
}

function generateRectangle(canv)
{
    let xOff = 0;
    let yOff = 10000;

    loadPixels();
    for(let j = 0; j < canv.height; j++)
    {

        for(let i = 0; i < canv.width; i++)
        {
            let p = noise(xOff, yOff);
            let col = p < 0.67 ? 255 : 0;
            let index = i + j * canv.width;
            set(i,j,col);
            xOff += 0.01;
        }
        yOff += 0.01;
    }

    updatePixels();
}

function generateRound(canv)
{
    let xOff = 0;
    let yOff = 10000;

    loadPixels();

    let rad = canv.width / 2;

    for(let j = -rad; j < rad; j++)
    {
        for(let i = -rad; i < rad; i++)
        {
        
            let p = noise(xOff, yOff);
            let col = p < 0.67 ? 255 : 0;

            if(i * i + j * j < rad * rad + rad)
            {
                set(i,j,col);
            }
            xOff += 0.01;
        }
        yOff += 0.01;
    }

    updatePixels();
}

function processImage(colors, percentages)
{
    loadPixels();

    let previous = -1;

    let newCol = colors[floor(random(percentages.length))];
    for(let j = 0; j < height; j++)
    {
        for(let i = 0; i < width; i++)
        {
            let index = i + j * width * 4;
            let currentCol = red(get(i,j));
            if(currentCol == 255)
            {
                continue;
            }
            if(previous != currentCol)
            {
                newCol = colors[floor(random(percentages.length))];
            }
            set(i,j,newCol);
            previous = currentCol;
        }
    }

    updatePixels();
}

function draw()
{
    if(document.getElementById("is-round").value=="round")
    {
        document.getElementById("height").style.visibility = 'hidden';
    }
    else
    {
        document.getElementById("height").style.visibility = 'visible';
    }
}
