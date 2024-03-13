"use client";

import React from "react";
import UserAvatar from "./user-avatar";
import { useOthers, useSelf } from "@/liveblocks.config";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN_OTHER_USERS = 2;

const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUser = users.length > MAX_SHOWN_OTHER_USERS;

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md flex items-center shadow-md p-3">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_OTHER_USERS).map(({ connectionId, info }) => (
          <UserAvatar
            key={connectionId}
            src={info?.picture}
            name={info?.name}
            fallback={info?.name?.[0] || "T"}
            borderColor={connectionIdToColor(connectionId)}
          />
        ))}
        {currentUser && (
          <UserAvatar
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0] || "U"}
            borderColor={connectionIdToColor(currentUser.connectionId)}
          />
        )}
        {hasMoreUser && <UserAvatar name={`+${users.length - MAX_SHOWN_OTHER_USERS}`} />}
      </div>
    </div>
  );
};

export default Participants;

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md flex items-center shadow-md p-3 w-[100px]"></div>
  );
};
