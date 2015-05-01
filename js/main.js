Game = {};

Game.Launch = function() {
    Game.cps = 1;
    Game.cookies = 0;
    Game.fps = 60;
}

Game.Logic = function() {
    Game.cookies += Game.cps/Game.fps;
}

Game.Loop = function () {
    var meh = document.getElementById("leftpanel");
	meh.innerHTML = Game.cookies;

    Game.catchuplogic = 0;
    Game.Logic();

    setTimeout(Game.Loop, 1000/Game.fps);
}

Game.Launch();

window.onload = function() {
    Game.Loop();
}
