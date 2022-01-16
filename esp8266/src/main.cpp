
#include "Arduino.h"
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <ArduinoJson.h>
#include <Adafruit_NeoPixel.h>

#ifdef __AVR__
#include <avr/power.h> // Required for 16 MHz Adafruit Trinket
#endif

#define PIN D3

int NUM_LEDS = 250;

const char *ssid = "Freebox-ACD532";
const char *password = "labebantur9#-sardinia*-appie?4-supponatis";
ESP8266WebServer server(80);

// Pattern types supported:
enum pattern
{
    NONE,
    RAINBOW_CYCLE,
    THEATER_CHASE,
    COLOR_WIPE,
    SCANNER,
    GAME,
    MUSIC,
    FADE,
    TWINKLE,
    DO_NOTHING,
    DECAY
};

enum direction
{
    FORWARD,
    REVERSE
};

class NeoPatterns : public Adafruit_NeoPixel
{
public:
    // Member Variables:
    pattern ActivePattern; // which pattern is running
    direction Direction;   // direction to run the pattern

    unsigned long Interval;   // milliseconds between updates
    unsigned long lastUpdate; // last update of position

    uint32_t Color1, Color2; // What colors are in use
    uint16_t TotalSteps;     // total number of steps in the pattern
    uint16_t Index;          // current step within the pattern

    int MusicIndexes[100] = {-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,};
    int MusicVolumes[100] = {-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,};
    int MusicMaxDot = 100;

    // GAME
    int GamePos;
    int GameLevel;

    void (*OnComplete)(); // Callback on completion of pattern

    // Constructor - calls base-class constructor to initialize strip
    NeoPatterns(uint16_t pixels, uint8_t pin, uint8_t type, void (*callback)())
        : Adafruit_NeoPixel(pixels, pin, type)
    {
        // OnComplete = callback;
    }

    // Update the pattern
    void Update()
    {
        if ((millis() - lastUpdate) > Interval) // time to update
        {
            lastUpdate = millis();
            switch (ActivePattern)
            {
            case RAINBOW_CYCLE:
                RainbowCycleUpdate();
                break;
            case THEATER_CHASE:
                TheaterChaseUpdate();
                break;
            case COLOR_WIPE:
                ColorWipeUpdate();
                break;
            case SCANNER:
                ScannerUpdate();
            case MUSIC:
                MusicUpdate();
                break;
            case GAME:
                GameUpdate();
                break;
            case FADE:
                FadeUpdate();
                break;
            case TWINKLE:
                TwinkleUpdate();
                break;
            default:
                break;
            }
        }
    }

    // Increment the Index and reset at the end
    void Increment()
    {
        if (Direction == FORWARD)
        {
            Index++;
            if (Index >= TotalSteps)
            {
                Index = 0;
                if (OnComplete != NULL)
                {
                    OnComplete(); // call the comlpetion callback
                }
            }
        }
        else // Direction == REVERSE
        {
            --Index;
            if (Index <= 0)
            {
                Index = TotalSteps - 1;
                if (OnComplete != NULL)
                {
                    OnComplete(); // call the comlpetion callback
                }
            }
        }
    }

    // Reverse pattern direction
    void Reverse()
    {
        if (Direction == FORWARD)
        {
            Direction = REVERSE;
            // Index = TotalSteps - 1;
        }
        else
        {
            Direction = FORWARD;
            // Index = 0;
        }
    }

    // Initialize for a RainbowCycle
    void RainbowCycle(uint8_t interval, direction dir = FORWARD)
    {
        ActivePattern = RAINBOW_CYCLE;
        Interval = interval;
        TotalSteps = 255;
        Index = 0;
        Direction = dir;
    }

    // Initialize for a RainbowCycle
    void Off()
    {
        ActivePattern = DO_NOTHING;
        Index = 0;
        ColorSet(0x000000);
    }

    // Initialize for a SCANNNER
    void Scanner(uint32_t color1, uint8_t interval)
    {
        ActivePattern = SCANNER;
        Interval = interval;
        TotalSteps = (NUM_LEDS - 1) * 2;
        Color1 = color1;
        Index = 0;
    }

