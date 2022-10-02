import React from "react";
import classnames from "classnames";
import { REACTIONS } from "../constants";
import styles from "./Reactions.module.css";
import { useReactionStore } from "../stores/reactions";
import { createReaction, deleteReaction } from "../actions";
import { useActiveChannel } from "../hooks/channels";
import { useActiveUser } from "../hooks/users";

const Reactions = ({ messageId, ...props }) => {
    const allReactions = useReactionStore((state) => state.reactions);

    const reactionsForCurrentMessage = React.useMemo(
        () =>
        allReactions.filter((reaction) => reaction.messageId === messageId),
        [messageId, allReactions]
    );

    const activeUser = useActiveUser();
    
    const {id: channelId} = useActiveChannel();

    const reactToMessage = ({content, activeUserHasReaction}) => {
        if (activeUserHasReaction) {
            const {id: reactionId} = reactionsByType[content].filter((reaction) => reaction.userId === activeUser.id)[0];
            deleteReaction({channelId, messageId, reactionId});
        }
        else {
            createReaction(channelId, messageId, content);
        }
    }

    const reactionsByType = Object.keys(REACTIONS).reduce((acc, content) => {
        return { ...acc, [content]: reactionsForCurrentMessage.filter((reaction) => reaction.content === content)}
    }, {});

    return (
        <div>
            {Object.keys(REACTIONS).map(content => {
                const activeUserHasReaction = Boolean(reactionsByType[content].filter((reaction) => reaction.userId === activeUser.id).length); 

                return (
                    <button
                        className={classnames(styles.reaction, { [styles.userHasReaction]: activeUserHasReaction })}
                        key={content}
                        onClick={() => reactToMessage({content, activeUserHasReaction })}
                    >
                        {REACTIONS[content]}
                        <span className={styles.reactionCount}>{reactionsByType[content].length}</span>
                    </button>
            )}
        )}
        </div>
    )
};

export default Reactions;