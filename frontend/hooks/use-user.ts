import type { Note } from "@/types/note";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "@/types/decoded-token";
import axios from "axios";

export function useUser() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loadingNote, setLoadingNote] = useState<boolean>(false);
  const [noteError, setNoteError] = useState<string | boolean | null>(false);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [invalidToken, setInvalidToken] = useState<boolean>(false);
  const [tokenNotFound, setTokenNotFound] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const authToken: string | null = localStorage.getItem("authToken");
    let decodedUser: DecodedToken | null = null;
    setAuthToken(authToken);
    if (!authToken) {
      setTokenNotFound(true);
      return;
    }

    try {
      decodedUser = jwtDecode<DecodedToken>(authToken);
      setUser(decodedUser);
    } catch (error: unknown) {
      if (error) {
        setInvalidToken(true);
      }
    }

    const fetchNotes = async () => {
      setLoadingNote(true);
      setNoteError(false);
      try {
        const response = await axios.get<Note[]>(
          `http://localhost:5500/api/note?user_id=${decodedUser?._id}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        setNotes(response.data);
      } catch (error: unknown) {
        if (error) setNoteError(true);
        throw error;
      } finally {
        setLoadingNote(false);
      }
    };

    fetchNotes();
  }, [authToken]);

  return {
    user,
    authToken,
    invalidToken,
    tokenNotFound,
    notes,
    loadingNote,
    noteError,
  };
}
