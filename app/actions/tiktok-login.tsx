'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import crypto from 'crypto'
import { pargoiClient } from '@/lib/pargoilib'

export async function loginWithTikTok() {
  const state = crypto.randomBytes(16).toString('hex')
  const cookieStore = await cookies()

  cookieStore.set('tiktok_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 10, // 10 minutes
  })

  const scopes = ['user.info.basic', 'video.upload', 'video.publish']
  const authorizationUrl = pargoiClient.generateAuthUrl(scopes, state)

  redirect(authorizationUrl)
}