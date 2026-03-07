import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
    url: string;
    publicId: string;
    width: number;
    height: number;
    format: string;
}

/**
 * Upload image to Cloudinary from a base64 string or URL.
 * Auto-optimizes to WebP and applies transformations.
 */
export async function uploadImage(
    file: string, // base64 data URI or URL
    folder: string = "tejnavi-studio"
): Promise<UploadResult> {
    const result = await cloudinary.uploader.upload(file, {
        folder,
        transformation: [
            { quality: "auto", fetch_format: "auto" },
        ],
        resource_type: "image",
    });

    return {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
    };
}

/**
 * Upload image from a File/Blob (for API route handlers)
 */
export async function uploadImageFromBuffer(
    buffer: Buffer,
    folder: string = "tejnavi-studio"
): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    folder,
                    transformation: [{ quality: "auto", fetch_format: "auto" }],
                    resource_type: "image",
                },
                (error, result) => {
                    if (error || !result) return reject(error);
                    resolve({
                        url: result.secure_url,
                        publicId: result.public_id,
                        width: result.width,
                        height: result.height,
                        format: result.format,
                    });
                }
            )
            .end(buffer);
    });
}

/**
 * Delete an image from Cloudinary by its public ID
 */
export async function deleteImage(publicId: string) {
    return cloudinary.uploader.destroy(publicId);
}

/**
 * Generate an optimized URL with transformations
 */
export function getOptimizedUrl(
    publicId: string,
    options: { width?: number; height?: number; crop?: string } = {}
): string {
    return cloudinary.url(publicId, {
        fetch_format: "auto",
        quality: "auto",
        width: options.width,
        height: options.height,
        crop: options.crop || "fill",
    });
}

export default cloudinary;
