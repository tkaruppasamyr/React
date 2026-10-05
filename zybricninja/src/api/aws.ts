export interface PresignedUploadOptions {
  url: string;
  file: File;
  onProgress?: (progress: number) => void;
}

export const uploadToPresignedUrl = async ({
  url,
  file,
  onProgress,
}: PresignedUploadOptions): Promise<void> => {
  const response = await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Upload failed: ${response.status} ${response.statusText}`
    );
  }

  onProgress?.(100);
};