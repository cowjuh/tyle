import { Colors, TileGrid, TileObject } from "../components/types/types";

export const mockTileGrid: TileGrid = [
    [
        {
            tileId: 'tileA',
            ledConfig: [
                [{color: Colors.red, opacity: 100}, {color: Colors.red, opacity: 100}, {color: Colors.red, opacity: 100}, {color: Colors.red, opacity: 100}, ],
                [{color: Colors.cyan, opacity: 100}, {color: Colors.cyan, opacity: 100}, {color: Colors.cyan, opacity: 100}, {color: Colors.cyan, opacity: 100}, ],
                [{color: Colors.pink, opacity: 100}, {color: Colors.pink, opacity: 100}, {color: Colors.pink, opacity: 100}, {color: Colors.pink, opacity: 100}, ],
                [{color: Colors.green, opacity: 100}, {color: Colors.green, opacity: 100}, {color: Colors.green, opacity: 100}, {color: Colors.green, opacity: 100}, ],
            ]
        },
        {
            tileId: 'tileB',
            ledConfig: [
                [{color: Colors.cyan, opacity: 100}, {color: Colors.cyan, opacity: 100}, {color: Colors.cyan, opacity: 100}, {color: Colors.cyan, opacity: 100}, ],
                [{color: Colors.green, opacity: 100}, {color: Colors.green, opacity: 100}, {color: Colors.green, opacity: 100}, {color: Colors.green, opacity: 100}, ],
                [{color: Colors.purple, opacity: 100}, {color: Colors.purple, opacity: 100}, {color: Colors.purple, opacity: 100}, {color: Colors.purple, opacity: 100}, ],
                [{color: Colors.pink, opacity: 100}, {color: Colors.pink, opacity: 100}, {color: Colors.pink, opacity: 100}, {color: Colors.pink, opacity: 100}, ],
            ]
        },
        {
            tileId: 'empty',
            ledConfig: []
            
        }
    ],
    [
        {
            tileId: 'tileA',
            ledConfig: [
                [{color: Colors.red, opacity: 100}, {color: Colors.red, opacity: 100}, {color: Colors.red, opacity: 100}, {color: Colors.red, opacity: 100}, ],
                [{color: Colors.cyan, opacity: 100}, {color: Colors.cyan, opacity: 100}, {color: Colors.cyan, opacity: 100}, {color: Colors.cyan, opacity: 100}, ],
                [{color: Colors.pink, opacity: 100}, {color: Colors.pink, opacity: 100}, {color: Colors.pink, opacity: 100}, {color: Colors.pink, opacity: 100}, ],
                [{color: Colors.green, opacity: 100}, {color: Colors.green, opacity: 100}, {color: Colors.green, opacity: 100}, {color: Colors.green, opacity: 100}, ],
            ]
        },
        {
            tileId: 'empty',
            ledConfig: []
        },
        {
            tileId: 'empty',
            ledConfig: []
            
        }
    ],
]

