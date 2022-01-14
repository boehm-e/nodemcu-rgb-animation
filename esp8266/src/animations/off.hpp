#include <Adafruit_NeoPixel.h>
void off(Adafruit_NeoPixel *pixels, int NUM_LEDS)
{
    for (int i = 0; i < NUM_LEDS; i++)
    {
      pixels->setPixelColor(i, 0);
    }
    pixels->show();
}