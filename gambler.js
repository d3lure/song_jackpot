$(document).ready(function () {
    
    const select = new Audio("sounds/select.wav");

    var picked_songs = [];

    function roll(n) {
        $.getJSON("songs.json", function(data) {
            var song = data[getOnlyId(n, data)];
            song = "<p id='" + n + "'>" + song.name + "</p>";
            var id = '#' + n;
            $(id).replaceWith(song);
        });
    }

    function roll_everything() {

        select.play();
        
        var timesRun = 0;
        const end = new Audio("sounds/end.wav");

        var interval1 = setInterval(function() {
            roll(1);
            if(timesRun >= 30) clearInterval(interval1);
        }, 50);
        
        var interval2 = setInterval(function() {
            roll(2);
            if(timesRun >= 37) clearInterval(interval2);
        }, 50); 

        var interval3 = setInterval(function() {
            roll(3);
            if(timesRun >= 44) clearInterval(interval3);
        }, 50); 

        var interval4 = setInterval(function() {
            timesRun += 0.5;
            roll(4);
            roll_img();
            if(timesRun >= 51) {
                clearInterval(interval4);
                end.play();
            }
        }, 50); 
    }

    function getOnlyId(n, data) {
        var index = Math.floor(Math.random() * data.length);
        var index2 = Math.floor(Math.random() * data[index].nr.length);

        if(data[index].nr[index2] != n || 
            picked_songs.includes(data[index])) return getOnlyId(n, data);

        picked_songs[n-1] = data[index];
        return index;
    }

    function roll_img() {
        img = "<img id='photo' src='assets/" + Math.floor(Math.random() * 3 + 1) + ".jpg'>";
        $('#photo').replaceWith(img);
    }

    var enableSubmit = function(ele) {
        $(ele).removeAttr("disabled");
    }
    
    $("#start").click(function() {
        var that = this;
        roll_everything();
        $(this).attr("disabled", true);
        setTimeout(function() { enableSubmit(that) }, 6000);
    });

});


