"use client";

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { 
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, 
  Link as LinkIcon, Image as ImageIcon, Heading1, Heading2, 
  Heading3, Heading4, Heading5, Heading6, RemoveFormatting, 
  Type, AlignLeft, AlignCenter, AlignRight, Code
} from "lucide-react";
import MediaSelector from "./MediaSelector";
import DOMPurify from "dompurify";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  label?: string;
}

const MenuButton = ({ 
  onClick, 
  isActive = false, 
  disabled = false, 
  children, 
  title 
}: { 
  onClick: () => void; 
  isActive?: boolean; 
  disabled?: boolean; 
  children: React.ReactNode;
  title: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`p-1.5 rounded transition-all ${
      isActive 
        ? "bg-[#2271b1] text-white" 
        : "text-[#50575e] hover:bg-[#f0f0f1] hover:text-[#1d2327]"
    } ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
  >
    {children}
  </button>
);

export default function RichTextEditor({ content, onChange, placeholder, label }: RichTextEditorProps) {
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#2271b1] hover:underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // Safe sanitize helper for Next.js interop
      const purify = (DOMPurify as any).default || DOMPurify;
      const sanitizedHtml = (purify && typeof purify.sanitize === "function") 
        ? purify.sanitize(html) 
        : html;
      onChange(sanitizedHtml);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] px-4 py-3 text-[14px] text-[#1d2327] bg-white',
      },
    },
  });

  // Update content if it changes externally (e.g. on initial load)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!mounted || !editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    let finalUrl = url;
    if (url && !url.startsWith('http') && !url.startsWith('/') && !url.startsWith('#') && !url.startsWith('mailto:')) {
      // If it contains a dot and doesn't start with a slash/hash, it's likely an external domain
      if (url.includes('.')) {
        finalUrl = `https://${url}`;
      }
    }
    
    editor.chain().focus().extendMarkRange('link').setLink({ href: finalUrl }).run();
  };

  const addImage = (media: any) => {
    if (media && media.url) {
      editor.chain().focus().setImage({ src: media.url, alt: media.alt || media.name }).run();
    }
  };

  return (
    <div className="space-y-1.5">
      {label && <label className="text-[13px] font-bold text-[#1d2327]">{label}</label>}
      <div className="border border-[#c3c4c7] rounded-sm bg-white overflow-hidden focus-within:border-[#2271b1] focus-within:ring-1 focus-within:ring-[#2271b1] transition-all">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-1 border-b border-[#c3c4c7] bg-[#f6f7f7]">
          <div className="flex items-center gap-0.5 pr-2 mr-2 border-r border-[#dcdcde]">
            <MenuButton 
              title="Heading 1"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              isActive={editor.isActive('heading', { level: 1 })}
            >
              <Heading1 className="w-4 h-4" />
            </MenuButton>
            <MenuButton 
              title="Heading 2"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              isActive={editor.isActive('heading', { level: 2 })}
            >
              <Heading2 className="w-4 h-4" />
            </MenuButton>
            <MenuButton 
              title="Heading 3"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              isActive={editor.isActive('heading', { level: 3 })}
            >
              <Heading3 className="w-4 h-4" />
            </MenuButton>
            <MenuButton 
              title="Heading 4"
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              isActive={editor.isActive('heading', { level: 4 })}
            >
              <Heading4 className="w-4 h-4" />
            </MenuButton>
          </div>

          <div className="flex items-center gap-0.5 pr-2 mr-2 border-r border-[#dcdcde]">
            <MenuButton 
              title="Bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
            >
              <Bold className="w-4 h-4" />
            </MenuButton>
            <MenuButton 
              title="Italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
            >
              <Italic className="w-4 h-4" />
            </MenuButton>
            <MenuButton 
              title="Underline"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive('underline')}
            >
              <UnderlineIcon className="w-4 h-4" />
            </MenuButton>
          </div>

          <div className="flex items-center gap-0.5 pr-2 mr-2 border-r border-[#dcdcde]">
            <MenuButton 
              title="Bullet List"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
            >
              <List className="w-4 h-4" />
            </MenuButton>
            <MenuButton 
              title="Ordered List"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
            >
              <ListOrdered className="w-4 h-4" />
            </MenuButton>
          </div>

          <div className="flex items-center gap-0.5 pr-2 mr-2 border-r border-[#dcdcde]">
            <MenuButton 
              title="Link"
              onClick={setLink}
              isActive={editor.isActive('link')}
            >
              <LinkIcon className="w-4 h-4" />
            </MenuButton>
            <MenuButton 
              title="Insert Image"
              onClick={() => setIsMediaOpen(true)}
            >
              <ImageIcon className="w-4 h-4" />
            </MenuButton>
          </div>

          <div className="flex items-center gap-0.5">
            <MenuButton 
              title="Clear Formatting"
              onClick={() => editor.chain().focus().unsetAllMarks().run()}
            >
              <RemoveFormatting className="w-4 h-4" />
            </MenuButton>
          </div>
        </div>

        {/* Editor Area */}
        <div className="relative">
          <EditorContent editor={editor} />
          {editor.isEmpty && (
            <div className="absolute top-3 left-4 pointer-events-none text-[#8c8f94] text-[14px]">
              {placeholder || "Start writing..."}
            </div>
          )}
        </div>
      </div>

      {isMediaOpen && (
        <MediaSelector 
          onClose={() => setIsMediaOpen(false)}
          onSelect={(media) => {
            addImage(media);
            setIsMediaOpen(false);
          }}
          title="Select Image for Content"
        />
      )}

      {/* Global Tiptap Styles */}
      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror {
          outline: none !important;
        }
        .ProseMirror h1 { font-size: 2em; font-weight: bold; margin-bottom: 0.5em; }
        .ProseMirror h2 { font-size: 1.5em; font-weight: bold; margin-bottom: 0.5em; }
        .ProseMirror h3 { font-size: 1.25em; font-weight: bold; margin-bottom: 0.5em; }
        .ProseMirror h4 { font-size: 1.1em; font-weight: bold; margin-bottom: 0.5em; }
        .ProseMirror ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1em; }
        .ProseMirror ol { list-style-type: decimal; padding-left: 1.5em; margin-bottom: 1em; }
        .ProseMirror a { color: #2271b1; text-decoration: underline; }
        .ProseMirror blockquote { border-left: 3px solid #dcdcde; padding-left: 1em; font-style: italic; margin-bottom: 1em; }
      `}</style>
    </div>
  );
}
