import { useState } from "react";
import {
  Group,
  Text,
  Stack,
  Paper,
  Select,
  Progress,
  ActionIcon,
  Badge,
  Box,
} from "@mantine/core";
import {
  Dropzone,
  PDF_MIME_TYPE,
  MS_WORD_MIME_TYPE,
  MS_POWERPOINT_MIME_TYPE,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import type { DropzoneProps } from "@mantine/dropzone";
import {
  UploadSimpleIcon,
  FilePdfIcon,
  FileDocIcon,
  FilePptIcon,
  ImageIcon,
  FileIcon,
  XIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";

// Types for queue management
export interface FileItem {
  id: string;
  file: File;
  targetFormat: string;
  availableFormats: string[];
  progress: number; // 0 to 100
  status: "idle" | "converting" | "completed" | "error";
}

// Smart detection: Maps input extension to logical conversion targets
const getTargetFormats = (fileName: string): string[] => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return ["DOCX", "PPTX", "PNG", "TXT"];
    case "docx":
    case "doc":
      return ["PDF", "TXT", "HTML"];
    case "pptx":
    case "ppt":
      return ["PDF", "PNG"];
    case "png":
    case "jpg":
    case "jpeg":
    case "webp":
      return ["PDF", "WEBP", "PNG"];
    default:
      return ["PDF"];
  }
};

// Returns relevant Phosphor Icon based on file extension
const getFileIcon = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return <FilePdfIcon size={24} color="#f87171" />;
    case "docx":
    case "doc":
      return <FileDocIcon size={24} color="#60a5fa" />;
    case "pptx":
    case "ppt":
      return <FilePptIcon size={24} color="#fb923c" />;
    case "png":
    case "jpg":
    case "jpeg":
      return <ImageIcon size={24} color="#4ade80" />;
    default:
      return <FileIcon size={24} color="#9ca3af" />;
  }
};

export default function ConvertCard(props: Partial<DropzoneProps>) {
  const [fileQueue, setFileQueue] = useState<FileItem[]>([]);

  // Supported MIME types
  const acceptedTypes = [
    ...PDF_MIME_TYPE,
    ...MS_WORD_MIME_TYPE,
    ...MS_POWERPOINT_MIME_TYPE,
    ...IMAGE_MIME_TYPE,
  ];

  const handleDrop = (acceptedFiles: File[]) => {
    const newItems: FileItem[] = acceptedFiles.map((file) => {
      const options = getTargetFormats(file.name);
      return {
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        targetFormat: options[0] || "PDF",
        availableFormats: options,
        progress: 0,
        status: "idle",
      };
    });

    setFileQueue((prev) => [...prev, ...newItems]);
    if (props.onDrop) props.onDrop(acceptedFiles);
  };

  const removeFile = (id: string) => {
    setFileQueue((prev) => prev.filter((item) => item.id !== id));
  };

  const updateTargetFormat = (id: string, format: string) => {
    setFileQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, targetFormat: format } : item))
    );
  };

  return (
    <Paper
      shadow="md"
      radius="xl"
      p="xl"
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.75)", // Glassmorphism Dark Blue/Slate
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        maxWidth: 720,
        margin: "0 auto",
      }}
    >
      {/* 1. Drag & Drop Upload Zone */}
      <Dropzone
        onDrop={handleDrop}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={25 * 1024 ** 2} // Increased limit to 25MB for docs/PPTs
        accept={acceptedTypes}
        styles={{
          root: {
            backgroundColor: "rgba(30, 41, 59, 0.4)",
            borderColor: "rgba(255, 255, 255, 0.15)",
            borderStyle: "dashed",
            borderRadius: "16px",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "#10b981", // Emerald accent hover
              backgroundColor: "rgba(30, 41, 59, 0.7)",
            },
          },
        }}
        {...props}
      >
        <Group justify="center" gap="md" mih={160} style={{ pointerEvents: "none" }}>
          <Dropzone.Accept>
            <UploadSimpleIcon size={44} color="#10b981" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <XIcon size={44} color="#f87171" />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <UploadSimpleIcon size={44} color="#10b981" />
          </Dropzone.Idle>

          <Stack gap={4} align="center">
            <Text size="lg" fw={600} c="white">
              Drag & Drop file here
            </Text>
            <Text size="xs" c="dimmed">
              or click to browse from computer
            </Text>
            <Text size="xs" c="dimmed" mt={4}>
              Supports PDF, DOCX, PPTX, Images (up to 25MB)
            </Text>
          </Stack>
        </Group>
      </Dropzone>

      {/* 2. File Queue List Section */}
      {fileQueue.length > 0 && (
        <Stack gap="sm" mt="xl">
          <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: "0.05em" }}>
            CONVERSION QUEUE ({fileQueue.length})
          </Text>

          {fileQueue.map((item) => (
            <Paper
              key={item.id}
              p="sm"
              radius="md"
              style={{
                backgroundColor: "rgba(30, 41, 59, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <Group justify="space-between" wrap="nowrap">
                {/* File Icon & Info */}
                <Group gap="sm" wrap="nowrap" style={{ overflow: "hidden" }}>
                  {getFileIcon(item.file.name)}
                  <Box style={{ overflow: "hidden" }}>
                    <Text size="sm" fw={500} c="white" truncate>
                      {item.file.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {(item.file.size / (1024 * 1024)).toFixed(2)} MB
                    </Text>
                  </Box>
                </Group>

                {/* Target Selector & Controls */}
                <Group gap="xs" wrap="nowrap">
                  <ArrowRightIcon size={14} color="#9ca3af" />

                  <Select
                    data={item.availableFormats}
                    value={item.targetFormat}
                    onChange={(val) => val && updateTargetFormat(item.id, val)}
                    size="xs"
                    w={90}
                    variant="unstyled"
                    styles={{
                      input: {
                        color: "#10b981",
                        fontWeight: 600,
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        borderRadius: "8px",
                        textAlign: "center",
                        padding: "4px 8px",
                      },
                    }}
                  />

                  {item.status === "completed" && (
                    <Badge color="green" variant="light" size="sm">
                      Success
                    </Badge>
                  )}

                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    size="sm"
                    onClick={() => removeFile(item.id)}
                  >
                    <XIcon size={16} />
                  </ActionIcon>
                </Group>
              </Group>

              {/* Progress Bar (Visible during conversion state) */}
              {item.status === "converting" && (
                <Progress
                  value={item.progress}
                  size="xs"
                  color="teal"
                  mt="xs"
                  animated
                />
              )}
            </Paper>
          ))}
        </Stack>
      )}
    </Paper>
  );
}