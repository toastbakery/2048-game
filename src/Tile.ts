export default class Tile {
    #tileElement: HTMLElement;
    #x: number = 0;
    #y: number = 0;
    #value: number = 0;
  
    constructor(tileContainer: HTMLElement, value: number = Math.random() > 0.5 ? 2 : 4) {
      this.#tileElement = document.createElement("div");
      this.#tileElement.classList.add("tile");
      tileContainer.append(this.#tileElement);
      this.value = value;
    }
    
    get value() {
      return this.#value;
    }
  
    set value(v: number) {
      this.#value = v;
      this.#tileElement.textContent = v.toString();
      const power = Math.log2(v);
      const backgroundLightness = 100 - power * 9;
      this.#tileElement.style.setProperty("--background-lightness", `${backgroundLightness}%`);
      this.#tileElement.style.setProperty("--text-lightness", `${backgroundLightness <= 50 ? 90 : 10}%`)
    }

    set x(v: number) {
        this.#x = v;
        this.#tileElement.style.setProperty("--x", v.toString());
    }

    set y(v: number) {
        this.#y = v;
        this.#tileElement.style.setProperty("--y", v.toString());
    }

    remove() {
        this.#tileElement.remove()
    }

    //The { once: true } option ensures that the event listener is automatically removed after the first occurrence
    waitForTransition(animation = false): Promise<void> {  // Change the return type to Promise<void>
        return new Promise<void>(resolve => {  // Explicitly state the type of the Promise
            this.#tileElement.addEventListener(
                animation ? "animationend" : "transitionend", 
                () => resolve(), 
                { once: true }
            );
        });
    }

} 