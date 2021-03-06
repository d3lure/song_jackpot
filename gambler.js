$(document).ready(function () {
    
    const select = new Audio("assets/sounds/select.wav");

    var picked_songs = [];
    var count = 50;

    document.getElementById("count").innerHTML = count;

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
        const end = new Audio("assets/sounds/end.wav");

        var interval1 = setInterval(function() {
            roll(1);
            if(timesRun >= (count-(3*count/7))) clearInterval(interval1);
        }, 50);
        
        var interval2 = setInterval(function() {
            roll(2);
            if(timesRun >= (count-(2*count/7))) clearInterval(interval2);
        }, 50); 

        var interval3 = setInterval(function() {
            roll(3);
            if(timesRun >= (count-(count/7))) clearInterval(interval3);
        }, 50); 

        var interval4 = setInterval(function() {
            roll(4);
            if(timesRun >= count) clearInterval(interval4);
        }, 50);
        
        var interval5 = setInterval(function() {
            timesRun += 0.5;
            roll_img();
            if(timesRun >= count+(count/7)) {
                clearInterval(interval5);
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
        setTimeout(function() { enableSubmit(that) }, 100*count);
    });

    $("#add").click(function() {
        count += 10;
        document.getElementById("count").innerHTML = count;
    });

    $("#sub").click(function() {
        count -= 10;
        document.getElementById("count").innerHTML = count;
    });

});


