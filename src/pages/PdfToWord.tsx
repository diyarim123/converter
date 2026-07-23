import { Group, Text } from '@mantine/core';
import { UploadSimpleIcon, ImageIcon, XIcon } from '@phosphor-icons/react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import type { DropzoneProps } from '@mantine/dropzone';

export default function PdfToWord(props: Partial<DropzoneProps>) {
  return (
    <Dropzone
      onDrop={(files) => console.log('accepted files', files)}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group justify="center" gap="xl" mih={220} miw={320} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <UploadSimpleIcon size={52} color="var(--mantine-color-blue-6)" />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <XIcon size={52} color="var(--mantine-color-red-6)" />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <ImageIcon size={52} color="var(--mantine-color-dimmed)" />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
