"use client";

import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useAuth0 } from "@auth0/auth0-react";
import { bookmarkAtom } from "../../atoms/atoms";
import { useState, useEffect } from "react";
import { useRecoilValueLoadable } from "recoil";
import { useNavigate } from "react-router-dom";

export function CommandDialogDemo() {
  const { user } = useAuth0();
  const email: string = user?.email || "";
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const notesLoadable = useRecoilValueLoadable(bookmarkAtom(email));
  const [notes, setNotes] = useState();

  const handleCommandSelect = (videoId) => {
    setOpen(false);
    navigate(`/dashboard/fluxdetail/${videoId}`);
  };

  useEffect(() => {
    if (notesLoadable.state === "hasValue") {
      setNotes(notesLoadable.contents);
    }
  }, [notesLoadable]);
  const bookmarkedNotes = notes?.filter((note) => note.bookmarked);

  console.log("Bookmark", bookmarkedNotes);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem
              onSelect={() => {
                setOpen(false);
                navigate("/dashboard");
              }}
            >
              <Calendar className="mr-2 h-4 w-4" />
              <span>Create New Flux</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                navigate("/dashboard/bookmarkednotes");
              }}
            >
              <Smile className="mr-2 h-4 w-4" />
              <span>Bookmarks</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Connect to Notion</span>
            </CommandItem>
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Custom API key</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Bookmarked Flux">
            {bookmarkedNotes &&
              bookmarkedNotes?.map((note) => (
                <CommandItem
                  className="cursor-pointer"
                  key={note.videoId}
                  onSelect={() => handleCommandSelect(note.videoId)}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>{note.title}</span>
                </CommandItem>
              ))}
            <CommandItem></CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
