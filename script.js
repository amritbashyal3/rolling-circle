const player = document.getElementById('player');
let posX = 0;
let posY = 50;
const speed = 5;
const jumpStrength = 7;
const jumpHeight = 200;
let isMoving = false;
let isJump = false;
let isFalling = false;
let animationId;

// Initialize the game
const initializeGame = () => {
    player.style.left = posX + "px";
    player.style.bottom = posY + "px";
    player.style.borderRadius = "100%";
};

// Check collision between two elements
const isColliding = (element1, element2) => {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    
    return !(
        rect1.top > rect2.bottom ||
        rect1.right < rect2.left ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right
    );
};

// Check collision with obstacles
const checkObstacleCollision = () => {
    const obstacles = document.querySelectorAll('.obstacle');
    let collided = false;
    obstacles.forEach(obstacle => {
        if (isColliding(player, obstacle)) {
            collided = true;
        }
    });
    return collided;
};

// Move player right
const moveRight = () => {
    if (posX + player.offsetWidth < window.innerWidth && !checkObstacleCollision()) {
        posX += speed;
        player.style.left = posX + "px";
        player.style.transform = `rotate(${posX}deg)`;
        animationId = requestAnimationFrame(moveRight);
    }
};

// Move player left
const moveLeft = () => {
    if (posX > 0 && !checkObstacleCollision()) {
        posX -= speed;
        player.style.left = posX + "px";
        player.style.transform = `rotate(${posX}deg)`;
        animationId = requestAnimationFrame(moveLeft);
    }
};

// Perform jump
const performJump = () => {
    if (posY < jumpHeight) {
        posY += jumpStrength;
        player.style.bottom = posY + "px";
        requestAnimationFrame(performJump);
    } else {
        isJump = false;
        isFalling = true;
        performFall();
    }
};

// Perform fall
const performFall = () => {
    if (posY > 50 && !checkObstacleCollision()) {
        posY -= jumpStrength;
        player.style.bottom = posY + "px";
        requestAnimationFrame(performFall);
    } else {
        // posY = 50;
        player.style.bottom = posY + "px";
        isFalling = false;
    }
};

// Event listener for keydown
document.addEventListener('keydown', (event) => {
    if (!isMoving) {
        if (event.code === 'ArrowLeft') {
            isMoving = true;
            moveLeft();
        } else if (event.code === 'ArrowRight') {
            isMoving = true;
            moveRight();
        }
    }
    
    if ((event.code === 'Space' || event.code === 'ArrowUp') && !isJump && !isFalling) {
        isJump = true;
        performJump();
    }
});

// Event listener for keyup
document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
        cancelAnimationFrame(animationId);
        isMoving = false;
    }
});

// Initialize the game when loaded
window.addEventListener('load', initializeGame);
