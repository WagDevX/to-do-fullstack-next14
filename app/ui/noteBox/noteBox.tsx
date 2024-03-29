"use client";
import { NoteType } from "@/app/lib/definitions";
import EditIcon from "../icons/edit";
import FavoritedIcon from "../icons/favoritedIcon";
import TintIcon from "../icons/tint";
import DeleteIcon from "../icons/close";
import { deleteNote, favoriteNote } from "@/app/lib/actions";
import { useState, useTransition } from "react";
import FavoriteIcon from "../icons/favorite";
import TaskBoxForm from "./noteBoxForm";
import SpinnerLoader from "../loader/spinner-loader";
import { Tooltip } from "react-tooltip";
import EditColorToolip from "./editColorTooltip";

type Props = {
  note: NoteType;
};

export default function NoteBox({ note }: Props) {
  const [isPendingFavorite, startTransitionFavorite] = useTransition();
  const [isPendingDelete, startTransitionDelete] = useTransition();
  const [editNote, setEditNote] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleIconFavorite = () => {
    return note.favorited ? <FavoritedIcon /> : <FavoriteIcon />;
  };

  const handleFavorite = () => {
    startTransitionFavorite(() => favoriteNote(note._id, !note.favorited));
  };

  const handleOpenTooltip = (ev: any) => {
    ev.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleEditNote = (ev: any) => {
    ev.preventDefault();
    setEditNote(!editNote);
  };

  const handleSetBacktoDefault = () => {
    setEditNote(!editNote);
  };

  return (
    <>
      {editNote ? (
        <TaskBoxForm note={note} setBackToDefault={handleSetBacktoDefault} />
      ) : (
        <div
          style={{ backgroundColor: note.color }}
          className={`aspect-[6.5/7.3] flex-col rounded-3xl bg-white ${note.favorited && "shadow-3xl"} `}
        >
          <div
            className={`flex justify-between border-b-2 ${note.color ? "border-white" : ""} px-6 pb-2 pt-5`}
          >
            <h1 className="font-bold text-neutral-800">{note.title}</h1>
            <button
              aria-label="Favoritar nota"
              onClick={() => handleFavorite()}
            >
              {isPendingFavorite ? (
                <SpinnerLoader size={20} />
              ) : (
                handleIconFavorite()
              )}
            </button>
          </div>
          <div className="flex h-full flex-col justify-between px-6 py-5">
            <p className="mb-4 overflow-auto whitespace-pre-line text-xs	font-normal text-neutral-800">
              {note.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  aria-label="Editar nota"
                  onClick={(ev) => handleEditNote(ev)}
                  className="rounded-full p-1 transition-all duration-150 hover:bg-orange-400/50"
                >
                  <EditIcon />
                </button>
                <button
                  aria-label="Editar cor da nota"
                  onClick={(ev) => handleOpenTooltip(ev)}
                  data-tooltip-id={`${note._id}`}
                  className="rounded-full p-1.5 transition-all duration-150 "
                >
                  <TintIcon />
                </button>
                <Tooltip
                  id={`${note._id}`}
                  isOpen={isOpen}
                  clickable={true}
                  positionStrategy="absolute"
                  offset={0}
                  place="bottom-start"
                  disableStyleInjection={true}
                >
                  <EditColorToolip note={note} />
                </Tooltip>
              </div>
              <button
                aria-label="Deletar nota"
                disabled={isPendingDelete}
                onClick={() =>
                  startTransitionDelete(async () => await deleteNote(note._id))
                }
              >
                {isPendingDelete ? <SpinnerLoader size={20} /> : <DeleteIcon />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