    // Update the Scanner Pattern
    void ScannerUpdate()
    {
        for (int i = 0; i < NUM_LEDS; i++)
        {
            if (i == Index) // Scan Pixel to the right
            {
                setPixelColor(i, Color1);
            }
            else if (i == TotalSteps - Index) // Scan Pixel to the left
            {
                setPixelColor(i, Color1);
            }
            else // Fading tail
            {
                setPixelColor(i, DimColor(getPixelColor(i)));
            }
        }
        show();
        Increment();
    }

    // MUSIC
    int getIndex(int *arr)
    {
        for (int i = 0; i < MusicMaxDot; i++)
        {
            if (arr[i] < 0)
                return i;
        }
        return -1;
    }

    void Music(uint8_t interval, int volume)
    {
        ActivePattern = MUSIC;
        Interval = interval;
        int idx = getIndex(MusicIndexes);
        // reset
        if (idx > MusicMaxDot || idx < 0)
        {
            idx = 0;
            for (int i = 0; i < MusicMaxDot; i++)
            {
                MusicIndexes[i] = -1;
                MusicVolumes[i] = -1;
            }
        }
        MusicIndexes[idx] = 0;
        MusicVolumes[idx] = volume;
    }

    void IncrementMusic()
    {
        for (int i = 0; i < MusicMaxDot; i++)
        {
            if (MusicIndexes[i] >= 0)
            {
                MusicIndexes[i] = MusicIndexes[i] + (int)(MusicVolumes[i] / 2);
            }
        }
    }
    // // Update the Decay Pattern
    void MusicUpdate()
    {

        for (int i = 0; i < MusicMaxDot; i++)
        {
            if (MusicIndexes[i] >= 0)
            {
                for (int j = 0; j < MusicVolumes[i]*2; j++)
                {
                    if (MusicVolumes[i] == 1)
                        setPixelColor(MusicIndexes[i] - j, DimColorShift(0xff1500, 9));
                    else if (MusicVolumes[i] == 2)
                        setPixelColor(MusicIndexes[i] - j, DimColorShift(0xffeb00, 8));
                    else if (MusicVolumes[i] == 3)
                        setPixelColor(MusicIndexes[i] - j, DimColorShift(0x85ff00, 7));
                    else if (MusicVolumes[i] == 4)
                        setPixelColor(MusicIndexes[i] - j, DimColorShift(0x00ffa1, 6));
                    else if (MusicVolumes[i] == 5)
                        setPixelColor(MusicIndexes[i] - j, DimColorShift(0x00ffe9, 5));
                    else if (MusicVolumes[i] == 6)
                        setPixelColor(MusicIndexes[i] - j, DimColorShift(0x0080ff, 4));
                    else if (MusicVolumes[i] == 7)
                        setPixelColor(MusicIndexes[i] - j, DimColorShift(0x0012ff, 3));
                    else if (MusicVolumes[i] == 8)
                        setPixelColor(MusicIndexes[i] - j, DimColorShift(0x9d00ff, 2));
                    else if (MusicVolumes[i] == 9)
                        setPixelColor(MusicIndexes[i] - j, DimColorShift(0xff00b6, 1));
                    else if (MusicVolumes[i] == 10)
                        setPixelColor(MusicIndexes[i] - j, 0xffffff);
                }
            }
        }

        for (int i = 0; i < NUM_LEDS; i++)
        {
            setPixelColor(i, DimColorShift(getPixelColor(i), 1));
        }
        IncrementMusic();
        show();
    }

    // Update the Rainbow Cycle Pattern
    void RainbowCycleUpdate()
    {
        for (int i = 0; i < NUM_LEDS; i++)
        {
            setPixelColor(i, Wheel(((i * 256 / NUM_LEDS) + Index) & 255));
        }
        show();
        Increment();
    }

