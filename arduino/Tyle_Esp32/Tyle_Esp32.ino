
#include <ArduinoWebsockets.h>
#include <WiFi.h>
#include <Wire.h>
#include "Tyle_Esp32.h"

#define MAX_TILES 5

const char* ssid = "cow goes";                             // Enter YOUR SSID
const char* password = "moomoomoo";                        // Enter YOUR Password
const char* websockets_server_host = "ws://192.168.0.41:"; // Enter ws://YOUR-SERVER-ADDRESS
const uint16_t websockets_server_port = 3001;              // DO NOT CHANGE

using namespace websockets;
WebsocketsClient client;

int numTiles = 1;
String tileNeighbours[MAX_TILES] = {};
byte tileIDs[MAX_TILES] = {};

int cellValues[MAX_TILES][4] = {};

unsigned long lastPoll = 0;
const int pollDelay = 500; //ms

void setup()
{
  Serial.begin(115200);
  Wire.begin();
  wifiSetup();
}

void wifiSetup() {
  // Connect to wifi
  WiFi.begin(ssid, password);

  // Wait some time to connect to wifi
  for (int i = 0; i < 20 && WiFi.status() != WL_CONNECTED; i++)
  {
    Serial.print(".");
    delay(1000);
  }

  // Check if connected to wifi
  if (WiFi.status() != WL_CONNECTED)
  {
    Serial.println("No Wifi!");
    return;
  }

  Serial.println("Connected to Wifi, Connecting to server.");
  // try to connect to Websockets server
  bool connected = client.connect(websockets_server_host, websockets_server_port,  "/");
  if (connected)
  {
    Serial.println("Connected!");
    client.send("Hello Server");
  }
  else
  {
    // Make sure you've initialized your NodeJS websocket server
    Serial.println("Not Connected!");
  }

  // run callback when messages are received
  client.onMessage(onMessageCallback);
  client.onEvent(onEventsCallback);
}

void onEventsCallback(WebsocketsEvent event, String data)
{
  if (event == WebsocketsEvent::ConnectionOpened)
  {
    Serial.println("Connnection Opened");
  }
  else if (event == WebsocketsEvent::ConnectionClosed)
  {
    Serial.println("Connnection Closed");
  }
  else if (event == WebsocketsEvent::GotPing)
  {
    Serial.println("Got a Ping!");
  }
  else if (event == WebsocketsEvent::GotPong)
  {
    Serial.println("Got a Pong!");
  }
}

void onMessageCallback(WebsocketsMessage message)
{
  String msg = message.data();
  if (msg.charAt(0) == 'C') { //update server with tile config
    getNeighbours();
    client.send(buildConfigString());
  } else if (msg.charAt(0) == 'D' || msg.charAt(0) == 'F') {
    for (int j = 0; j < msg.length(); j++) {
      if (msg.charAt(j) == 'D') {
        j += 2;
        int id = msg.charAt(j) - '0'; //fails if id > 9 TODO
        j += 2;
        String numString = "";
        int k = j;
        while (msg.charAt(k) != ' ') {
          numString += msg.charAt(k);
          k++;
        }
        int numDiff = numString.toInt();
        j = ++k;
        byte updateArray[numDiff * 4] = {};
        int updateIndex = 0;
        while (j < msg.length() && (msg.charAt(0) != 'D' || msg.charAt(0) != 'F')) {
          int next = msg.substring(j, j + 3).toInt();
          updateArray[updateIndex] = lowByte(next);
          updateIndex++;
          j += 4;
        }
        updateLEDs(id, updateArray, numDiff * 4);
      } else {
        j += 2;
        int id = msg.charAt(j) - '0'; //fails if id > 9 TODO
        j += 2;
        byte updateArray[48] = {};
        int pos = 0;
        int c = 0;
        while (pos < 48) {
          int next = msg.substring(c, c + 3).toInt();
          updateArray[pos] = lowByte(next);
          pos++;
          c += 4;
        }
        updateLEDs(id, updateArray, 48);
      }
    }
  } else {
    Serial.print("Malformed message recieved");
  }
}

String buildConfigString() {
  String configString = "";
  for (int i = 0; i < numTiles; i++) {
    configString += tileNeighbours[i];
  }
  return configString;
}



void updateLEDs(int id, byte updateArray[], int len) {
  Wire.beginTransmission(tileIDs[id]);
  for (int i = 0; i < len; i++) {
    Wire.write(updateArray[i]);
  }
  Wire.endTransmission();

}

void getSensors(int id) {
  int count = 0;

  Wire.requestFrom(tileIDs[id], 8);
  for (int i = 0; i < 4; i++) {
    cellValues[id][i] = (Wire.read() << 8) | Wire.read();
  }
}

void getNeighbours() {
  
  for (int i = 0; i < numTiles; i++){
    Wire.requestFrom(tileIDs[i], 4);
    String s = "";
    while (Wire.available){
      s += Wire.read();
    }
    tileNeighbours[i] = s;
  }
}


void pollTiles() {
  lastPoll = millis();
  for (int i = 0; i < numTiles; i++) {
    getSensors(i);
  }
}

String buildSensorString() {
  String sensorString = "";
  for (int i = 0; i < numTiles; i++) {
    for (int j = 0; j < 4; j++) {
      sensorString += cellValues[i][j] + " ";
    }
  }
  sensorString.trim();
}

void loop()
{
  // let the websockets client check for incoming messages
  if (client.available())
  {
    client.poll();
  }
  /*
    @jonah this is where you'll want to send tile sensor
    values at every interval (that you want)
  */
  if (lastPoll < millis() + pollDelay) {
    pollTiles();
    client.send(buildSensorString());
  }
  delay(10);
}
