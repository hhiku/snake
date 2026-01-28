sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Food, function (sprite, otherSprite) {
    tiles.placeOnTile(apple, tiles.getTileLocation(randint(1, 8), randint(1, 6)))
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(direction == "l")) {
        direction = "r"
        move()
        lastMoveTime = game.runtime()
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(direction == "r")) {
        direction = "l"
        move()
        lastMoveTime = game.runtime()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    tiles.placeOnTile(apple, tiles.getTileLocation(randint(1, 8), randint(1, 6)))
    mySprite = sprites.create(img`
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
        `, SpriteKind.Enemy)
    tiles.placeOnTile(mySprite, tail[tail.length - 1].tilemapLocation())
    mySprite.scale = 1 - 0.025 * tail.length
    tail.unshift(mySprite)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(direction == "u")) {
        direction = "d"
        move()
        lastMoveTime = game.runtime()
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(direction == "d")) {
        direction = "u"
        move()
        lastMoveTime = game.runtime()
    }
})
function move () {
    for (let index = 0; index <= tail.length - 2; index++) {
        tiles.placeOnTile(tail[index], tail[index + 1].tilemapLocation())
    }
    tiles.placeOnTile(tail[tail.length - 1], head.tilemapLocation())
    if (direction == "u") {
        tiles.placeOnTile(head, tiles.getTileLocation(head.tilemapLocation().column + 0, head.tilemapLocation().row + -1))
    } else if (direction == "r") {
        tiles.placeOnTile(head, tiles.getTileLocation(head.tilemapLocation().column + 1, head.tilemapLocation().row + 0))
    } else if (direction == "d") {
        tiles.placeOnTile(head, tiles.getTileLocation(head.tilemapLocation().column + 0, head.tilemapLocation().row + 1))
    } else if (direction == "l") {
        tiles.placeOnTile(head, tiles.getTileLocation(head.tilemapLocation().column + -1, head.tilemapLocation().row + 0))
    }
    if (tiles.tileAtLocationIsWall(head.tilemapLocation())) {
        game.gameOver(false)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.gameOver(false)
})
let mySprite: Sprite = null
let tail: Sprite[] = []
let direction = ""
let head: Sprite = null
let apple: Sprite = null
let lastMoveTime = 0
let timeBetweenMoves = 275
lastMoveTime = 0
tiles.setCurrentTilemap(tilemap`level2`)
apple = sprites.create(img`
    . . . . . . . e c 7 . . . . . . 
    . . . . e e e c 7 7 e e . . . . 
    . . c e e e e c 7 e 2 2 e e . . 
    . c e e e e e c 6 e e 2 2 2 e . 
    . c e e e 2 e c c 2 4 5 4 2 e . 
    c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
    c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
    . e e e 2 2 2 2 2 2 2 2 2 4 e . 
    . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
    . . 2 e e 2 2 2 2 2 4 4 2 e . . 
    . . . 2 2 e e 4 4 4 2 e e . . . 
    . . . . . 2 2 e e e e . . . . . 
    `, SpriteKind.Food)
tiles.placeOnTile(apple, tiles.getTileLocation(randint(1, 8), randint(1, 6)))
head = sprites.create(img`
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 1 1 2 2 2 2 1 1 2 2 2 2 
    2 2 2 2 1 f 2 2 2 2 f 1 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 f 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 f f f f f f 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    `, SpriteKind.Player)
tiles.placeOnTile(head, tiles.getTileLocation(1, 2))
direction = "r"
tail = []
mySprite = sprites.create(img`
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    `, SpriteKind.Enemy)
tail.push(mySprite)
forever(function () {
    if (lastMoveTime + timeBetweenMoves <= game.runtime()) {
        move()
        lastMoveTime = game.runtime()
    }
})
