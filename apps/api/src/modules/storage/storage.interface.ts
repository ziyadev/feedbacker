/**
 * Interface for storage operations
 */
export interface IStorage {
  /**
   * Gets a signed URL for downloading a file
   * @param key - The key/path of the file
   * @returns Promise resolving to the signed URL string
   */
  getSignedUrl(key: string): Promise<string>;

  /**
   * Gets a signed URL for uploading a file
   * @param key - The key/path where the file will be uploaded
   * @param type - The content type of the file
   * @param expiresIn - Number of seconds until the URL expires
   * @returns Promise resolving to the signed upload URL string
   */
  getUploadSignedUrl(
    key: string,
    type: string,
    expiresIn: number,
    metadata?: Record<string, string>
  ): Promise<string>;

  /**
   * Deletes a file from storage
   * @param key - The key/path of the file to delete
   * @param type - The content type of the file
   * @param expiresIn - Number of seconds until the URL expires
   * @param metadata - Metadata to be associated with the file
   * @returns Promise that resolves when deletion is complete
   */
  deleteFile(key: string): Promise<void>;
}
