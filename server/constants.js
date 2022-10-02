const keyMirror = require("key-mirror");

const clientEvents = keyMirror({
  FETCH_ALL_MESSAGES: null,
  FETCH_ALL_CHANNELS: null,
  FETCH_ALL_USERS: null,
  FETCH_ALL_REACTIONS: null,
  CREATE_CHANNEL: null,
  CREATE_MESSAGE: null,
  CREATE_REACTION: null,
  EDIT_MESSAGE: null,
  DELETE_REACTION: null,
  CREATE_USER: null,
  LOG_IN: null,
  LOG_OUT: null,
});

const serverEvents = keyMirror({
  UPDATE_ALL_MESSAGES: null,
  UPDATE_ALL_CHANNELS: null,
  UPDATE_ALL_USERS: null,
  UPDATE_ALL_REACTIONS: null,
});

const MESSAGE_LIMIT = 256;

const REACTIONS = {
  1: '👍',
  2: '❤️',
  3: '😂',
};

module.exports = {
  clientEvents,
  serverEvents,
  MESSAGE_LIMIT,
  REACTIONS,
};
