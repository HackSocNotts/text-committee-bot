import { PresenceData } from 'discord.js';

const presences: PresenceData[] = [
  {
    game: {
      name: "Snake",
      type: "PLAYING",
    }
  },
  {
    game: {
      name: "Text Messages",
      type: "STREAMING"
    }
  },
  {
    game: {
      name: "Something",
      type: "WATCHING",
    }
  },
  {
    game: {
      name: "A game jam",
      type: "WATCHING",
    }
  },
  {
    game: {
      name: "Text a person",
      type: "PLAYING",
    }
  }
];

export default presences;
