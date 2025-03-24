export interface HeaderProps {
  onInfoPress: () => void
  textColor: string
  fontSize: number
}

export interface ActionButtonsProps {
  onPickImage: () => void
  onConvert: () => void
  selectedImage: string | null
  isLandscape: boolean
  primaryColor: string
  backgroundColor: string
  fontSize: number
}

export interface ImageSelectorProps {
  selectedImage: string | null
  isLandscape: boolean
  height: number
  backgroundColor: string
}

export interface Conversion {
    userId: string
    convertedText: string
    imageUrl: string
    publicId: string
}