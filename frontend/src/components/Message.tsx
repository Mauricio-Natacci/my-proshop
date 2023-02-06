import { Alert } from 'react-bootstrap'

type MessageProps = {
  variant?: string
  children: any
}

export const Message = ({ variant, children }: MessageProps) => {
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: 'info'
}