    // Initialize for a Theater Chase
    void TheaterChase(uint32_t color1, uint32_t color2, uint8_t interval, direction dir = FORWARD)
    {
        ActivePattern = THEATER_CHASE;
        Interval = interval;
        TotalSteps = NUM_LEDS;
        Color1 = color1;
        Color2 = color2;
        Index = 0;
        Direction = dir;
    }

    // Update the Theater Chase Pattern
    void TheaterChaseUpdate()
    {
        for (int i = 0; i < NUM_LEDS; i++)
        {
            if ((i + Index) % 3 == 0)
            {
                setPixelColor(i, Color1);
            }
            else
            {
                setPixelColor(i, Color2);
            }
        }
        show();
        Increment();
    }

    void Twinkle(uint32_t color1, uint8_t interval)
    {
        ActivePattern = TWINKLE;
        Interval = interval;
        Color1 = color1;
    }

    void TwinkleUpdate()
    {

        Increment();
        if (Index % 2 == 0)
        {
            for (int i = 0; i < NUM_LEDS; i++)
            {
                setPixelColor(i, DimColorShift(getPixelColor(i), 1));
            }
        } // // Fade all pixels
        // Randomly choose if we are going to light a pixel
        uint8_t no_twinkle = random(0, 3);
        if (no_twinkle == 0)
        {
            // Light a random pixel
            setPixelColor(random(0, NUM_LEDS), Color1);
        }
        show();
    }

    // Initialize for a ColorWipe
    void ColorWipe(uint32_t color, uint8_t interval, direction dir = FORWARD)
    {
        ActivePattern = COLOR_WIPE;
        Interval = interval;
        TotalSteps = NUM_LEDS;
        Color1 = color;
        Index = 0;
        Direction = dir;
    }

    // Update the Color Wipe Pattern
    void ColorWipeUpdate()
    {
        setPixelColor(Index, Color1);
        show();
        Increment();
    }

    // Initialize for a SCANNNER
    void Game(uint8_t interval)
    {
        if (ActivePattern == GAME)
        {
            // make game harder
            Interval = Interval - 2;
            if (Interval < 0)
                Interval = 20;
            int dst = abs((Index % NUM_LEDS) - GamePos);
            int distance = min(NUM_LEDS - dst, dst);
            // win
            if (distance <= 6)
            {
                ColorSet(0x00ff00);
                show();
                delay(500);
            }
            // lose
            else
            {
                ColorSet(0xff0000);
                show();
                delay(500);
            }
        }
        else
        {
            Interval = interval;
            ActivePattern = GAME;
            TotalSteps = (NUM_LEDS - 1);
        }
        Index = random(NUM_LEDS);
        GamePos = random(NUM_LEDS);
    }

    // Update the Game Pattern
    void GameUpdate()
    {

        for (int i = 0; i < NUM_LEDS; i++)
        {
            if (i == Index) // Scan Pixel to the right
            {
                setPixelColor(i, Color1);
            }
            // else if (i == TotalSteps - Index) // Scan Pixel to the left
            // {
            //   setPixelColor(i, Color1);
            // }
            else // Fading tail
            {
                setPixelColor(i, DimColor(getPixelColor(i)));
            }
        }
        // show target
        for (int i = GamePos - 3; i < GamePos + 3; i++)
        {
            setPixelColor(i % NUM_LEDS, Color2);
        }

        int distance = abs((Index)-GamePos);
        Serial.print("DISTANCE : ");
        Serial.println(distance);
        Serial.print("GAMEPOS  : ");
        Serial.println(GamePos);
        Serial.print("Index    : ");
        Serial.println(Index);
        Serial.println("========================");

        show();
        Increment();
    }

    // Initialize for a Fade
    void Fade(uint32_t color1, uint32_t color2, uint16_t steps, uint8_t interval, direction dir = FORWARD)
    {
        ActivePattern = FADE;
        Interval = interval;
        TotalSteps = steps;
        Color1 = color1;
        Color2 = color2;
        Index = 0;
        Direction = dir;
    }

