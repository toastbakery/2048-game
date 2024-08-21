var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Grid_cells, _Cell_cellElement, _Cell_x, _Cell_y, _Cell_tile, _Cell_mergeTile;
const GRID_SIZE = 4;
const CELL_SIZE = 18;
const CELL_GAP = 2;
class Grid {
    constructor(gridElement) {
        _Grid_cells.set(this, void 0);
        gridElement.style.setProperty("--grid-size", GRID_SIZE.toString());
        gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
        gridElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
        __classPrivateFieldSet(this, _Grid_cells, createCellElements(gridElement).map((cellElement, index) => {
            return new Cell(cellElement, index % GRID_SIZE, Math.floor(index / GRID_SIZE));
        }), "f");
    }
    get cells() {
        return __classPrivateFieldGet(this, _Grid_cells, "f");
    }
    get cellsByColumn() {
        return __classPrivateFieldGet(this, _Grid_cells, "f").reduce((cellGrid, cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || [];
            cellGrid[cell.x][cell.y] = cell;
            return cellGrid;
        }, []);
    }
    get cellsByRow() {
        return __classPrivateFieldGet(this, _Grid_cells, "f").reduce((cellGrid, cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || [];
            cellGrid[cell.y][cell.x] = cell;
            return cellGrid;
        }, []);
    }
    randomEmptyCell() {
        const emptyCells = __classPrivateFieldGet(this, _Grid_cells, "f").filter(cell => cell.tile == null);
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }
}
_Grid_cells = new WeakMap();
export default Grid;
function createCellElements(gridElement) {
    const cellElements = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElements.push(cellElement);
        gridElement.append(cellElement);
    }
    return cellElements;
}
export class Cell {
    constructor(cellElement, x, y) {
        _Cell_cellElement.set(this, void 0);
        _Cell_x.set(this, void 0);
        _Cell_y.set(this, void 0);
        _Cell_tile.set(this, null); // #tile will initially have the value null unless it is assigned a Tile instance later.
        _Cell_mergeTile.set(this, null);
        __classPrivateFieldSet(this, _Cell_cellElement, cellElement, "f");
        __classPrivateFieldSet(this, _Cell_x, x, "f");
        __classPrivateFieldSet(this, _Cell_y, y, "f");
    }
    get x() {
        return __classPrivateFieldGet(this, _Cell_x, "f");
    }
    get y() {
        return __classPrivateFieldGet(this, _Cell_y, "f");
    }
    get tile() {
        return __classPrivateFieldGet(this, _Cell_tile, "f");
    }
    set tile(tileObject) {
        __classPrivateFieldSet(this, _Cell_tile, tileObject, "f");
        if (tileObject !== null) {
            tileObject.x = __classPrivateFieldGet(this, _Cell_x, "f");
            tileObject.y = __classPrivateFieldGet(this, _Cell_y, "f");
        }
    }
    get mergeTile() {
        return __classPrivateFieldGet(this, _Cell_mergeTile, "f");
    }
    set mergeTile(tileObject) {
        __classPrivateFieldSet(this, _Cell_mergeTile, tileObject, "f");
        if (tileObject !== null) {
            tileObject.x = __classPrivateFieldGet(this, _Cell_x, "f");
            tileObject.y = __classPrivateFieldGet(this, _Cell_y, "f");
        }
    }
    canAccept(tile) {
        return (__classPrivateFieldGet(this, _Cell_tile, "f") == null || (__classPrivateFieldGet(this, _Cell_mergeTile, "f") == null && __classPrivateFieldGet(this, _Cell_tile, "f").value === tile.value));
    }
    mergeTiles() {
        if (__classPrivateFieldGet(this, _Cell_tile, "f") == null || __classPrivateFieldGet(this, _Cell_mergeTile, "f") == null)
            return;
        __classPrivateFieldGet(this, _Cell_tile, "f").value = __classPrivateFieldGet(this, _Cell_tile, "f").value + __classPrivateFieldGet(this, _Cell_mergeTile, "f").value;
        __classPrivateFieldGet(this, _Cell_mergeTile, "f").remove();
        __classPrivateFieldSet(this, _Cell_mergeTile, null, "f");
    }
}
_Cell_cellElement = new WeakMap(), _Cell_x = new WeakMap(), _Cell_y = new WeakMap(), _Cell_tile = new WeakMap(), _Cell_mergeTile = new WeakMap();
