"use client";
import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  // FontFamily,
  FontSize,
  GeneralHtmlSupport,
  // Heading,
  Highlight,
  HorizontalLine,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  SimpleUploadAdapter,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Table,
  TableCaption,
  TableCellProperties,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
  EditorConfig,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import "./article-editor.styles.css";

const ArticleEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig: EditorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "sourceEditing",
        "|",
        // "heading",
        "|",
        "fontSize",
        // "fontFamily",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "link",
        "insertImage",
        "insertTable",
        "highlight",
        "blockQuote",
        "codeBlock",
        "|",
        "alignment",
        "|",
        "bulletedList",
        "numberedList",
        "todoList",
        "outdent",
        "indent",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Alignment,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      Bold,
      Code,
      CodeBlock,
      Essentials,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      // FontFamily,
      FontSize,
      GeneralHtmlSupport,
      // Heading,
      Highlight,
      HorizontalLine,
      HtmlEmbed,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      MediaEmbed,
      Mention,
      Paragraph,
      PasteFromOffice,
      RemoveFormat,
      SelectAll,
      SimpleUploadAdapter,
      SourceEditing,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Table,
      TableCaption,
      TableCellProperties,
      TableProperties,
      TableToolbar,
      TextPartLanguage,
      TextTransformation,
      TodoList,
      Underline,
      Undo,
    ],
    balloonToolbar: [
      "bold",
      "italic",
      "|",
      "link",
      "insertImage",
      "|",
      "bulletedList",
      "numberedList",
    ],
    // fontFamily: {
    //   supportAllValues: true,
    //   options:[{
    //     title:'Salam',
    //   }]
    // },
    fontSize: {
      options: [10, 12, 14, "default", 18, 20, 22],
      supportAllValues: true,
    },
    // heading: {
    //   options: [
    //     {
    //       model: "paragraph",
    //       title: "Paragraph",
    //       class: "ck-heading_paragraph",
    //     },
    //     {
    //       model: "heading1",
    //       view: "h1",
    //       title: "Heading 1",
    //       class: "ck-heading_heading1",
    //     },
    //     {
    //       model: "heading2",
    //       view: "h2",
    //       title: "Heading 2",
    //       class: "ck-heading_heading2",
    //     },
    //     {
    //       model: "heading3",
    //       view: "h3",
    //       title: "Heading 3",
    //       class: "ck-heading_heading3",
    //     },
    //     {
    //       model: "heading4",
    //       view: "h4",
    //       title: "Heading 4",
    //       class: "ck-heading_heading4",
    //     },
    //     {
    //       model: "heading5",
    //       view: "h5",
    //       title: "Heading 5",
    //       class: "ck-heading_heading5",
    //     },
    //     {
    //       model: "heading6",
    //       view: "h6",
    //       title: "Heading 6",
    //       class: "ck-heading_heading6",
    //     },
    //   ],
    // },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
    image: {
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },
    // initialData:
    //   '<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n    You\'ve successfully created a CKEditor 5 project. This powerful text editor will enhance your application, enabling rich text editing\n    capabilities that are customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n    <li>\n        <strong>Integrate into your app</strong>: time to bring the editing into your application. Take the code you created and add to your\n        application.\n    </li>\n    <li>\n        <strong>Explore features:</strong> Experiment with different plugins and toolbar options to discover what works best for your needs.\n    </li>\n    <li>\n        <strong>Customize your editor:</strong> Tailor the editor\'s configuration to match your application\'s style and requirements. Or even\n        write your plugin!\n    </li>\n</ol>\n<p>\n    Keep experimenting, and don\'t hesitate to push the boundaries of what you can achieve with CKEditor 5. Your feedback is invaluable to us\n    as we strive to improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<ul>\n    <li>📝 <a href="https://orders.ckeditor.com/trial/premium-features">Trial sign up</a>,</li>\n    <li>📕 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>\n    <li>⭐️ <a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>\n    <li>🏠 <a href="https://ckeditor.com">CKEditor Homepage</a>,</li>\n    <li>🧑‍💻 <a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n    See this text, but the editor is not starting up? Check the browser\'s console for clues and guidance. It may be related to an incorrect\n    license key if you use premium features or another feature-related requirement. If you cannot make it work, file a GitHub issue, and we\n    will help as soon as possible!\n</p>\n',
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    mention: {
      feeds: [
        {
          marker: "@",
          feed: [
            /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
          ],
        },
      ],
    },
    menuBar: {
      isVisible: true,
    },
    placeholder: "Type or paste your content here!",
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
  };
  useEffect(() => {
    console.log(editorInstanceRef.current, "123");
  }, [isLayoutReady]);

  return (
    <div className="main-container">
      <div className="editor-container editor-container_classic-editor">
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {isLayoutReady && (
              <CKEditor
                ref={editorInstanceRef}
                data={value}
                editor={ClassicEditor}
                config={editorConfig}
                onChange={(_, e) => {
                  onChange(e.getData());
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArticleEditor;
