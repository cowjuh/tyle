import { TileObject } from "../components/types/tileObject";

export const mockTileObject: Array<TileObject> = [
    {
        tileId: 'tileA',
        ledConfig: [
            [{color: "red", opacity: 100}, {color: "red", opacity: 100}, {color: "red", opacity: 100}, {color: "red", opacity: 100}, ],
            [{color: "cyan", opacity: 100}, {color: "cyan", opacity: 100}, {color: "cyan", opacity: 100}, {color: "cyan", opacity: 100}, ],
            [{color: "pink", opacity: 100}, {color: "pink", opacity: 100}, {color: "pink", opacity: 100}, {color: "pink", opacity: 100}, ],
            [{color: "green", opacity: 100}, {color: "green", opacity: 100}, {color: "green", opacity: 100}, {color: "green", opacity: 100}, ],
        ]
    },
    {
        tileId: 'tileB',
        ledConfig: [
            [{color: "cyan", opacity: 100}, {color: "cyan", opacity: 100}, {color: "cyan", opacity: 100}, {color: "cyan", opacity: 100}, ],
            [{color: "green", opacity: 100}, {color: "green", opacity: 100}, {color: "green", opacity: 100}, {color: "green", opacity: 100}, ],
            [{color: "red", opacity: 100}, {color: "red", opacity: 100}, {color: "red", opacity: 100}, {color: "red", opacity: 100}, ],
            [{color: "pink", opacity: 100}, {color: "pink", opacity: 100}, {color: "pink", opacity: 100}, {color: "pink", opacity: 100}, ],
        ]
    }
]

