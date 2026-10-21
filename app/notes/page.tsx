"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";

type Note = {
  id: number;
  title: string;
  body: string;
  date: string;
};

const starterNotes: Note[] = [
  {
    id: 1,
    title: "A fresh start",
    body: "Small steps still move you forward. Make a little space for the things that make today feel good.",
    date: "Today",
  },
  {
    id: 2,
    title: "Remember",
    body: "Pick up a few flowers on the way home. The yellow ones by the market looked lovely.",
    date: "Yesterday",
  },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(starterNotes);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function addNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const note: Note = {
      id: Date.now(),
      title: title.trim(),
      body: body.trim(),
      date: "Just now",
    };
    setNotes((current) => [note, ...current]);
    setTitle("");
    setBody("");
  }

  return (
    <main className="notes-page">
      <header className="notes-header">
        <Link className="notes-brand" href="/" aria-label="Morrow home">
          <span className="brand-mark">m</span>
          <span>MORROW</span>
        </Link>
        <div className="header-greeting">
          <span className="greeting-dot" />
          YOUR QUIET CORNER
        </div>
        <Link className="signout-link" href="/">
          Sign out
        </Link>
      </header>

      <section className="notes-main">
        <div className="notes-heading">
          <div>
            <span className="eyebrow login-eyebrow">YOUR NOTEBOOK</span>
            <h1>A place to begin.</h1>
            <p>Keep the thoughts you want to come back to.</p>
          </div>
          <div className="notes-count">
            <span>{String(notes.length).padStart(2, "0")}</span>
            <small>{notes.length === 1 ? "NOTE" : "NOTES"}</small>
          </div>
        </div>

        <form className="new-note-card" onSubmit={addNote}>
          <div className="new-note-heading">
            <span className="new-note-icon" aria-hidden="true">✳</span>
            <div>
              <h2>Catch a thought</h2>
              <p>It doesn’t have to be perfect. Just put it here.</p>
            </div>
          </div>
          <label className="visually-hidden" htmlFor="note-title">Note title</label>
          <input
            id="note-title"
            className="note-title-input"
            placeholder="Give this note a name..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <label className="visually-hidden" htmlFor="note-body">Note content</label>
          <textarea
            id="note-body"
            placeholder="What’s on your mind?"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={3}
            required
          />
          <div className="new-note-actions">
            <span>A thought saved is a thought held gently.</span>
            <button type="submit">Save note <span aria-hidden="true">↗</span></button>
          </div>
        </form>

        <div className="notes-list-heading">
          <h2>Your notes</h2>
          <span>RECENT FIRST</span>
        </div>
        {notes.length > 0 ? (
          <div className="notes-grid">
            {notes.map((note, index) => (
              <article className={`saved-note note-tone-${index % 3}`} key={note.id}>
                <div className="saved-note-top">
                  <span className="note-date">{note.date}</span>
                  <button
                    className="delete-note"
                    type="button"
                    aria-label={`Delete ${note.title}`}
                    onClick={() => setNotes((current) => current.filter((item) => item.id !== note.id))}
                  >
                    ×
                  </button>
                </div>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
                <span className="saved-note-flower" aria-hidden="true">✳</span>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-notes">
            <span aria-hidden="true">✳</span>
            <p>Your page is clear. Add a note when a thought finds you.</p>
          </div>
        )}
      </section>
      <footer className="notes-footer">Take your time. You’re right where you need to be.</footer>
    </main>
  );
}
