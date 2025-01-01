import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/video-to-audio-converter";
const pageTitle = "Free Video to Audio Converter: Convert Any Video to Audio";
const pageDescription =
  "Convert your videos to audio files for free with our online video to audio converter tool. Supports wide range of video formats i.e MP4, MKV, WEBM, AVI, OGM.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/video-converter.png`;

const keywords =
  "online video to audio converter,extract audio from videos,convert video to audio,convert video to MP3,reduce video file size,free video to audio converter,no download required,supports multiple video formats,high-quality MP3 files,easy to use,choose video format,check audio quality,choose audio format for needs,create podcasts,create audiobooks,listen to audio from videos,mp4 to mp3,mp4 to wav,audio extractor";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
  openGraph: {
    title: pageTitle,
    type: "website",
    url: `${process.env.HOSTNAME}${navigationUrl}`,
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
        alt: pageTitle,
      },
    ],
    description: pageDescription,
  },
  twitter: {
    card: "summary_large_image",
    site: "@webtoolseasy",
    title: pageTitle,
    description: pageDescription,
    images: [imageUrl],
  },
  authors: {
    name: "Gaurav Kumar Yadav",
  },
  robots: "index, follow",
};

export const componentConfig: ApplicationConfig = {
  mainHeading:
    "Free Video to Audio Converter: Convert Any Video to Audio in Any Format",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [ApplicationIds.SCREEN_RECORDER],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Why Use an Online Video to Audio Converter?",
    listData: [
      "To extract the audio from a video. This can be useful for creating podcasts, audiobooks, or simply for listening to the audio from a video without having to watch the video.",
      "To convert a video to a different audio format. For example, you might want to convert a video to MP3 format so that you can listen to it on your MP3 player.",
      "To reduce the file size of a video. Audio files are typically smaller than video files, so converting a video to audio can help to reduce the file size and make it easier to share or store.",
    ],
  },
  {
    heading: "Features of Our Online Video to Audio Converter Tool",
    listData: [
      "Free to use. No need to pay or sign up for an account.",
      "No download required. Convert your videos to audio directly from your web browser.",
      "Supports multiple video formats. Convert MP4, AVI, MOV, WEBM, and other popular video formats to audio.",
      "Converts videos to high-quality MP3 files. Our converter uses advanced algorithms to extract the audio from your videos in high quality.",
      'Easy to use. Simply upload your video and click the "Convert" button.',
    ],
  },
  {
    heading: "How to Use Our Online Video to Audio Converter Tool",
    listData: [
      'Go to our website and click the "Upload Video" button.',
      "Select the video you want to convert to audio.",
      'Click the "Convert" button.',
      "Download your converted audio file.",
    ],
  },
  {
    heading: "Tips for Using an Online Video to Audio Converter",
    listData: [
      "Choose a video that is in a supported format. Our converter supports a wide range of video formats, but it is always best to check to make sure that your video is in a supported format before uploading it.",
      "Make sure that your video has a good audio quality. The quality of the converted audio file will depend on the quality of the audio in the original video. If the original video has poor audio quality, the converted audio file will also have poor audio quality.",
      "Choose the right audio format for your needs. If you are converting a video to audio to listen to it on your MP3 player, you will want to choose the MP3 audio format. If you are converting a video to audio to create a podcast, you might want to choose the AAC audio format.",
    ],
  },
  {
    blockData: [
      "Our free online video to audio converter tool is a great way to extract the audio from your videos easily. It is easy to use and supports multiple video formats. With our converter, you can create podcasts, audiobooks, or simply listen to the audio from your videos without having to watch the video.",
    ],
  },
];
