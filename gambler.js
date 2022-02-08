$(document).ready(function () {
    
    function roll(n) {
        $.getJSON("songs.json", function(data) {
            
            var song = data[getOnlyId(n, data)];
            song = "<p id='" + n + "'>" + song.name + "</p>";
            var id = '#' + n;

            //console.log(song1, id);

            $(id).replaceWith(song);
        });
    }

    function roll_everything() {
        var timesRun = 0;
        var interval1 = setInterval(function(){
            roll(1);
            roll(2);
            roll(3);
            roll(4);
            timesRun += 1;
            if(timesRun === 40) {
                clearInterval(interval1);
            }
        }, 111); 

    }

    document.getElementById("start").addEventListener("click", roll_everything);

    function getOnlyId(n, data) {

        var index = Math.floor(Math.random() * data.length);
        var index2 = Math.floor(Math.random() * data[index].nr.length);

        if(data[index].nr[index2] != n) return getOnlyId(n, data);
        
        //console.log(data[index].nr[index2]);

        return index;
    }

});


