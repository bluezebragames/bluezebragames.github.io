Game = {};

Game.Launch = function() {
    Game.wps = 0;
    Game.words = 0;
    Game.wordsd = 0;
    Game.wordsAllTime = 0;
    Game.fps = 60;
    if (localStorage.getItem("cookies"))
    {
        Game.words = parseInt(localStorage.getItem("cookies"));
    }
    if (localStorage.getItem("words"))
    {
        Game.words = parseInt(localStorage.getItem("words"));
    }

}

Game.click = function() {
    Game.words++;
    Game.wordsAllTime++;
}

Game.checkBuildings = function() {
    
}

Game.Logic = function() {
    Game.cookies += Game.cps/Game.fps;
    Game.cookiesd = Math.round(Game.cookies);
    Game.checkBuildings();
}

Game.Draw = function() {
    Game.leftCanvas = document.getElementById("leftCanvas").getContext('2d');
    var img = new Image();
    img.src = "img/cover.png";
    Game.leftCanvas.drawImage(img,0,0,leftCanvas.width,leftCanvas.height);
    //Game.leftCanvas.fill();
}

Game.Loop = function () {
    var meh = document.getElementById("words");
	meh.innerHTML = Game.cookiesd + " words";
    var wps = document.getElementById("wordsps");
    wps.innerHTML = Game.cps + " words per second";

    Game.catchuplogic = 0;
    Game.Logic();
    Game.Draw();

    setTimeout(Game.Loop, 1000/Game.fps);
}

Game.clearMiddle = function() {
    var middle = document.getElementById("middlepanel");
    middle.innerHTML = "Middle";
}

Game.Save = function() {
    localStorage.setItem("words", Game.words);
    var middle = document.getElementById("middlepanel");
    middle.innerHTML = "Game Saved";

    setTimeout(Game.Save, 10000);
    setTimeout(Game.clearMiddle, 1500);
}

Game.Launch();

window.onload = function() {
    Game.Loop();
    Game.Save();
    document.getElementById("leftCanvas").addEventListener("click", Game.click, false);
}
