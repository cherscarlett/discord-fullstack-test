const path = require("path");
const Datastore = require("../lib/datastore");
const sortUtil = require("../util/sort");
const { REACTIONS } = require("../constants");

const db = new Datastore({
  filename: path.join(__dirname, "../data/reactions.db"),
});

class Reaction {
  constructor(rawReaction) {
    const { _id: id, channelId, messageId, content, userId, createdAt } = rawReaction;
    this.createdAt = createdAt == null ? Date.now() : createdAt;
    this.id = id;
    this.channelId = channelId;
    this.messageId = messageId;
    this.content = content;
    this.userId = userId;
  }

  static getAll() {
    return db
      .find({})
      .then((rawReactions) =>
        sortUtil
          .sortByCreation(rawReactions)
          .map((rawReaction) => new Reaction(rawReaction))
      );
  }

  static getById(id) {
    return db.findOne({ _id: id }).then((rawReaction) => {
      if (rawReaction != null) {
        return new Reaction(rawReaction);
      }
    });
  }

  validate() {
    if (!Object.keys(REACTIONS).includes(this.content)) {
      throw new Error("Invalid reaction");
    }
  }

  delete(id) {
    try {
        return db.remove({ _id: id });
    } catch (e) {
        return Promise.reject(e);
    }
  }

  save() {
    try {
      this.validate();
      return db.update({ _id: this.id }, this.serialize(), { upsert: true });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  serialize() {
    return {
      channelId: this.channelId,
      messageId: this.messageId,
      createdAt: this.createdAt,
      content: this.content,
      userId: this.userId,
    };
  }
}

module.exports = Reaction;
