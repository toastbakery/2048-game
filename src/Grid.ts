import Tile from './Tile';

const GRID_SIZE = 4;
const CELL_SIZE = 18;
const CELL_GAP = 2;

export default class Grid {
    #cells: Cell[];

    constructor(gridElement: HTMLElement) {
        gridElement.style.setProperty("--grid-size", GRID_SIZE.toString());
        gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
        gridElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);

        this.#cells = createCellElements(gridElement).map((cellElement, index) => {
            return new Cell(cellElement, index % GRID_SIZE, Math.floor(index / GRID_SIZE));
        });
    }

    get cells() {
        return this.#cells
    }

    get cellsByColumn(): Cell[][] {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || [];
            cellGrid[cell.x][cell.y] = cell;
            return cellGrid;
        }, [] as Cell[][]);
    }

    get cellsByRow(): Cell[][] {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || [];
            cellGrid[cell.y][cell.x] = cell;
            return cellGrid;
        }, [] as Cell[][]);
    }

    randomEmptyCell(): Cell {
        const emptyCells = this.#cells.filter(cell => cell.tile == null);
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }
}

function createCellElements(gridElement: HTMLElement): HTMLElement[] {
    const cellElements: HTMLElement[] = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElements.push(cellElement);
        gridElement.append(cellElement);
    }
    return cellElements;
}

export class Cell {
    #cellElement: HTMLElement;
    #x: number;
    #y: number;
    #tile: Tile | null = null;   // #tile will initially have the value null unless it is assigned a Tile instance later.
    #mergeTile: Tile | null = null;

    constructor(cellElement: HTMLElement, x: number, y: number) {
        this.#cellElement = cellElement;
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }
    get tile() {
        return this.#tile;
    }

    set tile(tileObject: Tile | null) {
        this.#tile = tileObject;
        if (tileObject !== null) {
            tileObject.x = this.#x;
            tileObject.y = this.#y;
        }
    }

    get mergeTile() {
        return this.#mergeTile;
    }

    set mergeTile(tileObject: Tile | null) {
        this.#mergeTile = tileObject;
        if (tileObject !== null) {
            tileObject.x = this.#x;
            tileObject.y = this.#y;
        }
    }

    canAccept(tile: Tile) {
        return (
            this.#tile == null || (this.#mergeTile == null && this.#tile.value === tile.value)
        );
    }

    mergeTiles() {
        if (this.#tile == null || this.#mergeTile == null) return;
        this.#tile.value = this.#tile.value + this.#mergeTile.value;
        this.#mergeTile.remove();
        this.#mergeTile = null;
    }
}
