/*
  Esp32 Websockets Client based on the example code by Gil Maimon
  https://github.com/gilmaimon/ArduinoWebsockets

  This sketch:
        1. Connects to a WiFi network
        2. Connects to a Websockets server
        3. Sends the websockets server a message ("Hello Server")
        4. Prints all incoming messages while the connection is open

  Hardware:
        For this sketch you only need an ESP32 board.
*/

#include <ArduinoWebsockets.h>
#include <WiFi.h>

/****************************************************
 * YOUR WIFI CONFIGURATION GOES HERE
 *****************************************************/
const char *ssid = "cow goes";                             // Enter YOUR SSID
const char *password = "moomoomoo";                        // Enter YOUR Password
const char *websockets_server_host = "ws://192.168.0.41:"; // Enter ws://YOUR-SERVER-ADDRESS
const uint16_t websockets_server_port = 3001;              // DO NOT CHANGE

using namespace websockets;

WebsocketsClient client;

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
    Serial.print("Got Message: ");
    Serial.println(message.data());
}

void setup()
{
    Serial.begin(115200);
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
    bool connected = client.connect(websockets_server_host, websockets_server_port);
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
    client.send("128 76 58");
    delay(500);
}