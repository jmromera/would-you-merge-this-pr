import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function StrokeIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  )
}

function FilledIcon(props: IconProps) {
  return <svg width="16" height="16" fill="currentColor" aria-hidden="true" {...props} />
}

export const CheckIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="m3.5 8.5 3 3 6-7" />
  </StrokeIcon>
)

export const ArrowRightIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </StrokeIcon>
)

export const RestartIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M2.5 8a5.5 5.5 0 1 0 1.9-4.15M2.5 2.5v3h3" />
  </StrokeIcon>
)

export const ShareIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M8 10V2M5 4.5l3-3 3 3M3 8.5v5h10v-5" />
  </StrokeIcon>
)

export const SoundOnIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M2 6v4h2.5L8 13V3L4.5 6H2ZM10.5 5.5a3.5 3.5 0 0 1 0 5M12.5 3.5a6.3 6.3 0 0 1 0 9" />
  </StrokeIcon>
)

export const SoundOffIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M2 6v4h2.5L8 13V3L4.5 6H2ZM11 6l3 4M14 6l-3 4" />
  </StrokeIcon>
)

export const GitMergeIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <circle cx="4" cy="3.5" r="1.5" />
    <circle cx="4" cy="12.5" r="1.5" />
    <circle cx="12" cy="10" r="1.5" />
    <path d="M4 5v6M12 8.5V8a3 3 0 0 0-3-3H7" />
  </StrokeIcon>
)

export const CommentIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M2.5 3.5h11v7h-5l-3 2.5v-2.5h-3v-7Z" />
  </StrokeIcon>
)

export const XIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="m4 4 8 8M12 4l-8 8" />
  </StrokeIcon>
)

export const GitHubIcon = (props: IconProps) => (
  <FilledIcon viewBox="0 0 16 16" {...props}>
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
  </FilledIcon>
)

export const LinkedInIcon = (props: IconProps) => (
  <FilledIcon viewBox="0 0 24 24" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
  </FilledIcon>
)
