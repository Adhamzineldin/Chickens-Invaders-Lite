let main = document.getElementById("main-game");
let score = 0;
let scoreBoard = document.getElementById("score");
let rocket = document.getElementById("rocket");
let rocketStep = 3;
let canShoot = true;
let shootCooldown = 250;
let eggIntervalId = null;
let eggSpawnRate = 40;
let offSet = 20;

function init() {
    rocket.style.left = '870px';
    rocket.style.top = '800px';
    refresh_chickens();
    requestAnimationFrame(gameLoop);
}


function refresh_chickens() {
    if (eggSpawnRate > 15) {
        eggSpawnRate -= 2;
    }
    let posx = 100;
    let posy = 0;
    for (let i = 0; i < 4; i++) {
        posx = 100;
        posy += 100;
        for (let j = 0; j < 15; j++) {
            posx += 100;
            let div = document.createElement('div');
            div.classList.add('chicken');
            div.style.left = posx + 'px';
            div.style.top = posy + 'px';
            main.appendChild(div);
        }
    }
    spawn_eggs();
}


function spawn_eggs() {
    eggIntervalId = setInterval(function () {
        document.querySelectorAll(".chicken").forEach(function (chicken) {
            if (Math.floor(Math.random() * eggSpawnRate) === 1) {
                let egg = document.createElement('div');
                egg.classList.add('egg');
                egg.style.left = (parseInt(chicken.style.left) || 0) + 25 + 'px';
                egg.style.top = chicken.style.top;
                main.appendChild(egg);
                moveEgg(egg);
            }
        });
    }, 1000);
}


function moveEgg(egg) {
    let eggStep = 5;
    let eggInterval = setInterval(function () {
        egg.style.top = (parseInt(egg.style.top) || 0) + eggStep + 'px';

        if (parseInt(egg.style.top) >= window.innerHeight) {
            clearInterval(eggInterval);
            egg.remove();
        }

        let offSet = 50;
        let eggRect = egg.getBoundingClientRect();
        let rocketRect = rocket.getBoundingClientRect();

        if (isCollisionWithOffset(eggRect, rocketRect, offSet - 15)) {
            clearInterval(eggInterval);
            gameOver();
            egg.remove();
        }
    }, 30);
}


function isCollision(element1, element2) {
    let rect1 = element1.getBoundingClientRect();
    let rect2 = element2.getBoundingClientRect();

    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
}


function handleMovement() {

    const gameArea = main.getBoundingClientRect();
    const rocketRect = rocket.getBoundingClientRect();


    if (keys['ArrowRight'] && (rocketRect.right + offSet) < gameArea.right) {
        rocket.style.left = (parseInt(rocket.style.left) || 0) + rocketStep + 'px';
    }

    if (keys['ArrowLeft'] && (rocketRect.left - offSet) > gameArea.left) {
        rocket.style.left = (parseInt(rocket.style.left) || 0) - rocketStep + 'px';
    }

    if (keys['ArrowUp'] && (rocketRect.top - offSet) > gameArea.top) {
        rocket.style.top = (parseInt(rocket.style.top) || 0) - rocketStep + 'px';
    }

    if (keys['ArrowDown'] && (rocketRect.bottom + offSet) < gameArea.bottom) {
        rocket.style.top = (parseInt(rocket.style.top) || 0) + rocketStep + 'px';
    }


    document.querySelectorAll('.chicken').forEach(function (chicken) {
        if (isCollisionWithOffset(rocketRect, chicken.getBoundingClientRect(), offSet)) {
            gameOver();
        }
    });

    if (keys[' '] && canShoot) {
        shootBullet();
        canShoot = false;
        setTimeout(() => canShoot = true, shootCooldown);
    }
}

function isCollisionWithOffset(rect1, rect2, offset) {

    return !(rect1.right - offset < rect2.left ||
        rect1.left + offset > rect2.right ||
        rect1.bottom - offset < rect2.top ||
        rect1.top + offset > rect2.bottom);
}

function shootBullet() {
    let bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = (parseInt(rocket.style.left) || 0) + 45 + 'px';
    bullet.style.top = rocket.style.top;
    main.appendChild(bullet);
    moveBullet(bullet);
}


function moveBullet(bullet) {
    let bulletStep = 5;
    let bulletInterval = setInterval(function () {
        bullet.style.top = (parseInt(bullet.style.top) || 0) - bulletStep + 'px';

        let bulletRect = bullet.getBoundingClientRect();
        document.querySelectorAll(".chicken").forEach(function (chicken) {
            if (isCollision(bullet, chicken)) {
                clearInterval(bulletInterval);
                score++;
                scoreBoard.innerHTML = "Score: " + score;
                bullet.remove();
                chicken.remove();
            }
        });

        if (parseInt(bullet.style.top) <= 0) {
            clearInterval(bulletInterval);
            bullet.remove();
        }

        if (document.querySelectorAll(".chicken").length === 0) {
            refresh_chickens();
        }
    }, 30);
}


function gameOver() {
    alert("Game Over! Your score is: " + score);
    clearInterval(eggIntervalId);
    document.querySelectorAll('.egg').forEach(egg => egg.remove()); // Remove all remaining eggs
    document.querySelectorAll('.bullet').forEach(bullet => bullet.remove()); // Remove all remaining bullets
    document.querySelectorAll('.chicken').forEach(chicken => chicken.remove()); // Remove all remaining chickens
    location.reload();
}


function gameLoop() {
    handleMovement();
    requestAnimationFrame(gameLoop);
}


let keys = {};
document.addEventListener('keydown', function (e) {
    keys[e.key] = true;
});
document.addEventListener('keyup', function (e) {
    keys[e.key] = false;
});


init();
