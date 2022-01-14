#include <Adafruit_NeoPixel.h>

void setAll(byte red, byte green, byte blue, Adafruit_NeoPixel *pixels, int NUM_LEDS) {
  for(int i = 0; i < NUM_LEDS; i++ ) {
    pixels->setPixelColor(i, red, green, blue); 
  }
    pixels->show();
}

void TwinkleRandom(int Count, int SpeedDelay, boolean OnlyOne, Adafruit_NeoPixel *pixels, int NUM_LEDS)
{

  for (int i = 0; i < Count; i++)
  {
    pixels->setPixelColor(random(NUM_LEDS), random(0, 255), random(0, 255), random(0, 255));
    pixels->show();
    delay(SpeedDelay);
    if (OnlyOne)
    {
      setAll(0, 0, 0, pixels, NUM_LEDS);
    }
  }

  delay(SpeedDelay);
}
