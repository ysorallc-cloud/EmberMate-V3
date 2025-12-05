// app/components/two-minute-reset/config.ts

export type ResetStep = {
  id: number;
  title: string;
  prompt: string;
  options: string[];
};

export const TWO_MINUTE_RESET_STEPS: ResetStep[] = [
  {
    id: 1,
    title: "First, pause",
    prompt: "What feels loudest in your body or mind right now?",
    options: [
      "My thoughts are racing",
      "My body feels tense",
      "I'm tired and heavy",
      "I just feel off"
    ]
  },
  {
    id: 2,
    title: "Name one thing",
    prompt: "If you had to name ONE thing that needs attention, what is it?",
    options: [
      "Pain or discomfort",
      "Stress or worry",
      "Energy is low",
      "Mood feels rough"
    ]
  },
  {
    id: 3,
    title: "Check your support",
    prompt: "What kind of support would help for the next few hours?",
    options: [
      "Practical help (rides, meals, meds)",
      "Emotional support (listening, company)",
      "Quiet time / space",
      "I’m not sure yet"
    ]
  },
  {
    id: 4,
    title: "Right-size the moment",
    prompt: "How urgent does this feel for you?",
    options: [
      "Red – needs attention soon",
      "Yellow – watching it closely",
      "Green – I just needed to name it"
    ]
  },
  {
    id: 5,
    title: "Choose a next step",
    prompt: "What is one kind next step you can take after this reset?",
    options: [
      "Send a quick update to my care team",
      "Adjust my plans for the day",
      "Take a short break to breathe",
      "Write down a note for later"
    ]
  },
  {
    id: 6,
    title: "Check your capacity",
    prompt: "How much capacity do you feel you have for the rest of today?",
    options: [
      "Running low – I need to protect my energy",
      "Moderate – I can handle a few things",
      "Steady – I feel okay moving ahead"
    ]
  },
  {
    id: 7,
    title: "Close the loop",
    prompt: "How would you like EmberMate to treat this reset?",
    options: [
      "Save as a note for my next visit",
      "Use this to adjust today’s tone",
      "Just needed a moment – no follow up"
    ]
  }
];
