# Tyle - Programmable Smart Tyle

Project Type: IGEN 430 Capstone Project

Timeline: September 2021 - April 2022

<img width="925" alt="image" src="https://user-images.githubusercontent.com/42523645/160368527-ebdaf929-7c2f-48b3-8b72-260f6ebb475a.png">

![Draw Mode Demo_1](https://user-images.githubusercontent.com/42523645/160369091-d3d2aaf8-633b-49b1-8773-e152cbec4de0.gif)


This repository holds the source code for the UI application of the IGEN 430 project, Tyle. This application pairs with the physical tile grid over wifi and allows users to view its stream of pressure sensor data and program its LEDs.

There are three modes of operation:

1. Data -- Allows users to view a realtime stream of pressure sensor data coming from the tile grid.
2. Draw -- Allows users to "draw" using the grid's LEDs.
3. Program -- Provides simple logic statements that allow users to program the tile grid's LEDs based on the current pressure sensor value.

## Getting Started

### Client
1. `npm install` to install all the packages
2. `npm start` to run the app.

### Server
1. From the root, `cd server` to move to server directory
2. `npm install`
3. `npm run dev`
    - This will run nodedmon and allow hot reload on server changes

### ESP32
1. The sketch is in `arduino/esp32.ino`
2. Include the Wifi library
3. You'll need to install the [ArduinoWebsockets](https://github.com/gilmaimon/ArduinoWebsockets) library
    - Tools > Manage Libraries > Search for "ArduinoWebsockets" > Install the latest version
4. In the sketch, you'll need to update your Wifi configurations:
    - SSID
    - Password
    - 
