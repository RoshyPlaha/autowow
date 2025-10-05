export const blobUploader = async (
  videoBlob: Blob, 
  fileName: string,
  email: string,
  onProgress?: (progress: number) => void
) => {
  try {
    // const formattedDate = new Date().toLocaleString('en-US', {
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit',
    //   timeZoneName: 'short'
    // });

    // Get pre-signed URL from your API
    const urlResponse = await fetch('/api/get-upload-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName,
        contentType: 'video/mp4',
        metadata: {
          'email': email,
        }
      }),
    });

    if (!urlResponse.ok) {
      const errorText = await urlResponse.text();
      console.error('Failed to get upload URL:', errorText);
      throw new Error(`Failed to get upload URL: ${errorText}`);
    }

    const { signedUrl } = await urlResponse.json();
    console.log('Got signed URL:', signedUrl);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress?.(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          console.log('Upload completed successfully');
          resolve(xhr.response);
        } else {
          console.error('Upload failed with status:', xhr.status);
          console.error('Response:', xhr.responseText);
          reject(new Error(`Upload failed: ${xhr.status} with error: ${xhr.responseText}`));
        }
      };

      xhr.onerror = () => {
        console.error('XHR Error:', xhr.responseText);
        reject(new Error('Upload failed'));
      };

      xhr.open('PUT', signedUrl);
      
      console.log('Setting headers for upload...');
      // Set required headers for S3
      xhr.setRequestHeader('Content-Type', 'video/mp4');
      xhr.setRequestHeader('x-amz-meta-email', email);
      console.log('Headers set:', {
        'Content-Type': 'video/mp4',
        'x-amz-meta-email': email
      });
      
      // Send the blob
      xhr.send(videoBlob);
    });

  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};
  

