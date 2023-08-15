export const convertMbToBytes = (mb: number): number => {
    const bytesInMb = 1000000;
    return mb * bytesInMb;
};

export const getImageUrl = (fileId: number) =>
    `${process.env.REACT_APP_UPLOAD_URL}/images/${fileId}/show`;

export const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result as string);
        };
    });

export const generateId = () => Math.random().toString(16).slice(2);