    // Update the Fade Pattern
    void FadeUpdate()
    {
        // Calculate linear interpolation between Color1 and Color2
        // Optimise order of operations to minimize truncation error
        uint8_t red = ((Red(Color1) * (TotalSteps - Index)) + (Red(Color2) * Index)) / TotalSteps;
        uint8_t green = ((Green(Color1) * (TotalSteps - Index)) + (Green(Color2) * Index)) / TotalSteps;
        uint8_t blue = ((Blue(Color1) * (TotalSteps - Index)) + (Blue(Color2) * Index)) / TotalSteps;

        ColorSet(Color(red, green, blue));
        show();
        Increment();
    }

    // Calculate 50% dimmed version of a color (used by ScannerUpdate)
    uint32_t DimColor(uint32_t color)
    {
        // Shift R, G and B components one bit to the right
        uint32_t dimColor = Color(Red(color) >> 1, Green(color) >> 1, Blue(color) >> 1);
        return dimColor;
    }

    uint32_t DimColorShift(uint32_t color, uint8_t shift = 1)
    {
        uint32_t dimColor = Color(Red(color) >> shift, Green(color) >> shift, Blue(color) >> shift);
        return dimColor;
    }

    // Set all pixels to a color (synchronously)
    void ColorSet(uint32_t color)
    {
        for (int i = 0; i < NUM_LEDS; i++)
        {
            setPixelColor(i, color);
        }
        show();
    }

    // Returns the Red component of a 32-bit color
    uint8_t Red(uint32_t color)
    {
        return (color >> 16) & 0xFF;
    }

    // Returns the Green component of a 32-bit color
    uint8_t Green(uint32_t color)
    {
        return (color >> 8) & 0xFF;
    }

    // Returns the Blue component of a 32-bit color
    uint8_t Blue(uint32_t color)
    {
        return color & 0xFF;
    }

    // Input a value 0 to 255 to get a color value.
    // The colours are a transition r - g - b - back to r.
    uint32_t Wheel(byte WheelPos)
    {
        WheelPos = 255 - WheelPos;
        if (WheelPos < 85)
        {
            return Color(255 - WheelPos * 3, 0, WheelPos * 3);
        }
        else if (WheelPos < 170)
        {
            WheelPos -= 85;
            return Color(0, WheelPos * 3, 255 - WheelPos * 3);
        }
        else
        {
            WheelPos -= 170;
            return Color(WheelPos * 3, 255 - WheelPos * 3, 0);
        }
    }
};

void StickComplete();

NeoPatterns Stick(NUM_LEDS, D3, NEO_GRB + NEO_KHZ800, &StickComplete);

void sendCrossOriginHeader()
{
    server.send(204);
}

void setCrossOrigin()
{
    server.sendHeader(F("Access-Control-Allow-Origin"), F("*"));
    server.sendHeader(F("Access-Control-Max-Age"), F("600"));
    server.sendHeader(F("Access-Control-Allow-Methods"), F("PUT,POST,GET,OPTIONS"));
    server.sendHeader(F("Access-Control-Allow-Headers"), F("*"));
};

void setMusic()
{
    setCrossOrigin();
    String colorsStr = server.arg("plain");

    DynamicJsonDocument doc(1024 * 2);
    DeserializationError error = deserializeJson(doc, colorsStr);
    if (error)
    {
        Serial.print(F("Error parsing JSON "));
        Serial.println(error.c_str());

        String msg = error.c_str();
        server.send(400, F("text/html"),
                    "Error parsing json body! <br>" + msg);
    }
    else
    {
        JsonObject postObj = doc.as<JsonObject>();

        if (server.method() == HTTP_POST)
        {

            if (postObj.containsKey("volume"))
            {

                Serial.println(F("done."));
                int volume = postObj["volume"];
                Stick.Music(40, volume);
            }

            DynamicJsonDocument response(512);
            response["status"] = "OK";
            String buf;
            serializeJson(response, buf);
            server.send(201, F("application/json"), buf);
            Serial.print(F("done."));
        }
    }
}

