document.addEventListener('DOMContentLoaded', async () => {
    const iterations = document.getElementById('iterations-field');
    const startButton = document.getElementById('start-button');
    const wind = document.getElementById('wind-select');
    const ground = document.getElementById('ground-select');
    const vegetation = document.getElementById('vegetation-select');

    const defaultIterations = await window.electron.getDefaultIterations();
    iterations.value = defaultIterations;

    startButton.addEventListener('click', () => {
        window.electron.start({
            iterations: iterations.value,
            wind: wind.value,
            ground: ground.value,
            vegetation: vegetation.value
        });
    });

    window.electron.onForestUpdated((squares) => {
        drawForestCanvas(squares);
    });
});

const drawForestCanvas = (squares) => {
    const squareSize = 5;

    const canvas = document.getElementById('forest');
    const ctx = canvas.getContext('2d');

    const gridWidth = Math.max(...squares.map(square => square.x)) + 1;
    const gridHeight = Math.max(...squares.map(square => square.y)) + 1;

    canvas.width = gridWidth * squareSize;
    canvas.height = gridHeight * squareSize;

    // Petit tricks pour retourner le canvas sur l'axe des Y car j'ai inversé les axes dans la classe ForestWindForceEnum
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);

    squares.forEach(square => {
        const x = square.x * squareSize;
        const y = square.y * squareSize;

        // Si le statut est Cold, on affiche un carré vert
        if (square.status === 'Cold') {
            ctx.fillStyle = 'green';
        } else if (square.status === 'Burning') {
            ctx.fillStyle = 'red';
        } else if (square.status === 'BurnedHot') {
            ctx.fillStyle = 'orange';
        } else if (square.status === 'BurnedCold') {
            ctx.fillStyle = 'black';
        }
        ctx.fillRect(x, y, squareSize, squareSize);
    });
}