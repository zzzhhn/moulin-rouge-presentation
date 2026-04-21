"use client";

import React from "react";

interface SpeakerNotesProps {
  visible: boolean;
  note: string;
}

export default function SpeakerNotes({ visible, note }: SpeakerNotesProps) {
  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 h-28 bg-black border-t-2 border-[#00ff00] z-[100] font-mono text-sm p-4 text-[#00ff00] transition-transform duration-300"
        style={{
          transform: visible ? "translateY(0)" : "translateY(100%)",
        }}
      >
        {note}
      </div>
      <div className="fixed bottom-4 right-4 text-xs text-rouge-50/30 z-50 font-mono">
        Press S for notes
      </div>
    </>
  );
}
