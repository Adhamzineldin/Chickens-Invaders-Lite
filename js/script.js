let main = document.getElementById("main-game");
let score = 0;
let scoreBoard = document.getElementById("score");
function refresh_chickens(){
    let posx = 100;
    let posy = 0;
    for (let i = 0; i < 4; i++) {
        posx = 100;
        posy += 100;
        console.log(posy);
        for (let j = 0; j < 15; j++) {
            posx += 100;
            let div = document.createElement('div');
            div.classList.add('chicken');
            div.style.left = posx + 'px';
            div.style.top = posy + 'px';
            main.appendChild(div);
            console.log(posy);



        }
    }
    spawn_eggs();
}



function spawn_eggs() {
    let spawnInterval = setInterval(function () {
        document.querySelectorAll(".chicken").forEach(function (chicken) {
        let random_number = Math.floor(Math.random() * 38);
        if (random_number === 25) {
            let egg = document.createElement('div');
            egg.classList.add('egg');
            egg.style.left = (parseInt(chicken.style.left) || 0) + 25 + 'px';
            egg.style.top = chicken.style.top;
            main.appendChild(egg);

            let bulletInterval = setInterval(function () {
                egg.style.top = (parseInt(egg.style.top) || 0) + 35 + 'px';
                if (parseInt(egg.style.top) >= 900) {
                    clearInterval(bulletInterval);
                    egg.remove();
                }
                if (parseInt(egg.style.top) >= parseInt(rocket.style.top) + 5 && parseInt(egg.style.left) >= parseInt(rocket.style.left) && parseInt(egg.style.left) <= parseInt(rocket.style.left) + 45) {
                    clearInterval(bulletInterval);
                    alert("Game Over! Your score is: " + score);
                    egg.remove();
                    location.reload();
                }
            }, 100);
        }
    });


    }, 1000);


}



function check_for_collision(){

    document.querySelectorAll(".chicken").forEach(function(chicken){
        if (parseInt(rocket.style.top) <= parseInt(chicken.style.top) + 90 && parseInt(rocket.style.left) >= parseInt(chicken.style.left) && parseInt(rocket.style.left) <= parseInt(chicken.style.left) + 45){
            alert("Game Over! Your score is: " + score);
            location.reload();
        }
    });
}

refresh_chickens();
let rocket = document.getElementById("rocket");
rocket.style.left = '870px';
rocket.style.top = '800px';

document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
        rocket.style.left = (parseInt(rocket.style.left) || 0) + 10 + 'px';
        check_for_collision();
    } else if (e.key === 'ArrowLeft') {
        rocket.style.left = (parseInt(rocket.style.left) || 0) - 10 + 'px';
        check_for_collision();
    }
    else if (e.key === 'ArrowUp') {
        rocket.style.top = (parseInt(rocket.style.top) || 0) - 10 + 'px';
        check_for_collision();
    }
    else if (e.key === 'ArrowDown') {
        rocket.style.top = (parseInt(rocket.style.top) || 0) + 10 + 'px';
        check_for_collision();
    }
    else if (e.key === ' '){
        let bullet = document.createElement('div');
        bullet.classList.add('bullet');
        bullet.style.left = (parseInt(rocket.style.left) || 0) + 45 + 'px';
        bullet.style.top = rocket.style.top;
        main.appendChild(bullet);

        let bulletInterval = setInterval(function()
        {
            bullet.style.top = (parseInt(bullet.style.top) || 0) - 35 + 'px';
            document.querySelectorAll(".chicken").forEach(function(chicken){
                if (parseInt(bullet.style.top) <= parseInt(chicken.style.top) + 50 && parseInt(bullet.style.left) >= parseInt(chicken.style.left) && parseInt(bullet.style.left) <= parseInt(chicken.style.left) + 50){
                    clearInterval(bulletInterval);
                    score++;

                    scoreBoard.innerHTML = "Score: " + score;
                    bullet.remove();
                    chicken.remove();
                }
            });
            if(parseInt(bullet.style.top) <= 0){
                clearInterval(bulletInterval);
                bullet.remove();
            }
            if(document.querySelectorAll(".chicken").length === 0){
                refresh_chickens();
            }
        }, 100);
    }


});




