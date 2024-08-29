// app/providers.js
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST } from '@/components/config'

if (typeof window !== 'undefined') {
  posthog.init(NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
  })
}
export function CSPostHogProvider({ children }) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}