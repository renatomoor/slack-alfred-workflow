import https from 'https';
import fs from 'fs';
import path from 'path';

export const downloadAndSaveImage = (imageUrl, folderPath) => {
    const fileName = path.basename(imageUrl);
    const filePath = path.join(folderPath, fileName);

    // Create the folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    // Check if the image file already exists
    if (!fs.existsSync(filePath)) {
        // If it doesn't exist, download and save the image
        const file = fs.createWriteStream(filePath);

        https.get(imageUrl, function(response) {
            response.pipe(file);
        });

    }

    return path.resolve(filePath);
}
