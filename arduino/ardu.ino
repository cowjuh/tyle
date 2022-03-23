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
