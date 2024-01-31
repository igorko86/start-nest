type Image = {
  original: string;
  thumbnail: string;
} | null;

export const addBucketName = (images: Image) => {
  if (images) {
    const { original, thumbnail } = images;

    if (!original.includes('https:')) {
      const bucketName = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/`;

      return {
        ...images,
        original: `${bucketName}${original}`,
        thumbnail: `${bucketName}${thumbnail}`,
      };
    }

    return { ...images, original, thumbnail };
  }

  return null;
};
