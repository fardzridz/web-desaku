"use client";

import React, { useRef } from "react";

interface RichTextEditorProps {
  placeholder?: string;
  name?: string;
  defaultValue?: string;
}

export default function RichTextEditor({ name, defaultValue }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Set the hidden input initial value too
  React.useEffect(() => {
    if (inputRef.current && defaultValue) {
      inputRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  const format = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateInput();
  };

  const updateInput = () => {
    if (inputRef.current && editorRef.current) {
      inputRef.current.value = editorRef.current.innerHTML;
    }
  };

  return (
    <div className="border border-outline-variant/20 rounded-xl overflow-hidden bg-surface-container-lowest">
      {/* Hidden input to transmit the raw HTML upon Form submission target */}
      <input type="hidden" name={name} ref={inputRef} />

      <div className="bg-surface-container-low px-4 py-2 border-b border-outline-variant/10 flex gap-4">
        <button type="button" onClick={() => format('bold')} className="material-symbols-outlined text-sm text-stone-500 hover:text-primary transition-colors cursor-pointer" title="Tebal">format_bold</button>
        <button type="button" onClick={() => format('italic')} className="material-symbols-outlined text-sm text-stone-500 hover:text-primary transition-colors cursor-pointer" title="Miring">format_italic</button>
        <button type="button" onClick={() => format('insertUnorderedList')} className="material-symbols-outlined text-sm text-stone-500 hover:text-primary transition-colors cursor-pointer" title="Daftar Titik">format_list_bulleted</button>
        <button type="button" onClick={() => format('insertOrderedList')} className="material-symbols-outlined text-sm text-stone-500 hover:text-primary transition-colors cursor-pointer" title="Daftar Nomor">format_list_numbered</button>
        <div className="w-px h-4 bg-outline-variant/30 self-center"></div>
        <button type="button" onClick={() => {
          const url = prompt('Masukkan tautan URL:');
          if (url) format('createLink', url);
        }} className="material-symbols-outlined text-sm text-stone-500 hover:text-primary transition-colors cursor-pointer" title="Tautan">link</button>
      </div>
      <div 
        ref={editorRef}
        contentEditable
        className="w-full min-h-[200px] text-sm p-4 text-on-surface-variant focus:outline-none focus:bg-white transition-colors [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_b]:font-bold [&_i]:italic [&_a]:text-primary [&_a]:underline"
        onInput={updateInput}
        onBlur={updateInput}
        style={{ emptyCells: "show" }}
        dangerouslySetInnerHTML={{ __html: defaultValue || "" }}
      />
    </div>
  );
}