void setColors()
{
    setCrossOrigin();
    String colorsStr = server.arg("plain");

    DynamicJsonDocument doc(1024 * 2);
    DeserializationError error = deserializeJson(doc, colorsStr);
    if (error)
    {
        Serial.print(F("Error parsing JSON "));
        Serial.println(error.c_str());

        String msg = error.c_str();
        server.send(400, F("text/html"),
                    "Error parsing json body! <br>" + msg);
    }
    else
    {
        JsonArray postObj = doc.as<JsonArray>();

        if (server.method() == HTTP_POST)
        {

            Serial.println(F("done."));

            // pixels.clear();
            // part [0 - 16]
            int nledPart = int(NUM_LEDS / postObj.size() + 0.5);
            for (int led_id = 0; led_id < NUM_LEDS; led_id++)
            {
                int colorIndex = int(led_id / nledPart);
                if (colorIndex >= postObj.size())
                {
                    colorIndex = postObj.size() - 1;
                }
                int color = postObj[colorIndex];
                Stick.setPixelColor(led_id, color);
            }
            Stick.show();
            Stick.ActivePattern = DO_NOTHING;

            DynamicJsonDocument response(512);
            response["status"] = "OK";
            String buf;
            serializeJson(response, buf);
            server.send(201, F("application/json"), buf);
            Serial.print(F("done."));
        }
    }
}

void setColor()
{
    setCrossOrigin();
    String colorsStr = server.arg("plain");

    DynamicJsonDocument doc(128);
    DeserializationError error = deserializeJson(doc, colorsStr);
    if (error)
    {
        Serial.print(F("Error parsing JSON "));
        Serial.println(error.c_str());

        String msg = error.c_str();
        server.send(400, F("text/html"),
                    "Error parsing json body! <br>" + msg);
    }
    else
    {
        JsonObject postObj = doc.as<JsonObject>();

        if (server.method() == HTTP_POST)
        {
            if (postObj.containsKey("id") and postObj.containsKey("color"))
            {
                Stick.clear();
                int id = postObj["id"];
                int color = postObj["color"];
                Stick.setPixelColor(id, color);
                Stick.show();
                Stick.ActivePattern = DO_NOTHING;
            }

            DynamicJsonDocument response(512);
            response["status"] = "OK";
            String buf;
            serializeJson(response, buf);
            server.send(201, F("application/json"), buf);
            Serial.print(F("done."));
        }
    }
}

void setAnimation()
{
    setCrossOrigin();
    String colorsStr = server.arg("plain");

    DynamicJsonDocument doc(512);
    DeserializationError error = deserializeJson(doc, colorsStr);
    if (error)
    {
        Serial.print(F("Error parsing JSON "));
        Serial.println(error.c_str());

        String msg = error.c_str();
        server.send(400, F("text/html"),
                    "Error parsing json body! <br>" + msg);
    }
    else
    {
        JsonObject postObj = doc.as<JsonObject>();

        if (server.method() == HTTP_POST)
        {
            if (postObj.containsKey("color1") && postObj.containsKey("color2"))
            {
                Serial.println("SET COLOR");
                Stick.Color1 = postObj["color1"];
                Stick.Color2 = postObj["color2"];
            }

            if (postObj.containsKey("name"))
            {
                Serial.println("SET ANIMATION");
                String animation = postObj["name"];
                Serial.println(animation);

                if (animation == "rainbow")
                {
                    Serial.println("rainbow");
                    Stick.RainbowCycle(10, FORWARD);
                }
                else if (animation == "scanner")
                {
                    Serial.println("scanner");
                    Stick.Scanner(Stick.Color1, 10);
                }
                else if (animation == "game")
                {
                    Serial.println("game");
                    Stick.Game(50);
                }
                else if (animation == "twinkle")
                {
                    Serial.println("twinkle");
                    Stick.Twinkle(Stick.Color1, 150);
                }
                else if (animation == "reverse")
                {
                    Serial.println("reverse");
                    Stick.Reverse();
                }
                else if (animation == "theater")
                {
                    Serial.println("theater");
                    Stick.TheaterChase(Stick.Color1, Stick.Color2, 10, FORWARD);
                }
                else if (animation == "wipe")
                {
                    Serial.println("wipe");
                    Stick.ColorWipe(Stick.Color1, 10, FORWARD);
                }
                else if (animation == "off")
                {
                    Serial.println("off");
                    Stick.Off();
                }
                else if (animation == "fade")
                {
                    Serial.println("fade");
                    Stick.Fade(Stick.Color1, Stick.Color2, 100, 1, FORWARD);
                }
            }

            DynamicJsonDocument response(512);
            response["status"] = "OK";
            String buf;
            serializeJson(response, buf);
            server.send(201, F("application/json"), buf);
            Serial.print(F("done."));
        }
    }
}

