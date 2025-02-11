"use client";

import { BlogEntity } from "@/types/domain-entities";
/* eslint-disable @typescript-eslint/no-explicit-any */
import YooptaEditor, {
  createYooptaEditor,
  SlateElement,
  YooptaContentValue,
  YooptaPlugin,
} from "@yoopta/editor";

import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import Embed from "@yoopta/embed";
import Image, { ImageUploadResponse } from "@yoopta/image";
import Link from "@yoopta/link";
import Callout from "@yoopta/callout";
// import Video from "@yoopta/video";
// import File from "@yoopta/file";
import Accordion from "@yoopta/accordion";
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";
import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from "@yoopta/marks";
import { HeadingOne, HeadingThree, HeadingTwo } from "@yoopta/headings";
import Code from "@yoopta/code";
import Table from "@yoopta/table";
import Divider from "@yoopta/divider";
import ActionMenuList, {
  DefaultActionMenuRender,
} from "@yoopta/action-menu-list";
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";

import { useEffect, useMemo, useRef, useState } from "react";
import { ButtonWithHandler } from "@/components/lib/buttons";
import { html } from "@yoopta/exports";
import { postDataFile } from "@/util/appDataUtils";
import { Box, CircularProgress, Typography } from "@mui/material";
import { FormField } from "@/components/baseComponents/baseEntityFormComponents";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const uploadFileToLocalDir = async (
  file: File
): Promise<ImageUploadResponse> => {
  /**
   * Post a file to the server and get the response
   */
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://localhost:3000/api/media", {
      method: "POST",
      body: formData,
    });
    const { fileUrl } = await response.json();
    console.debug("File uploaded successfully", fileUrl);
    return {
      src: fileUrl,
      alt: "noukrinotify",
      sizes: {
        width: 100,
        height: 100,
      },
    };
  } catch (error) {
    console.error("Error uploading file", error);
    return {
      src: "temp url",
      alt: "cloudinary",
      sizes: {
        width: 100,
        height: 100,
      },
    };
  }
};

const plugins = [
  Paragraph,
  Table,
  Divider.extend({
    elementProps: {
      divider: (props: any) => ({
        ...props,
        color: "#007aff",
      }),
    },
  }),
  Accordion,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote,
  Callout,
  NumberedList,
  BulletedList,
  TodoList,
  Code,
  Link,
  Embed,
  Image.extend({
    options: {
      async onUpload(file: File) {
        return uploadFileToLocalDir(file);
      },
    },
  }),
  // Video.extend({
  //   options: {
  //     onUpload: async (file: File) => {
  //       return uploadFileToLocalDir(file, "video");
  //     },
  //     onUploadPoster: async (file: any) => {
  //       const result = await uploadFileToLocalDir(file, "image");
  //       return result.src;
  //     },
  //   },
  // }),
  // File.extend({
  //   options: {
  //     onUpload: async (file: any) => {
  //       return uploadFileToLocalDir(file, "auto");
  //     },
  //   },
  // }),
];

const TOOLS = {
  ActionMenu: {
    render: DefaultActionMenuRender,
    tool: ActionMenuList,
  },
  Toolbar: {
    render: DefaultToolbarRender,
    tool: Toolbar,
  },
  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
};

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

export default function EditBlogEntity({
  pageUrl,
  blogEntity,
}: Readonly<{
  blogEntity: BlogEntity;
  pageUrl: string;
}>) {
  const [value, setValue] = useState<YooptaContentValue>();
  const editor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(blogEntity.isDisabled);
  const [pageMetadata, setPageMetadata] = useState(blogEntity.pageMetadata);
  const [heading, setHeading] = useState(blogEntity.heading);

  useEffect(() => {
    const content = html.deserialize(editor, blogEntity.html);
    editor.setEditorValue(content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogEntity]);

  const onChange = (newValue: YooptaContentValue) => {
    setValue(newValue);
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const saveHTML = () => {
    setIsProcessing(true);
    setErrorMessage(null);

    const data = editor.getEditorValue();
    const htmlString = html.serialize(editor, data);

    postDataFile({
      httpMethod: "PUT",
      url: `http://localhost:3000/api/file-data/blog/${pageUrl}`,
      data: {
        ...blogEntity,
        isDisabled,
        html: htmlString,
        pageMetadata: {
          title: pageMetadata.title || "",
          description: pageMetadata.description || "",
        },
        heading,
      },
    })
      .then(() => {
        setIsProcessing(false);
        setIsUpdated(true);
      })
      .catch((error) => {
        setIsProcessing(false);
        setErrorMessage(error.message);
      });
  };

  return (
    <div
      className="w-full h-full flex flex-col gap-3 items-center"
      ref={selectionRef}
    >
      <ButtonWithHandler
        buttonText="Save Changes"
        className="w-full"
        onClick={saveHTML}
      />
      {errorMessage && (
        <Typography variant="body1" color="error">
          {errorMessage}
        </Typography>
      )}
      {isProcessing && (
        <CircularProgress size={32} color="primary" thickness={4} />
      )}
      {isUpdated && (
        <Typography variant="body1" color="success">
          Changes saved successfully!
        </Typography>
      )}
      <Box
        border={1}
        borderColor="success.main"
        borderRadius={1}
        p={2}
        mb={2}
        width={"100%"}
      >
        <Typography variant="h6">Page Metadata</Typography>
        <FormField
          label="Page Title"
          name="pageTitle"
          value={pageMetadata.title || ""}
          onChange={(e) =>
            setPageMetadata({
              ...pageMetadata,
              title: (e.target as HTMLInputElement).value,
            })
          }
          slotProps={{
            htmlInput: {
              maxLength: 55,
            },
          }}
        />
        <FormField
          label="Page Description"
          name="pageDescription"
          value={pageMetadata.description || ""}
          onChange={(e) =>
            setPageMetadata({
              ...pageMetadata,
              description: (e.target as HTMLInputElement).value,
            })
          }
          slotProps={{
            htmlInput: {
              maxLength: 160,
            },
          }}
        />
      </Box>
      <Box width={"100%"}>
        <FormField
          label="Is Disabled"
          name="isDisabled"
          value={isDisabled || "YES"}
          onChange={(e) => setIsDisabled((e.target as HTMLInputElement).value)}
          fieldType="dropdown"
          dropdownOptions={[
            { value: "YES", label: "YES" },
            { value: "NO", label: "NO" },
          ]}
        />
      </Box>
      <Box
        border={1}
        borderColor="success.main"
        borderRadius={1}
        p={2}
        mb={2}
        width={"100%"}
      >
        <FormField
          label="Heading"
          name="heading"
          value={heading}
          onChange={(e) => setHeading((e.target as HTMLInputElement).value)}
        />
      </Box>
      <YooptaEditor
        editor={editor}
        plugins={
          plugins as unknown as readonly YooptaPlugin<
            Record<string, SlateElement>,
            Record<string, unknown>
          >[]
        }
        tools={TOOLS}
        marks={MARKS}
        value={value}
        onChange={onChange}
        autoFocus
        className="m-4 p-2"
        width="100%"
      />
    </div>
  );
}
