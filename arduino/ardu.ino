/*
The data that gets stored in incomingString looks like this:
(255,152,32,1),(255,152,32,1), ... (231,103,218,1)

corresponding to:
(R,G,B,A)

Each set of rgb values is contained in parentheses, and comma-separated.
There are 16 RGBA values in total.

The rgba values are listed according to this indexing
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

Which is represented like this physically
[0,1,2,3]
[4,5,6,7],
[8,9,10,11],
[12,13,14,15]
*/

String incomingString = "";

void setup()
{
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("Arduino Setup");
}

void loop()
{
  if (Serial.available() > 0)
  {
    incomingString = Serial.readString();
    Serial.println(">" + incomingString);
  }
}