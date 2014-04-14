var balls = [];

function update() {
    for (var b in balls) {
        b.velocity = b.velocity.add(gravity);
        b.draw();
    }
}

function main() {
    window.setInterval(update, 20);
}
$(document).ready(main);
