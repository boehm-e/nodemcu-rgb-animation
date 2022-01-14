#include <Adafruit_NeoPixel.h>

byte *Wheel(byte WheelPos)
{
  static byte c[3];

  if (WheelPos < 85)
  {
    c[0] = WheelPos * 3;
    c[1] = 255 - WheelPos * 3;
    c[2] = 0;
  }
  else if (WheelPos < 170)
  {
    WheelPos -= 85;
    c[0] = 255 - WheelPos * 3;
    c[1] = 0;
    c[2] = WheelPos * 3;
  }
  else
  {
    WheelPos -= 170;
    c[0] = 0;
    c[1] = WheelPos * 3;
    c[2] = 255 - WheelPos * 3;
  }

  return c;
}

void rainbowCycle(int SpeedDelay, Adafruit_NeoPixel *pixels, int NUM_LEDS)
{
  byte *c;
  uint16_t i, j;

  for (j = 0; j < 256; j++)
  { // 5 cycles of all colors on wheel
    for (i = 0; i < NUM_LEDS; i++)
    {
      c = Wheel(((i * 256 / NUM_LEDS) + j) & 255);
      pixels->setPixelColor(i, *c, *(c + 1), *(c + 2));
    }
    pixels->show();
    delay(SpeedDelay);
  
  }
}