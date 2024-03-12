"use client";

import React from "react";
import EmptyOrg from "./_components/empty-org";
import { useOrganization } from "@clerk/nextjs";
import BoardList from "./_components/boardlist";

interface PageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

const Page = ({ searchParams }: PageProps) => {
  const { organization } = useOrganization();

  return (
    <div className="p-6 flex-1 h-[calc(100%-80px)]">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList
          orgId={organization.id}
          query={searchParams}
        />
      )}
    </div>
  );
};

export default Page;