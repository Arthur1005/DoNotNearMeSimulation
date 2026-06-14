/*
 * Arduino Distance Sensor Sketch for Interactive Chaos Project
 * Hardware: HC-SR04 Ultrasonic Sensor
 */

#define TRIG_PIN 9
#define ECHO_PIN 10

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

void loop() {
  // Clear the trigPin
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  
  // Set the trigPin on HIGH state for 10 micro seconds
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  // Reads the echoPin, returns the sound wave travel time in microseconds
  long duration = pulseIn(ECHO_PIN, HIGH);
  
  // Calculating the distance (in cm)
  int distance = duration * 0.034 / 2;

  // Filter out unrealistic readings for an exhibition space (e.g., 10cm to 250cm)
  if (distance > 5 && distance < 300) {
    Serial.println(distance);
  }
  
  delay(50); // ~20 frames per second for smooth interaction
}
