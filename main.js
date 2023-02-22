var desenho = ["airplane","alarm clock","ambulance","angel","ant","anvil","apple","arm",
"axe","backpack","banana","bandage","baseball bat","basketball","bat","bear",
"bed","bee","belt","bicycle","binoculars","bird","birthday cake","blueberry","book","boomerang",
"bracelet","brain","bread","bridge","broccoli","bucket","bus","butterfly",
"cactus","cake","calculator","calendar","camel","camera","campfire","candle","cannon","canoe","car",
"castle","cat","cell phone","chair","circle","clock","cloud","coffee cup",
"compass","computer","cookie","cooler","cow","crab","crayon","crocodile","cruise ship","cup","diamond",
"dog","dolphin","donut","door","dragon","duck","ear","elephant",
"envelope","eraser","eye","eyeglasses","face","fan","feather","fence","finger","fireplace","firetruck","fish",
"flamingo","flashlight","flower","foot","fork","frog","frying pan","garden","garden hose",
"giraffe","grapes","grass","hamburger","hammer","hand","hat","headphones","sonic","helicopter",
"helmet","hockey stick","horse","hospital","hot air balloon","hot dog","house",
"house plant","hurricane","ice cream","jacket","jail","kangaroo","key","knife","ladder","lantern","laptop",
"leaf","leg","light bulb","lighter","lightning","lion","lollipop","mailbox","map","marker",
"megaphone","microphone","microwave","monkey","moon","mosquito","motorbike","mountain","mouse","moustache","mouth",
"mushroom","nail","necklace","nose","ocean","octagon","octopus","onion","oven","owl","palm tree","panda",
"pants","paper clip","parrot","passport","peanut","pencil","penguin","piano","pickup truck","picture frame",
"pig","pillow","pineapple","pizza","police car","pool","postcard","potato","power outlet","purse","rabbit",
"raccoon","radio","rain","rainbow","rake","remote control","rhinoceros","rifle","river",
"sandwich","saw","school bus","scissors","scorpion","sea turtle","shark","sheep","shoe","shorts",
"shovel","sink","skateboard","smiley face","snail","snake","snorkel","snowflake","snowman",
"soccer ball","sock","speedboat","spider","spoon","square","squiggle","squirrel","stairs","star","steak","stereo",
"stethoscope","stitches","stop sign","stove","strawberry","streetlight","string bean","submarine","suitcase","sun","swan","sweater","sword","syringe","table","teapot","teddy-bear","telephone","television","tennis racquet","tent","The Eiffel Tower",
"tiger","toaster","toe","toilet","tooth","toothbrush","toothpaste","tornado","tractor",
"traffic light","train","tree","triangle","trombone","truck","tshirt","umbrella","underwear","van","violin",
"washing machine","watermelon","waterslide","whale","wheel","windmill","wine bottle","wine glass","yoga","zebra","zigzag"];
var numero_da_lista = Math.floor((Math.random() * desenho.length) + 1);
var sketch = desenho[numero_da_lista];
document.getElementById("esboço").innerHTML = sketch;
var tempo = 0;
var pontuação = 0;
var check_time = "";
var resultado = "";
var resposta_certa = "";
document.getElementById("pontuaçao").innerHTML = pontuação;
document.getElementById("tempo").innerHTML = tempo;
function preload(){
    classifier_doddle_net = ml5.imageClassifier("DoodleNet");
}
function draw(){
    strokeWeight(8);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    temporizador();
    if(sketch == resultado){
        resposta_certa = "set";
        pontuação++;
        document.getElementById("pontuaçao").innerHTML = pontuação;
    }
}
function setup(){
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}
function classifyCanvas(){
    classifier_doddle_net.classify(canvas, gotResult);
}
function gotResult(error, results){
    if (error){
        console.error("erro, kkkkk");
    }
    else{
        resultado = results[0].label;
        document.getElementById("label_nome").innerHTML = resultado;
        var porcentagem_resultado = Math.round(results[0].confidence * 100);
        document.getElementById("label_precisao").innerHTML = porcentagem_resultado + "%";
    }
}
function refazer(){
    background("white");
    var numero_da_lista = Math.floor((Math.random() * desenho.length) + 1);
    sketch = desenho[numero_da_lista];
    document.getElementById("esboço").innerHTML = sketch;
}
function temporizador(){
    tempo++;
    document.getElementById("tempo").innerHTML = tempo;
    if(tempo > 1000){
        tempo = 0;
        check_time = "complete";
    }
    if(check_time == "complete" || resposta_certa == "set"){
        check_time = "";
        resposta_certa = "";
        refazer();
    }
}