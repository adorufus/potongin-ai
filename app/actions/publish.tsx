'use server';

import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { pargoiClient } from '@/lib/pargoilib';

export async function publishTikTokVideo(formData: FormData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('tk_access_token')?.value;

  if (!accessToken) {
    return { success: false, error: 'User is not authenticated with TikTok.' };
  }

  const file = formData.get('videoFile') as File;
  const title = formData.get('title') as string;

  if (!file || file.size === 0) {
    return { success: false, error: 'A valid mp4 source asset must be present.' };
  }

  let tempFilePath = '';

  try {
    // 1. Query Pre-flight check (Verifies creator account permissions)
    const info = await pargoiClient.getCreatorInfo(accessToken);
    if (!info.data?.creator_info?.can_publish_video) {
      return { success: false, error: 'This creator account cannot publish video via API at this time.' };
    }

    // 2. Convert standard browser memory stream arrays down onto persistent local disk space
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    tempFilePath = path.join(os.tmpdir(), `tiktok-upload-${Date.now()}.mp4`);
    await fs.writeFile(tempFilePath, buffer);

    // 3. Execute wrapper execution block (Chunked allocation sequence setup)
    const response = await pargoiClient.publishVideoFromFile(accessToken, tempFilePath, {
      title: title || 'Uploaded seamlessly via Next.js Server Actions #api',
      privacyLevel: 'PUBLIC_TO_EVERYONE'
    });

    return { success: true, publishId: response.publish_id };
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Server upload execution failure:', err);
    return { success: false, error: err.message || 'Fatal exception during posting compilation.' };
  } finally {
    // 4. Always wipe local file paths out of execution runtimes to prevent server resource leaks
    if (tempFilePath) {
      await fs.unlink(tempFilePath).catch(() => null);
    }
  }
}