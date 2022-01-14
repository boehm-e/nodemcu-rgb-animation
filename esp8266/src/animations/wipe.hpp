#include <Adafruit_NeoPixel.h>

void colorWipe(int color, int SpeedDelay, Adafruit_NeoPixel *pixels, int NUM_LEDS)
{
    for (uint16_t i = 0; i < NUM_LEDS; i++)
    {
        pixels->setPixelColor(i, color);
        pixels->show();
        delay(SpeedDelay);
        
    }
}