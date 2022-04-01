#include <Adafruit_NeoPixel.h>
#include "HX711.h"
#include <Wire.h>
#include "Tyle_Nano.h"

#define LEDPIN 10
#define NUM_LED 32
#define SKIPLED 1
#define NUMROWS 4
#define NUMCOLS 4
#define MAX_BRIGHTNESS 127

#define I2C_ADDRESS 0x01

#define L1_D 6
#define L1_S 7
#define L2_D 9
#define L2_S 8
#define L3_D 2
#define L3_S 3
#define L4_D 5
#define L4_S 4
#define NUM_LC 4



Adafruit_NeoPixel grid(NUM_LED, LEDPIN, NEO_GRB + NEO_KHZ800);
uint32_t ledValues[32] = {};

byte tileID = I2C_ADDRESS;


HX711 loadCells[NUM_LC] = {HX711(), HX711(), HX711(), HX711()};
int cellValues[NUM_LC] = {};
float cellScaling[NUM_LC] = {};
int bufferCount = 0;

String neighbourString = "";

void setup() {
  Wire.begin(I2C_ADDRESS);
  Wire.onRequest(sendEvent);
  Wire.onReceive(receiveEvent);

  initGrid();
  initLC();
}

void initGrid() {
  grid.begin();
  grid.show();
  grid.clear();
  grid.setBrightness(MAX_BRIGHTNESS);
}

void initLC() {

  loadCells[0].begin(L1_D, L1_S);
  loadCells[1].begin(L2_D, L2_S);
  loadCells[2].begin(L3_D, L3_S);
  loadCells[3].begin(L4_D, L4_S);
  delay(50);
  for (int i = 0; i < NUM_LC; i++) {
    loadCells[i].tare();
    delay(20);
    loadCells[i].set_scale(cellScaling[i]);
    delay(5);
    read_LC(i);
    delay(10);
  }
}

void loop() {
  delay(5);
}

void getNeighbours() {
  //TODO
}


/*
   Load Cell IDs start at top left at 0, incrementing clockwise
   0 3
   1 2
*/
void read_LC(int id) {
  bool isReady = 1;
  for (int i = 0; i < NUM_LC; i++) {
    isReady &= loadCells[i].is_ready();
  }
  if (isReady) {
    for (int i = 0; i < NUM_LC; i++) {
      cellValues[i] = (int)loadCells[i].get_units(3);
    }
  }
}


/*
   Send load cell values
*/
void sendEvent(int numBytes) {
  if (numBytes == 8) {
    for (int l = 0; l < NUM_LC; l++) {
      read_LC(l);
    }
    for (int i = 0; i < (sizeof(cellValues)) / 2; i++) {
      Wire.write(highByte(cellValues[i]));
      Wire.write(lowByte(cellValues[i]));
    }
  } else {
    char buf[neighbourString.length()];
    neighbourString.toCharArray(buf, neighbourString.length());
    Wire.write(buf);
  }
}

/*
   Recieve a string containing the LED values for this tile
   Each LED is composed of 3 bytes [R G B] in order
   There are two possible situations:
   1. The entire tile is getting updated, so numBytes == 48
   2. <= 3/4 of the LEDs are being updated, so only the relevant
   LEDs are sent. In this case, the data format is [n R G B] where
   n is the LED ID
   Every other LED is skipped to create a square grid

*/
void receiveEvent(int numBytes) {
  if (numBytes == 48) {
    for (int i = 0; i < NUM_LED; i += SKIPLED + 1) { //iterate over LEDs
      int colors[3] = {};
      for (int b = 0; b < 3; b++) { //capture bytes
        colors[b] = Wire.read();
      }
      ledValues[i] = grid.Color(colors[0], colors[1], colors[2]);
    }
  } else {
    for (int i = 0; i < numBytes / 4; i++) { //will always be divisible by 4
      int id = Wire.read();
      int colors[3] = {};
      for (int b = 0; b < 3; b++) { //capture bytes
        colors[b] = Wire.read();
      }
      ledValues[id * 2] = grid.Color(colors[0], colors[1], colors[2]);
    }
  }
  updateLEDs();
}

void updateLEDs() {
  for (int i = 0; i < NUM_LED; i++) {
    grid.setPixelColor(i, ledValues[i]);
  }
  grid.show();
}