void setAnimationColors()
{
    setCrossOrigin();
    String colorsStr = server.arg("plain");

    DynamicJsonDocument doc(512);
    DeserializationError error = deserializeJson(doc, colorsStr);
    if (error)
    {
        Serial.print(F("Error parsing JSON "));
        Serial.println(error.c_str());

        String msg = error.c_str();
        server.send(400, F("text/html"),
                    "Error parsing json body! <br>" + msg);
    }
    else
    {
        JsonObject postObj = doc.as<JsonObject>();

        if (server.method() == HTTP_POST)
        {
            if (postObj.containsKey("color1") && postObj.containsKey("color2"))
            {
                Serial.println("SET COLOR");
                Stick.Color1 = postObj["color1"];
                Stick.Color2 = postObj["color2"];
            }

            DynamicJsonDocument response(512);
            response["status"] = "OK";
            String buf;
            serializeJson(response, buf);
            server.send(201, F("application/json"), buf);
            Serial.print(F("done."));
        }
    }
}

// Define routing
void restServerRouting()
{
    server.on("/", HTTP_GET, []()
              { server.send(200, F("text/html"),
                            F("Welcome to the REST Web Server")); });
    // handle post request
    server.on(F("/setMusic"), HTTP_POST, setMusic);
    server.on(F("/setMusic"), HTTP_OPTIONS, sendCrossOriginHeader);
    server.on(F("/setColors"), HTTP_POST, setColors);
    server.on(F("/setColors"), HTTP_OPTIONS, sendCrossOriginHeader);
    server.on(F("/setColor"), HTTP_POST, setColor);
    server.on(F("/setColor"), HTTP_OPTIONS, sendCrossOriginHeader);
    server.on(F("/setAnimation"), HTTP_POST, setAnimation);
    server.on(F("/setAnimation"), HTTP_OPTIONS, sendCrossOriginHeader);
    server.on(F("/setAnimationColors"), HTTP_POST, setAnimationColors);
    server.on(F("/setAnimationColors"), HTTP_OPTIONS, sendCrossOriginHeader);
}

// Manage not found URL
void handleNotFound()
{
    if (server.method() == HTTP_OPTIONS)
    {
        server.sendHeader("Access-Control-Allow-Origin", "*");
        server.sendHeader("Access-Control-Max-Age", "10000");
        server.sendHeader("Access-Control-Allow-Methods", "PUT,POST,GET,OPTIONS");
        server.sendHeader("Access-Control-Allow-Headers", "*");
        server.send(204);
    }
    else
    {
        server.send(404, "text/plain", "");
    }
}

void setup()
{
    Serial.begin(115200);

// server
#if defined(__AVR_ATtiny85__) && (F_CPU == 16000000)
    clock_prescale_set(clock_div_1);
#endif
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);

    // Wait for connection
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.print("Connected to ");
    Serial.println(ssid);
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
    if (MDNS.begin("esp8266"))
        Serial.println("MDNS responder started");
    restServerRouting();
    server.onNotFound(handleNotFound);
    server.begin();
    Serial.println("HTTP server started");

    // stick
    Stick.begin();
    // Stick.Scanner(Stick.Color(255, 0, 255), 55);
}

void loop()
{
    Stick.Update();
    server.handleClient();
}

void StickComplete()
{
    Stick.Color1 = Stick.Wheel(random(255));
}