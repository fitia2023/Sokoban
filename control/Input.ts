import { DIRECTION } from "./DIRECTION.js";

export function Input_user(callback: (direction: DIRECTION) => void): void {
    document.addEventListener('keydown', (event) => {

        switch (event.key) {
            case 'ArrowUp':
                callback(DIRECTION.UP);
                break;
            case 'ArrowDown':
                callback(DIRECTION.DOWN);
                break;
            case 'ArrowLeft':
                callback(DIRECTION.LEFT);
                break;
            case 'ArrowRight':
                callback(DIRECTION.RIGHT);
                break;
        }

    });
}

