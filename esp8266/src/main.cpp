
#include "Arduino.h"
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <ArduinoJson.h>
#include <Adafruit_NeoPixel.h>
#include <ESPAsyncWebServer.h>
#ifdef __AVR__
#include <avr/power.h> // Required for 16 MHz Adafruit Trinket
#endif

#define PIN D3
#include "./animations/rainbow.hpp"
#include "./animations/wipe.hpp"
#include "./animations/theater_chase.hpp"
#include "./animations/random_color_twinkle.hpp"
#include "./animations/off.hpp"
int NUM_LEDS = 900;

const char *ssid = "Freebox-ACD532";
const char *password = "labebantur9#-sardinia*-appie?4-supponatis";

Adafruit_NeoPixel pixels(NUM_LEDS, PIN, NEO_GRB + NEO_KHZ800);
ESP8266WebServer server(80);

void status_ok()
{
}

void setColors()
{
  String colorsStr = server.arg("plain");

  DynamicJsonDocument doc(1024 * 20);
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
      for (int i = 0; i < postObj.size(); i++)
      {
        int color = postObj[i];
        pixels.setPixelColor(i, color);
      }
      pixels.show();

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
      if (postObj.containsKey("id") and postObj.containsKey("color"))
      {
        pixels.clear();
        int id = postObj["id"];
        int color = postObj["color"];
        pixels.setPixelColor(id, color);
        pixels.show();
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
      Serial.println("SET ANIMATION");
      if (postObj.containsKey("name"))
      {
        String animation = postObj["name"];
        Serial.println(animation);

        // theaterChase(0x0000ff, 100, &pixels, NUM_LEDS);

        if (animation == "rainbow")
        {
          rainbowCycle(2, &pixels, NUM_LEDS);
        }
        if (animation == "twinkle")
        {
          TwinkleRandom(500, 2, false, &pixels, NUM_LEDS);
        }
        if (animation == "theater")
        {
          theaterChaseRainbow(10, &pixels, NUM_LEDS);
        }
        if (animation == "wipe")
        {
          colorWipe(0x00ff00, 1, &pixels, NUM_LEDS);
        }
        if (animation == "off")
        {
          off(&pixels, NUM_LEDS);
        }
        pixels.clear();
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
  server.on(F("/setColors"), HTTP_POST, setColors);
  server.on(F("/setColor"), HTTP_POST, setColor);
  server.on(F("/setAnimation"), HTTP_POST, setAnimation);
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
#if defined(__AVR_ATtiny85__) && (F_CPU == 16000000)
  clock_prescale_set(clock_div_1);
#endif
  pixels.begin();

  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.println("");

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

  // Activate mDNS this is used to be able to connect to the server
  // with local DNS hostmane esp8266.local
  if (MDNS.begin("esp8266"))
  {
    Serial.println("MDNS responder started");
  }

  // Set server routing
  restServerRouting();
  // Set not found response
  server.onNotFound(handleNotFound);
  // Start server
  server.begin();
  Serial.println("HTTP server started");
}

void loop()
{
  server.handleClient();
}