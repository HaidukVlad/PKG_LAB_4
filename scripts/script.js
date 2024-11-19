const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes();
}

function drawAxes() {
    ctx.beginPath();
    ctx.moveTo(250, 0);
    ctx.lineTo(250, 500);
    ctx.moveTo(0, 250);
    ctx.lineTo(500, 250);
    ctx.strokeStyle = 'gray';
    ctx.stroke();
}

function stepByStep(x0, y0, x1, y1) {
    ctx.beginPath();
    const dx = x1 - x0;
    const dy = y1 - y0;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    const xInc = dx / steps;
    const yInc = dy / steps;
    let x = x0;
    let y = y0;
    for (let i = 0; i <= steps; i++) {
        ctx.fillRect(Math.round(x) + 250, 250 - Math.round(y), 1, 1);
        x += xInc;
        y += yInc;
    }
}

function dda(x0, y0, x1, y1) {
    ctx.beginPath();
    const dx = x1 - x0;
    const dy = y1 - y0;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    const xInc = dx / steps;
    const yInc = dy / steps;
    let x = x0;
    let y = y0;
    for (let i = 0; i <= steps; i++) {
        ctx.fillRect(Math.round(x) + 250, 250 - Math.round(y), 1, 1);
        x += xInc;
        y += yInc;
    }
}

function bresenham(x0, y0, x1, y1) {
    ctx.beginPath();
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        ctx.fillRect(x0 + 250, 250 - y0, 1, 1);
        if (x0 === x1 && y0 === y1) break;
        const e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

function bresenhamCircle(x0, y0, radius) {
    ctx.beginPath();
    let x = radius;
    let y = 0;
    let err = 0;

    while (x >= y) {
        ctx.fillRect(x0 + x + 250, 250 - (y0 + y), 1, 1);
        ctx.fillRect(x0 + y + 250, 250 - (y0 + x), 1, 1);
        ctx.fillRect(x0 - y + 250, 250 - (y0 + x), 1, 1);
        ctx.fillRect(x0 - x + 250, 250 - (y0 + y), 1, 1);
        ctx.fillRect(x0 - x + 250, 250 - (y0 - y), 1, 1);
        ctx.fillRect(x0 - y + 250, 250 - (y0 - x), 1, 1);
        ctx.fillRect(x0 + y + 250, 250 - (y0 - x), 1, 1);
        ctx.fillRect(x0 + x + 250, 250 - (y0 - y), 1, 1);

        if (err <= 0) {
            y += 1;
            err += 2*y + 1;
        }
        if (err > 0) {
            x -= 1;
            err -= 2*x + 1;
        }
    }
}

function draw() {
    clearCanvas();
    const algorithm = document.getElementById('algorithm').value;
    const x0 = parseInt(document.getElementById('x0').value) || 0;
    const y0 = parseInt(document.getElementById('y0').value) || 0;
    const x1 = parseInt(document.getElementById('x1').value) || 0;
    const y1 = parseInt(document.getElementById('y1').value) || 0;
    const radius = parseInt(document.getElementById('radius').value) || 0;

    switch (algorithm) {
        case 'stepByStep':
            stepByStep(x0, y0, x1, y1);
            break;
        case 'dda':
            dda(x0, y0, x1, y1);
            break;
        case 'bresenham':
            bresenham(x0, y0, x1, y1);
            break;
        case 'bresenhamCircle':
            bresenhamCircle(x0, y0, radius);
            break;
    }
}

drawAxes();