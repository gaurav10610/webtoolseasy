import { BlogEntity } from "@/types/domain-entities";

export function getBlogPageTemplate(): BlogEntity {
  return {
    pageMetadata: {
      title: "",
      description: "",
    },
    html: `<body id=\"yoopta-clipboard\" data-editor-id=\"c50facf0-7869-4cc5-97e0-c568e5a3ebaf\"><dl data-theme=\"error\" data-meta-align=\"left\" data-meta-depth=\"0\" style=\"margin-left: 0px; text-align: left; padding: .5rem .5rem .5rem 1rem; margin-top: .5rem; border-radius: .375rem; color: #ee4443; border-left: 4px solid #ee4443; background-color: #fee1e2\">scwecwevrwvrv</dl></body>`,
    heading: "",
    pageUrl: "",
    updatedAt: "",
    updatedBy: {
      name: "",
      gender: "",
    },
    tags: ["tag1", "tag2", "tag3"],
    isDisabled: "YES",
  };
}

export const formatDateToYYYYMMDD = (date: string): string => {
  const [day, month, year] = date.split("-");
  return `${year}-${month}-${day}`;
};

export const formatDateToDDMMYYYY = (date: string): string => {
  // Check if the date is already in DD-MM-YYYY format
  const datePattern = /^\d{2}-\d{2}-\d{4}$/;
  if (datePattern.test(date)) {
    return date;
  }

  // If not, format the date
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

export const formatUpdatedAt = (date: Date): string => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const time = `${formattedHours}:${minutes} ${ampm}`;

  return `${day} ${month} ${year} | ${time}`;
};
