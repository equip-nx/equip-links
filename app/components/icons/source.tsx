import Twitter from './twitter';
import Facebook from './facebook';
import LinkedIn from './linkedin';
import Instagram from './instagram';
import Copy from './copy';

const Source = ({ source, className }: { source?: string, className?: string }) => {
  switch (source) {
    case 'x':
      return <Twitter className={className} />
    case 'facebook':
      return <Facebook className={className} />
    case 'linkedin':
      return <LinkedIn className={className} />
    case 'instagram':
      return <Instagram className={className} />
    default:
      return <Copy className={className} />
  }
}

export default Source;
