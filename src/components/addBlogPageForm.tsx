"use client";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { FormField } from "@/components/baseComponents/baseEntityFormComponents";
import { getBlogPageTemplate } from "@/util/dataUploadUtils";
import { isEmpty, merge } from "lodash-es";
import { postDataFile } from "@/util/appDataUtils";
import { useRouter } from "next/navigation";

export default function AddBlogPageForm() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState<{
    pageMetadata: {
      title: string;
      description: string;
    };
    pageUrl: string;
    heading: string;
    isDisabled: string;
    updatedAt: string;
    updatedBy: {
      name: string;
      gender: string;
    };
  }>({
    pageMetadata: {
      title: "",
      description: "",
    },
    pageUrl: "",
    heading: "",
    isDisabled: "YES",
    updatedAt: "",
    updatedBy: {
      name: "",
      gender: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    setIsProcessing(true);
    e.preventDefault();
    if (isEmpty(formData.pageUrl)) {
      setErrorMessage("Page URL is required");
      return;
    }
    const data = getBlogPageTemplate();

    postDataFile({
      data: {
        folder: "blog",
        fileName: formData.pageUrl,
        data: merge({}, data, {
          ...formData,
          updatedAt: new Date().toISOString(),
          pageUrl: `/blog/${formData.pageUrl}`,
        }),
      },
    })
      .then(() => {
        setTimeout(() => {
          router.push(formData.pageUrl);
        }, 2000);
      })
      .catch((error) => {
        setIsProcessing(false);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="w-full flex flex-col gap-3 items-center mb-5">
      <Typography
        variant="h1"
        className="!text-center !text-4xl !font-semibold"
      >
        Add Blog Page
      </Typography>

      <form
        onSubmit={handleFormSubmit}
        ref={formRef}
        className="flex flex-col gap-3 w-full"
      >
        <Box
          border={1}
          borderColor="success.main"
          borderRadius={1}
          p={2}
          mb={2}
        >
          <Typography variant="h6">Page Metadata</Typography>
          <FormField
            label="Page Title"
            name="pageTitle"
            value={formData.pageMetadata.title || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                pageMetadata: {
                  ...formData.pageMetadata,
                  title: (e.target as HTMLInputElement).value,
                },
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
            value={formData.pageMetadata.description || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                pageMetadata: {
                  ...formData.pageMetadata,
                  description: (e.target as HTMLInputElement).value,
                },
              })
            }
            slotProps={{
              htmlInput: {
                maxLength: 160,
              },
            }}
          />
        </Box>
        <Box
          border={1}
          borderColor="success.main"
          borderRadius={1}
          p={2}
          mb={2}
        >
          <Typography variant="h6">Updated By</Typography>
          <FormField
            label="Name"
            name="updatedByName"
            value={formData.updatedBy?.name || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                updatedBy: {
                  ...formData.updatedBy,
                  name: (e.target as HTMLInputElement).value,
                },
              })
            }
          />
          <FormField
            label="Gender"
            name="updatedByGender"
            value={formData.updatedBy?.gender || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                updatedBy: {
                  ...formData.updatedBy,
                  gender: (e.target as HTMLInputElement).value,
                },
              })
            }
            fieldType="dropdown"
            dropdownOptions={[
              { value: "", label: "Select Gender" },
              { value: "M", label: "Male" },
              { value: "F", label: "Female" },
            ]}
          />
        </Box>
        <FormField
          label="Is Disabled"
          name="isDisabled"
          value={formData.isDisabled || "YES"}
          onChange={(e) =>
            setFormData({
              ...formData,
              isDisabled: (e.target as HTMLInputElement).value,
            })
          }
          fieldType="dropdown"
          dropdownOptions={[
            { value: "YES", label: "YES" },
            { value: "NO", label: "NO" },
          ]}
        />
        <FormField
          label="Page URL"
          name="pageUrl"
          value={formData.pageUrl || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              pageUrl: (e.target as HTMLInputElement).value,
            })
          }
          slotProps={{
            htmlInput: {
              maxLength: 160,
            },
          }}
        />
        <FormField
          label="Heading"
          name="heading"
          value={formData.heading || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              heading: (e.target as HTMLInputElement).value,
            })
          }
          slotProps={{
            htmlInput: {
              maxLength: 160,
            },
          }}
        />
        <Button variant="contained" color="primary" type="submit">
          Create Page
        </Button>
        {errorMessage && (
          <Typography variant="body1" color="error">
            {errorMessage}
          </Typography>
        )}
        {isProcessing && (
          <CircularProgress size={32} color="primary" thickness={4} />
        )}
      </form>
    </div>
  );
}
