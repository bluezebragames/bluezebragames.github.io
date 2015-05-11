Game = {};

Game.Launch = function() {
    Game.cps = 0;
    Game.cookies = 0;
    Game.cookiesd = 0;
    Game.fps = 60;
    if (localStorage.getItem("cookies"))
    {
        Game.cookies = parseInt(localStorage.getItem("cookies"));
    }
}

Game.click = function() {
    Game.cookies++;
}

Game.Logic = function() {
    Game.cookies += Game.cps/Game.fps;
    Game.cookiesd = Math.round(Game.cookies);
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
    localStorage.setItem("cookies", Game.cookies);
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
