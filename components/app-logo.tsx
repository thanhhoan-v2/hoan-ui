import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';

export default function AppLogo({
  showBadge = true,
  fontSize = 'text-2xl',
  isLink = true,
}: {
  showBadge?: boolean;
  fontSize?: string;
  isLink?: boolean;
}) {
  if (isLink) {
    return (
      <Link className={cn('flex items-center gap-2', fontSize)} href='/'>
        <div className='font-rubik-puddles flex items-center gap-2 font-bold'>
          App {showBadge && <Badge>v1.0.0</Badge>}
        </div>
      </Link>
    );
  }

  return (
    <div className={cn('font-rubik-puddles flex items-center gap-2 font-bold', fontSize)}>
      App {showBadge && <Badge>v1.0.0</Badge>}
    </div>
  );
}
