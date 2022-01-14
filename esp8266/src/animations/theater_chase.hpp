#include <Adafruit_NeoPixel.h>


void theaterChase(int color, int SpeedDelay, Adafruit_NeoPixel *pixels, int NUM_LEDS)
{
    for (int j = 0; j < 1; j++)
    { //do 10 cycles of chasing
        for (int q = 0; q < 3; q++)
        {
            for (int i = 0; i < NUM_LEDS; i = i + 3)
            {
                pixels->setPixelColor(i + q, color); //turn every third pixel on
            }
            pixels->show();

            delay(SpeedDelay);

            for (int i = 0; i < NUM_LEDS; i = i + 3)
            {
                pixels->setPixelColor(i + q, 0, 0, 0); //turn every third pixel off
            }
        }
        Serial.println("erwan 1");
    }
    Serial.println("erwan 2");
}

void theaterChaseRainbow(int SpeedDelay, Adafruit_NeoPixel *pixels, int NUM_LEDS)
{
    byte *c;

    for (int j = 0; j < 256; j++)
    { // cycle all 256 colors in the wheel
        for (int q = 0; q < 3; q++)
        {
            for (int i = 0; i < NUM_LEDS; i = i + 3)
            {
                c = Wheel((i + j) % 255);
                pixels->setPixelColor(i + q, *c, *(c + 1), *(c + 2)); //turn every third pixel on
            }
            pixels->show();

            delay(SpeedDelay);

            for (int i = 0; i < NUM_LEDS; i = i + 3)
            {
                pixels->setPixelColor(i + q, 0, 0, 0); //turn every third pixel off
            }
        }
    }
}
