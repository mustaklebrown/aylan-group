"use client";

import React, { useRef, useState, useEffect } from "react";
import { 
  Bold, 
  Italic, 
  Underline, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Link as LinkIcon, 
  Unlink, 
  RemoveFormatting, 
  Eye, 
  Edit,
  Code
} from "lucide-react";

interface RichTextEditorProps {
  name: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}

export default function RichTextEditor({
  name,
  defaultValue = "",
  required = false,
  placeholder = "Commencez à rédiger votre article de blog..."
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState(defaultValue);
  const [activeTab, setActiveTab] = useState<"edit" | "preview" | "code">("edit");

  // Sync internal HTML state with defaultValue on mount/edit reset
  useEffect(() => {
    setHtml(defaultValue);
    if (editorRef.current && editorRef.current.innerHTML !== defaultValue) {
      editorRef.current.innerHTML = defaultValue;
    }
  }, [defaultValue]);

  const handleInput = () => {
    if (editorRef.current) {
      setHtml(editorRef.current.innerHTML);
    }
  };

  // Helper to execute document commands safely
  const execCommand = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    handleInput();
  };

  const addLink = () => {
    const url = prompt("Entrez l'URL du lien :");
    if (url) {
      execCommand("createLink", url);
    }
  };

  return (
    <div className="border border-white/10 rounded-[2rem] overflow-hidden bg-white/5 backdrop-blur-md shadow-lg flex flex-col">
      {/* Editor Header / Tab Switcher */}
      <div className="flex justify-between items-center bg-white/5 border-b border-white/10 px-6 py-3">
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
              activeTab === "edit" ? "bg-primary text-white shadow-md" : "text-white/60 hover:text-white"
            }`}
          >
            <Edit size={14} />
            <span>Éditeur</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
              activeTab === "preview" ? "bg-primary text-white shadow-md" : "text-white/60 hover:text-white"
            }`}
          >
            <Eye size={14} />
            <span>Aperçu</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
              activeTab === "code" ? "bg-primary text-white shadow-md" : "text-white/60 hover:text-white"
            }`}
          >
            <Code size={14} />
            <span>Code HTML</span>
          </button>
        </div>

        <span className="text-[10px] text-text-muted font-mono uppercase tracking-widest">
          {html.replace(/<[^>]*>/g, '').length} mots / {html.length} octets
        </span>
      </div>

      {/* Toolbar - Only visible in edit mode */}
      {activeTab === "edit" && (
        <div className="flex flex-wrap items-center gap-1 bg-white/5 border-b border-white/5 px-4 py-2">
          <button
            type="button"
            onClick={() => execCommand("bold")}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Gras"
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            onClick={() => execCommand("italic")}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Italique"
          >
            <Italic size={16} />
          </button>
          <button
            type="button"
            onClick={() => execCommand("underline")}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Souligné"
          >
            <Underline size={16} />
          </button>

          <div className="w-px h-5 bg-white/10 mx-2"></div>

          <button
            type="button"
            onClick={() => execCommand("formatBlock", "<h2>")}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all font-bold"
            title="Titre H2"
          >
            <Heading2 size={16} />
          </button>
          <button
            type="button"
            onClick={() => execCommand("formatBlock", "<h3>")}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all font-bold"
            title="Titre H3"
          >
            <Heading3 size={16} />
          </button>
          <button
            type="button"
            onClick={() => execCommand("formatBlock", "<p>")}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all text-xs font-semibold flex items-center justify-center h-8 w-8"
            title="Paragraphe"
          >
            P
          </button>

          <div className="w-px h-5 bg-white/10 mx-2"></div>

          <button
            type="button"
            onClick={() => execCommand("insertUnorderedList")}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Liste à puces"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            onClick={() => execCommand("insertOrderedList")}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Liste numérotée"
          >
            <ListOrdered size={16} />
          </button>
          <button
            type="button"
            onClick={() => execCommand("formatBlock", "<blockquote>")}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Citation"
          >
            <Quote size={16} />
          </button>

          <div className="w-px h-5 bg-white/10 mx-2"></div>

          <button
            type="button"
            onClick={addLink}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Ajouter un lien"
          >
            <LinkIcon size={16} />
          </button>
          <button
            type="button"
            onClick={() => execCommand("unlink")}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Supprimer le lien"
          >
            <Unlink size={16} />
          </button>
          <button
            type="button"
            onClick={() => execCommand("removeFormat")}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all text-red-400 hover:text-red-300"
            title="Effacer la mise en forme"
          >
            <RemoveFormatting size={16} />
          </button>
        </div>
      )}

      {/* Editor Content Area */}
      <div className="relative min-h-[250px] max-h-[450px] overflow-y-auto p-6 flex-grow">
        {/* Placeholder overlay */}
        {activeTab === "edit" && (!html || html === "" || html === "<br>") && (
          <div className="absolute top-6 left-6 text-white/30 pointer-events-none select-none text-sm leading-relaxed">
            {placeholder}
          </div>
        )}

        {/* 1. Visual Edit Mode */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className={`w-full min-h-[220px] focus:outline-none text-white text-sm leading-relaxed prose prose-invert max-w-none ${
            activeTab === "edit" ? "block" : "hidden"
          }`}
          style={{
            minHeight: "220px",
          }}
        />

        {/* 2. Preview Mode (Styled identically to public blog page) */}
        {activeTab === "preview" && (
          <div 
            className="prose prose-invert prose-lg max-w-none 
            prose-headings:text-white prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-4
            prose-p:text-text-muted prose-p:leading-relaxed prose-p:mb-4
            prose-strong:text-white prose-li:text-text-muted select-none"
            dangerouslySetInnerHTML={{ __html: html || "<p class='text-text-muted/50 italic text-sm'>Aucun contenu à prévisualiser.</p>" }}
          />
        )}

        {/* 3. HTML Source Code Mode */}
        {activeTab === "code" && (
          <textarea
            value={html}
            onChange={(e) => {
              setHtml(e.target.value);
              if (editorRef.current) {
                editorRef.current.innerHTML = e.target.value;
              }
            }}
            rows={10}
            className="w-full h-full min-h-[220px] bg-black/30 border border-white/5 rounded-2xl p-4 text-xs font-mono text-white/80 focus:outline-none focus:border-primary resize-none"
            placeholder="Code HTML brut..."
          />
        )}
      </div>

      {/* Hidden input to pass data through form submissions */}
      <input type="hidden" name={name} value={html} required={required} />
    </div>
  );
}
