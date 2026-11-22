import { Github, Facebook, Linkedin, Twitter, Send, Mail } from 'lucide-react'
import { socials } from '../data/profile.js'

export const socialIconMap = {
  github: Github,
  facebook: Facebook,
  telegram: Send,
  x: Twitter,
  linkedin: Linkedin,
  email: Mail,
}

// Only socials that have a URL filled in are shown.
export const activeSocials = socials.filter((s) => s.url && s.url.trim() !== '')

export const isExternal = (url) => /^https?:\/\//i.test(url)
