var Building = function(a,b,c){
    this.price=a;
    this.wpsgain=b;
    this.howMany=0;
}

Game = {};

// resets things and loads the save from localstorage
Game.Launch = function() {
    Game.wps = 0;
    Game.words = 0;
    Game.wordsd = 0;
    Game.wordsAllTime = 0;
    Game.fps = 60;
    Game.buildings = [];
    Game.buildings.push(new Building(10,0.1));
    Game.buildings.push(new Building(10000,500));
    if (localStorage.getItem("game"))
    {
        Game.loadSave(localStorage.getItem("game"));
    }
}


// save the game, maybe?
Game.Save = function() {
    str = '';
    str += Game.wordsd + '|';
    for(b in Game.buildings)
    {
        str += Game.buildings[b].howMany + ',';
    }
    str += '|';
    localStorage.setItem("game", str);
    var middle = document.getElementById("middlepanel");
    middle.innerHTML = "Game Saved";

    setTimeout(Game.Save, 10000);
    setTimeout(Game.clearMiddle, 1500);
}

Game.loadSave = function(file) {
    splitfile = file.split('|');
    Game.words = parseInt(splitfile[0]);
    buildingCount = splitfile[1].split(',');
    for(var i = 0; i<Game.buildings.length; ++i)
    {
        Game.buildings[i].howMany = buildingCount[i];
    }
    Game.recalculateWps();
}

// add things when you click!
Game.click = function() {
    Game.words++;
    Game.wordsAllTime++;
}

// how about this recalculates the wps
Game.recalculateWps = function() {
    Game.wps = 0;
    for(b in Game.buildings)
    {
        Game.wps += Game.buildings[b].wpsgain * Game.buildings[b].howMany;
    }
}

// buys the building when you can afford it and you click it
Game.buyBuildings = function(whichBuilding) {
    if(Game.words>=Game.buildings[whichBuilding].price)
    {
        Game.words -= Game.buildings[whichBuilding].price;
        Game.buildings[whichBuilding].howMany++;
        Game.recalculateWps();
    }
}

// get words from idling
Game.Logic = function() {
    Game.words += Game.wps/Game.fps;
    Game.wordsd = Math.round(Game.words);
}

// draw the lone image
Game.Draw = function() {
    Game.leftCanvas = document.getElementById("leftCanvas").getContext('2d');
    var img = new Image();
    img.src = "img/cover.png";
    Game.leftCanvas.drawImage(img,0,0,leftCanvas.width,leftCanvas.height);
    //Game.leftCanvas.fill();
}

// everything that happens every frame
Game.Loop = function () {
    var meh = document.getElementById("words");
	meh.innerHTML = Game.wordsd + " words";
    var wps = document.getElementById("wordsps");
    wps.innerHTML = Math.round(10*Game.wps)/10.0 + " words per second";
    for(b in Game.buildings)
    {
        var currDiv = document.getElementById(b+"stats");
        currDiv.innerHTML = "You have " + Game.buildings[b].howMany + " of building " + b;
    }

    Game.catchuplogic = 0;
    Game.Logic();
    Game.Draw();

    setTimeout(Game.Loop, 1000/Game.fps);
}

// clear the middle because it was overwritten by "game saved"
Game.clearMiddle = function() {
    var middle = document.getElementById("middlepanel");
    middle.innerHTML = "Middle";
}

window.onload = function() {
    Game.Launch();
    Game.Loop();
    Game.Save();
    document.getElementById("leftCanvas").addEventListener("click", Game.click, false);
    for(var i = 0; i < Game.buildings.length; i++)
    {
        document.getElementById(i).addEventListener("click", function(i){return function(){Game.buyBuildings(i)};}(i), false);
    }
}
