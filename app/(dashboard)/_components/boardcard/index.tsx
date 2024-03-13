import Image from "next/image";
import Link from "next/link";
import React from "react";
import Overlay from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Action } from "@radix-ui/react-alert-dialog";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}

const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;

  const { pending: pendingFavorite, mutate: favorite } = useApiMutation(api.board.favorite);
  const { pending: pendingUnfavorite, mutate: unfavorite } = useApiMutation(api.board.unfavorite);

  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const toggleFavorite = () => {
    if (isFavorite) {
      unfavorite({ id })
        // .then(() => {
        //   console.log("Board unfavorite successfully");
        // })
        .catch((e) => {
          console.log(e);
          toast.error("Failed to unfavorite board");
        });
    } else {
      favorite({ id, orgId })
        // .then(() => {
        //   console.log("Board favorite successfully");
        // })
        .catch((e) => {
          console.log(e);
          toast.error("Failed to favorite board");
        });
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group border rounded-lg flex flex-col justify-between overflow-hidden aspect-[100/127]">
        <div className="relative flex-1 bg amber-50">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-fit"
          />
          <Overlay />
          <Actions
            id={id}
            title={title}
            side="right"
          >
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  );
};

export default BoardCard;

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden aspect-[100/127]">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
